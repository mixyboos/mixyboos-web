"use client";
import { type MixModel } from "@/lib/models";
import React from "react";
import PlayPauseButton from "../buttons/play-pause-button";
import Image from "next/image";
import useAudioStore, { PlayState } from "@/lib/contexts/audio-context";
import logger from "@/lib/logger";
import WaveformComponent from "@/components/widgets/audio/waveform";
import Link from "next/link";
import useAudioProcessingStatus from "@/lib/services/realtime/hooks/audio-processing-hook";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
type LargeAudioPlayerProps = {
  mix: MixModel;
};

const LargeAudioPlayer: React.FC<LargeAudioPlayerProps> = ({
  mix,
}: LargeAudioPlayerProps) => {
  const { setSeekPosition, position, duration, setDuration } = useAudioStore();
  const { isProcessed } = useAudioProcessingStatus();
  React.useEffect(() => {
    if (mix.duration) {
      setDuration(mix.duration);
    }
  }, [mix]);

  return (
    <div className="space-x-4">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-11 pb-6">
          <div className="h-16 w-16 p-2 flex-none">
            <PlayPauseButton
              disabled={!mix.isProcessed}
              mix={mix}
              onPlayStart={() => {
                logger.debug("large-audio-player", "onPlayStart");
              }}
            />
          </div>
          <div className="grow justify-center">
            <Link href={`/${mix.user?.slug}/${mix.slug}`}>
              <h1 className="text-xl font-bold md:text-3xl">{mix.title}</h1>
              <h2 className="text-md text-muted-foreground">
                By: {mix.user?.displayName}
              </h2>
            </Link>
          </div>
        </div>
      </div>
      {(mix.isProcessed || isProcessed) && mix.pcmUrl ? (
        <WaveformComponent
          id={mix.id}
          audioUrl={mix.audioUrl as string}
          pcmUrl={mix.pcmUrl as string}
          playState={PlayState.stopped}
          duration={mix.duration || 0}
          position={position}
        />
      ) : (
        <div className="relative h-[150px] w-full cursor-pointer">
          <div className="rounded-lg border p-4 flex flex-col items-center justify-center space-y-4 bg-secondary/30">
            <Button onClick={() => window.location.reload()} className="gap-2">
              <Icons.refresh className="mr-1" />
              Known bug - click me.
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LargeAudioPlayer;
