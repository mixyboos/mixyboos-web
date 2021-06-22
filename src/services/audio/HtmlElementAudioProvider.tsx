import React from "react";
import useAudioStore, { PlayState } from "./audioStore";

export interface IAudioProviderProps {
  children: React.ReactNode;
}

const AudioProvider: React.FC<IAudioProviderProps> = ({ children }) => {
  const player = React.useRef<HTMLAudioElement>();

  const url = useAudioStore((state) => state.url);
  const setPosition = useAudioStore((state) => state.setPosition);
  const setDuration = useAudioStore((state) => state.setDuration);
  const seekPosition = useAudioStore((state) => state.seekPosition);
  const setPlayState = useAudioStore((state) => state.setPlayState);
  const playState = useAudioStore((state) => state.playState);

  React.useEffect(() => {
    if (playState === PlayState.stopped) return;

    if (player.current?.playing() && playState === PlayState.playing) {
      player.current.pause();
    } else {
      player.current.play();
    }
  }, [playState]);

  const progressTimer = React.useRef<NodeJS.Timeout>();
  React.useEffect(() => {
    if (player.current) {
      player.current.stop()
    }
    if (progressTimer.current) {
      clearInterval(progressTimer.current)
    }
    if (url) {
      player.current = _createPlayer(url)
      player.current?.play()
    }
    progressTimer.current = setInterval(() => {
      setPosition((player.current?.seek() || 0) as number)
    }, 100)
  }, [url])

  React.useEffect(() => {
    console.log('AudioProvider', 'useEffect_position', seekPosition)
    player.current?.seek(seekPosition)
  }, [seekPosition])

  const _createPlayer = (src: string) => {
    const howl = new Howl({
      src: src,
      autoplay: true,
      html5: true,
      volume: 1,
    });
    howl.on("load", () => {
      console.log("AudioProvider", "Howl Loaded");
      console.log("AudioProvider", "Setting play state", playState);
      setTimeout(() => {
        setPlayState(PlayState.playing);
        setDuration(howl.duration());
      });
      console.log("AudioProvider", "Set play state", playState);
    });
    return howl;
  };

  return <React.Fragment>{children}</React.Fragment>;
};

export default AudioProvider;
