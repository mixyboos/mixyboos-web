"use client";
import React from "react";

import useAudioStore, { PlayState } from "@/lib/contexts/audio-context";
import MiniPlayer from "@/components/widgets/audio/mini-player";

const FooterComponent = () => {
  const { playState } = useAudioStore();
  return playState !== PlayState.stopped && <MiniPlayer />;
};

export default FooterComponent;
