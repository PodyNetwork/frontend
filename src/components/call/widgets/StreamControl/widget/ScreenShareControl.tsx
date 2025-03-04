import { SourceToggle } from "@/components/call/livekitcustom/SourceToggle";
import { supportsScreenSharing } from "@livekit/components-core";
import { Track } from "livekit-client";
import React from "react";

interface screenShareControlProps {
  onDeviceError?: (error: { source: Track.Source; error: Error }) => void;
}

const ScreenShareControl = ({ onDeviceError }: screenShareControlProps) => {
  const browserSupportsScreenSharing = supportsScreenSharing();
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);
  const onScreenShareChange = React.useCallback(
    (enabled: boolean) => {
      setIsScreenShareEnabled(enabled);
    },
    [setIsScreenShareEnabled]
  );

  if (!browserSupportsScreenSharing) return null;

  return (
    <div className="bg-white dark:bg-[#202124] flex-shrink-0 rounded-full flex justify-center items-center text-slate-400 cursor-pointer">
      <div className="__controls_width_noicon flex items-center justify-center rounded-full">
        <label className="sr-only">ShareScreen</label>
        <SourceToggle
          source={Track.Source.ScreenShare}
          captureOptions={{
            audio: true,
            selfBrowserSurface: "include",
          }}
          showIcon={false}
          onChange={onScreenShareChange}
          onDeviceError={(error) =>
            onDeviceError?.({ source: Track.Source.ScreenShare, error })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`__controls_icon ${
              isScreenShareEnabled ? "text-red-500" : "text-slate-400"
            }`}
            viewBox="0 -960 960 960"
            style={{ msFilter: "" }}
            fill="currentColor"
          >
            {isScreenShareEnabled ? (
              <>
                <path d="m568.92-505.08-82.61-82.61h39.08v-66.15l96.15 96.15-52.62 52.61Zm247.54 247.54-54-54h28.31q4.23-1.15 6.73-4.61 2.5-3.47 2.5-6.93v-415.38q0-5.38-3.46-8.85-3.46-3.46-8.85-3.46H323.23l-60-60h524.46q30.31 0 51.31 21 21 21 21 51.31v415.38q0 21.39-11.42 38.96-11.43 17.58-32.12 26.58Zm17.39 215.69L724.92-150.77H55.39v-60h608.92l-40-40h-452q-30.31 0-51.31-21-21-21-21-51.31v-419.07q0-6.54 3.46-11.73 3.47-5.2 8.85-8.27l-70.46-71.7L84-876 876-84l-42.15 42.15ZM401.54-472.93q-3.08 3.47-4.62 7.12t-1.54 9.04v59.08h-59.99v-80q0-14.85 3.5-27.16 3.5-12.3 10.03-21.3l-179.3-179.31q-4.62 1.92-7.12 4.81-2.5 2.88-2.5 7.11v370.46q0 5.39 3.46 8.85t8.85 3.46H563.7L401.54-472.93Zm141.31-58.22Zm-176 22.53Z" />
              </>
            ) : (
              <>
                <path d="M335.39-397.69h59.99v-80q0-20.85 14.58-35.43 14.58-14.57 35.43-14.57h80v66.15l96.15-96.15-96.15-96.15v66.15h-80q-45.77 0-77.89 32.11-32.11 32.12-32.11 77.89v80ZM172.31-250.77q-30.31 0-51.31-21-21-21-21-51.31v-415.38q0-30.31 21-51.31 21-21 51.31-21h615.38q30.31 0 51.31 21 21 21 21 51.31v415.38q0 30.31-21 51.31-21 21-51.31 21H172.31Zm0-60h615.38q4.62 0 8.46-3.84 3.85-3.85 3.85-8.47v-415.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v415.38q0 4.62 3.85 8.47 3.84 3.84 8.46 3.84Zm-12.31 0v-440 440Zm-104.61 160v-60h849.22v60H55.39Z" />
              </>
            )}
          </svg>
        </SourceToggle>
      </div>
    </div>
  );
};

export default ScreenShareControl;
