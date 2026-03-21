import { useEffect, useState } from 'react'
import logger from '@/lib/logger'
import createSignalRConnection from '@/lib/services/realtime/signalr'

interface UseAudioProcessingStatusOptions {
  mixId?: string // Optional: filter by specific mix ID
}

const useAudioProcessingStatus = (
  options: UseAudioProcessingStatusOptions = {},
) => {
  const { mixId } = options
  const [isProcessed, setIsProcessed] = useState(false)
  const [processPercentage, setProcessPercentage] = useState(0)
  const [processStatus, setProcessStatus] = useState('Preparing conversion...')
  const [isFailed, setIsFailed] = useState(false)

  useEffect(() => {
    const connection = createSignalRConnection('updates')
    connection.start().then(() => {
      logger.debug(
        {
          context: 'Signalr',
          action: 'useAudioProcessingStatus',
          connection,
          mixId,
        },
        'Connected',
      )

      connection.on('ConversionStarted', (receivedMixId: string) => {
        // If mixId is provided, only react to events for that specific mix
        if (!mixId || mixId === receivedMixId) {
          logger.debug(
            { context: 'Signalr', action: 'ConversionStarted', receivedMixId },
            receivedMixId,
          )
          setProcessStatus('Converting audio...')
        }
      })

      connection.on(
        'ConversionProgress',
        (receivedMixId: string, value: number) => {
          if (!mixId || mixId === receivedMixId) {
            logger.debug(
              {
                context: 'Signalr',
                action: 'ConversionProgress',
                receivedMixId,
                value,
              },
              value.toString(),
            )
            setProcessPercentage(value)
            setProcessStatus('Converting audio...')
          }
        },
      )

      connection.on('ConversionFinished', (receivedMixId: string) => {
        if (!mixId || mixId === receivedMixId) {
          logger.debug({
            context: 'Signalr',
            action: 'ConversionFinished',
            receivedMixId,
          })
          setIsProcessed(true)
          setProcessStatus('Processing finished...')
        }
      })

      connection.on(
        'ConversionFailed',
        (receivedMixId: string, errorMessage?: string) => {
          if (!mixId || mixId === receivedMixId) {
            logger.debug({
              context: 'Signalr',
              action: 'ConversionFailed',
              receivedMixId,
              errorMessage,
            })
            setProcessStatus(errorMessage || 'Processing failed...')
            setIsFailed(true)
          }
        },
      )
    })

    return () => {
      connection.stop().catch((err) => {
        logger.error(
          { context: 'Signalr', action: 'stop', error: err },
          'Error stopping connection',
        )
      })
    }
  }, [mixId])

  return { isProcessed, processPercentage, processStatus, isFailed }
}

export default useAudioProcessingStatus
