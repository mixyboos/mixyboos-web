"use client";
import { Icons } from "@/components/icons";
import { type MixModel } from "@/lib/models";
import React from "react";
import ActionButton from "../buttons/action-button";

type AudioPlayerBarProps = {
  mix: MixModel;
};

const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ mix }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <ActionButton
            count={mix.likeCount}
            onClick={() => {
              // const mixService = new MixService();
              // mixService
              //   .addLike(mix)
              //   .then((r) => r && setLikeCount(likeCount ?? 0 + 1));
            }}
          >
            <Icons.heart />
          </ActionButton>
          <ActionButton count={mix.shareCount}>
            <Icons.retweet />
          </ActionButton>
          <ActionButton count={mix.downloadCount}>
            <Icons.download />
          </ActionButton>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex space-x-0">
            <Icons.playCircle />
            <div className="text-xs">{mix.playCount}</div>
          </div>
          <div className="mr-2 space-x-1 text-gray-400">
            <a href="/">#house</a>
            <a href="/">#deephouse</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerBar;
