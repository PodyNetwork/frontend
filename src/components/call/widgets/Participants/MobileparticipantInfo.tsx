import { TrackPublication } from "livekit-client";
import AudioAnalyzerWrapper from "../Audio/AudioAnalyzerWrapper";

interface Participant {
  identity: string;
  audioTrackPublications: Map<string, TrackPublication>;
  permissions?: {
    canPublish?: boolean;
  };
  isMicrophoneEnabled?: boolean;
}

interface MobileParticipantInfoProps {
  isSpeaker: boolean;
  participant: Participant;
  role: string;
}

export const MobileParticipantInfo: React.FC<MobileParticipantInfoProps> = ({
  isSpeaker = false,
  participant,
  role,
}) => {
  return (
    <div className="flex flex-row items-center md:hidden text-xs leading-none">
      {isSpeaker ? (
        <>
          {participant.isMicrophoneEnabled ? (
            <AudioAnalyzerWrapper participant={participant} AnalyzerSize="sm" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="m669.23-423.54-30.31-31.84q5.54-11.47 9.08-28.39t3.54-36.23h40q0 30.15-6.08 53.5t-16.23 42.96ZM451.54-642.46Zm78.15 78.92-38.15-38.15V-760q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5v76.77l-40-40V-760q0-33.85 23.08-56.92Q417.69-840 451.54-840q33.84 0 56.92 23.08 23.08 23.07 23.08 56.92v187.69q0 2.54-.58 4.62-.57 2.08-1.27 4.15ZM431.54-140v-140.69q-94-8.62-157-76.85-63-68.23-63-162.46h40q0 83 58.27 141.5T451.54-320q43.23 0 80.65-17.04 37.43-17.04 64.73-46.81l28.54 28.54q-29 31.46-68.5 51.31t-85.42 23.31V-140h-40Zm365.84 13.23L78.31-845.85l28.31-28.3 719.07 719.07-28.31 28.31Z" />
            </svg>
          )}
          <span className="ms-1">{role}</span>
        </>
      ) : (
        <span>Listener</span>
      )}
    </div>
  );
};
