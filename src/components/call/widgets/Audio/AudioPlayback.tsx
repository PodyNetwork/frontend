import React, { useState, useEffect } from "react";
import Image from "next/image";

const AudioPlaybackCheck: React.FC = () => {
  const [audioEnabled, setAudioEnabled] = useState<boolean | null>(null);

  const playAudioTone = () => {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      console.error("AudioContext is not supported in this browser.");
      return;
    }

    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440, context.currentTime); // 440Hz (A note)
    gainNode.gain.setValueAtTime(0.001, context.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 1);

    // Clean up AudioContext after use
    oscillator.onended = () => context.close();
  };

  const enableAudioPlayback = async () => {
    try {
      playAudioTone();
      setAudioEnabled(true);
      localStorage.setItem('audioEnabled', 'true'); // Persist audio state
    } catch (error) {
      console.error("Failed to enable audio playback.", error);
    }
  };

  const checkAudioPlayback = () => {
    const savedAudioEnabled = localStorage.getItem('audioEnabled');
    if (savedAudioEnabled === 'true') {
      setAudioEnabled(true);
    } else {
      setAudioEnabled(false);
    }
  };

  useEffect(() => {
    checkAudioPlayback(); // Check the audio state when the component mounts
  }, []);

  // If audio state is not determined yet, return null to prevent flickering
  if (audioEnabled === null) {
    return null;
  }

  if (audioEnabled) {
    return null; // No need to show the prompt if audio is already enabled
  }

  return (
    <div className="dark:bg-black/50 bg-black/40 fixed top-0 left-0 w-full h-screen max-h-screen flex flex-col z-50 items-center justify-center overflow-y-auto">
      <div className="w-full p-4">
        <div className="max-w-md mx-auto flex flex-col text-center items-center justify-center gap-y-3 my-12 bg-white dark:bg-pody-oxfordblue p-9 rounded-xl text-slate-700 dark:text-slate-400">
          <Image
            src="/illustration/woman-listening-online.png"
            className="w-full md:w-[320px] object-contain mx-auto"
            width={1500}
            height={536}
            alt="pody audio playback illustration"
          />
          <h3 className="text-xl font-medium">
            Do you want to hear what is being discussed in the Classroom?
          </h3>
          <p className="text-sm">
            You can still turn off your Audio Playback anytime in the settings.
          </p>
          <div className="flex items-center gap-x-2">
            <button
              onClick={enableAudioPlayback}
              aria-label="Allow Audio Playback"
              className="px-4 py-3 bg-pody-dark dark:bg-slate-700 text-slate-300 text-sm rounded-full"
            >
              Enable Audio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlaybackCheck;
