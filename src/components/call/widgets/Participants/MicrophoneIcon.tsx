import { TrackPublication } from "livekit-client";
import AudioAnalyzerWrapper from "../Audio/AudioAnalyzerWrapper";

interface Participant {
  identity: string;
  audioTrackPublications: Map<string, TrackPublication>;
}

export const MicrophoneIcon = ({
  enabled,
  participant,
}: {
  enabled: boolean;
  participant: Participant;
}) => {
  return (
    <>
      {enabled ? (
        <AudioAnalyzerWrapper participant={participant} AnalyzerSize="sm" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 -960 960 960"
          style={{ msFilter: "" }}
          fill="currentColor"
        >
          <path d="m689.61-392.77-44.15-44.92q9.77-17.23 15.04-38.2 5.27-20.96 5.27-44.11h60q0 37.08-9.54 68.5t-26.62 58.73ZM465.77-618.23Zm95.07 95.46-55.07-55.08V-760q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5v101.38l-60-60V-760q0-41.92 29.04-70.96Q423.85-860 465.77-860q41.92 0 70.96 29.04 29.04 29.04 29.04 70.96v213.84q0 6.77-1.54 12.31-1.54 5.54-3.39 11.08ZM435.77-130v-131.85q-99-11.31-164.5-84.92-65.5-73.62-65.5-173.23h60q0 83 57.88 141.5Q381.54-320 465.77-320q38.61 0 72.58-13.77 33.96-13.77 60.11-38.15l42.77 42.76q-29 27.24-66 45.16-37 17.92-79.46 22.15V-130h-60Zm358.92 38.61L67.15-818.93l42.16-42.15 727.54 727.54-42.16 42.15Z"/>
        </svg>
      )}
    </>
  );
};
