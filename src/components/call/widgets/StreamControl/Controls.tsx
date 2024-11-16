import { Track } from "livekit-client";
import * as React from "react";
import {
  useLocalParticipantPermissions
} from "@livekit/components-react";
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

const Controls = ({
  controls,
  onDeviceError,
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
        isFullscreen
          ? "bottom-0 py-2 box-content fixed left-0 w-full"
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
          {visibleControls.leave && <LeaveCallButton />}
          {/* EndCall button */}
          {profile?.id === call?.userId && <EndCallButton />}
          {/* share screen */}
          {visibleControls.screenShare && browserSupportsScreenSharing && (
            <ScreenShareControl />
          )}
          {/* chat */}
          <ChatControlMenu />
          {/* Extra Menu */}
        </div>
        <MenuExtra username={profile?.username || ""} overflowItem={overflowItems} />
      </div>
    </>
  );
};

export default Controls;
