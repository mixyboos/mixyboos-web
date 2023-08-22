import React from "react";
import { type MixModel } from "@/lib/models";
import ListPlayer from "./audio/list-audio-player";

type MixListComponentProps = {
  mixes: MixModel[];
};

const MixListComponent: React.FC<MixListComponentProps> = ({ mixes }) => {
  return mixes.map((mix) => (
    <div key={mix.id}>
      <div className="border-b-2">
        <ListPlayer mix={mix} />
      </div>
    </div>
  ));
};

export default MixListComponent;
