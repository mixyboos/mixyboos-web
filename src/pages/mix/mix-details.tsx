'use client'
import React from 'react'
import type { MixModel } from '@/lib/models/mix'
import { Card, CardContent } from '@/components/ui/card'
import LargeAudioPlayer from '@/components/widgets/audio/large-audio-player'
import AudioPlayerBar from '@/components/widgets/audio/audio-player-bar'
import useAudioProcessingStatus from '@/lib/hooks/audio-processing-hook'
import ProcessingMix from '@/components/mix/mix-process'

type MixDetailsComponentProps = {
  mix: MixModel
}

const MixDetailsComponent: React.FC<MixDetailsComponentProps> = ({
  mix,
}: MixDetailsComponentProps) => {
  const { isProcessed, isFailed } = useAudioProcessingStatus()
  if (isFailed) {
    return (
      <Card className="overflow-hidden">
        <CardContent>
          <p className="p-4">Mix processing failed</p>
        </CardContent>
      </Card>
    )
  }
  return mix.isProcessed || (isProcessed && mix.pcmUrl) ? (
    <div className="flex flex-col h-screen">
      <div>
        <div className="px-8">
          <LargeAudioPlayer mix={mix} />
        </div>
        <div className="px-8 py-4">
          <AudioPlayerBar mix={mix} />
        </div>
      </div>
      <div className="px-8">
        <Card>
          <CardContent>
            <p
              className="p-4"
              dangerouslySetInnerHTML={{
                __html: mix.description.replace(/\n/g, '<br />'),
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  ) : (
    <ProcessingMix
      mix={mix}
      // onProcessed={(success, state) => {
      //   mix.isProcessed = success
      //   if (!success) {
      //     setError(state)
      //   }
      // }}
    />
  )
}

export default MixDetailsComponent
