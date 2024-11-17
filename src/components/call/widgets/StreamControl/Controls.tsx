import { Track } from "livekit-client";
import * as React from "react";
import { useLocalParticipantPermissions } from "@livekit/components-react";
import { supportsScreenSharing } from "@livekit/components-core";

import { useParams } from "next/navigation";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import { useEffect, useRef, useState } from "react";
import useProfile from "@/hooks/user/useProfile";
import Reaction from "./Reaction";
import MenuExtra from "./MenuExtra";
import { useFullscreen } from "../../utils/FullscreenContext";
import CameraControl from "./widget/CameraControl";
import MicrophoneControl from "./widget/MicrophoneControl";
import LeaveCallButton from "./widget/LeaveCallButton";
import EndCallButton from "./widget/EndCallButton";
import ScreenShareControl from "./widget/ScreenShareControl";
import ChatControlMenu from "./widget/ChatControlMenu";

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
  controls?: ControlBarControls;
}

const Controls = ({ controls, onDeviceError }: ControlBarProps) => {
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

  const browserSupportsScreenSharing = supportsScreenSharing();

  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { profile } = useProfile();

  const { isFullscreen } = useFullscreen();

  const [showControls, setShowControls] = useState(true);

  const [overflowItems, setOverflowItems] = useState<string[]>([]);
  const navRef = useRef<HTMLDivElement | null>(null);

  // Function to handle resizing
  const handleResize = () => {
    const nav = navRef.current;
    if (!nav) return;

    const children = Array.from(nav.children) as HTMLElement[];
    const overflow: string[] = [];

    children.forEach((child) => {
      if (child instanceof HTMLElement) {
        child.style.display = "";
      }
    });

    const availableWidth = nav.clientWidth;
    let totalWidth = 0;
    const gap = parseFloat(getComputedStyle(nav).gap) || 0;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child instanceof HTMLElement) {
        totalWidth += child.getBoundingClientRect().width;

        if (i < children.length - 1) {
          totalWidth += gap;
        }

        if (totalWidth > availableWidth) {
          const label = child.querySelector("label");
          const text = label?.textContent?.trim() || "";
          overflow.unshift(text);
          child.style.display = "none";
        } else {
          child.style.display = "";
        }
      }
    }

    setOverflowItems(overflow);
  };

  // Effect for initial load
  useEffect(() => {
    handleResize();

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this runs only once on initial load

  // Effect to handle updates when controls change
  useEffect(() => {
    handleResize(); // Re-run the resize handler when controls are updated

    const controlDependencies = [
      visibleControls.camera,
      visibleControls.microphone,
      visibleControls.leave,
      visibleControls.screenShare,
    ];

    // Run the resize handler whenever any control visibility changes
    controlDependencies.forEach((control) => {
      if (control !== undefined) {
        handleResize();
      }
    });
  }, [
    visibleControls.camera,
    visibleControls.microphone,
    visibleControls.leave,
    visibleControls.screenShare,
  ]);

  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout> | null = null;

    const showControlsTemporarily = () => {
      setShowControls(true);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      if (isFullscreen) {
        hideTimeout = setTimeout(() => setShowControls(false), 2000);
      }
    };

    const handleMouseMove = () => {
      showControlsTemporarily();
    };

    if (!isFullscreen) {
      setShowControls(true);
    } else {
      showControlsTemporarily();
    }

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [isFullscreen]);

  return (
    <>
      <div
        className={`__mobile_controls flex flex-row items-center justify-center gap-x-3 ${
          isFullscreen ? "bottom-0 py-2 box-content fixed left-0 w-full" : ""
        } ${
          showControls ? "visible" : "opacity-0"
        } transition-opacity duration-300`}
      >
        {/* video source */}
        {visibleControls.camera && (
          <CameraControl onDeviceError={onDeviceError} />
        )}
        {/* Microphone */}
        {visibleControls.microphone && <MicrophoneControl />}
        {/* Reaction */}
        <div>
          <label className="sr-only">reaction</label>
          <Reaction />
        </div>
        <div
          className={`h-10 flex justify-center items-center text-sm __nav gap-3 relative`}
          aria-label="controls"
          ref={navRef}
        >
          {/* leave button */}
          {visibleControls.leave && (
            <LeaveCallButton>
              <div className="bg-pody-danger/90 flex-shrink-0 h-10 w-10 rounded-full flex justify-center items-center text-slate-100 cursor-pointer">
                <label className="sr-only">LeaveCall</label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 -960 960 960"
                  style={{ msFilter: "" }}
                  fill="currentColor"
                >
                  <path d="M790.46-81.23 573.08-298.62q-89.39 75.46-189.27 117.04Q283.92-140 182.39-140q-21.7 0-32.04-12Q140-164 140-182v-129.69q0-15.54 9.58-26.81t24.73-14.65l111.07-22.62q12.54-2.38 26.93 2.04 14.38 4.42 23.54 13.58l89.76 90.54q24.93-14.08 53.81-34.04 28.89-19.97 50.27-38.35L85.23-786.46l42.16-42.15 705.22 705.22-42.15 42.16Zm-422-161.23-70.61-71.39q-1.93-1.92-3.66-2.5-1.73-.57-4.04.2l-84 17.69q-3.07.77-4.61 2.69-1.54 1.92-1.54 5v84.15q0 2.31 1.54 3.85t3.85 1.54q37.53-1.85 80.42-12.27 42.88-10.42 82.65-28.96Zm302-156.69-42.15-42.16q15.77-18.54 32.61-43.42 16.85-24.89 27.77-45.42l-92.38-89.93q-9.16-8.77-12.35-22.69-3.19-13.92-.81-25.23l22.93-117.69q3.38-15.15 14.65-24.73t26.81-9.58H778q18 0 30 12.19 12 12.2 12 30.2 0 99.61-40.46 197.38T670.46-399.15Zm46-187.77Q735-629 745.35-671.31q10.34-42.3 13.42-83.3 0-2.31-1.54-3.85t-3.85-1.54h-84.92q-3.08 0-5 1.54t-2.69 4.61l-18 89.39q-.77 2.31-.19 4.81.57 2.5 2.5 4.42l71.38 68.31Zm0 0Zm-348 344.46Z" />
                </svg>
              </div>
            </LeaveCallButton>
          )}
          {/* EndCall button */}
          {profile?.id === call?.userId && (
            <EndCallButton>
              <div className="bg-pody-danger flex-shrink-0 h-10 w-10 rounded-full flex justify-center items-center text-slate-100 cursor-pointer">
                <label className="sr-only">endCall</label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 -960 960 960"
                  style={{ msFilter: "" }}
                  fill="currentColor"
                >
                  <path d="m134.85-319-76.23-74.23q-12.39-12-12.2-28.58.2-16.57 12.58-28.96 83-87.31 194.68-133.27Q365.36-630 479.95-630t226.01 45.96Q817.38-538.08 901-450.77q12.38 12.39 12.58 28.96.19 16.58-12.2 28.58L825.15-319q-12.15 11.77-27.23 13.15-15.07 1.39-27.84-8l-100.62-76.46q-9.92-7.54-14.69-16.72T650-427.69v-112.85q-43.38-14.69-84.54-22.08Q524.31-570 480-570q-44.31 0-85.46 7.38-41.16 7.39-84.54 22.08v112.85q0 11.48-4.77 20.66t-14.69 16.72l-100.62 76.46q-12.77 9.39-27.84 8Q147-307.23 134.85-319ZM250-517.39q-35.92 17.31-69.46 40.85Q147-453 118-427.08q-1.92 1.93-1.92 3.85 0 1.92 1.92 3.85l43.85 43.46q1.92 1.92 4.8 2.5 2.89.57 5.2-1.35l73.54-56.38q1.92-1.54 3.26-3.85 1.35-2.31 1.35-4.23v-78.16Zm460 1.23v76.93q0 1.92 1.35 4.23 1.34 2.31 3.26 3.85l73.54 56.38q2.31 1.92 5.2 1.35 2.88-.58 4.8-2.5L842-418.15q1.92-1.93 1.92-3.85 0-1.92-1.92-3.85-29-27.15-62.54-50.38-33.54-23.23-69.46-39.93Zm-460-1.23Zm460 1.23Z" />
                </svg>
              </div>
            </EndCallButton>
          )}
          {/* share screen */}
          {visibleControls.screenShare && browserSupportsScreenSharing && (
            <ScreenShareControl />
          )}
          {/* chat */}
          <ChatControlMenu />
          {/* Extra Menu */}
        </div>
        <MenuExtra
          username={profile?.username || ""}
          overflowItem={overflowItems}
        />
      </div>
    </>
  );
};

export default Controls;
