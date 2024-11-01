"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { type MixModel } from "@/lib/models";
import React from "react";
import useAudioProcessingStatus from "@/lib/services/realtime/hooks/audio-processing-hook";
import { requeProcessMixJob } from "@/lib/services/api/job-service";
import Loading from "@/components/widgets/loading";

type MixProcessingComponentProps = {
  mix: MixModel;
};

const AudioProcessingComponent: React.FC<MixProcessingComponentProps> = ({
  mix,
}) => {
  const { isProcessed, processPercentage } = useAudioProcessingStatus();

  return (
    <div className="flex w-full flex-row gap-2">
      <Loading title="Processing mix" message={`${processPercentage}% done`} />
      <div className="flex-grow"></div>
      <Button onClick={async () => await requeProcessMixJob(mix.id)}>
        <Icons.activity className="mr-2 h-4 w-4" />
        Request Update
      </Button>
    </div>
  );
};

export default AudioProcessingComponent;
