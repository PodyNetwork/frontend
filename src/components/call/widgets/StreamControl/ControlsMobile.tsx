import { Track } from "livekit-client";
import * as React from "react";
import {
  useLocalParticipant,
  useLocalParticipantPermissions,
  usePersistentUserChoices,
} from "@livekit/components-react";
import { supportsScreenSharing } from "@livekit/components-core";

import { SourceToggle } from "../../livekitcustom/SourceToggle";
import { useMyContext } from "../../utils/MyContext";
import { useCustomDisconnectButton } from "../../livekitcustom/CustomDisconnect";

/* eslint-disable @typescript-eslint/no-unused-vars */

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
  /**
   * If `true`, the user's device choices will be persisted.
   * This will enable the user to have the same device choices when they rejoin the room.
   * @defaultValue true
   * @alpha
   */
  saveUserChoices?: boolean;
}

const ControlsMobile = ({
  variation,
  controls,
  saveUserChoices = true,
  onDeviceError,
  ...props
}: ControlBarProps) => {
  const visibleControls = { leave: true, ...controls };
  const localPermissions = useLocalParticipantPermissions();

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

  visibleControls.screenShare = true;

  const browserSupportsScreenSharing = supportsScreenSharing();

  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);

  const onScreenShareChange = React.useCallback(
    (enabled: boolean) => {
      setIsScreenShareEnabled(enabled);
    },
    [setIsScreenShareEnabled]
  );

  const {
    saveAudioInputEnabled,
    saveVideoInputEnabled,
    saveAudioInputDeviceId,
    saveVideoInputDeviceId,
  } = usePersistentUserChoices({ preventSave: !saveUserChoices });

  const microphoneOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveAudioInputEnabled(enabled) : null,
    [saveAudioInputEnabled]
  );
  const cameraOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveVideoInputEnabled(enabled) : null,
    [saveVideoInputEnabled]
  );

  const { localParticipant } = useLocalParticipant();

  const { setIsChatOpen } = useMyContext();

  const { buttonProps } = useCustomDisconnectButton({
    stopTracks: true,
  });

  return (
    <div className="md:hidden block absolute p-5 z-30 bottom-0 bg-white dark:bg-black w-full __shadow_pody text-[0.7rem]">
      <div className="text-slate-600 dark:text-slate-400 mx-auto relative flex flex-row items-center justify-between max-w-sm">
        {/* Home */}
        <div className="flex items-center flex-col truncate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            viewBox="0 -960 960 960"
            style={{ msFilter: "" }}
            fill="currentColor"
          >
            <path d="M240-200h133.85v-237.69h212.3V-200H720v-360L480-740.77 240-560v360Zm-60 60v-450l300-225.77L780-590v450H526.15v-237.69h-92.3V-140H180Zm300-330.38Z" />
          </svg>
          <span>Home</span>
        </div>
        {/* video source */}
        {visibleControls.camera && (
          <SourceToggle
            source={Track.Source.Camera}
            showIcon={false}
            onChange={cameraOnChange}
            onDeviceError={(error) =>
              onDeviceError?.({ source: Track.Source.Camera, error })
            }
          >
            <div className="flex items-center flex-col truncate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-7 h-7 ${
                  !localParticipant.isCameraEnabled && "text-red-500"
                }`}
                viewBox="0 -960 960 960"
                style={{ msFilter: "" }}
                fill="currentColor"
              >
                {localParticipant.isCameraEnabled ? (
                  <path d="M181.92-180q-30.3 0-51.3-21-21-21-21-51.31v-455.38q0-30.31 21-51.31 21-21 51.3-21h455.39q30.3 0 51.3 21 21 21 21 51.31v183.08l140.77-140.77v370.76L709.61-435.39v183.08q0 30.31-21 51.31-21 21-51.3 21H181.92Zm0-60h455.39q5.38 0 8.84-3.46 3.47-3.46 3.47-8.85v-455.38q0-5.39-3.47-8.85-3.46-3.46-8.84-3.46H181.92q-5.38 0-8.84 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.84 3.46Zm-12.3 0v-480 480Z" />
                ) : (
                  <path d="M851.54-294.62 710.77-435.39v75.85l-60-60v-288.15q0-5.39-3.46-8.85t-8.85-3.46H350.31l-60-60h348.15q30.31 0 51.31 21 21 21 21 51.31v183.08l140.77-140.77v370.76ZM798.92-73.7 61.39-811.23l42.15-42.15 737.53 737.53-42.15 42.15ZM502.23-568.08Zm-102.15 96.39ZM177.69-779.23 236.92-720h-53.84q-5.39 0-8.85 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.85 3.46h455.38q5.39 0 8.85-3.46t3.46-8.85v-53.84L710-246.92q-1.92 28-22.35 47.46Q667.23-180 638.46-180H183.08q-30.31 0-51.31-21-21-21-21-51.31v-455.38q0-28.77 19.46-49.19 19.46-20.43 47.46-22.35Z" />
                )}
              </svg>
              <span>Camera</span>
            </div>
          </SourceToggle>
        )}
        {/* microphone */}
        {visibleControls.microphone && (
          <SourceToggle
            source={Track.Source.Microphone}
            showIcon={false}
            onChange={microphoneOnChange}
            onDeviceError={(error) =>
              onDeviceError?.({ source: Track.Source.Microphone, error })
            }
          >
            <div className="flex items-center flex-col truncate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-7 h-7 ${
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
              <span>Mic</span>
            </div>
          </SourceToggle>
        )}
        {/* Chat */}
        <div className="flex items-center flex-col truncate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            viewBox="0 -960 960 960"
            style={{ msFilter: "" }}
            fill="currentColor"
            onClick={() => setIsChatOpen((ref) => !ref)}
          >
            <path d="M250-410h300v-60H250v60Zm0-120h460v-60H250v60Zm0-120h460v-60H250v60ZM100-118.46v-669.23Q100-818 121-839q21-21 51.31-21h615.38Q818-860 839-839q21 21 21 51.31v455.38Q860-302 839-281q-21 21-51.31 21H241.54L100-118.46ZM216-320h571.69q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v523.08L216-320Zm-56 0v-480 480Z" />
          </svg>
          <span>Chat</span>
        </div>
        {/* leave call button */}
        {visibleControls.leave && (
          <button {...buttonProps}>
            <div className="flex items-center flex-col truncate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                viewBox="0 -960 960 960"
                style={{ msFilter: "" }}
                fill="currentColor"
              >
                <path d="m134.85-319-76.23-74.23q-12.39-12-12.2-28.58.2-16.57 12.58-28.96 83-87.31 194.68-133.27Q365.36-630 479.95-630t226.01 45.96Q817.38-538.08 901-450.77q12.38 12.39 12.58 28.96.19 16.58-12.2 28.58L825.15-319q-12.15 11.77-27.23 13.15-15.07 1.39-27.84-8l-100.62-76.46q-9.92-7.54-14.69-16.72T650-427.69v-112.85q-43.38-14.69-84.54-22.08Q524.31-570 480-570q-44.31 0-85.46 7.38-41.16 7.39-84.54 22.08v112.85q0 11.48-4.77 20.66t-14.69 16.72l-100.62 76.46q-12.77 9.39-27.84 8Q147-307.23 134.85-319ZM250-517.39q-35.92 17.31-69.46 40.85Q147-453 118-427.08q-1.92 1.93-1.92 3.85 0 1.92 1.92 3.85l43.85 43.46q1.92 1.92 4.8 2.5 2.89.57 5.2-1.35l73.54-56.38q1.92-1.54 3.26-3.85 1.35-2.31 1.35-4.23v-78.16Zm460 1.23v76.93q0 1.92 1.35 4.23 1.34 2.31 3.26 3.85l73.54 56.38q2.31 1.92 5.2 1.35 2.88-.58 4.8-2.5L842-418.15q1.92-1.93 1.92-3.85 0-1.92-1.92-3.85-29-27.15-62.54-50.38-33.54-23.23-69.46-39.93Zm-460-1.23Zm460 1.23Z" />
              </svg>
              <span>Leave</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default ControlsMobile;
