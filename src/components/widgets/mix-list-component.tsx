import React from "react";
import { type MixModel } from "@/lib/models";
import MainPlayer from "./audio/large-audio-player";

type MixListComponentProps = {
  mixes: MixModel[];
};

const MixListComponent: React.FC<MixListComponentProps> = ({ mixes }) => {
  return mixes.map((mix) => (
    <div key={mix.id}>
      <div className="border-b-2">
        <MainPlayer mix={mix} />
      </div>
    </div>
  ));
};

export default MixListComponent;
