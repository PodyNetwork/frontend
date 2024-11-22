import React, { useEffect, useRef } from 'react';
import { LocalAudioTrack, RemoteAudioTrack } from 'livekit-client';
import { useAudioWaveform } from '@livekit/components-react';
import gsap from 'gsap';

const AudioAnalyzer = ({ track }: { track: LocalAudioTrack | RemoteAudioTrack }) => {
  const { bars } = useAudioWaveform(track, { barCount: 3, volMultiplier: 6 });
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  const fallbackBars = bars && bars.length === 3 ? bars : [0, 0, 0];

  useEffect(() => {
    if (!fallbackBars || fallbackBars.length === 0) return;

    barsRef.current = barsRef.current.slice(0, fallbackBars.length);

    const validRefs = barsRef.current.filter((ref) => ref !== null);

    if (validRefs.length > 0) {
      gsap.to(validRefs, {
        duration: 0.5,
        stagger: 0.1,
        ease: 'power1.out',
        height: (i) => `${Math.min(fallbackBars[i] * 100, 90)}%`,
      });
    }
  }, [fallbackBars]);

  return (
    <div className="flex justify-center items-center h-[13px] md:h-[17px]">
      {fallbackBars.map((bar, index) => (
        <div
          key={`bar-${index}`}
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
