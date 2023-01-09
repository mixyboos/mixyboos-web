import React from 'react';
import { MdLiveTv } from 'react-icons/md';
import { RiRecordMailLine } from 'react-icons/ri';
import Link from 'next/link';

const PricingPage = () => {
  return (
    <div className="container px-4 pt-8 mx-auto text-center xl:px-32 lg:px-0">
      <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight">
        Welcome to MixyBoos
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 xl:px-80 sm:text-xl">
        A new way to create and share music with those you love
      </p>
      <div className="flex p-1 mx-auto space-x-2 bg-gray-200 rounded-lg sm:mt-8 max-w-fit">
        <button
          type="button"
          className="inline-flex items-center py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 rounded-md shadow whitespace-nowrap shadow-gray-300 focus:outline-none sm:w-auto sm:px-8"
        >
          <RiRecordMailLine className="w-5 h-5 mr-2 text-green-800 bg-white rounded-full" />
          <span>Pre-record</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 rounded-md shadow whitespace-nowrap shadow-gray-300 focus:outline-none sm:w-auto sm:px-8"
        >
          <MdLiveTv className="w-5 h-5 mr-2 text-green-800 bg-white rounded-full" />
          Go Live
        </button>
      </div>
      <div className="mt-4">
        <Link
          href="/auth/login"
          className="text-white  bg-gradient-to-br from-pink-500 to-voilet-500 hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3"
        >
          <svg
            className="w-5 h-5 mr-2 -ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          Login/Register
        </Link>
      </div>
      <div className="grid mt-4 mb-8 border border-gray-200 rounded-lg shadow-md dark:border-gray-700 md:mb-12 md:grid-cols-2">
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
          <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Most fun I&#39;ve had with my clothes on
            </h3>
            <p className="my-4 font-medium">
              If you care for your time, I hands down would go with this
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center space-x-3">
            <img
              className="rounded-full w-9 h-9"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium dark:text-white text-left">
              <div>Fergal Moran</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                World&#39;s most handsome man
              </div>
            </div>
          </figcaption>
        </figure>
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-tr-lg dark:bg-gray-800 dark:border-gray-700">
          <blockquote className="max-w-2xl mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Mmmmm.... human music
            </h3>
            <p className="my-4 font-medium">I like it</p>
          </blockquote>
          <figcaption className="flex items-center justify-center space-x-3">
            <img
              className="rounded-full w-9 h-9"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium dark:text-white text-left">
              <div>Ed Dunlea</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Minister for moaning
              </div>
            </div>
          </figcaption>
        </figure>
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-bl-lg md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700">
          <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Lovely hurling
            </h3>
            <p className="my-4 font-medium ">
              Well, as lovely as hurling can be, which is to say not very.
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center space-x-3">
            <img
              className="rounded-full w-9 h-9"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium dark:text-white text-left">
              <div>Adam Dunlea</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Hurler on the ditch
              </div>
            </div>
          </figcaption>
        </figure>
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-br-lg dark:bg-gray-800 dark:border-gray-700">
          <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              D&#39;ya have the balla?
            </h3>
            <p className="my-4 font-medium">
              You fucking do, g&#39;wan and play it ya cunt!!
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center space-x-3">
            <img
              className="rounded-full w-9 h-9"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium dark:text-white text-left">
              <div>Gangrene McDandruff</div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Local crank
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default PricingPage;
