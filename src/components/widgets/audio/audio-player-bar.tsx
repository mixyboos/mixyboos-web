"use client";
import { Icons } from "@/components/icons";
import ActionButton from "@/components/widgets/buttons/action-button";
import logger from "@/lib/logger";
import { type MixModel } from "@/lib/models";
import React, { useState } from "react";
import { useToggleMixLike } from "@/lib/services/tan-mix-service";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/contexts/auth/auth-context";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteMix } from "@/lib/services/api/mix-service";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type AudioPlayerBarProps = {
  mix: MixModel;
};

const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ mix }) => {
  const toggleLike = useToggleMixLike(mix);
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteConfirmed = async () => {
    const result = await deleteMix(mix);
    if (result) {
      await queryClient.invalidateQueries({ queryKey: ["user-mixes"] });
      router.push("/dashboard/mixes");
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          {profile?.id === mix.user?.id && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <span className="sr-only">Open menu</span>
                    <Icons.verticalDots />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Icons.pencil className="size-4 me-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                    <Icons.delete className="size-4 me-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Mix</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete &quot;{mix.title}&quot;? This
                      action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteConfirmed}>
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}

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
        <div className="ml-auto flex gap-2">
          <Badge variant="secondary">Pop</Badge>
          <Badge variant="secondary">2024</Badge>
          <Badge variant="secondary">English</Badge>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerBar;
