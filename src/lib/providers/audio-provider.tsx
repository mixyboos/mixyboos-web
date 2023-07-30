"use client";

import logger from "@/lib/logger";
import React, { type PropsWithChildren } from "react";
import useAudioStore, {
  PlayState,
} from "@/lib/services/stores/audio/audio-store";
import Hls from "hls.js";
interface IAudioProviderProps extends PropsWithChildren {}

const AudioProvider = ({ children }: IAudioProviderProps) => {
  const timerRef = React.useRef<NodeJS.Timer>();
  const player = React.createRef<HTMLAudioElement>();

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
    if (!nowPlaying?.audioUrl) return;
    let hls: Hls;
    const _startProgressTimer = () => {
      // const audio = audioElRef.current;
      // if (!audio) return;
      // timerRef.current = setInterval(() => {
      //   setPosition(audio.currentTime);
      // }, 1000);
    };
    const __initPlayer = () => {
      if (hls) {
        hls.destroy();
      }

      hls = new Hls({
        enableWorker: false,
      });

      if (!player.current) return;

      hls.attachMedia(player.current);

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(nowPlaying?.audioUrl as string);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (!player?.current) return;
          player.current.volume = 0.1;

          const p = player.current;

          player.current.ontimeupdate = ($event) => {
            console.log("audio-provider", "ontimeupdate", $event);
            console.log("audio-provider", "ontimeupdate", p.currentTime);
            setPosition(p.currentTime || 0);
          };
          player.current
            .play()
            .then(() => {
              if (!player.current) return;
              setDuration(player.current.duration || 0);
              setPlayState(PlayState.playing);
            })
            .catch(() =>
              console.log(
                "Unable to autoplay prior to user interaction with the dom.",
              ),
            );
        });
      });
      hls.on(Hls.Events.ERROR, function (event, data) {
        logger.error(
          "AudioProvider",
          "Unable to initialise audio player",
          data,
        );
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              __initPlayer();
              break;
          }
        }
      });

      _startProgressTimer();
    };
    if (Hls.isSupported()) {
      __initPlayer();
    }

    return () => {
      if (hls != null) {
        hls.destroy();
      }
    };
  }, [nowPlaying]);

  React.useEffect(() => {
    if (!player?.current) return;
    if (playState === PlayState.paused) {
      player.current.pause();
    } else if (playState === PlayState.playing) {
      player.current
        .play()
        .catch((err) => logger.error("audio-provider", "error resuming", err));
    }
  }, [playState, player]);

  React.useEffect(() => {
    if (!player.current) return;
    player.current.currentTime = seekPosition;
  }, [seekPosition]);

  // React.useEffect(() => {
  //   const audio = audioElRef.current;
  //   if (!audio) return;
  //   audio.volume = currentVolume / 50;
  // }, [currentVolume]);

  return (
    <>
      {children}
      <audio ref={player} />
    </>
  );
};

export default AudioProvider;
