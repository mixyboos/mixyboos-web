import { Card, CardContent } from "@/components/ui/card";
import { type MixModel } from "@/lib/models";
import React from "react";
import LargeAudioPlayer from "@/components/widgets/audio/large-audio-player";
import AudioProcessingComponent from "@/components/widgets/audio/audio-processing-component";
import AudioPlayerBar from "@/components/widgets/audio/audio-player-bar";

type MixDetailsComponentProps = {
  mix: MixModel;
};

const MixDetailsComponent: React.FC<MixDetailsComponentProps> = ({
  mix,
}: MixDetailsComponentProps) => {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <div className="px-8">
          <LargeAudioPlayer mix={mix} />
        </div>
        <div className="px-8 py-4">
          {mix.isProcessed ? (
            <AudioPlayerBar mix={mix} />
          ) : (
            <AudioProcessingComponent mix={mix} />
          )}
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
  );
};

export default MixDetailsComponent;
