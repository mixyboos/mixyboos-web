"use client";
import React from "react";

import { type MixModel } from "@/lib/models";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import useAudioStore, { PlayState } from "@/lib/contexts/audio-context";
import { getMixAudioUrl } from "@/lib/services/api/mix-service";

interface IPlayPauseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mix: MixModel;
  onPlayStart: () => void;
}

const PlayPauseButton = ({
  mix,
  onPlayStart,
  className,
  ...props
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
    <button
      className="hover:opacity-80 transition duration-500 hover:scale-105"
      {...props}
      onClick={async () => {
        if (
          playState === PlayState.stopped ||
          (mix.id !== nowPlaying?.id && !nowPlayingUrl)
        ) {
          const url = await getMixAudioUrl(mix);
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
      {nowPlaying?.id === mix.id && playState === PlayState.playing ? (
        <Icons.pause size={64} strokeWidth="1" />
      ) : (
        <Icons.playCircle size={64} strokeWidth="" />
      )}
    </button>
  );
};

export default PlayPauseButton;
