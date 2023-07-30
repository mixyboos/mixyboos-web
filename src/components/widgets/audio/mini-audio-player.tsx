import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useAudioStore, {
  PlayState,
} from "@/lib/services/stores/audio/audio-store";
import { secondsToReadableString } from "@/lib/utils/timeUtils";
import React from "react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MiniPlayer = () => {
  const {
    duration,
    position,
    currentVolume,
    nowPlaying,
    playState,
    setSeekPosition,
    togglePlayState,
    progressPercentage
  } = useAudioStore();

  const seekBarElem = React.useRef<HTMLDivElement>(null);
  const _handleTimeClick: React.MouseEventHandler<HTMLDivElement> = (
    $event: React.MouseEvent<HTMLDivElement>,
  ) => {
    console.log("mini-audio-player", "_handleTimeClick", progressPercentage);
    const { pageX: eventOffsetX } = $event;

    if (seekBarElem.current) {
      const elementOffsetX = seekBarElem.current.offsetLeft;
      const elementWidth = seekBarElem.current.clientWidth;
      const percent = (eventOffsetX - elementOffsetX) / elementWidth;
      setSeekPosition(percent * duration);
    }
  };
  return (
    <div className="flex h-16 items-center bg-gray-800 p-2">
      <div
        className="align-center w-16 flex-none cursor-pointer stroke-0 p-1 text-gray-300"
        onClick={() => togglePlayState()}
      >
        {playState === PlayState.playing ? (
          <Icons.pause className="h-8 w-8 delay-100 hover:text-gray-400" />
        ) : (
          <Icons.play className="h-8 w-8 delay-100 hover:text-gray-400" />
        )}
      </div>
      <div className="w-16 flex-none p-2">
        <Image
          width="64"
          height="64"
          src={nowPlaying?.image || "/img/streaming-placeholder.jpg"}
          alt={nowPlaying?.user?.name || "user profile image"}
        />
      </div>
      <div className="w-60 flex-none">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="line-clamp-1 font-light text-gray-200">
                {nowPlaying?.title}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{nowPlaying?.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div
        id="left-button-bar"
        className="flex flex-row space-x-1 px-1 text-gray-400"
      >
        <Button variant={"ghost"} size={"icon"}>
          <Icons.heart className="h-6 w-6" />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Icons.next className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex w-full flex-grow items-center px-1">
        <div className="mr-4 text-sm text-gray-400">
          {secondsToReadableString(position)}
        </div>
        <Progress
          value={progressPercentage}
          className="w-[60%]"
          onClick={_handleTimeClick}
          ref={seekBarElem}
        />
        {/* <div className="progress h-full w-full">
          <div
            className="h-3 rounded-full bg-indigo-100"
            onClick={_handleTimeClick}
            ref={seekBarElem}
          >
            <div
              className="relative h-3 rounded-l-full rounded-r-none bg-indigo-600"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div> */}
        <div className="ml-4 text-sm text-gray-400">
          {secondsToReadableString(duration)}
        </div>
      </div>
      <div
        id="right-button-bar"
        className="flex flex-row space-x-1 text-gray-400"
      >
        {/* <div id="volume">
          <VolumeControl
            volume={currentVolume}
            onVolumeChanged={(volume) => {
              alert("Volume changed");
            }}
          />
        </div>
        <div id="queue">
          <QueueControl />
        </div> */}
      </div>
    </div>
  );
};

export default MiniPlayer;
