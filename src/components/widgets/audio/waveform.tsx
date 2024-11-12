import React from "react";
import Wavesurfer from "wavesurfer.js";
import { useTheme } from "next-themes";
import { secondsToHHMMSS } from "@/lib/utils/time-utils";
import { PlayState } from "@/lib/contexts/audio-context";
import useAudioStore from "@/lib/contexts/audio-context";
import { siteConfig } from "@/config/site";

type WaveformComponentProps = {
  audioUrl: string;
  pcmUrl: string;
  playState: PlayState;
  duration: number;
  position: number;
  progress?: (e: number) => void;
};
const WaveformComponent = ({
  audioUrl,
  pcmUrl,
  duration,
  progress,
}: WaveformComponentProps) => {
  const { theme } = useTheme();
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const { playState, setSeekPosition, progressPercentage } = useAudioStore();

  const waveform = React.useRef<Wavesurfer | null>(null);

  React.useEffect(() => {
    waveform.current?.seekTo(progressPercentage / 100);
  }, [progressPercentage]);

  React.useEffect(() => {
    if (playState === PlayState.playing) {
      waveform.current?.play();
    } else {
      waveform.current?.pause();
    }
  }, [playState]);

  React.useEffect(() => {
    if (!waveform.current && pcmUrl) {
      waveform.current = Wavesurfer.create({
        container: "#waveform",
        cursorWidth: 0,
        waveColor: siteConfig.theme.waveFormColor,
        progressColor: siteConfig.theme.waveFormProgressColor,
        height: 48,
        hideScrollbar: true,
        barWidth: 1,
      });
    }
  }, [pcmUrl, theme, playState]);

  React.useEffect(() => {
    const loadPcm = async () => {
      if (waveform.current) {
        const response = await fetch(pcmUrl);
        if (response.ok) {
          const result = await response.json();
          const peaks = result.data.map((p: number) => p / 128);
          waveform.current.load(
            //empty mp3 file
            "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjM2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU2LjQxAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAkAAAGkAAAAAAAAA0gAAAAANVVV",
            peaks
          );
          waveform.current.on("audioprocess", (e) => {
            setElapsedTime(e);
          });
          waveform.current.on("click", (e) => {
            setSeekPosition(e * duration);
          });
        }
      }
    };
    loadPcm();
    // don't add PlayState as a dependency, it's not a part of the state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pcmUrl, audioUrl]);

  return (
    <div id="wrapper" className="relative">
      <span className="absolute bottom-0 left-0 z-50 text-xs font-semibold text-muted-foreground bg-opacity-20 ">
        {secondsToHHMMSS(elapsedTime)}
      </span>
      <div id="waveform" className="h-12 overflow-hidden"></div>
      <span className="absolute bottom-0 right-0 z-50 text-xs font-semibold bg-opacity-20 text-muted-foreground ">
        {secondsToHHMMSS(duration)}
      </span>
    </div>
  );
};

export default WaveformComponent;
