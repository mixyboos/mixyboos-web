"use client";
import { type MixModel } from "@/lib/models";
import React from "react";
import PlayPauseButton from "../buttons/play-pause-button";
import Image from "next/image";
import useAudioStore, { PlayState } from "@/lib/contexts/audio-context";
import logger from "@/lib/logger";
import WaveformComponent from "@/components/widgets/audio/waveform";
type LargeAudioPlayerProps = {
  mix: MixModel;
};

const LargeAudioPlayer: React.FC<LargeAudioPlayerProps> = ({
  mix,
}: LargeAudioPlayerProps) => {
  const { duration, setSeekPosition, progressPercentage } = useAudioStore();
  const _handleTimeClick: React.MouseEventHandler<HTMLDivElement> = (
    $event: React.MouseEvent<HTMLDivElement>
  ) => {
    console.log("large-audio-player", "_handleTimeClick", $event);
    const { pageX: eventOffsetX } = $event;

    const elementOffsetX = $event.currentTarget.offsetLeft;
    const elementWidth = $event.currentTarget.clientWidth;
    const percent = (eventOffsetX - elementOffsetX) / elementWidth;
    setSeekPosition(percent * duration);
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center space-x-2 ">
          <div className="h-16 w-16 flex-none">
            <PlayPauseButton
              disabled={!mix.isProcessed}
              mix={mix}
              onPlayStart={() => {
                logger.debug("large-audio-player", "onPlayStart");
              }}
            />
          </div>
          <div className="flex-grow justify-center">
            <h1 className="text-xl font-bold md:text-3xl">{mix.title}</h1>
            <h2 className="text-md text-muted-foreground">
              By: {mix.user?.displayName}
            </h2>
          </div>
        </div>
      </div>
<<<<<<< Updated upstream
      {mix.isProcessed ? (
=======
      {mix.isProcessed && mix.pcmUrl ? (
>>>>>>> Stashed changes
        <WaveformComponent
          audioUrl={mix.audioUrl as string}
          pcmUrl={
            "https://cdn.podnoms.com/waveforms/d70b31d6-9c9a-4787-921f-08d68e3285c7.json"
          }
          playState={PlayState.stopped}
          audioDuration={0}
          currentPosition={0}
        />
      ) : (
        <div className="relative h-[150px] w-full cursor-pointer">
          <Image
            src="/img/processing-waves.gif"
            width={1600}
            height={250}
            alt="processing"
            className="absolute left-0 top-0 z-0 h-full w-full"
          />
        </div>
      )}
    </>
  );
};

export default LargeAudioPlayer;
