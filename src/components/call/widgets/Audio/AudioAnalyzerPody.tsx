import React, { useEffect, useRef } from 'react';
import { LocalAudioTrack, RemoteAudioTrack } from 'livekit-client';
import { useAudioWaveform } from '@livekit/components-react';
import gsap from 'gsap';

const AudioAnalyzer = ({ track }: { track: LocalAudioTrack | RemoteAudioTrack }) => {
  const { bars } = useAudioWaveform(track, { barCount: 3, volMultiplier: 6 });
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (barsRef.current.length > 0) {
      gsap.to(barsRef.current, {
        duration: 0.5, 
        stagger: 0.1, 
        ease: 'power1.out', 
        height: (i) => `${Math.min(bars[i] * 100, 90)}%`, 
      });
    }
  }, [bars]);

  return (
    <div className="flex justify-center items-center h-[13px] md:h-[17px]">
      {bars.map((bar, index) => (
        <div
          key={index}
          ref={(el) => {
            barsRef.current[index] = el; 
          }}
          className="bg-slate-700 dark:bg-slate-400 rounded-lg mx-px"
          style={{
            width: '3px',
          }}
        />
      ))}
    </div>
  );
};

export default AudioAnalyzer;
