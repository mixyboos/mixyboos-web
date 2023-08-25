"use client";
import { type MixModel } from "@/lib/models";
import React from "react";
import PlayPauseButton from "../buttons/play-pause-button";
import Image from "next/image";
import useAudioStore from "@/lib/services/stores/audio/audio-store";
type LargeAudioPlayerProps = {
  mix: MixModel;
};

const LargeAudioPlayer: React.FC<LargeAudioPlayerProps> = ({
  mix,
}: LargeAudioPlayerProps) => {
  const { duration, setSeekPosition, progressPercentage } = useAudioStore();
  const _handleTimeClick: React.MouseEventHandler<HTMLDivElement> = (
    $event: React.MouseEvent<HTMLDivElement>,
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
          <div className="h-32 w-32 flex-none">
            <PlayPauseButton
              className="h-full"
              mix={mix}
              onPlayStart={() => {}}
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
      <div
        className="relative h-[150px] w-full cursor-pointer"
        onClick={_handleTimeClick}
      >
        <div id="progress-overlay" className="">
          <Image
            alt="Waveform overlay"
            id="waveform-overlay"
            style={{
              width: `${progressPercentage}%`,
            }}
            width={1600}
            height={250}
            src="https://mixyboos.blob.core.windows.net/waveforms/3f3af6f4-c208-4f68-99bd-5a0c5153184f/3f3af6f4-c208-4f68-99bd-5a0c5153184f.cropped.overlay.png"
            className="absolute left-0 top-0 z-10 h-full w-full"
          ></Image>
        </div>
        <div id="full-overlay" className="">
          <Image
            alt="Waveform overlay"
            id="waveform-overlay"
            width={1600}
            height={250}
            src="https://mixyboos.blob.core.windows.net/waveforms/3f3af6f4-c208-4f68-99bd-5a0c5153184f/3f3af6f4-c208-4f68-99bd-5a0c5153184f.cropped.png"
            className="absolute left-0 top-0 z-0 h-full w-full"
          ></Image>
        </div>
      </div>
    </>
  );
};

export default LargeAudioPlayer;
