import React from "react";
import Wavesurfer from "wavesurfer.js";
import { useTheme } from "next-themes";
import { secondsToHHMMSS } from "@/lib/utils/time-utils";
import { PlayState } from "@/lib/contexts/audio-context";

type WaveformComponentProps = {
  audioUrl: string;
  pcmUrl: string;
  playState: PlayState;
  audioDuration: number;
  currentPosition: number;
  progress?: (e: number) => void;
};
const WaveformComponent = ({
  audioUrl,
  audioDuration,
  pcmUrl,
  playState,
  currentPosition,
  progress,
}: WaveformComponentProps) => {
  const { theme } = useTheme();
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [totalTime, setTotalTime] = React.useState(audioDuration);

  const waveform = React.useRef<Wavesurfer | null>(null);
  React.useEffect(() => {
    if (playState === PlayState.playing) {
      waveform.current?.play();
    } else {
      waveform.current?.pause();
    }
  }, [playState, audioUrl]);

  React.useEffect(() => {
    if (!waveform.current && audioUrl && pcmUrl) {
      waveform.current = Wavesurfer.create({
        backend: "MediaElement",
        container: "#waveform",
        cursorWidth: 0,
        waveColor: "#FFFFFF",
        progressColor: "#FF0000",
        height: 48,
        hideScrollbar: true,
        barWidth: 1,
      });
    }
  }, [audioUrl, pcmUrl, theme, playState]);

  React.useEffect(() => {
    const loadPcm = async () => {
      if (waveform.current) {
        const response = await fetch(pcmUrl);
        if (response.ok) {
          const result = await response.json();
          const peaks = result.data.map((p: number) => p / 128);
          waveform.current.load(audioUrl, peaks, "auto");
          waveform.current.on("audioprocess", (e) => {
            setElapsedTime(e);
            if (totalTime === 0) {
              setTotalTime(e);
            }
            if (totalTime !== 0) {
              progress && progress((e / totalTime) * 100);
            }
          });
          waveform.current.on("ready", () => {
            if (playState === PlayState.playing) {
              waveform?.current?.play();
            }
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
      <span className="absolute bottom-0 left-0 z-50 text-xs font-semibold text-neutral-content bg-opacity-20 ">
        {secondsToHHMMSS(elapsedTime)}
      </span>
      <div id="waveform" className="h-12 overflow-hidden"></div>
      <span className="absolute bottom-0 right-0 z-50 text-xs font-semibold bg-opacity-20 text-neutral-content ">
        {secondsToHHMMSS(totalTime)}
      </span>
    </div>
  );
};

export default WaveformComponent;
