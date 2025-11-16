import { useCallback, useEffect, useState } from 'react'
import logger from '@/lib/logger'
import createSignalRConnection from '@/lib/services/realtime/signalr'
import { uploadAudio } from '@/lib/services/api/upload/upload-service'

export enum UploadPhase {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum ProcessingStage {
  STARTING = 'starting',
  GENERATING_WAVEFORM = 'generating_waveform',
  CONVERTING_AUDIO = 'converting_audio',
  FINALIZING = 'finalizing',
  COMPLETED = 'completed',
}

export interface UploadError {
  phase: UploadPhase
  stage?: ProcessingStage
  message: string
  details?: string
  retryable: boolean
}

export interface UploadState {
  phase: UploadPhase
  uploadProgress: number // 0-100
  processingProgress: number // 0-100
  processingStage: ProcessingStage
  error: UploadError | null
  mixId: string | null
  fileName: string | null
}

interface UseMixUploadOptions {
  mixId: string
  onComplete?: (mixId: string) => void
  onError?: (error: UploadError) => void
  onUploadComplete?: (mixId: string) => void
}

export const useMixUpload = ({
  mixId,
  onComplete,
  onError,
  onUploadComplete,
}: UseMixUploadOptions) => {
  const [state, setState] = useState<UploadState>({
    phase: UploadPhase.IDLE,
    uploadProgress: 0,
    processingProgress: 0,
    processingStage: ProcessingStage.STARTING,
    error: null,
    mixId,
    fileName: null,
  })

  // Initialize SignalR connection
  useEffect(() => {
    const newConnection = createSignalRConnection('updates')
    
    newConnection
      .start()
      .then(() => {
        logger.debug(
          { context: 'useMixUpload', action: 'connected', mixId },
          'SignalR connected'
        )

        // Register event handlers filtered by mixId
        newConnection.on('ConversionStarted', (receivedMixId: string) => {
          if (receivedMixId === mixId) {
            logger.debug(
              { context: 'useMixUpload', action: 'ConversionStarted', mixId },
              'Processing started'
            )
            setState((prev) => ({
              ...prev,
              phase: UploadPhase.PROCESSING,
              processingStage: ProcessingStage.GENERATING_WAVEFORM,
              processingProgress: 0,
            }))
          }
        })

        newConnection.on(
          'ConversionProgress',
          (receivedMixId: string, percentage: number) => {
            if (receivedMixId === mixId) {
              logger.debug(
                {
                  context: 'useMixUpload',
                  action: 'ConversionProgress',
                  mixId,
                  percentage,
                },
                'Processing progress'
              )
              setState((prev) => ({
                ...prev,
                processingProgress: percentage,
                processingStage:
                  percentage < 10
                    ? ProcessingStage.GENERATING_WAVEFORM
                    : percentage < 95
                      ? ProcessingStage.CONVERTING_AUDIO
                      : ProcessingStage.FINALIZING,
              }))
            }
          }
        )

        newConnection.on('ConversionFinished', (receivedMixId: string) => {
          if (receivedMixId === mixId) {
            logger.debug(
              { context: 'useMixUpload', action: 'ConversionFinished', mixId },
              'Processing complete'
            )
            setState((prev) => ({
              ...prev,
              phase: UploadPhase.COMPLETED,
              processingProgress: 100,
              processingStage: ProcessingStage.COMPLETED,
            }))
            onComplete?.(mixId)
          }
        })

        newConnection.on(
          'ConversionFailed',
          (receivedMixId: string, errorMessage?: string) => {
            if (receivedMixId === mixId) {
              logger.error(
                {
                  context: 'useMixUpload',
                  action: 'ConversionFailed',
                  mixId,
                  errorMessage,
                },
                'Processing failed'
              )
              const error: UploadError = {
                phase: UploadPhase.PROCESSING,
                stage: state.processingStage,
                message: 'Audio processing failed',
                details: errorMessage || 'Unknown error during processing',
                retryable: true,
              }
              setState((prev) => ({
                ...prev,
                phase: UploadPhase.FAILED,
                error,
              }))
              onError?.(error)
            }
          }
        )
      })
      .catch((err) => {
        logger.error(
          { context: 'useMixUpload', action: 'connectionError', error: err },
          'Failed to connect to SignalR'
        )
      })

    return () => {
      newConnection.stop().catch((err) => {
        logger.error(
          { context: 'useMixUpload', action: 'disconnectError', error: err },
          'Error disconnecting'
        )
      })
    }
  }, [mixId, onComplete, onError])

  const startUpload = useCallback(
    async (file: File) => {
      try {
        setState((prev) => ({
          ...prev,
          phase: UploadPhase.UPLOADING,
          uploadProgress: 0,
          fileName: file.name,
          error: null,
        }))

        logger.debug(
          { context: 'useMixUpload', action: 'startUpload', mixId, fileName: file.name },
          'Starting upload'
        )

        const formData = new FormData()
        formData.append('file', file)

        const result = await uploadAudio(
          mixId,
          formData,
          (total: number, loaded: number) => {
            const percentage = Math.round((loaded * 100) / total)
            setState((prev) => ({
              ...prev,
              uploadProgress: percentage,
            }))
          }
        )

        if (result) {
          logger.debug(
            { context: 'useMixUpload', action: 'uploadComplete', mixId },
            'Upload complete, waiting for processing'
          )
          setState((prev) => ({
            ...prev,
            phase: UploadPhase.PROCESSING,
            uploadProgress: 100,
            processingStage: ProcessingStage.STARTING,
          }))
          // Call onUploadComplete when file upload finishes but before processing
          onUploadComplete?.(mixId)
        } else {
          throw new Error('Upload failed - server returned false')
        }
      } catch (err) {
        logger.error(
          { context: 'useMixUpload', action: 'uploadError', error: err },
          'Upload error'
        )

        const error: UploadError = {
          phase: UploadPhase.UPLOADING,
          message: 'Failed to upload file',
          details:
            err instanceof Error ? err.message : 'Unknown upload error',
          retryable: true,
        }

        setState((prev) => ({
          ...prev,
          phase: UploadPhase.FAILED,
          error,
        }))

        onError?.(error)
      }
    },
    [mixId, onError]
  )

  const retry = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: UploadPhase.IDLE,
      uploadProgress: 0,
      processingProgress: 0,
      error: null,
    }))
  }, [])

  const reset = useCallback(() => {
    setState({
      phase: UploadPhase.IDLE,
      uploadProgress: 0,
      processingProgress: 0,
      processingStage: ProcessingStage.STARTING,
      error: null,
      mixId,
      fileName: null,
    })
  }, [mixId])

  return {
    state,
    startUpload,
    retry,
    reset,
    isUploading: state.phase === UploadPhase.UPLOADING,
    isProcessing: state.phase === UploadPhase.PROCESSING,
    isCompleted: state.phase === UploadPhase.COMPLETED,
    isFailed: state.phase === UploadPhase.FAILED,
    overallProgress:
      state.phase === UploadPhase.UPLOADING
        ? state.uploadProgress * 0.3 // Upload is 30% of total
        : state.phase === UploadPhase.PROCESSING
          ? 30 + state.processingProgress * 0.7 // Processing is 70% of total
          : state.phase === UploadPhase.COMPLETED
            ? 100
            : 0,
  }
}
