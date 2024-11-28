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
      {profile?.id === call?.userId &&
        participant.identity !== profile?.username && (
          <>
            {!participant.permissions?.canPublish ? (
              <button
                className="text-xs text-blue-500"
                onClick={() => handleAddToSpeak(participant.identity)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="M725-410v-120H605v-60h120v-120h60v120h120v60H785v120h-60Zm-365-82.31q-57.75 0-98.87-41.12Q220-574.56 220-632.31q0-57.75 41.13-98.87 41.12-41.13 98.87-41.13 57.75 0 98.87 41.13Q500-690.06 500-632.31q0 57.75-41.13 98.88-41.12 41.12-98.87 41.12ZM60-187.69v-88.93q0-29.38 15.96-54.42 15.96-25.04 42.66-38.5 59.3-29.07 119.65-43.61 60.35-14.54 121.73-14.54t121.73 14.54q60.35 14.54 119.65 43.61 26.7 13.46 42.66 38.5Q660-306 660-276.62v88.93H60Zm60-60h480v-28.93q0-12.15-7.04-22.5-7.04-10.34-19.11-16.88-51.7-25.46-105.42-38.58Q414.7-367.69 360-367.69q-54.7 0-108.43 13.11-53.72 13.12-105.42 38.58-12.07 6.54-19.11 16.88-7.04 10.35-7.04 22.5v28.93Zm240-304.62q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 384.62Z" />
                </svg>
              </button>
            ) : (
              <button
                className="text-xs text-pody-danger"
                onClick={() => handleRemoveFromSpeak(participant.identity)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="M779.31-77.54 655-201.85v14.16H55v-88.93q0-29.38 15.96-54.42 15.96-25.04 42.66-38.5 59.3-29.07 119.65-43.61 60.35-14.54 121.73-14.54 21.08 0 41.85 2.23 20.77 2.23 41.61 7.08l-74.31-74.31q-2 .38-4.38.38H355q-57.75 0-98.87-41.12Q215-574.56 215-632.31v-4.77q0-2.38.39-4.38L72.54-784.31l42.77-42.77 706.76 706.77-42.76 42.77ZM725-410v-120H605v-60h120v-120h60v120h120v60H785v120h-60ZM482.08-574.31l-47.85-47.84q.38-2.54.58-5.08.19-2.54.19-5.08 0-33-23.5-56.5t-56.5-23.5q-2.54 0-5.08.2-2.54.19-5.07.57L297-759.38q13.08-6.46 27.91-9.69 14.83-3.24 30.09-3.24 57.75 0 98.87 41.13Q495-690.06 495-632.31q0 15.26-3.23 30.09-3.23 14.84-9.69 27.91ZM115-247.69h480l-75.23-89.39q-39.92-15.31-81.62-22.96-41.69-7.65-83.15-7.65-54.7 0-108.43 13.11-53.72 13.12-105.42 38.58-12.07 6.54-19.11 16.88-7.04 10.35-7.04 22.5v28.93Zm319.23-374.46ZM355-247.69Z" />
                </svg>
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
