import { Track } from "livekit-client";
import { useLocalParticipant, usePersistentUserChoices } from "@livekit/components-react";
import { CustomMediaDeviceMenu } from "@/components/call/livekitcustom/CustomMediaMenu";
import { SourceToggle } from "@/components/call/livekitcustom/SourceToggle";
import { useCallback } from "react";

interface AudioControlProps {
  onDeviceError?: (error: { source: Track.Source; error: Error }) => void;
  saveUserChoices?: boolean;
}

const MicrophoneControl = ({ saveUserChoices, onDeviceError }: AudioControlProps) => {
  const { localParticipant } = useLocalParticipant();

  const {
    saveAudioInputEnabled,
    saveAudioInputDeviceId,
  } = usePersistentUserChoices({ preventSave: !saveUserChoices });

  const microphoneOnChange = useCallback(
    (enabled: boolean, isUserInitiated: boolean) => {
      if (isUserInitiated) {
        saveAudioInputEnabled?.(enabled);
      }
    },
    [saveAudioInputEnabled]
  );

  const handleDeviceChange = useCallback(
    (_kind: string, deviceId: string | undefined) => {
      saveAudioInputDeviceId?.(deviceId ?? "");
    },
    [saveAudioInputDeviceId]
  );

  return (
    <div className="bg-white dark:bg-[#202124] flex-shrink-0 p-1 rounded-full flex justify-center items-center text-slate-400 cursor-pointer">
      <div className="bg-slate-100 dark:bg-pody-dark_secondary w-8 h-8 flex items-center justify-center rounded-full">
        <label className="sr-only">microphone</label>
        <SourceToggle
          source={Track.Source.Microphone}
          showIcon={false}
          onChange={microphoneOnChange}
          onDeviceError={(error) =>
            onDeviceError?.({ source: Track.Source.Microphone, error })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 ${
              !localParticipant.isMicrophoneEnabled && "text-red-500"
            }`}
            viewBox="0 -960 960 960"
            style={{ msFilter: "" }}
            fill="currentColor"
          >
            {localParticipant.isMicrophoneEnabled ? (
              <path d="M480-420q-41.92 0-70.96-29.04Q380-478.08 380-520v-240q0-41.92 29.04-70.96Q438.08-860 480-860q41.92 0 70.96 29.04Q580-801.92 580-760v240q0 41.92-29.04 70.96Q521.92-420 480-420Zm0-220Zm-30 510v-131.85q-99-11.31-164.5-84.92Q220-420.39 220-520h60q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h60q0 99.61-65.5 173.23Q609-273.16 510-261.85V-130h-60Zm30-350q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
            ) : (
              <path d="m689.61-392.77-44.15-44.92q9.77-17.23 15.04-38.2 5.27-20.96 5.27-44.11h60q0 37.08-9.54 68.5t-26.62 58.73ZM465.77-618.23Zm95.07 95.46-55.07-55.08V-760q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5v101.38l-60-60V-760q0-41.92 29.04-70.96Q423.85-860 465.77-860q41.92 0 70.96 29.04 29.04 29.04 29.04 70.96v213.84q0 6.77-1.54 12.31-1.54 5.54-3.39 11.08ZM435.77-130v-131.85q-99-11.31-164.5-84.92-65.5-73.62-65.5-173.23h60q0 83 57.88 141.5Q381.54-320 465.77-320q38.61 0 72.58-13.77 33.96-13.77 60.11-38.15l42.77 42.76q-29 27.24-66 45.16-37 17.92-79.46 22.15V-130h-60Zm358.92 38.61L67.15-818.93l42.16-42.15 727.54 727.54-42.16 42.15Z" />
            )}
          </svg>
        </SourceToggle>
      </div>
      <div>
        <CustomMediaDeviceMenu
          kind="audioinput"
          onActiveDeviceChange={handleDeviceChange}
        />
      </div>
    </div>
  );
};

export default MicrophoneControl;
