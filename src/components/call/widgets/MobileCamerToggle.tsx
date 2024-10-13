import { Track } from "livekit-client";
import * as React from "react";
import {
  useLocalParticipantPermissions,
  useLocalParticipant,
  usePersistentUserChoices,
} from "@livekit/components-react";

// Import custom components
import { SourceToggle } from "../livekitcustom/SourceToggle";
import { CustomMediaDeviceMenu } from "../livekitcustom/CustomMediaMenu";

export type ControlBarControls = {
  microphone?: boolean;
  camera?: boolean;
  chat?: boolean;
  screenShare?: boolean;
  leave?: boolean;
  settings?: boolean;
};

export interface ControlBarProps extends React.HTMLAttributes<HTMLDivElement> {
  onDeviceError?: (error: { source: Track.Source; error: Error }) => void;
  variation?: "minimal" | "verbose" | "textOnly";
  controls?: ControlBarControls;
  saveUserChoices?: boolean;
  handleChatClick: () => void;
}

const Controls = ({
  variation,
  controls,
  saveUserChoices = true,
  onDeviceError,
  handleChatClick,
  ...props
}: ControlBarProps) => {
  const visibleControls = { leave: true, ...controls };
  const localPermissions = useLocalParticipantPermissions();
  const { localParticipant } = useLocalParticipant();

  if (!localPermissions) {
    visibleControls.camera = false;
    visibleControls.chat = false;
    visibleControls.microphone = false;
    visibleControls.screenShare = false;
  } else {
    visibleControls.camera ??= localPermissions.canPublish;
    visibleControls.microphone ??= localPermissions.canPublish;
    visibleControls.screenShare ??= localPermissions.canPublish;
    visibleControls.chat ??= localPermissions.canPublishData && controls?.chat;
  }

  const { saveAudioInputEnabled, saveVideoInputEnabled, saveVideoInputDeviceId } =
    usePersistentUserChoices({ preventSave: !saveUserChoices });

  const cameraOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveVideoInputEnabled(enabled) : null,
    [saveVideoInputEnabled]
  );

  return (
    <div
      className="hidden h-10 md:flex flex-wrap justify-center items-center gap-x-3 text-sm"
      aria-label="controls"
    >
      {/* Video source toggle */}
      {visibleControls.camera && (
        <div className="bg-white p-1 rounded-full flex justify-center items-center text-slate-400 cursor-pointer">
          <div className="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full">
            <SourceToggle
              source={Track.Source.Camera}
              showIcon={false}
              onChange={cameraOnChange}
              onDeviceError={(error) =>
                onDeviceError?.({ source: Track.Source.Camera, error })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 ${
                  !localParticipant.isCameraEnabled && "text-red-500"
                }`}
                viewBox="0 -960 960 960"
                style={{ msFilter: "" }}
                fill="currentColor"
              >
                {localParticipant.isCameraEnabled ? (
                  <path d="M181.92-180q-30.3 0-51.3-21-21-21-21-51.31v-455.38q0-30.31 21-51.31 21-21 51.3-21h455.39q30.3 0 51.3 21 21 21 21 51.31v183.08l140.77-140.77v370.76L709.61-435.39v183.08q0 30.31-21 51.31-21 21-51.3 21H181.92Zm0-60h455.39q5.38 0 8.84-3.46 3.47-3.46 3.47-8.85v-455.38q0-5.39-3.47-8.85-3.46-3.46-8.84-3.46H181.92q-5.38 0-8.84 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.84 3.46Zm-12.3 0v-480 480Z" />
                ) : (
                  <path d="M823.08-329.23 701.54-450.77v84.69l-40-40v-289.3q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92h-289.3l-40-40h329.3q27.62 0 46.12 18.5 18.5 18.5 18.5 46.12v186.15l121.54-121.54v301.54Zm-47.23 207.85L96.77-800.46l28.31-28.31 679.07 679.08-28.3 28.31ZM506.46-561.15Zm-88.31 81.77ZM195.38-758.46 233.85-720h-27.7q-10.77 0-17.69 6.92-6.92 6.93-6.92 17.7v430.76q0 10.77 6.92 17.7 6.92 6.92 17.69 6.92h430.77q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-27.69L700-253.85q-3.85 23-21.19 38.43Q661.46-200 636.92-200H206.15q-27.61 0-46.11-18.5t-18.5-46.12v-430.76q0-24.54 15.42-41.89t38.42-21.19Z" />
                )}
              </svg>
            </SourceToggle>
          </div>
          <div>
            <CustomMediaDeviceMenu
              kind="videoinput"
              onActiveDeviceChange={(_kind, deviceId) =>
                saveVideoInputDeviceId(deviceId ?? "")
              }
            />
          </div>
        </div>
      )}

      {/* Add other controls here, e.g., microphone toggle, chat button */}
      
    </div>
  );
};

export default Controls;
