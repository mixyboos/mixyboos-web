"use client";
import { type Icons } from "@/components/icons";
import { type MixModel } from "@/lib/models";
import React from "react";
import PlayPauseButton from "../buttons/play-pause-button";
import Image from "next/image";
import Waveform from "./waveform/waveform";
type LargeAudioPlayerProps = {
  mix: MixModel;
};

const LargeAudioPlayer: React.FC<LargeAudioPlayerProps> = ({
  mix,
}: LargeAudioPlayerProps) => {
  return (
    <div className="p-8">
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
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              {mix.title}
            </h1>
            <h2 className="text-md text-muted-foreground">
              By: {mix.user?.displayName}
            </h2>
          </div>
        </div>
      </div>
      <div className="relative h-[150px] w-full cursor-pointer">
        <div id="progress-overlay" className="">
          <Image
            alt="Waveform overlay"
            id="waveform-overlay"
            style={{
              width: "50%",
            }}
            width={1600}
            height={250}
            src="https://mixyboos.blob.core.windows.net/waveforms/3f3af6f4-c208-4f68-99bd-5a0c5153184f/3f3af6f4-c208-4f68-99bd-5a0c5153184f.cropped.overlay.png"
            className="absolute left-0 top-0 h-full w-full z-10"
          ></Image>
        </div>
        <div id="full-overlay" className="">
          <Image
            alt="Waveform overlay"
            id="waveform-overlay"
            width={1600}
            height={250}
            src="https://mixyboos.blob.core.windows.net/waveforms/3f3af6f4-c208-4f68-99bd-5a0c5153184f/3f3af6f4-c208-4f68-99bd-5a0c5153184f.cropped.png"
            className="absolute left-0 top-0 h-full w-full z-0"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default LargeAudioPlayer;
