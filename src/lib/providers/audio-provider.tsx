"use client";

import logger from "@/lib/logger";
import React, { type PropsWithChildren } from "react";
import useAudioStore, {
  PlayState,
} from "@/lib/services/stores/audio/audio-store";
import type shaka from "shaka-player/dist/shaka-player.ui";

export interface IAudioProviderProps extends PropsWithChildren {}

type ShakaForwardRef = {
  polyfill: any;
  Player: any;
};
const AudioProvider = ({ children }: IAudioProviderProps) => {
  const shakaRef = React.useRef<ShakaForwardRef>();

  const audioElRef = React.useRef<HTMLVideoElement>(null);
  const timerRef = React.useRef<NodeJS.Timer>();
  const player = React.useRef<shaka.Player>();

  const setNowPlaying = useAudioStore((state) => state.setNowPlaying);
  const nowPlaying = useAudioStore((state) => state.nowPlaying);
  const nowPlayingUrl = useAudioStore((state) => state.nowPlayingUrl);
  const {
    currentVolume,
    setPosition,
    setDuration,
    seekPosition,
    setPlayState,
    playState,
  } = useAudioStore();

  React.useEffect(() => {
    if (audioElRef && navigator) {
      shakaRef.current = require("shaka-player/dist/shaka-player.ui.js");
      if (shakaRef.current && shakaRef.current.polyfill) {
        shakaRef.current.polyfill.installAll();
        player.current = new shakaRef.current.Player(audioElRef.current);
      }
    }
  }, [audioElRef]);

  React.useEffect(() => {
    if (!audioElRef || !shakaRef.current) return;
    const audio = audioElRef.current;
    if (audio) {
      if (!player.current || !nowPlaying || !nowPlayingUrl) return;
      player.current
        .load(nowPlayingUrl)
        .then(() => {
          audio.play();
          setDuration(audio.duration ?? 0);
          setPlayState(PlayState.playing);
        })
        .catch((err: any) => {
          console.error(
            "AudioProvider",
            "Unable to initialise Shaka Player",
            err,
          );
          logger.error(
            "AudioProvider",
            "Unable to initialise Shaka Player",
            err,
          );
          setNowPlaying(null);
        });
      // player.current.addEventListener('')
      // player.on(dashjs.MediaPlayer.events.PLAYBACK_STARTED, (e) => {
      //   setDuration(player.duration() ?? 0)
      //   setPlayState(PlayState.playing)
      // })
      _startProgressTimer();
    }
  }, [nowPlaying]);
  React.useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;
    if (playState === PlayState.paused) {
      audio.pause();
    } else if (playState === PlayState.playing) {
      audio.play();
    }
  }, [playState]);

  React.useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;
    audio.currentTime = seekPosition;
  }, [seekPosition]);

  React.useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;
    audio.volume = currentVolume / 50;
  }, [currentVolume]);

  const _startProgressTimer = () => {
    const audio = audioElRef.current;
    if (!audio) return;
    timerRef.current = setInterval(() => {
      setPosition(audio.currentTime);
    }, 1000);
  };

  return (
    <>
      {children}
      <video ref={audioElRef} />
    </>
  );
};

export default AudioProvider;
