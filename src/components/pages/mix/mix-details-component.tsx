import LargeAudioPlayer from "@/components/widgets/audio/large-audio-player";
import { type MixModel } from "@/lib/models";
import React from "react";

type MixDetailsComponentProps = {
  mix: MixModel;
};

const MixDetailsComponent: React.FC<MixDetailsComponentProps> = ({
  mix,
}: MixDetailsComponentProps) => {
  return (
    <div>
      <LargeAudioPlayer mix={mix} />
    </div>
  );
};

export default MixDetailsComponent;
