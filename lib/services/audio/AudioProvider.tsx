'use client';
import dashjs from 'dashjs';

import React, { PropsWithChildren } from 'react';
import useAudioStore, { PlayState } from './audioStore';

export interface IAudioProviderProps extends PropsWithChildren {}

const AudioProvider = ({ children }: IAudioProviderProps) => {
  // // const audio = React.useRef<HTMLAudioElement | undefined>(
  // //   typeof Audio !== 'undefined' ? new Audio('') : undefined
  // // );

  // React.useEffect(() => {
  //   if (playState === PlayState.stopped) return;
  //   const audio = audioRef.current;
  //   if (!audio) return;
  //   if (!audio.paused && playState === PlayState.paused) {
  //     audio.pause();
  //   } else {
  //     audio.play();
  //   }
  // }, [playState]);

  // React.useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) return;
  //   if (!nowPlaying || !nowPlaying?.audioUrl) return;

  //   audio.addEventListener('timeupdate', () => {
  //     setPosition(audio?.currentTime || 0);
  //   });

  //   audio.src = nowPlaying?.audioUrl;
  //   audio.currentTime = 0;
  //   audio.pause();
  //   setPosition(0);
  //   setPosition(0);

  //   audio.setAttribute('src', nowPlaying.audioUrl);
  //   audio.currentTime = 0;

  //   audio.play().then(() => {
  //     setDuration(audio?.duration || 0);
  //     setPlayState(PlayState.playing);
  //   });
  //   return () => {
  //     audio.removeEventListener('timeupdate', () => {});
  //     audio.removeEventListener('ended', () => {});
  //   };
  // }, [nowPlaying, setDuration, setPlayState, setPosition]);

  // React.useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) return;
  //   audio.currentTime = seekPosition;
  // }, [seekPosition]);

  // React.useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) return;
  //   if (audio) {
  //     audio.volume = currentVolume / 50;
  //   }
  // }, [currentVolume]);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const timerRef = React.useRef<NodeJS.Timer>();
  const nowPlaying = useAudioStore((state) => state.nowPlaying);

  const currentVolume = useAudioStore((state) => state.currentVolume);
  const setPosition = useAudioStore((state) => state.setPosition);
  const setDuration = useAudioStore((state) => state.setDuration);
  const seekPosition = useAudioStore((state) => state.seekPosition);
  const setPlayState = useAudioStore((state) => state.setPlayState);
  const playState = useAudioStore((state) => state.playState);

  React.useEffect(() => {
    if (!nowPlaying?.audioUrl) return;
    const audio = audioRef.current;
    if (audio) {
      const player = dashjs.MediaPlayer().create();
      player.initialize(audio, nowPlaying?.audioUrl, true);

      player.on(dashjs.MediaPlayer.events.PLAYBACK_STARTED, (e) => {
        setDuration(player.duration() ?? 0);
        setPlayState(PlayState.playing);
      });
      _startProgressTimer(player);
    }
  }, [nowPlaying]);
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playState === PlayState.paused) {
      audio.pause();
    } else if (playState === PlayState.playing) {
      audio.play();
    }
  }, [playState]);

  const _startProgressTimer = (player: dashjs.MediaPlayerClass) => {
    timerRef.current = setInterval(() => {
      setPosition(player.time());
    }, 1000);
  };

  return (
    <>
      {children}

      <audio
        id="tts-audio"
        ref={audioRef}
      ></audio>
    </>
  );
};

export default AudioProvider;
