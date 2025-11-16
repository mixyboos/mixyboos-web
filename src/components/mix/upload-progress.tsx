import React from 'react'
import { AlertCircle, AudioWaveform, CheckCircle2, Loader2, Upload } from 'lucide-react'
import type { UploadError, UploadState } from '@/lib/hooks/use-mix-upload'
import { 
  ProcessingStage,
  UploadPhase
} from '@/lib/hooks/use-mix-upload'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface UploadProgressProps {
  state: UploadState
  overallProgress: number
  onRetry?: () => void
  onCancel?: () => void
}

const getPhaseIcon = (phase: UploadPhase) => {
  switch (phase) {
    case UploadPhase.UPLOADING:
      return <Upload className="h-5 w-5 animate-pulse" />
    case UploadPhase.PROCESSING:
      return <AudioWaveform className="h-5 w-5 animate-pulse" />
    case UploadPhase.COMPLETED:
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case UploadPhase.FAILED:
      return <AlertCircle className="h-5 w-5 text-red-500" />
    default:
      return <Loader2 className="h-5 w-5 animate-spin" />
  }
}

const getPhaseLabel = (phase: UploadPhase, stage: ProcessingStage): string => {
  switch (phase) {
    case UploadPhase.UPLOADING:
      return 'Uploading file...'
    case UploadPhase.PROCESSING:
      switch (stage) {
        case ProcessingStage.STARTING:
          return 'Starting processing...'
        case ProcessingStage.GENERATING_WAVEFORM:
          return 'Generating waveform...'
        case ProcessingStage.CONVERTING_AUDIO:
          return 'Converting audio...'
        case ProcessingStage.FINALIZING:
          return 'Finalizing...'
        case ProcessingStage.COMPLETED:
          return 'Processing complete!'
      }
      break
    case UploadPhase.COMPLETED:
      return 'Upload complete!'
    case UploadPhase.FAILED:
      return 'Upload failed'
    default:
      return 'Preparing...'
  }
}

const getProgressColor = (progress: number, phase: UploadPhase): string => {
  if (phase === UploadPhase.FAILED) return 'bg-red-500'
  if (phase === UploadPhase.COMPLETED) return 'bg-green-500'
  if (progress < 30) return 'bg-blue-500'
  if (progress < 70) return 'bg-amber-500'
  return 'bg-green-500'
}

const ErrorDisplay: React.FC<{ error: UploadError; onRetry?: () => void }> = ({ 
  error, 
  onRetry 
}) => (
  <Alert variant="destructive" className="mt-4">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>{error.message}</AlertTitle>
    <AlertDescription className="mt-2 space-y-2">
      {error.details && (
        <p className="text-sm">{error.details}</p>
      )}
      {error.retryable && onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="mt-2"
        >
          Try Again
        </Button>
      )}
    </AlertDescription>
  </Alert>
)

const DetailedProgress: React.FC<{ state: UploadState }> = ({ state }) => {
  // Determine current stage label and progress
  const getCurrentStage = () => {
    if (state.phase === UploadPhase.UPLOADING) {
      return {
        label: 'Uploading file',
        progress: state.uploadProgress,
        icon: <Upload className="inline h-4 w-4 mr-1 animate-pulse" />,
      }
    }
    
    if (state.phase === UploadPhase.PROCESSING) {
      switch (state.processingStage) {
        case ProcessingStage.STARTING:
          return {
            label: 'Starting processing',
            progress: 0,
            icon: <Loader2 className="inline h-4 w-4 mr-1 animate-spin" />,
          }
        case ProcessingStage.GENERATING_WAVEFORM:
          return {
            label: 'Generating waveform',
            progress: state.processingProgress,
            icon: <AudioWaveform className="inline h-4 w-4 mr-1 animate-pulse" />,
          }
        case ProcessingStage.CONVERTING_AUDIO:
          return {
            label: 'Converting audio',
            progress: state.processingProgress,
            icon: <Loader2 className="inline h-4 w-4 mr-1 animate-spin" />,
          }
        case ProcessingStage.FINALIZING:
          return {
            label: 'Finalizing',
            progress: state.processingProgress,
            icon: <Loader2 className="inline h-4 w-4 mr-1 animate-spin" />,
          }
        case ProcessingStage.COMPLETED:
          return {
            label: 'Processing complete',
            progress: 100,
            icon: <CheckCircle2 className="inline h-4 w-4 mr-1 text-green-600 dark:text-green-400" />,
          }
      }
    }

    if (state.phase === UploadPhase.COMPLETED) {
      return {
        label: 'Complete',
        progress: 100,
        icon: <CheckCircle2 className="inline h-4 w-4 mr-1 text-green-600 dark:text-green-400" />,
      }
    }

    return {
      label: 'Preparing',
      progress: 0,
      icon: <Loader2 className="inline h-4 w-4 mr-1 animate-spin" />,
    }
  }

  const currentStage = getCurrentStage()

  return (
    <div className="space-y-2 mt-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-primary transition-colors">
          {currentStage.icon}
          {currentStage.label}
        </span>
        <span className="text-xs text-muted-foreground">
          {Math.round(currentStage.progress)}%
        </span>
      </div>
      <Progress 
        value={currentStage.progress} 
        className="h-2 transition-all"
      />
    </div>
  )
}

export const UploadProgress: React.FC<UploadProgressProps> = ({ 
  state, 
  overallProgress,
  onRetry,
  onCancel,
}) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            {getPhaseIcon(state.phase)}
            {getPhaseLabel(state.phase, state.processingStage)}
          </CardTitle>
          {state.fileName && (
            <span className="text-sm text-muted-foreground truncate max-w-xs">
              {state.fileName}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Overall Progress</span>
            <span className="text-muted-foreground">{Math.round(overallProgress)}%</span>
          </div>
          <Progress 
            value={overallProgress} 
            className={cn(
              "h-3 transition-all",
              getProgressColor(overallProgress, state.phase)
            )}
          />
        </div>

        {/* Detailed Step Progress */}
        {(state.phase === UploadPhase.UPLOADING || 
          state.phase === UploadPhase.PROCESSING || 
          state.phase === UploadPhase.COMPLETED) && (
          <DetailedProgress state={state} />
        )}

        {/* Error Display */}
        {state.error && (
          <ErrorDisplay error={state.error} onRetry={onRetry} />
        )}

        {/* Action Buttons */}
        {state.phase === UploadPhase.UPLOADING && onCancel && (
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel Upload
            </Button>
          </div>
        )}

        {state.phase === UploadPhase.COMPLETED && (
          <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-200">Success!</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-300">
              Your mix has been uploaded and processed successfully.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

export default UploadProgress
