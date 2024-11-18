"use client";
import React from "react";
import LargeAudioPlayer from "@/components/widgets/audio/large-audio-player";
import { useAuth } from "@/lib/contexts/auth/auth-context";
import { getUserMixes } from "@/lib/services/api/mix-service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ListAudioPlayer from "@/components/widgets/audio/list-audio-player";

export default function MixListPage() {
  const { profile } = useAuth();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["user-mixes"],
    queryFn: async () => {
      try {
        if (!profile) return null;
        return await getUserMixes(profile.slug);
      } catch (err) {
        console.error(err);
        return Promise.reject(err);
      }
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h1>These are my mixes</h1>
      <div>
        {data?.map((mix) => (
          <ListAudioPlayer key={mix.id} mix={mix} />
        ))}
      </div>
    </div>
  );
}
