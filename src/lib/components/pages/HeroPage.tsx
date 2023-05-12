import React from "react";
import { MdLiveTv } from "react-icons/md";
import { RiRecordMailLine } from "react-icons/ri";
import LoginButton from "@/lib/components/widgets/LoginButton";
import Link from "next/link";

const testimonials = [
  {
    headline: "Most fun I've had with my clothes on",
    text: "Well.. since they discontinued Mr. Matey",
    from: "Fergal Moran",
    fromTitle: "World's most handsome man",
    fromAvatar:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
  },
  {
    headline: "Mmmmm.... human music",
    text: "I like it",
    from: "Ed Dunlea",
    fromTitle: "Minister for moaning",
    fromAvatar:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png",
  },
  {
    headline: "Lovely hurling",
    text: "Well, as lovely as hurling can be, which is to say not very.",
    from: "Adam Dunbar",
    fromTitle: "Hurler on the ditch",
    fromAvatar:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
  },
  {
    headline: "D'ya have the balla?",
    text: "You fucking do, g'wan and play it ya cunt!!",
    from: "Gangrene McDandruff",
    fromTitle: "Local crank",
    fromAvatar:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png",
  },
];
const HeroPage = () => {
  return (
    <div className="container mx-auto -mt-16 px-4 text-center lg:px-0 xl:px-32">
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl sm:leading-none md:tracking-wide">
        Welcome to MixyBoos
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 sm:text-xl xl:px-80">
        A new way to create and share music with those you love
      </p>
      <div className="mx-auto flex max-w-fit space-x-2 rounded-lg p-1 sm:mt-8">
        <button
          type="button"
          className="inline-flex items-center whitespace-nowrap rounded-md border-gray-200 bg-white py-2 text-sm font-medium text-gray-900 shadow shadow-gray-300 focus:outline-none sm:w-auto sm:px-8"
        >
          <RiRecordMailLine className="mr-2 h-5 w-5 rounded-full bg-white text-green-800" />
          <span>Pre-record</span>
        </button>
        <Link
          href="/live"
          className="inline-flex items-center whitespace-nowrap rounded-md border-gray-200 bg-white py-2 text-sm font-medium text-gray-900 shadow shadow-gray-300 focus:outline-none sm:w-auto sm:px-8"
        >
          <MdLiveTv className="mr-2 h-5 w-5 rounded-full bg-white text-green-800" />
          Go Live
        </Link>
      </div>
      <div className="mt-6 grid rounded-lg border border-gray-200 shadow-md dark:border-gray-700 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure
            key={t.from}
            className="flex flex-col rounded-t-lg border-b border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-slate-800 md:rounded-t-none md:rounded-tl-lg md:border-r"
          >
            <blockquote className="mx-auto mb-1 max-w-2xl text-gray-500 dark:text-gray-400 lg:mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t.headline}
              </h3>
              <p className="text-sm font-medium">{t.text}</p>
            </blockquote>
            <figcaption className="mt-2 flex items-center justify-end space-x-3">
              <img
                className="h-9 w-9 rounded-full"
                src={t.fromAvatar}
                alt="profile picture"
              />
              <div className="space-y-0.5 text-left font-medium dark:text-white">
                <div>{t.from}</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t.fromTitle}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-8">
        <LoginButton />
      </div>
    </div>
  );
};

export default HeroPage;
