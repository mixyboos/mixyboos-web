"use client";
import React from "react";

import classnames from "classnames";
import { type MixModel } from "@/lib/models";
import useAudioStore, {
  PlayState,
} from "@/lib/services/stores/audio/audio-store";
import { Icons } from "@/components/icons";
import { mixService } from "@/lib/services/audio";

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
          // const url = `https://cdn.mixyboos.com/audio/${mix.id}/${mix.id}.m3u8`;
          const url = mix.audioUrl;
          if (url) {
            setNowPlaying(mix);
            setNowPlayingUrl(url);
            onPlayStart();
          }
        } else {
          togglePlayState();
        }
      }}
    >
      <div
        className={
          "cursor-pointer text-foreground transition duration-200 hover:text-muted-foreground"
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
