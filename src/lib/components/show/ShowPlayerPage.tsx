import React from "react";
import {
  RiEyeLine,
  RiShareForwardBoxFill,
  RiUserFollowLine,
} from "react-icons/ri";
import { humanizeDate } from "@/lib/utils/timeUtils";
import UserImage from "../widgets/UserImage";
import type { LiveShowModel } from "@/lib/models";
import VideoPlayer from "../players/VideoPlayer";

type ShowPlayerPageProps = {
  title: string;
  show: LiveShowModel;
};

const ShowPlayerPage = ({ title, show }: ShowPlayerPageProps) => {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex-auto">
        <VideoPlayer
          src={`${process.env.NEXT_PUBLIC_LIVE_HOST as string}/hls/${
            show.id
          }/index.m3u8`}
          controls={false}
          autoPlay={true}
        />
      </div>
      <div className="flex-none">
        <div className="w-full rounded-b-md border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-slate-700">
          <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
            <span className="text-md center rounded-lg px-4 py-2.5 text-xl font-bold  text-gray-900 dark:text-white">
              {title}
            </span>
            <div className="flex space-x-1 pl-0 sm:pl-2">
              <button
                title="Viewers"
                type="button"
                className="mr-2 inline-flex cursor-pointer items-center justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <RiEyeLine className="mr-0 h-5 w-5 " fill="currentColor" />
                12
                <span className="sr-only">Current Viewers</span>
              </button>
              <button
                title="Share"
                type="button"
                className="mr-2 inline-flex cursor-pointer items-center justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <RiShareForwardBoxFill
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="currentColor"
                />
                Share
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between bg-white px-4 py-4 dark:bg-slate-800">
            <div className="flex min-w-0 items-center">
              <UserImage
                src={show.user.image || ""}
                status={"offline"}
                size={"md"}
              />

              <div className="ml-3">
                <p className="truncate font-medium text-gray-900 dark:text-white">
                  {show.user.name}
                </p>
                <div className="flex flex-1 items-center justify-end text-sm text-red-600 dark:text-red-500">
                  <span className="text-gray-500">
                    Broadcasting for {humanizeDate(show.startDate, true)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <button
                type="button"
                className="mb-2  mr-2 inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4  focus:ring-gray-200 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                <RiUserFollowLine
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="currentColor"
                />
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPlayerPage;
