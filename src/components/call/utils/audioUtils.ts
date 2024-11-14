// utils/audioUtils.ts
import { LocalAudioTrack } from 'livekit-client';

export function ensureAudioContext(track: LocalAudioTrack) {
  // Check if the track is valid
  if (track && !track.isMuted) {
    try {
      // Create a new AudioContext (handles compatibility with older browsers)
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Use the setAudioContext method to assign the AudioContext
      track.setAudioContext(audioContext);
    } catch (error) {
      console.error('Failed to set AudioContext:', error);
    }
  }
}
