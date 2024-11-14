"use client";
import React from "react";
import LargeAudioPlayer from "@/components/widgets/audio/large-audio-player";
import { useAuth } from "@/lib/contexts/auth/auth-context";
import { getUserMixes } from "@/lib/services/api/mix-service";

const MixListPage: React.FC = async () => {
  const { profile } = useAuth();
  if (!profile) return null;
  const mixes = await getUserMixes(profile.slug);

  return (
    <div>
      {" "}
      <h1>These are my mixes</h1>
      <div>
        {mixes.map((mix) => (
          <LargeAudioPlayer key={mix.id} mix={mix} />
        ))}
      </div>
    </div>
  );
};

export default MixListPage;
