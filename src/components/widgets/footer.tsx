"use client";
import React from "react";
import { Icons } from "../icons";
import useAudioStore, {
  PlayState,
} from "@/lib/services/stores/audio/audio-store";
import MiniPlayer from "./audio/mini-audio-player";

const FooterComponent = () => {
  const { playState } = useAudioStore();
  return (
    <React.Fragment>
      {playState === PlayState.stopped ? (
        <h1>
          built with all the{" "}
          <Icons.love className="inline-block h-5 w-5 text-red-500" /> in the
          world by{" "}
          <a
            href="https://podnoms.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            PodNoms
          </a>
        </h1>
      ) : (
        <MiniPlayer />
      )}
    </React.Fragment>
  );
};

export default FooterComponent;
