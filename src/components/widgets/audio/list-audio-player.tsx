import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MixModel } from "@/lib/models";
import useAudioStore from "@/lib/contexts/audio-context";
import PlayPauseButton from "@/components/widgets/buttons/play-pause-button";
import logger from "@/lib/logger";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ActionButton from "@/components/widgets/buttons/action-button";
import { toggleLike } from "@/lib/services/api/mix-service";

type ListAudioPlayerProps = {
  mix: MixModel;
};

const ListAudioPlayer: React.FC<ListAudioPlayerProps> = ({ mix }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex gap-4">
        <div className="shrink-0">
          <img
            src={mix.image}
            alt="Album art"
            className="w-36 h-full rounded-lg object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col">
          {/* Track Info and Primary Play Button */}
          <div className="flex items-center gap-4 mb-4">
            <PlayPauseButton
              mix={mix}
              onPlayStart={() => logger.debug("list-audio-player", "onPlayStart")}
            />
            <div>
              <h3 className="text-lg font-semibold">
                <Link href={`/${mix.user?.slug}/${mix.slug}`}>{mix.title}</Link>
              </h3>
              <p className="text-muted-foreground text-sm">{mix.user?.displayName}</p>
            </div>
          </div>

          <Separator className="my-2" />

          {/* Favorite Button and Tags */}
          <div className="flex items-center gap-2">
            <ActionButton
              count={mix.likeCount}
              title="Like"
              onClick={async () => {
                const result = await toggleLike(mix);
                return result;
              }}
              icon={Icons.heart}
              isActioned={mix.isLiked}
            ></ActionButton>
            <div className="ml-auto flex gap-2">
              <Badge variant="secondary">Pop</Badge>
              <Badge variant="secondary">2024</Badge>
              <Badge variant="secondary">English</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListAudioPlayer;
