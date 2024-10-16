import { MicrophoneIcon } from "./MicrophoneIcon";
import { VideoIcon } from "./VideoIcon";
import { RemoteAudioTrack, LocalAudioTrack } from "livekit-client";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Participant {
  identity: string;
  audioTrackPublications: Map<string, any>; 
  permissions?: {
    canPublish?: boolean;
  };
  isMicrophoneEnabled?: boolean;
  isCameraEnabled?: boolean;
}

interface Profile {
  id: string;
}

interface Call {
  userId: string;
}

interface ParticipantControlsProps {
  participant: Participant;
  handleAddToSpeak: (username: string) => void;
  profile?: Profile;
  call?: Call;
  participantBarToggleExpanded: boolean;
  role: string;
}

export const ParticipantControls: React.FC<ParticipantControlsProps> = ({
  participant,
  handleAddToSpeak,
  call,
  profile,
  participantBarToggleExpanded,
  role,
}) => {
  // Access the first audio track publication (this could be a remote track)
  const audioTrackPublication = Array.from(participant.audioTrackPublications.values())[0];
  const audioTrack = audioTrackPublication?.track;

  return (
    <div
      className={`hidden md:flex flex-row items-center gap-x-2.5 ${
        !participantBarToggleExpanded && "md:hidden"
      }`}
    >
      {!participant.permissions?.canPublish && profile?.id === call?.userId && (
        <button
          className="text-xs text-blue-500"
          onClick={() => handleAddToSpeak(participant.identity)}
        >
          Add to speak
        </button>
      )}
      <p className="hidden md:block text-xs">
        <span>{role}</span>
      </p>
      {participant.permissions?.canPublish && (
        <>
          <MicrophoneIcon
            enabled={participant.isMicrophoneEnabled ?? false}
            audioTrack={audioTrack as LocalAudioTrack | RemoteAudioTrack} // Typecast to handle both local and remote tracks
          />
          <VideoIcon enabled={participant.isCameraEnabled ?? false} />
        </>
      )}
    </div>
  );
};
