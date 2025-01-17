import { TrackPublication } from "livekit-client";
import { AvatarParticipant } from "../../../Avatar/AvatarParticipant";
import AudioAnalyzerWrapper from "../Audio/AudioAnalyzerWrapper";

interface Participant {
  audioTrackPublications: Map<string, TrackPublication>;
  identity: string;
  permissions?: {
    canPublish?: boolean;
  };
  isMicrophoneEnabled?: boolean;
}

const PlaceHolder = ({
  name,
  participant,
}: {
  name: string;
  participant: Participant;
}) => {
  const audioTrackPublications = Array.from(
    participant.audioTrackPublications.values()
  );

  const hasActiveAudioTrack = audioTrackPublications.some(
    (audioTrackPublication) => {
      const audioTrack = audioTrackPublication.track;
      return audioTrack && !audioTrackPublication.isMuted;
    }
  );

  return (
    <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center">
      <div className="w-[20%] md:w-[12%] transition-all duration-300">
        <AvatarParticipant name={name} />
      </div>
      <div
        className={`w-full max-w-sm ${
          hasActiveAudioTrack ? "h-[12%] mt-2.5" : "h-0 overflow-hidden"
        }`}
      >
        <AudioAnalyzerWrapper participant={participant} AnalyzerSize="lg" />
      </div>
    </div>
  );
};

export default PlaceHolder;
