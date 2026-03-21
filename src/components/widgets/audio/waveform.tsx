import React from 'react'
import Wavesurfer from 'wavesurfer.js'
import { useTheme } from 'next-themes'
import { secondsToHHMMSS } from '@/lib/utils/time-utils'
import useAudioStore, { PlayState } from '@/lib/contexts/audio-context'
import { siteConfig } from '@/config/site'
import { Label } from '@/components/ui/label'

type WaveformComponentProps = {
  id?: string
  audioUrl: string
  pcmUrl: string
  playState: PlayState
  duration: number
  position: number
  progress?: (e: number) => void
}
const WaveformComponent = ({
  id,
  audioUrl,
  pcmUrl,
  duration,
  progress,
}: WaveformComponentProps) => {
  const { theme } = useTheme()
  const [elapsedTime, setElapsedTime] = React.useState(0)
  const { playState, setSeekPosition, progressPercentage, nowPlayingId } =
    useAudioStore()

  const waveform = React.useRef<Wavesurfer | null>(null)
  const isSeeking = React.useRef(false)

  React.useEffect(() => {
    if (id !== nowPlayingId) {
      return
    }
    if (isSeeking.current) {
      return
    }
    if (playState === PlayState.playing) {
      waveform.current?.seekTo(progressPercentage / 100)
    }
  }, [progressPercentage])


  React.useEffect(() => {
    if (!waveform.current && pcmUrl) {
      waveform.current = Wavesurfer.create({
        container: '#waveform',
        cursorWidth: 0,
        waveColor: siteConfig.theme.waveFormColor,
        progressColor: siteConfig.theme.waveFormProgressColor,
        height: 80,
        hideScrollbar: true,
        barWidth: 1,
      })
    }
  }, [pcmUrl, theme, playState])

  React.useEffect(() => {
    const loadPcm = async () => {
      if (waveform.current) {
        const response = await fetch(pcmUrl)
        if (response.ok) {
          const result = await response.json()
          const peaks = result.data.map((p: number) => p / 128)
          waveform.current.load(
            // empty mp3 file
            'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjM2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU2LjQxAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAkAAAGkAAAAAAAAA0gAAAAANVVV',
            peaks,
            duration,
          )
          waveform.current.on('click', (e) => {
            isSeeking.current = true
            waveform.current?.seekTo(e)
            setSeekPosition(e * duration)
            // suppress progressPercentage updates until audio catches up
            setTimeout(() => {
              isSeeking.current = false
            }, 2000)
          })
        }
      }
    }
    loadPcm()
  }, [pcmUrl, audioUrl])

  return (
    <div id="wrapper" className="relative">
      <Label className="absolute bottom-2 left-1 z-50 text-xs font-semibold ">
        {secondsToHHMMSS(elapsedTime)}
      </Label>
      <div id="waveform" className="h-20 overflow-hidden"></div>
      <Label className="absolute bottom-2 right-1 z-50 text-xs font-semibold ">
        {secondsToHHMMSS(duration)}
      </Label>
    </div>
  )
}

export default WaveformComponent
