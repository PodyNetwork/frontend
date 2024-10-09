import { Track } from "livekit-client";
import * as React from "react";
import {
    useLocalParticipantPermissions,
    usePersistentUserChoices
} from "@livekit/components-react";
import { supportsScreenSharing } from "@livekit/components-core";

import { SourceToggle } from "../livekitcustom/SourceToggle";

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

  return (
    <div className="md:hidden block absolute z-30 bottom-0 mb-2 dark:bg-pody-dark border-pody-gray/20 w-full px-3.5 text-sm mx-auto">
      <div className="text-slate-500 flex flex-row items-center gap-x-6 justify-center glass-effect_menu rounded-md py-1">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 -960 960 960"
              style={{ msFilter: "" }}
              fill="currentColor"
            >
              <path d="M181.92-180q-30.3 0-51.3-21-21-21-21-51.31v-455.38q0-30.31 21-51.31 21-21 51.3-21h455.39q30.3 0 51.3 21 21 21 21 51.31v183.08l140.77-140.77v370.76L709.61-435.39v183.08q0 30.31-21 51.31-21 21-51.3 21H181.92Zm0-60h455.39q5.38 0 8.84-3.46 3.47-3.46 3.47-8.85v-455.38q0-5.39-3.47-8.85-3.46-3.46-8.84-3.46H181.92q-5.38 0-8.84 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.84 3.46Zm-12.3 0v-480 480Z" />
            </svg>
          </SourceToggle>
        )}
        {/* screen share */}
        {visibleControls.screenShare && browserSupportsScreenSharing && (
          <SourceToggle
            source={Track.Source.ScreenShare}
            captureOptions={{ audio: false, selfBrowserSurface: "include" }}
            showIcon={false}
            onChange={onScreenShareChange}
            onDeviceError={(error) =>
              onDeviceError?.({ source: Track.Source.ScreenShare, error })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 -960 960 960"
              style={{ msFilter: "" }}
              fill="currentColor"
            >
              <path d="M370-363.85V-420q0-45.77 32.12-77.88Q434.23-530 480-530h43.85v-66.15L620-500l-96.15 96.15V-470H480q-20.85 0-35.42 14.58Q430-440.85 430-420v56.15h-60ZM292.31-60Q262-60 241-81q-21-21-21-51.31v-695.38Q220-858 241-879q21-21 51.31-21h375.38Q698-900 719-879q21 21 21 51.31v695.38Q740-102 719-81q-21 21-51.31 21H292.31ZM280-170v37.69q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h375.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-170H280Zm0-60h400v-500H280v500Zm0-560h400v-37.69q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H292.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46V-790Zm0 0v-50 50Zm0 620v50-50Z" />
            </svg>
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
            <div className="w-10 h-10 rounded-full flex justify-center items-center text-white bg-pody-primary relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 -960 960 960"
                style={{ msFilter: "" }}
                fill="currentColor"
              >
                <path d="M480-420q-41.92 0-70.96-29.04Q380-478.08 380-520v-240q0-41.92 29.04-70.96Q438.08-860 480-860q41.92 0 70.96 29.04Q580-801.92 580-760v240q0 41.92-29.04 70.96Q521.92-420 480-420Zm0-220Zm-30 510v-131.85q-99-11.31-164.5-84.92Q220-420.39 220-520h60q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h60q0 99.61-65.5 173.23Q609-273.16 510-261.85V-130h-60Zm30-350q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
              </svg>
            </div>
          </SourceToggle>
        )}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 -960 960 960"
          style={{ msFilter: "" }}
          fill="currentColor"
        >
          <path d="M250-410h300v-60H250v60Zm0-120h460v-60H250v60Zm0-120h460v-60H250v60ZM100-118.46v-669.23Q100-818 121-839q21-21 51.31-21h615.38Q818-860 839-839q21 21 21 51.31v455.38Q860-302 839-281q-21 21-51.31 21H241.54L100-118.46ZM216-320h571.69q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v523.08L216-320Zm-56 0v-480 480Z" />
        </svg>
        {/* leave call button */}
        {visibleControls.leave && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 -960 960 960"
            style={{ msFilter: "" }}
            fill="currentColor"
            // onClick={leaveCall}
          >
            <path d="m134.85-319-76.23-74.23q-12.39-12-12.2-28.58.2-16.57 12.58-28.96 83-87.31 194.68-133.27Q365.36-630 479.95-630t226.01 45.96Q817.38-538.08 901-450.77q12.38 12.39 12.58 28.96.19 16.58-12.2 28.58L825.15-319q-12.15 11.77-27.23 13.15-15.07 1.39-27.84-8l-100.62-76.46q-9.92-7.54-14.69-16.72T650-427.69v-112.85q-43.38-14.69-84.54-22.08Q524.31-570 480-570q-44.31 0-85.46 7.38-41.16 7.39-84.54 22.08v112.85q0 11.48-4.77 20.66t-14.69 16.72l-100.62 76.46q-12.77 9.39-27.84 8Q147-307.23 134.85-319ZM250-517.39q-35.92 17.31-69.46 40.85Q147-453 118-427.08q-1.92 1.93-1.92 3.85 0 1.92 1.92 3.85l43.85 43.46q1.92 1.92 4.8 2.5 2.89.57 5.2-1.35l73.54-56.38q1.92-1.54 3.26-3.85 1.35-2.31 1.35-4.23v-78.16Zm460 1.23v76.93q0 1.92 1.35 4.23 1.34 2.31 3.26 3.85l73.54 56.38q2.31 1.92 5.2 1.35 2.88-.58 4.8-2.5L842-418.15q1.92-1.93 1.92-3.85 0-1.92-1.92-3.85-29-27.15-62.54-50.38-33.54-23.23-69.46-39.93Zm-460-1.23Zm460 1.23Z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ControlsMobile;
