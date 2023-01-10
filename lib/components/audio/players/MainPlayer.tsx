'use client';
import React from 'react';
import { MixModel } from '@lib/data/models';
import useAudioStore, { PlayState } from '@lib/services/audio/audioStore';
import { ActionButton, Loading } from '@lib/components/widgets';
import {
  MdOutlinePauseCircleOutline,
  MdOutlinePlayCircleOutline,
} from 'react-icons/md';
import Link from 'next/link';
import MixProcessingStatus from '@lib/components/mix/MixProcessingStatus';

interface IMainPlayerProps {
  mix: MixModel;
}

const MainPlayer = ({ mix }: IMainPlayerProps) => {
  const setNowPlaying = useAudioStore((state) => state.setNowPlaying);
  const nowPlaying = useAudioStore((state) => state.nowPlaying);
  const togglePlayState = useAudioStore((state) => state.togglePlayState);
  const playState = useAudioStore((state) => state.playState);
  const loading = false;

  const _playClick = () => {
    if (nowPlaying?.id !== mix.id && mix.audioUrl) {
      setNowPlaying(mix);
    } else if (nowPlaying?.id === mix.id) {
      togglePlayState();
    }
  };
  return mix ? (
    <div
      id="player-body"
      className="p-1 mx-auto mb-3 overflow-hidden "
    >
      <div className="md:flex">
        <div className="p-1 md:flex-shrink-0">
          <img
            className="object-cover w-full rounded-md h-36 md:w-48"
            src={`${mix.image}`}
            alt={`image for ${mix.title}`}
          />
        </div>
        <div className="flex flex-col justify-between p-4">
          <div>
            {false && (
              <div className="text-xs font-semibold tracking-wide text-indigo-500 uppercase">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div>
                      {mix.user && mix.user?.profileImage && (
                        <img
                          className="w-4 h-4 rounded-full border-g"
                          src={mix.user?.profileImage}
                          alt="Mix"
                        />
                      )}
                    </div>
                    <div className="px-2 text-gray-600">
                      <span className="font-bold">{mix.user?.displayName}</span>
                      <span className="text-gray-400"> listened</span>
                    </div>
                  </div>
                  <div className="text-gray-400">1 hour ago</div>
                </div>
              </div>
            )}
            <div className="mt-0">
              <div className="flex">
                {mix.isProcessed && (
                  <div
                    className="w-16"
                    onClick={() => {
                      _playClick();
                    }}
                  >
                    <div
                      className={`cursor-pointer ${
                        loading ? 'text-amaranth-700' : 'text-amaranth-500'
                      } hover:text-amaranth-400 transition duration-200`}
                    >
                      {nowPlaying?.id === mix.id &&
                      playState === PlayState.playing ? (
                        <MdOutlinePauseCircleOutline className="w-full h-full" />
                      ) : (
                        <MdOutlinePlayCircleOutline className="w-full h-full" />
                      )}
                    </div>
                  </div>
                )}
                <div className="mt-2">
                  <Link
                    href={`/${mix.user?.slug}/${mix.slug}`}
                    className="block text-lg font-medium leading-tight text-gray-900 hover:underline"
                  >
                    <div className="flex flex-row space-x-1">
                      <div className="text-gray-500 dark:text-white ">
                        {mix.title}
                      </div>
                      <div>
                        {!mix.isProcessed && (
                          <MixProcessingStatus
                            mix={mix}
                            title="Processing mix"
                            onProcessingFinished={() => {
                              mix.isProcessed = true;
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </Link>
                  <p className="mx-1 text-sm text-gray-500 dark:text-gray-100 leading-2 line-clamp-1">
                    by {mix.user?.displayName}
                  </p>
                </div>
              </div>
              <p className="mt-2 ml-1 text-sm text-gray-500 dark:text-gray-100 line-clamp-2">
                {mix.description}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                <ActionButton count={6}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </ActionButton>
                <ActionButton count={1}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </ActionButton>
                <ActionButton count={0}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </ActionButton>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex cursor-pointer">
                  <svg
                    className="w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="text-xs -mx-2 -mt-1 text-purple-400 pl-0.5">
                    123
                  </div>
                </div>
                <div className="text-gray-400">
                  <a href="/">#house</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading message="Loading mix" />
  );
};

export default MainPlayer;
