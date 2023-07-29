import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import useAudioStore, {
  PlayState,
} from "@/lib/services/stores/audio/audio-store";
import { secondsToReadableString } from "@/lib/utils/timeUtils";
import React from "react";

const MiniPlayer = () => {
  const {
    duration,
    position,
    currentVolume,
    nowPlaying,
    playState,
    setSeekPosition,
    togglePlayState,
  } = useAudioStore();
  const [progressPercentage, setProgressPercentage] = React.useState(0);

  const seekBarElem = React.useRef<HTMLDivElement>(null);
  const _handleTimeClick: React.MouseEventHandler<HTMLDivElement> = (
    $event: React.MouseEvent<HTMLDivElement>,
  ) => {
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
          <Icons.pause className="h-full w-full delay-100 hover:text-gray-400" />
        ) : (
          <Icons.play className="h-full w-full delay-100 hover:text-gray-400" />
        )}
      </div>
      <div className="w-16 flex-none p-2">
        <img src={nowPlaying?.image} alt={nowPlaying?.user?.displayName} />
      </div>
      <div className="flex-none">
        <div className="flex flex-col px-2 text-sm">
          <div className="flex-grow font-medium text-gray-200">{}</div>
          <div className="font-light text-gray-200">{nowPlaying?.title}</div>
        </div>
      </div>
      <div
        id="left-button-bar"
        className="flex flex-row space-x-1 px-1 text-gray-400"
      >
        Todo Favourites
        <Button variant={"outline"} size={"icon"}>
          <Icons.heart className="h-4 w-4" />
        </Button>
        {/* <MiniActionButton
          tooltip="Add to favourites"
          onClick={() => console.log("MiniPlayer", "Favey")}
        >
          <MdFavoriteBorder />
        </MiniActionButton>
        <MiniActionButton onClick={() => alert("Play next")}>
          <MdSkipNext />
        </MiniActionButton> */}
      </div>
      <div className="flex w-full flex-grow items-center px-1">
        <div className="mr-4 text-sm text-gray-400">
          {secondsToReadableString(position)}
        </div>
        <div className="progress h-full w-full">
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
        </div>
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
