import * as React from 'react';
import { LocalAudioTrack, RemoteAudioTrack, Track, createAudioAnalyser } from 'livekit-client';
import { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import { useEffect } from 'react';

interface AudioWaveformOptions {
  barCount?: number;
  volMultiplier?: number;
  updateInterval?: number;
}

const waveformDefaults: Required<AudioWaveformOptions> = {
  barCount: 120,
  volMultiplier: 5,
  updateInterval: 16, // Updated for smoother animation
};

export function CustomAudioWaveform(
  trackOrTrackReference?: LocalAudioTrack | RemoteAudioTrack | TrackReferenceOrPlaceholder,
  options: AudioWaveformOptions = {}
) {
  const track =
    trackOrTrackReference instanceof Track
      ? trackOrTrackReference
      : (trackOrTrackReference?.publication?.track as LocalAudioTrack | RemoteAudioTrack);

  // Merge options with defaults using nullish coalescing operator
  const barCount = options.barCount ?? waveformDefaults.barCount;
  const volMultiplier = options.volMultiplier ?? waveformDefaults.volMultiplier;
  const updateInterval = options.updateInterval ?? waveformDefaults.updateInterval;

  const [bars, setBars] = React.useState<number[]>([]);
  const aggregateWave = React.useRef(new Float32Array());
  const timeRef = React.useRef(performance.now());
  const updates = React.useRef(0);

  const updateBars = React.useCallback((wave: Float32Array) => {
    setBars(
      Array.from(
        filterData(wave, barCount).map((v) => Math.sqrt(v) * volMultiplier)
      )
    );
  }, [barCount, volMultiplier]);

  useEffect(() => {
    if (!track || !track.mediaStream) return;

    const { analyser, cleanup } = createAudioAnalyser(track, {
      fftSize: getFFTSizeValue(barCount),
    });

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);

    // Store the animation frame handle
    let animationFrameHandle: number;

    const updateWaveform = () => {
      analyser.getFloatTimeDomainData(dataArray);

      for (let i = 0; i < bufferLength; i++) {
        aggregateWave.current[i] += dataArray[i];
      }
      updates.current += 1;

      if (performance.now() - timeRef.current >= updateInterval) {
        const newData = aggregateWave.current.map((v) => v / updates.current);
        updateBars(newData);
        timeRef.current = performance.now();
        updates.current = 0;
        aggregateWave.current.fill(0);
      }

      // Request next animation frame and store the handle
      animationFrameHandle = requestAnimationFrame(updateWaveform);
    };

    // Start the update loop
    animationFrameHandle = requestAnimationFrame(updateWaveform);

    // Cleanup the effect
    return () => {
      cleanup();
      cancelAnimationFrame(animationFrameHandle); // Use the handle to cancel the animation frame
    };
  }, [track, barCount, volMultiplier, updateInterval, updateBars]);

  return { bars };
}

function getFFTSizeValue(x: number) {
  return x < 32 ? 32 : pow2ceil(x);
}

function pow2ceil(v: number) {
  let p = 2;
  while ((v >>= 1)) p <<= 1;
  return p;
}

function filterData(audioData: Float32Array, numSamples: number) {
  const blockSize = Math.floor(audioData.length / numSamples);
  const filteredData = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum += Math.abs(audioData[i * blockSize + j]);
    }
    filteredData[i] = sum / blockSize;
  }

  return filteredData;
}
