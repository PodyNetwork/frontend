import { useEffect, useState } from "react";
import { RemoteAudioTrack, AudioTrack, TrackPublication } from "livekit-client";
import AudioAnalyzer from "../Audio/AudioAnalyzerPody";
import AudioAnalyzerCircle from "./AudioAnalyzerCircle";

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
  AnalyzerSize: 'sm' | 'lg'; 
}

const AudioAnalyzerWrapper: React.FC<AudioAnalyzerWrapperProps> = ({
  participant, AnalyzerSize
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

      return () => {
        audioTrack.off("muted", handleTrackMuted);
        audioTrack.off("unmuted", handleTrackUnmuted);
      };
    }
  }, [audioTrack]);

  return (
    <>
      {currentTrack && (
        AnalyzerSize === 'sm' ? (
          <AudioAnalyzer track={currentTrack} />
        ) : (
          <AudioAnalyzerCircle track={currentTrack} />
        )
      )}
    </>
  );
};

export default AudioAnalyzerWrapper;
