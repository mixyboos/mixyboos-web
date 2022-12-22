import React from 'react';
import { MixModel } from '../../data/models';
import useAudioStore, { PlayState } from '../../services/audio/audioStore';
import { ActionButton } from '@lib/components/widgets';

interface IMixListItemProps {
  mix: MixModel;
}

const MixListItem: React.FC<IMixListItemProps> = ({ mix }) => {
  const setNowPlaying = useAudioStore((state) => state.setNowPlaying);
  const nowPlayingId = useAudioStore((state) => state.id);
  const togglePlayState = useAudioStore((state) => state.togglePlayState);
  const playState = useAudioStore((state) => state.playState);
  const loading = false;

  const _playClick = () => {
    if (nowPlayingId !== mix.id && mix.audioUrl) {
      setNowPlaying(mix.id, mix.audioUrl);
    } else if (nowPlayingId === mix.id) {
      togglePlayState();
    }
  };
  return (
    <div className='w-full mx-auto mb-3 overflow-hidden bg-white rounded-sm shadow-md'>
      <div className='md:flex'>
        <div className='p-1 md:flex-shrink-0'>
          <img
            className='object-cover w-full h-48 rounded-md md:w-48'
            src={`${mix.image}`}
            alt={`image for ${mix.title}`}
          />
        </div>
        <div className='flex flex-col justify-between p-4'>
          <div>
            <div className='text-xs font-semibold tracking-wide text-indigo-500 uppercase'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <div>
                    {mix.user && mix.user.image && (
                      <img
                        className='w-6 h-6 rounded-full border-g'
                        src={mix.user.image}
                        alt='Mix'
                      />
                    )}
                  </div>
                  <div className='px-2 text-gray-600'>
                    <span className='font-bold'>Fergal Moran</span>
                    <span className='text-gray-400'> listened</span>
                  </div>
                </div>
                <div className='text-gray-400'>1 hour ago</div>
              </div>
            </div>
            <div className='mt-2'>
              <div className='flex'>
                <div
                  className='w-16'
                  onClick={() => {
                    _playClick();
                  }}
                >
                  {' '}
                  <svg
                    className={`cursor-pointer ${
                      loading ? 'text-red-100' : 'text-purple-400'
                    } hover:text-purple-700 transition duration-200`}
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    {nowPlayingId === mix.id &&
                    playState === PlayState.playing ? (
                      <>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='1'
                          d='M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </>
                    ) : (
                      <>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='1'
                          d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='1'
                          d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </>
                    )}
                  </svg>
                </div>
                <div className='mt-2'>
                  <a
                    href='#'
                    className='block text-lg font-medium leading-tight text-gray-900 hover:underline'
                  >
                    {mix.title}
                  </a>
                  <p className='mx-1 text-sm text-gray-500 leading-2 line-clamp-1'>
                    by {mix.user.name}
                  </p>
                </div>
              </div>
              <p className='mt-2 ml-1 text-sm text-gray-400 line-clamp-2'>
                {mix.description}
              </p>
            </div>
          </div>
          <div className='mt-2'>
            <div className='flex items-center justify-between'>
              <div className='flex space-x-3'>
                <ActionButton count={6}>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </ActionButton>
                <ActionButton count={1}>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1'
                    d='M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z'
                  />
                </ActionButton>
                <ActionButton count={0}>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1'
                    d='M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4'
                  />
                </ActionButton>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='flex cursor-pointer'>
                  <svg
                    className='w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1'
                      d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1'
                      d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <div className='text-xs -mx-2 -mt-1 text-purple-400 pl-0.5'>
                    123
                  </div>
                </div>
                <div className='text-gray-400'>
                  <a href='/'>#house</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MixListItem;
