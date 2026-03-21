'use client'
import React from 'react'
import type { MixModel } from '@/lib/models/mix'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import useAudioProcessingStatus from '@/lib/hooks/audio-processing-hook'
import { requeProcessMixJob } from '@/lib/services/api/job-service'
import { Spinner } from '@/components/widgets/spinner'

type MixProcessingComponentProps = {
  mix: MixModel
}

const AudioProcessingComponent: React.FC<MixProcessingComponentProps> = ({
  mix,
}) => {
  const { isProcessed, processPercentage } = useAudioProcessingStatus()

  return (
    <div className="flex w-full flex-row gap-2">
      <Spinner size="large">
        <div className="text-center">
          <div className="font-semibold">Processing mix</div>
          <div className="text-sm text-muted-foreground">
            {processPercentage}% done
          </div>
        </div>
      </Spinner>
      <div className="grow"></div>
      <Button onClick={async () => await requeProcessMixJob(mix.id)}>
        <Icons.activity className="mr-2 h-4 w-4" />
        Request Update
      </Button>
    </div>
  )
}

export default AudioProcessingComponent
