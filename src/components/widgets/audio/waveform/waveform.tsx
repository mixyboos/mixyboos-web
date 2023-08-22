"use client";
import React from "react";
import Wavesurfer from "wavesurfer.js/dist/wavesurfer";

type WaveformProps = {
  pcmURL: string;
};

const Waveform: React.FC<WaveformProps> = ({ pcmURL }) => {
  const wave = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!wave.current) return;
    const surfer = Wavesurfer.create({
      container: wave.current,
    });
  }, [wave]);
  return (
    <div>
      <div>I am farts</div>
      <canvas ref={wave} />
    </div>
  );
};

export default Waveform;
