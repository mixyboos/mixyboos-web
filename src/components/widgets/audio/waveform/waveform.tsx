import React from "react";

type WaveformProps = {
  pcmURL: string;
};

const Waveform: React.FC<WaveformProps> = ({ pcmURL: prop1 }) => {
  return <div>Waveform</div>;
};

export default Waveform;
