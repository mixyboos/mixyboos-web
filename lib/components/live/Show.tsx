import React from 'react';
import ShowStatus from './status';
import Image from 'next/image';
import { ActionButton, TagLabel } from '../widgets';
import { VideoPlayer } from '@lib/components/audio/players';
import { Chat } from '@lib/components/chat';

interface IShowProps {
  title: string;
  showId: string;
  showStatus: ShowStatus;
  setShowStatus: (showStatus: ShowStatus) => void;
}

const Show = ({ title, showId, showStatus, setShowStatus }: IShowProps) => {
  const playerRef = React.useRef<HTMLVideoElement>(null);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full mr-4 lg:w-9/12">
        {showStatus === ShowStatus.inProgress ? (
          <VideoPlayer
            playerRef={playerRef}
            src={`${process.env.NEXT_PUBLIC_LIVE_HOST}/hls/${showId}/index.m3u8`}
            width="100%"
            muted={true}
            autoPlay={true}
            controls={true}
          />
        ) : (
          <div className="flex flex-col items-center p-4 bg-white border rounded-lg shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <Image
              src="/img/error.png"
              alt="Error image"
              width={120}
              height={50}
            />
            <div
              className="p-4 mt-2 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <span className="font-medium">Info alert!</span>{' '}
              <p>
                We can no longer connect to your stream. If you stopped
                streaming on purpose then happy days.{' '}
              </p>
              <p>
                If you had an error in your streaming software then reconnect it
                and everything should be fine.
              </p>
              <p>
                If you move off this page the show will be finalised and you
                won&apos;t be able to resume streaming on it.
              </p>
            </div>
          </div>
        )}
        <div className="p-4 shadow-sm">
          <div className="flex items-center justify-between mt-2">
            <div className="flex space-x-3">
              <div className="text-xl text-gray-700">{title}</div>
            </div>
            <div className="flex items-center space-x-3">
              <ActionButton count={123}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </ActionButton>
              <ActionButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </ActionButton>
            </div>
          </div>
        </div>

        <div
          id="wrapper"
          className="flex flex-row p-2"
        >
          <div
            id="user-image"
            className="flex-none w-32 h-full"
          >
            <img
              src=" https://placebeard.it/640x480"
              alt=""
              className="rounded-full"
            />
          </div>
          <div
            id="details"
            className="flex-grow mx-6"
          >
            <div className="flex flex-col">
              <div className="text-lg text-gray-900">Fergal Moran</div>
              <div className="text-sm text-gray-700">
                Started broadcasting 20m ago
              </div>
              <div className="flex flex-row pt-3">
                <TagLabel title={'House'} />
                <TagLabel title={'Disco'} />
                <TagLabel title={'Proto MC-Hammer type stuff'} />
              </div>
            </div>
          </div>
          <div
            id="actions"
            className="flex-none w-32 h-32"
          >
            Actions
          </div>
        </div>
      </div>
      <div className="w-full mb-16 ml-4 lg:w-3/12">
        <button
          onClick={() =>
            alert(
              'Just stop streaming in OBS or whatever, nothing else required'
            )
          }
          type="button"
          className="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          End stream
        </button>
        <Chat showId={showId} />
      </div>
    </div>
  );
};
export default Show;
