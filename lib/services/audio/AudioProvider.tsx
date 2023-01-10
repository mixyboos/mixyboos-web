'use client';
import dashjs from 'dashjs';

import React, { PropsWithChildren } from 'react';
import useAudioStore, { PlayState } from './audioStore';

export interface IAudioProviderProps extends PropsWithChildren {}

const AudioProvider = ({ children }: IAudioProviderProps) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [player, setPlayer] = React.useState<dashjs.MediaPlayerClass>();

  const timerRef = React.useRef<NodeJS.Timer>();
  const nowPlaying = useAudioStore((state) => state.nowPlaying);

  const {
    currentVolume,
    setPosition,
    setDuration,
    seekPosition,
    setPlayState,
    playState,
  } = useAudioStore();

  React.useEffect(() => {
    if (audioRef && !player) {
      setPlayer(dashjs.MediaPlayer().create());
    }
  }, [player, audioRef]);

  React.useEffect(() => {
    if (!nowPlaying?.audioUrl || !player) return;
    const audio = audioRef.current;
    if (audio) {
      player.initialize(audio, nowPlaying?.audioUrl, true);

      player.on(dashjs.MediaPlayer.events.PLAYBACK_STARTED, (e) => {
        setDuration(player.duration() ?? 0);
        setPlayState(PlayState.playing);
      });
      _startProgressTimer(player);
    }
  }, [nowPlaying]);
  React.useEffect(() => {
    if (playState === PlayState.paused) {
      player?.pause();
    } else if (playState === PlayState.playing) {
      player?.play();
    }
  }, [playState]);

  React.useEffect(() => {
    player?.seek(seekPosition);
  }, [seekPosition]);

  React.useEffect(() => {
    player?.setVolume(currentVolume / 50);
  }, [currentVolume]);

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
