import { useEffect, useState } from "react";
import { RemoteAudioTrack, AudioTrack, TrackPublication } from "livekit-client";
import AudioAnalyzer from "../Audio/AudioAnalyzerPody";

interface Participant {
  identity: string;
  audioTrackPublications: Map<string, TrackPublication>; // Use TrackPublication for more specific typing
  permissions?: {
    canPublish?: boolean;
  };
  isMicrophoneEnabled?: boolean;
}

interface AudioAnalyzerWrapperProps {
  participant: Participant;
}

const AudioAnalyzerWrapper: React.FC<AudioAnalyzerWrapperProps> = ({
  participant,
}) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);

  // Access the first audio track publication
  const audioTrackPublication = Array.from(
    participant.audioTrackPublications.values()
  )[0];
  const audioTrack = audioTrackPublication?.track as AudioTrack;

  useEffect(() => {
    setCurrentTrack(audioTrack ?? null);

    // If audioTrack is a remote track, listen for its state changes
    if (audioTrack instanceof RemoteAudioTrack) {
      const handleTrackMuted = () => setCurrentTrack(null);
      const handleTrackUnmuted = () => setCurrentTrack(audioTrack);

      audioTrack.on("muted", handleTrackMuted);
      audioTrack.on("unmuted", handleTrackUnmuted);
    }
  }, [audioTrack]);

  return <>{currentTrack && <AudioAnalyzer track={currentTrack} />}</>;
};

export default AudioAnalyzerWrapper;
