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
import RaiseHand from "./RaiseHand";
import EndCallDialog from "./widget/EndCallDialog";
import { useDialog } from "../../utils/DialogContext";

export interface ControlBarProps extends React.HTMLAttributes<HTMLDivElement> {
  controls?: ControlBarControls;
  saveUserChoices?: boolean;
  onDeviceError?: (error: { source: Track.Source; error: Error }) => void;
}

export type ControlBarControls = {
  microphone?: boolean;
  camera?: boolean;
  chat?: boolean;
  screenShare?: boolean;
  screenRecording?: boolean;
  leave?: boolean;
  settings?: boolean;
};

const Controls: React.FC<ControlBarProps> = ({
  controls = {},
  saveUserChoices = true,
  onDeviceError,
  ...props
}) => {
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

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();

    const controlDependencies = [
      visibleControls.camera,
      visibleControls.microphone,
      visibleControls.leave,
      visibleControls.screenShare,
    ];

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

  const { isOpen, openDialog } = useDialog();

  return (
    <>
      <div
        className={`__mobile_controls flex flex-row items-center justify-center gap-x-3 ${
          isFullscreen
            ? "bottom-0 py-2 box-content fixed left-0 w-full __mobile_controls_fulscreen"
            : ""
        } ${
          showControls ? "visible" : "opacity-0"
        } transition-opacity duration-300`}
      >
        {/* video source */}
        {visibleControls.camera && (
          <CameraControl onDeviceError={onDeviceError} />
        )}
        {/* Microphone */}
        {visibleControls.microphone && (
          <MicrophoneControl onDeviceError={onDeviceError} />
        )}
        {/* Reaction */}
        <div>
          <label className="sr-only">reaction</label>
          <Reaction />
        </div>
        {/* End Call */}
        <div
          className={`h-10 flex justify-center items-center text-sm __nav gap-3 relative`}
          aria-label="controls"
          ref={navRef}
        >
          <div className="bg-pody-danger flex-shrink-0 h-10 w-10 rounded-full flex justify-center items-center text-slate-100 cursor-pointer" onClick={openDialog}>
            <label className="sr-only">disconnect</label>
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
          {/* share screen */}
          {visibleControls.screenShare && browserSupportsScreenSharing && (
            <ScreenShareControl />
          )}
          {/* chat */}
          <ChatControlMenu />
          {/* Raise Hand */}
          <div>
            <label className="sr-only">raisehand</label>
            <RaiseHand />
          </div>
          {/* Extra Menu */}
        </div>
        <MenuExtra
          username={profile?.username || ""}
          overflowItem={overflowItems}
        />
      </div>
      {isOpen && <EndCallDialog />}
    </>
  );
};

export default Controls;
