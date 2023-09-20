"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {type MixModel} from "@/lib/models";
import useAudioStore from "@/lib/services/stores/audio/audio-store";
import ActionButton from "../buttons/action-button";
import Loading from "@/components/widgets/loading";
import {Icons} from "@/components/icons";
import MixProcessingStatus from "./mix-processing-status";
import PlayPauseButton from "../buttons/play-pause-button";

interface IListPlayerProps {
  mix: MixModel;
}

const ListPlayer = ({mix}: IListPlayerProps) => {
  const [likeCount, setLikeCount] = React.useState(mix.likeCount);
  const [playCount, setPlayCount] = React.useState(mix.playCount);
  const [shareCount, setShareCount] = React.useState(mix.shareCount);
  const [downloadCount, setDownloadCount] = React.useState(mix.downloadCount);

  const setNowPlaying = useAudioStore((state) => state.setNowPlaying);
  const nowPlaying = useAudioStore((state) => state.nowPlaying);
  const togglePlayState = useAudioStore((state) => state.togglePlayState);

  return mix ? (
    <div id="player-body" className="mx-auto mb-3 overflow-hidden p-1 ">
      <div className="md:flex">
        <div className="p-1 md:flex-shrink-0">
          <Image
            className="h-36 w-full rounded-md object-cover md:w-48"
            src={`${mix.image ?? ""}`}
            alt={`image for ${mix.title}`}
            width={192}
            height={144}
          />
        </div>
        <div className="flex w-full flex-col justify-between p-4">
          <div>
            {false && (
              <div className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div>
                      {mix.user?.profileImage && (
                        <Image
                          className="border-g h-4 w-4 rounded-full"
                          src={
                            mix.user?.profileImage ||
                            "/img/streaming-placeholder.jpg"
                          }
                          width={16}
                          height={16}
                          alt="Mix"
                        />
                      )}
                    </div>
                    <div className="px-2 text-gray-600">
                      <span className="font-bold">
                        {mix?.user?.displayName || mix?.user?.username}
                      </span>
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
                  <PlayPauseButton
                    mix={mix}
                    onPlayStart={() =>
                      setPlayCount(playCount ? playCount + 1 : 1)
                    }
                    className="w-16 h-16"
                  />
                )}
                <div className="mt-2">
                  <Link
                    href={`/${mix?.user?.slug}/${mix.slug}`}
                    className="block text-lg font-medium leading-tight text-gray-900 hover:underline"
                  >
                    <div className="flex flex-row space-x-1">
                      <div className="line-clamp-1 text-gray-500 dark:text-white">
                        {mix.title}
                      </div>
                      <div>
                        {!mix.isProcessed && (
                          <MixProcessingStatus
                            mix={mix}
                            title="Processing mix"
                            onProcessingFinished={() => {
                              console.log(
                                "large-audio-player",
                                "onProcessingFinished",
                              );
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </Link>
                  <p className="leading-2 mx-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-100">
                    by {mix.user?.displayName}
                  </p>
                </div>
              </div>
              <p className="ml-1 mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-100">
                {mix.description}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                <ActionButton
                  count={likeCount}
                  onClick={() => {
                    // const mixService = new MixService();
                    // mixService
                    //   .addLike(mix)
                    //   .then((r) => r && setLikeCount(likeCount ?? 0 + 1));
                  }}
                >
                  <Icons.heart/>
                </ActionButton>
                <ActionButton count={shareCount}>
                  <Icons.retweet/>
                </ActionButton>
                <ActionButton count={downloadCount}>
                  <Icons.download/>
                </ActionButton>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex space-x-0">
                  <Icons.playCircle/>
                  <div className="text-xs">{playCount}</div>
                </div>
                <div className="mr-2 space-x-1 text-gray-400">
                  <a href="/">#house</a>
                  <a href="/">#deephouse</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading message="Loading mix"/>
  );
};

export default ListPlayer;
