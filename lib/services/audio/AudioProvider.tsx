'use client';
import videojs, { VideoJsPlayer } from 'video.js';
import 'videojs-contrib-dash';

import React, { PropsWithChildren } from 'react';
import useAudioStore, { PlayState } from './audioStore';

export interface IAudioProviderProps extends PropsWithChildren {}

const AudioProvider = ({ children }: IAudioProviderProps) => {
  const audioRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<VideoJsPlayer>();

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
  const options = {};
  React.useEffect(() => {
    if (!playerRef.current && audioRef.current) {
      const audioElement = document.createElement('video-js');
      audioElement.classList.add('invisible');
      audioRef.current.appendChild(audioElement);

      playerRef.current = videojs(audioElement, options, () => {
        videojs.log('player is ready');
      });
    }
  }, [audioRef]);

  React.useEffect(() => {
    const player = playerRef.current;
    if (!player || !nowPlaying) return;
    if (!nowPlaying?.audioUrl || !player) return;
    const audio = audioRef.current;
    if (audio) {
      player.on('play', (e) => {
        console.log('AudioProvider', 'player_play', e);
        setDuration(player.duration());
        setPlayState(PlayState.playing);
      });
      player.on('progress', (e) => {
        setPosition(player.currentTime());
      });

      player.autoplay(true);
      player.src(nowPlaying?.audioUrl as string);
    }
  }, [nowPlaying]);

  React.useEffect(() => {
    const player = playerRef.current;
    if (!player || !nowPlaying) return;
    if (playState === PlayState.paused) {
      player.pause();
    } else if (playState === PlayState.playing) {
      player.play();
    }
  }, [playState]);

  React.useEffect(() => {
    const player = playerRef.current;
    if (!player || !nowPlaying) return;
    player.currentTime(seekPosition);
  }, [seekPosition]);

  React.useEffect(() => {
    const player = playerRef.current;
    if (!player || !nowPlaying) return;
    player.volume(currentVolume / 50);
  }, [currentVolume]);

  return (
    <>
      {children}

      <div data-vjs-player="">
        <div ref={audioRef}></div>
      </div>
    </>
  );
};

export default AudioProvider;
