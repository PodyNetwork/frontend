import { MicrophoneIcon } from "./MicrophoneIcon";
import { VideoIcon } from "./VideoIcon";

interface Participant {
  identity: string;
  permissions?: {
    canPublish?: boolean;
  };
  isMicrophoneEnabled?: boolean;
  isCameraEnabled?: boolean;
}

interface Profile {
  id: string; // Add other properties as needed
}

interface Call {
  userId: string; // Add other properties as needed
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
          <MicrophoneIcon enabled={participant.isMicrophoneEnabled ?? false} />
          <VideoIcon enabled={participant.isCameraEnabled ?? false} />
        </>
      )}
    </div>
  );
};
