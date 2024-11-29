"use client";
import { Icons } from "@/components/icons";
import ActionButton from "@/components/widgets/buttons/action-button";
import logger from "@/lib/logger";
import { type MixModel } from "@/lib/models";
import { toggleLike } from "@/lib/services/api/mix-service";
import { Link } from "lucide-react";
import React from "react";

type AudioPlayerBarProps = {
  mix: MixModel;
};

const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ mix }) => {
  const [likeCount, setLikeCount] = React.useState(mix.likeCount);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <ActionButton
            count={likeCount}
            onClick={async () => {
              const result = await toggleLike(mix);
              return result === 200 ? mix.likeCount + 1 : mix.likeCount - 1;
            }}
          >
            <Icons.heart />
          </ActionButton>
          <ActionButton
            count={mix.shareCount}
            onClick={async () => {
              logger.debug("audio-player-bar", "share-mix", mix);
            }}
          >
            <Icons.retweet />
          </ActionButton>
          <ActionButton
            count={mix.downloadCount}
            onClick={async () => {
              logger.debug("audio-player-bar", "download-mix", mix);
            }}
          >
            <Icons.download />
          </ActionButton>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex space-x-0">
            <Icons.playCircle />
            <div className="text-xs">{mix.playCount}</div>
          </div>
          <div className="mr-2 space-x-1 text-gray-400">
            <Link href="/">#house</Link>
            <Link href="/">#deephouse</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerBar;
