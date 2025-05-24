import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MixModel } from "@/lib/models";
import PlayPauseButton from "@/components/widgets/buttons/play-pause-button";
import logger from "@/lib/logger";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ActionButton from "@/components/widgets/buttons/action-button";
import { useToggleMixLike } from "@/lib/services/tan-mix-service";
import { useQueryClient } from "@tanstack/react-query";
import AudioPlayerBar from "@/components/widgets/audio/audio-player-bar";

type ListAudioPlayerProps = {
  mix: MixModel;
};

const ListAudioPlayer: React.FC<ListAudioPlayerProps> = ({ mix }) => {
  const toggleLike = useToggleMixLike(mix);
  const queryClient = useQueryClient();
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
          <AudioPlayerBar mix={mix} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ListAudioPlayer;
