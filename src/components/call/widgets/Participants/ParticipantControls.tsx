import { MicrophoneIcon } from "./MicrophoneIcon";
import { VideoIcon } from "./VideoIcon";

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
  username: string;
}

interface Call {
  userId: string;
}

interface ParticipantControlsProps {
  participant: Participant;
  handleAddToSpeak: (username: string) => void;
  handleRemoveFromSpeak: (username: string) => void;
  profile?: Profile;
  call?: Call;
  participantBarToggleExpanded: boolean;
  role: string;
}

export const ParticipantControls: React.FC<ParticipantControlsProps> = ({
  participant,
  handleAddToSpeak,
  handleRemoveFromSpeak,
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
      {profile?.id === call?.userId && participant.identity !== profile?.username && (
        <>
          {!participant.permissions?.canPublish ? (
            <button
              className="text-xs text-blue-500"
              onClick={() => handleAddToSpeak(participant.identity)}
            >
              Add to speak
            </button>
          ) : (
            <button
              className="text-xs text-red-500"
              onClick={() => handleRemoveFromSpeak(participant.identity)}
            >
              Remove
            </button>
          )}
        </>
      )}

      <p className="hidden md:block text-xs">
        <span>{role}</span>
      </p>
      {participant.permissions?.canPublish && (
        <>
          <MicrophoneIcon
            enabled={participant.isMicrophoneEnabled ?? false}
            participant={participant}
          />
          <VideoIcon enabled={participant.isCameraEnabled ?? false} />
        </>
      )}
    </div>
  );
};
