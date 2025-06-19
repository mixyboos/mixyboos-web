"use client";
import React from "react";
import ListAudioPlayer from "@/components/widgets/audio/list-audio-player";
import { MixModel } from "@/lib/models";
import ProcessingMix from "@/components/pages/mix/mix-process";

type MixListPageProps = {
  mixes: MixModel[] | undefined;
};
const MixListPage: React.FC<MixListPageProps> = ({ mixes }) => {
  return mixes && mixes.length !== 0 ? (
    <div>
      {mixes?.map((mix) => (
        <div className="py-1" key={mix.id}>
          {mix.isProcessed ? (
            <ListAudioPlayer key={mix.id} mix={mix} />
          ) : (
            <ProcessingMix mix={mix} />
          )}
        </div>
      ))}
    </div>
  ) : (
    <div>No mixes found for this user...</div>
  );
};
export default MixListPage;
