import { Card, CardContent } from "@/components/ui/card";
import { type MixModel } from "@/lib/models";
import React from "react";
import LargeAudioPlayer from "@/components/widgets/audio/large-audio-player";
import AudioProcessingComponent from "@/components/widgets/audio/audio-processing-component";
import AudioPlayerBar from "@/components/widgets/audio/audio-player-bar";
import ProcessingMix from "@/components/pages/mix/mix-process";

type MixDetailsComponentProps = {
  mix: MixModel;
};

const MixDetailsComponent: React.FC<MixDetailsComponentProps> = ({
  mix,
}: MixDetailsComponentProps) => {
  return mix.isProcessed ? (
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
                __html: mix.description?.replace(/\n/g, "<br />") as string,
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  ) : (
    <ProcessingMix mix={mix} />
  );
};

export default MixDetailsComponent;
