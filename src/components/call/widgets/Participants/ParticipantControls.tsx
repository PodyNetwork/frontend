import { MicrophoneIcon } from "./MicrophoneIcon";
import MoreControls from "./MoreControls";
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
  handleMuteParticipant: (username: string) => void;
  profile?: Profile;
  call?: Call;
  participantBarToggleExpanded: boolean;
  role: string;
}

export const ParticipantControls: React.FC<ParticipantControlsProps> = ({
  participant,
  handleAddToSpeak,
  handleRemoveFromSpeak,
  handleMuteParticipant,
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
      {profile?.id === call?.userId &&
        participant.identity !== profile?.username && (
          <>
            <MoreControls
              participant={participant}
              handleAddToSpeak={handleAddToSpeak}
              handleRemoveFromSpeak={handleRemoveFromSpeak}
              handleMuteParticipant={handleMuteParticipant}
            />
          </>
        )}
    </div>
  );
};
