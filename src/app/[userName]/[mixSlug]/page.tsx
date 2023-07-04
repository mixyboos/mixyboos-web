"use client";
import LargeAudioPlayer from "@/components/widgets/audio/large-audio-player";
import React from "react";
import { api } from "@/lib/utils/api";

export default function Page({
  params,
}: {
  params: { userName: string; mixSlug: string };
}) {
  const mixQuery = api.mix.getByUserAndSlug.useQuery({
    userName: params.userName,
    mixSlug: params.mixSlug,
  });
  const mix = mixQuery?.data;
  return (
    <div>
      {mix ? (
        <LargeAudioPlayer mix={mix} />
      ) : (
        <div>Unable to find this mix</div>
      )}
    </div>
  );
}
