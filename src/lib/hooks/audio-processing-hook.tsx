import { useEffect, useState } from 'react'
import logger from '@/lib/logger'
import createSignalRConnection from '@/lib/services/realtime/signalr'

const useAudioProcessingStatus = () => {
  const [isProcessed, setIsProcessed] = useState(false)
  const [processPercentage, setProcessPercentage] = useState(0)
  const [processStatus, setProcessStatus] = useState('Preparing conversion...')
  const [isFailed, setIsFailed] = useState(false)
  useEffect(() => {
    const connection = createSignalRConnection('updates')
    connection.start().then(() => {
      logger.debug(
        { context: 'Signalr', action: 'useAudioProcessingStatus', connection },
        'Connected',
      )
      connection.on('ConversionStarted', (showId: string) => {
        logger.debug(
          { context: 'Signalr', action: 'ConversionStarted' },
          showId,
        )
        setProcessStatus('Converting audio...')
      })
      connection.on('ConversionProgress', (showId: string, value: number) => {
        logger.debug(
          { context: 'Signalr', action: 'ConversionProgress', showId: showId },
          value.toString(16),
        )
        setProcessPercentage(value)
        setProcessStatus('Converting audio...')
      })
      connection.on('ConversionFinished', (showId: string) => {
        logger.debug({
          context: 'Signalr',
          action: 'ConversionFinished',
          showId: showId,
        })
        setIsProcessed(true)
        setProcessStatus('Processing finished...')
      })
      connection.on('ConversionFailed', (showId: string) => {
        logger.debug({
          context: 'Signalr',
          action: 'ConversionFailed',
          showId: showId,
        })
        setProcessStatus('Processing failed...')
        setIsFailed(true)
      })
    })
  })
  return { isProcessed, processPercentage, processStatus, isFailed }
}
export default useAudioProcessingStatus
