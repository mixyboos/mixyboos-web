"use client";
import { Icons } from "@/components/icons";
import ActionButton from "@/components/widgets/buttons/action-button";
import logger from "@/lib/logger";
import { type MixModel } from "@/lib/models";
import { Link } from "lucide-react";
import React from "react";
import { useToggleMixLike } from "@/lib/services/tan-mix-service";
import { useQueryClient } from "@tanstack/react-query";

type AudioPlayerBarProps = {
  mix: MixModel;
};

const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ mix }) => {
  const toggleLike = useToggleMixLike(mix);
  const queryClient = useQueryClient();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <ActionButton
            count={mix.likeCount}
            title="Like"
            onClick={async () => {
              const result = await toggleLike.mutateAsync();
              await queryClient.invalidateQueries({ queryKey: ["user-mixes"] });
            }}
            icon={Icons.heart}
            isActioned={mix.isLiked}
          ></ActionButton>
          <ActionButton
            count={mix.shareCount}
            title="Share"
            onClick={async () => {
              return Promise.resolve({
                newCount: mix.shareCount,
                newIsActioned: false,
              });
            }}
            isActioned={false}
            icon={Icons.retweet}
          ></ActionButton>
          <ActionButton
            count={mix.downloadCount}
            title="Download"
            onClick={async () => {
              logger.debug("audio-player-bar", "download-mix", mix);
              return Promise.resolve({
                newCount: mix.downloadCount,
                newIsActioned: false,
              });
            }}
            isActioned={false}
            icon={Icons.download}
          ></ActionButton>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex space-x-0">
            <ActionButton
              count={mix.likeCount}
              title="Like"
              onClick={async () => {
                const result = await toggleLike.mutateAsync();
                await queryClient.invalidateQueries({ queryKey: ["user-mixes"] });
              }}
              icon={Icons.heart}
              isActioned={mix.isLiked}
            ></ActionButton>{" "}
          </div>
          {/* TODO: Tags
          <div className="mr-2 space-x-1 text-gray-400">
            <Link href="/">#house</Link>
            <Link href="/">#deephouse</Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerBar;
