"use client";
import React from "react";

import { type MixModel } from "@/lib/models";
import useAudioStore, {
  PlayState,
} from "@/lib/services/stores/audio/audio-store";
import { Icons } from "@/components/icons";
import MixService from "@/lib/services/api/mix-service";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    <Button
      variant="ghost"
      className={className}
      onClick={async () => {
        if (
          playState === PlayState.stopped ||
          (mix.id !== nowPlaying?.id && !nowPlayingUrl)
        ) {
          const url = await new MixService().getMixAudioUrl(mix);
          if (url) {
            setNowPlaying(mix);
            setNowPlayingUrl(url);
            onPlayStart();
          }
        } else {
          togglePlayState();
        }
      }}
      {...props}
    >
      {nowPlaying?.id === mix.id && playState === PlayState.playing ? (
        <Icons.pause className="h-full w-full" />
      ) : (
        <Icons.playCircle className="h-full w-full" />
      )}
    </Button>
  );
};

export default PlayPauseButton;
