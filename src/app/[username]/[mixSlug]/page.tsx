"use client";
import LargeAudioPlayer from "@/components/widgets/audio/large-audio-player";
import React from "react";
import { api } from "@/lib/utils/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page({
  params,
}: {
  params: { username: string; mixSlug: string };
}) {
  const mixQuery = api.mix.getByUserAndSlug.useQuery({
    username: params.username,
    mixSlug: params.mixSlug,
  });
  const mix = mixQuery?.data;
  return (
    <div className="container p-5">
      {mix ? (
        <LargeAudioPlayer mix={mix} />
      ) : (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-36 w-36 rounded-full" />
          <div className="w-full space-y-2">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        </div>
      )}
    </div>
  );
}
