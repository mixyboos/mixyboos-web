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
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

type ShowPlayerPageProps = {
  title: string;
  show: LiveShowModel;
};

const ShowPlayerPage = ({ title, show }: ShowPlayerPageProps) => {
  return (
    <div className="flex flex-col">
      <div>
        <VideoPlayer
          src={`${process.env.NEXT_PUBLIC_LIVE_HOST as string}/hls/${
            show.id
          }/index.m3u8`}
          controls={false}
          autoPlay={true}
        />
      </div>
      <div>
        <div className="w-full flex-none">
          <div className="w-full shadow-sm">
            <div className="flex items-center justify-between border-t px-3 py-2 ">
              <span className="text-md center rounded-lg px-4 py-2.5 text-xl font-bold  ">
                {title}
              </span>
              <div className="flex space-x-1 pl-0 sm:pl-2">
                <Button
                  title="Viewers"
                  type="button"
                  variant={"ghost"}
                  className="text-muted-foreground"
                >
                  <RiEyeLine className="mr-0 h-5 w-5 " fill="currentColor" />
                  12
                  <span className="sr-only">Current Viewers</span>
                </Button>
                <Button
                  title="Share"
                  type="button"
                  variant={"ghost"}
                  className="text-muted-foreground"
                >
                  <Icons.share
                    className="-ml-1 mr-2 h-5 w-5"
                    fill="currentColor"
                  />
                  3
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between bg-secondary px-4 py-4">
              <div className="flex min-w-0 items-center">
                <UserImage
                  src={show.user?.profileImage || ""}
                  status={"offline"}
                  size={"lg"}
                />

                <div className="ml-3">
                  <p className="truncate font-medium ">
                    {show.user?.displayName}
                  </p>
                  <div className="flex flex-1 items-center justify-end text-sm ">
                    <span className="text-muted-foreground">
                      Broadcasting for {humanizeDate(show.startDate, true)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <Button type="button" variant={"outline"}>
                  <Icons.follow
                    className="-ml-1 mr-2 h-5 w-5"
                    fill="currentColor"
                  />
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPlayerPage;
