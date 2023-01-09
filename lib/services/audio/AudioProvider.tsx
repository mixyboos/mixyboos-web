'use client';
import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react';
import useAudioStore, { PlayState } from './audioStore';

export interface IAudioProviderProps {
  children: React.ReactNode;
}

const AudioProvider: React.FC<IAudioProviderProps> = ({ children }) => {
  const player = useRef<Hls>();
  const audio = useRef<HTMLAudioElement>();
  const progressTimer = useRef<NodeJS.Timer>();

  const url = useAudioStore((state) => state.url);
  const setPosition = useAudioStore((state) => state.setPosition);
  const setDuration = useAudioStore((state) => state.setDuration);
  const seekPosition = useAudioStore((state) => state.seekPosition);
  const setPlayState = useAudioStore((state) => state.setPlayState);
  const playState = useAudioStore((state) => state.playState);

  useEffect(() => {
    if (playState === PlayState.stopped) return;

    if (!audio.current?.paused && playState === PlayState.paused) {
      audio.current?.pause();
    } else {
      audio.current?.play();
    }
  }, [playState]);

  useEffect(() => {
    audio.current?.pause();

    if (progressTimer.current) {
      clearInterval(progressTimer.current);
    }
    if (url) {
      player.current = _createPlayer(url);
      player.current.loadSource(url);
      player.current.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        console.log(
          'manifest loaded, found ' + data.levels.length + ' quality level'
        );
        setTimeout(() => {
          setDuration(audio.current?.duration || 0);
        }, 500);
      });

      audio.current?.play();
      setPlayState(PlayState.playing);
      progressTimer.current = setInterval(() => {
        setPosition((audio.current?.currentTime || 0) as number);
      }, 100);
    }
  }, [url, setDuration, setPlayState, setPosition]);

  useEffect(() => {
    if (audio.current) {
      audio.current.currentTime = seekPosition;
    }
  }, [seekPosition]);

  const _createPlayer = (src: string): Hls => {
    const player = new Hls();
    audio.current = document.getElementById(
      'mb-audio-comp'
    ) as HTMLAudioElement;
    if (audio) {
      player.attachMedia(audio.current);
      player.on(Hls.Events.MEDIA_ATTACHED, function () {
        console.log('Showtime!!!!');
      });
      return player;
    }
    throw new Error('Unable to attach audio element');
  };

  return <React.Fragment>{children}</React.Fragment>;
};

export default AudioProvider;
