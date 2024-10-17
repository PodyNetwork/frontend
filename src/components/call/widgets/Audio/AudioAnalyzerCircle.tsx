import React from 'react';
import { LocalAudioTrack, RemoteAudioTrack } from 'livekit-client';
import { useAudioWaveform } from '@livekit/components-react';

const AudioAnalyzerCircle = ({ track }: { track: LocalAudioTrack | RemoteAudioTrack }) => {
  const { bars } = useAudioWaveform(track, { barCount: 4, volMultiplier: 6 });

  return (
    <div className="flex justify-center items-center h-full">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="bg-slate-700 dark:bg-slate-400 rounded-lg mx-1 transition-all duration-100 ease-in-out"
          style={{
            height: `${Math.min(bar * 100, 80)}%`, // Use percentage for height, with a max height limit
            width: '15px',
          }}
        />
      ))}
    </div>
  );
};

export default AudioAnalyzerCircle;
