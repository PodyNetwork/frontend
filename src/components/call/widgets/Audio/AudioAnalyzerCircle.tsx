import React, { useEffect, useRef } from 'react';
import { LocalAudioTrack, RemoteAudioTrack } from 'livekit-client';
import { useAudioWaveform } from '@livekit/components-react';
import gsap from 'gsap';

const AudioAnalyzerCircle = ({ track }: { track: LocalAudioTrack | RemoteAudioTrack }) => {
  const { bars } = useAudioWaveform(track, { barCount: 4, volMultiplier: 8 });
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
    <div className="flex justify-center items-center h-full">
      {bars.map((bar, index) => (
        <div
          key={index}
          ref={(el) => { 
            barsRef.current[index] = el; // Storing ref without return value
          }}
          className="bg-slate-700 dark:bg-slate-400 rounded-lg mx-1"
          style={{
            width: '4%',
          }}
        />
      ))}
    </div>
  );
};

export default AudioAnalyzerCircle;
