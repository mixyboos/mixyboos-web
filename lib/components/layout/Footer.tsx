import React from 'react';
import { IAudioState, PlayState, useAudioStore } from '@lib/services/audio';
import { MiniPlayer } from '@lib/components/audio/players';

export function Footer() {
  const playState = useAudioStore((state: IAudioState) => state.playState);
  return (
    <React.Fragment>
      {playState === PlayState.stopped ? (
        <h1>
          built with all the{' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='inline-block w-5 h-5 text-red-500'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
              clipRule='evenodd'
            />
          </svg>
          in the world by
          <a href='https://podnoms.com/' target='_blank' rel='noreferrer'>
            PodNoms
          </a>
        </h1>
      ) : (
        <MiniPlayer />
      )}
    </React.Fragment>
  );
}

export default Footer;
