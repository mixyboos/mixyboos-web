'use client'
import React, { MouseEvent, MouseEventHandler, useRef, useState } from 'react';
import { PlayState, useAudioStore } from '@lib/services/audio';
import toHHMMSS from '@lib/services/utils/formatTime';

const MiniPlayer = () => {
  const duration = useAudioStore((state) => state.duration);
  const position = useAudioStore((state) => state.position);
  const setSeekPosition = useAudioStore((state) => state.setSeekPosition);
  const togglePlayState = useAudioStore((state) => state.togglePlayState);
  const playState = useAudioStore((state) => state.playState);

  const [progressPercentage, setProgressPercentage] = useState(0);

  const seekBarElem = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // unload the player on unmount
    return () => {
      setProgressPercentage((position / duration) * 100);
    };
  }, [position, progressPercentage]);

  const _togglePlayPause = () => {
    togglePlayState();
  };

  const _handleTimeClick = ($event: MouseEvent<HTMLDivElement>) => {
    const { pageX: eventOffsetX } = $event;

    if (seekBarElem.current) {
      const elementOffsetX = seekBarElem.current.offsetLeft;
      const elementWidth = seekBarElem.current.clientWidth;
      const percent = (eventOffsetX - elementOffsetX) / elementWidth;
      setSeekPosition(percent * duration);
    }
  };

  return (
    <div className='flex h-full p-2 justify-items-stretch '>
      <div className='w-8 cursor-pointer stroke-1' onClick={_togglePlayPause}>
        {playState === PlayState.playing ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        )}
      </div>
      <div className='flex items-center w-full pl-2'>
        <div className='mr-4 text-sm text-gray-400 elapsed'>
          {toHHMMSS(position)}
        </div>
        <div
          className='w-full h-full progress'
          ref={seekBarElem}
          onMouseDown={_handleTimeClick}
        >
          <div className='mt-4'>
            <div className='h-1 bg-purple-100 rounded-full'>
              <div
                className='relative h-1 bg-purple-400 rounded-full'
                style={{ width: `${progressPercentage}%` }}
              >
                <span
                  className='invisible w-4 h-4 bg-indigo-600 absolute right-0 bottom-0 -mb-1.5 rounded-full shadow'></span>
              </div>
            </div>
          </div>
        </div>
        <div className='ml-4 text-sm text-gray-400 total'>
          {toHHMMSS(duration)}
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
