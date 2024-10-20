import React from 'react';
import { LocalAudioTrack, RemoteAudioTrack } from 'livekit-client';
import { useAudioWaveform } from '@livekit/components-react';

const AudioAnalyzer = ({ track }: { track: LocalAudioTrack | RemoteAudioTrack }) => {
  const { bars } = useAudioWaveform(track, { barCount: 3, volMultiplier: 6 });

  return (
    <div className="flex justify-center items-center h-[13px] md:h-[17px]">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="bg-slate-700 dark:bg-slate-400 rounded-lg mx-px transition-all duration-100 ease-in-out"
          style={{
            height: `${Math.min(bar * 100, 90)}%`,  // Limit the height to a maximum of 28px
            width: '3px'                  
          }}
        />
      ))}
    </div>
  );
};

export default AudioAnalyzer;
