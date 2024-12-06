"use client";
import React from "react";
import { useAuth } from "@/lib/contexts/auth/auth-context";
import ListAudioPlayer from "@/components/widgets/audio/list-audio-player";
import { useGetUserMixesQuery } from "@/lib/services/tan-mix-service";

export default function MixListPage() {
  const { profile } = useAuth();
  const { isPending, isError, data, error } = useGetUserMixesQuery(
    profile ?? undefined
  );

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h1>These are my mixes</h1>
      {data?.map((mix) => (
        <div className="py-1" key={mix.id}>
          <ListAudioPlayer key={mix.id} mix={mix} />
        </div>
      ))}
    </div>
  );
}
