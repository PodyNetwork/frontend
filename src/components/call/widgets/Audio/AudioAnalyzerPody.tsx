import React from 'react';
import { LocalAudioTrack, RemoteAudioTrack } from 'livekit-client';
import { useAudioWaveform } from '@livekit/components-react';

const AudioAnalyzer = ({ track }: { track: LocalAudioTrack | RemoteAudioTrack }) => {
  // Set waveform bars to 5 to match the design.
  const { bars } = useAudioWaveform(track, { barCount: 4, volMultiplier: 4 });

  return (
    <div className="flex justify-center items-center h-[20px]">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="bg-slate-700 dark:bg-slate-400 rounded-lg mx-px transition-all duration-100 ease-in-out"
          style={{
            height: `${Math.min(bar * 30, 15)}px`, // Limit the height to a maximum of 28px
            width: '3px',                      
            maxHeight: '28px',                  
            maxWidth: '3px',                  
          }}
        />
      ))}
    </div>
  );
};

export default AudioAnalyzer;
