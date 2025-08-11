'use client'
import React from 'react'
import { Link } from '@tanstack/react-router'

import type { MixModel } from '@/lib/models/mix'
import useAudioStore, { PlayState } from '@/lib/contexts/audio-context'
import logger from '@/lib/logger'
import WaveformComponent from '@/components/widgets/audio/waveform'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import PlayPauseButton from '@/components/widgets/buttons/play-pause-button'
import useAudioProcessingStatus from '@/lib/hooks/audio-processing-hook'

type LargeAudioPlayerProps = {
  mix: MixModel
}

const LargeAudioPlayer: React.FC<LargeAudioPlayerProps> = ({
  mix,
}: LargeAudioPlayerProps) => {
  const { position, setDuration } = useAudioStore()
  const { isProcessed } = useAudioProcessingStatus()
  React.useEffect(() => {
    if (mix.duration) {
      setDuration(mix.duration)
    }
  }, [mix])
  React.useEffect(() => {
    if (isProcessed) {
      mix.isProcessed = true
    }
  }, [isProcessed])

  return (
    <div className="space-x-4">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-11 pb-6">
          <div className="h-16 w-16 p-2 flex-none">
            <PlayPauseButton
              disabled={!mix.isProcessed}
              mix={mix}
              onPlayStart={() => {
                logger.debugLog('large-audio-player', 'onPlayStart')
              }}
            />
          </div>
          <div className="grow justify-center">
            <Link to={`/(mix)/${mix.user.slug}/${mix.slug}`}>
              <h1 className="text-xl font-bold md:text-3xl">{mix.title}</h1>
              <h2 className="text-md text-muted-foreground">
                By: {mix.user.displayName}
              </h2>
            </Link>
          </div>
        </div>
      </div>
      {mix.pcmUrl ? (
        <WaveformComponent
          id={mix.id}
          audioUrl={mix.audioUrl}
          pcmUrl={mix.pcmUrl}
          playState={PlayState.stopped}
          duration={mix.duration || 0}
          position={position}
        />
      ) : (
        <div className="relative h-[150px] w-full cursor-pointer">
          <div className="rounded-lg border p-4 flex flex-col items-center justify-center space-y-4 bg-secondary/30">
            <pre className="text-xs overflow-auto max-h-32 w-full">
              {JSON.stringify(mix, null, 2)}
            </pre>
            <Button onClick={() => window.location.reload()} className="gap-2">
              <Icons.refresh className="mr-1" />
              Known bug - click me.
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LargeAudioPlayer
