import { PlayState, useAudioStore } from '@lib/services/audio';
import React from 'react';
import { secondsToReadableString } from '@lib/services/utils/timeUtils';
import {
  MdFavoriteBorder,
  MdPauseCircleFilled,
  MdPlayCircleFilled,
  MdSkipNext,
} from 'react-icons/md';
import QueueControl from './QueueControl';
import VolumeControl from './VolumeControl';
import { MiniActionButton } from '@lib/components/widgets';

const MiniPlayer = () => {
  const duration = useAudioStore((state) => state.duration);
  const position = useAudioStore((state) => state.position);
  const currentVolume = useAudioStore((state) => state.currentVolume);
  const setSeekPosition = useAudioStore((state) => state.setSeekPosition);
  const togglePlayState = useAudioStore((state) => state.togglePlayState);
  const nowPlaying = useAudioStore((state) => state.nowPlaying);
  const playState = useAudioStore((state) => state.playState);

  const [progressPercentage, setProgressPercentage] = React.useState(0);

  const seekBarElem = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (duration !== 0) {
      const percentageDone = (position / duration) * 100;
      setProgressPercentage(percentageDone);
    }
  }, [position, progressPercentage, duration]);

  const _togglePlayPause = () => {
    togglePlayState();
  };

  const _handleTimeClick: React.MouseEventHandler<HTMLDivElement> = (
    $event: React.MouseEvent<HTMLDivElement>
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
    <div className="flex items-center h-16 p-2 bg-gray-800">
      <div
        className="flex-none w-16 p-1 text-gray-300 cursor-pointer stroke-0 align-center"
        onClick={_togglePlayPause}
      >
        {playState === PlayState.playing ? (
          <MdPauseCircleFilled className="w-full h-full delay-100 hover:text-gray-400" />
        ) : (
          <MdPlayCircleFilled className="w-full h-full delay-100 hover:text-gray-400" />
        )}
      </div>
      <div className="flex-none w-16 p-2">
        <img
          src={nowPlaying?.image}
          alt={nowPlaying?.user?.displayName}
        />
      </div>
      <div className="flex-none">
        <div className="flex flex-col px-2 text-sm">
          <div className="flex-grow font-medium text-gray-200">{}</div>
          <div className="font-light text-gray-200">{nowPlaying?.title}</div>
        </div>
      </div>
      <div
        id="left-button-bar"
        className="flex flex-row px-1 space-x-1 text-gray-400"
      >
        <MiniActionButton
          tooltip="Add to favourites"
          onClick={() => console.log('MiniPlayer', 'Favey')}
        >
          <MdFavoriteBorder />
        </MiniActionButton>
        <MiniActionButton onClick={() => alert('Play next')}>
          <MdSkipNext />
        </MiniActionButton>
      </div>
      <div className="flex items-center flex-grow w-full px-1">
        <div className="mr-4 text-sm text-gray-400">
          {secondsToReadableString(position)}
        </div>
        <div className="w-full h-full progress">
          <div
            className="h-3 bg-indigo-100 rounded-full"
            onClick={_handleTimeClick}
            ref={seekBarElem}
          >
            <div
              className="relative h-3 bg-indigo-600 rounded-l-full rounded-r-none"
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
        <div id="volume">
          <VolumeControl
            volume={currentVolume}
            onVolumeChanged={(volume) => alert('Volume changed')}
          />
        </div>
        <div id="queue">
          <QueueControl />
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
