import { useEffect, useState } from "react";
import { RemoteAudioTrack, AudioTrack, TrackPublication } from "livekit-client";
import AudioAnalyzer from "../Audio/AudioAnalyzerPody";

interface Participant {
  identity: string;
  audioTrackPublications: Map<string, TrackPublication>; 
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

  const audioTrackPublication = Array.from(
    participant.audioTrackPublications.values()
  )[0];
  const audioTrack = audioTrackPublication?.track as AudioTrack;

  useEffect(() => {
    setCurrentTrack(audioTrack ?? null);

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
