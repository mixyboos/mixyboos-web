"use client";
import React from "react";

import classnames from "classnames";
import { type MixModel } from "@/lib/models";
import useAudioStore, {
  PlayState,
} from "@/lib/services/stores/audio/audioStore";
import { Icons } from "@/components/icons";

interface IPlayPauseButtonProps {
  mix: MixModel;
  onPlayStart: () => void;
  classes?: string;
}

const PlayPauseButton = ({
  mix,
  onPlayStart,
  classes = "w-6",
}: IPlayPauseButtonProps) => {
  const {
    playState,
    togglePlayState,
    nowPlaying,
    setNowPlaying,
    setNowPlayingUrl,
    nowPlayingUrl,
  } = useAudioStore();
  return (
    <div
      className={classnames(classes)}
      onClick={() => {
        if (
          playState === PlayState.stopped ||
          (mix.id !== nowPlaying?.id && !nowPlayingUrl)
        ) {
          // mixService.getMixAudioUrl(mix).then((url) => {
          //   setNowPlaying(mix);
          //   setNowPlayingUrl(url);
          //   onPlayStart();
          // });
        } else {
          togglePlayState();
        }
      }}
    >
      <div
        className={
          "cursor-pointer text-gray-500 transition duration-200 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-700"
        }
      >
        {nowPlaying?.id === mix.id && playState === PlayState.playing ? (
          <Icons.pause className="h-full w-full" />
        ) : (
          <Icons.playCircle className="h-full w-full" />
        )}
      </div>
    </div>
  );
};

export default PlayPauseButton;
