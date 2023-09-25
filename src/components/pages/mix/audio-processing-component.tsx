"use client";
import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";
import Loading from "@/components/widgets/loading";
import {type MixModel} from "@/lib/models";
import React from "react";
import {useSession} from "next-auth/react";
import JobService from "@/lib/services/api/job-service";
import useAudioProcessingStatus from "@/lib/services/realtime/hooks/audio-processing-hook";

type MixProcessingComponentProps = {
  mix: MixModel;
};

const AudioProcessingComponent: React.FC<MixProcessingComponentProps> = ({
  mix,
}) => {
  const {data: session} = useSession();
  const {isProcessed, processPercentage} = useAudioProcessingStatus(
    session?.user.accessToken as string,
  );

  return (
    <div className="flex w-full flex-row gap-2">
      <Loading title="Processing mix" message={`${processPercentage}% done`}/>
      <div className="flex-grow"></div>
      <Button
        onClick={async () =>
          await new JobService(session?.user.accessToken).requeProcessMixJob(
            mix.id,
          )
        }
      >
        <Icons.activity className="mr-2 h-4 w-4"/>
        Request Update
      </Button>
    </div>
  );
};

export default AudioProcessingComponent;
