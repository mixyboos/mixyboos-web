"use client";
import React from "react";

import useAudioStore, { PlayState } from "@/lib/contexts/audio-context";
import { Icons } from "@/components/icons";
import MiniPlayer from "@/components/widgets/audio/mini-player";

const FooterComponent = () => {
  const { playState } = useAudioStore();
  return (
    <React.Fragment>
      {playState === PlayState.stopped ? (
        <h1>
          From{" "}
          <a
            href="https://podnoms.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            PodNoms
          </a>{" "}
          with <Icons.love className="inline-block h-5 w-5 text-red-500" />
        </h1>
      ) : (
        <MiniPlayer />
      )}
    </React.Fragment>
  );
};

export default FooterComponent;
