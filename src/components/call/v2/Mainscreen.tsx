import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import React, { useCallback, useEffect, useRef } from "react";
import StreamInfo from "./widgets/StreamInfo";
import StreamControl from "./widgets/StreamControl";
import StreamScreen from "./widgets/StreamScreen";

const Mainscreen = () => {
  const streamInfoElement = useRef<HTMLDivElement>(null);
  const streamControlsElement = useRef<HTMLDivElement>(null);

  const adjustVideoDimensions = useCallback(() => {
    if (streamInfoElement.current && streamControlsElement.current) {
      const infoElementHeight = streamInfoElement.current.offsetHeight;
      const controlsElementHeight = streamControlsElement.current.offsetHeight;

      const availableHeight =
        window.innerHeight - (infoElementHeight + controlsElementHeight);

      const maxVideoWidth = `calc(${availableHeight}px * 16 / 9)`;
      const availableHeightInput = `calc(${availableHeight}px)`;
      const availableHeightInfo = `calc(${infoElementHeight}px)`;
      const availableHeightControl = `calc(${controlsElementHeight}px)`;

      document.documentElement.style.setProperty(
        "--max-video-width--stream",
        maxVideoWidth
      );
      document.documentElement.style.setProperty(
        "--max-video-height--stream",
        availableHeightInput
      );
      document.documentElement.style.setProperty(
        "--height--stream--info",
        availableHeightInfo
      );
      document.documentElement.style.setProperty(
        "--height--stream--control",
        availableHeightControl
      );
    }
  }, []);

  useEffect(() => {
    adjustVideoDimensions();

    const handleWindowResize = () => {
      adjustVideoDimensions();
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [adjustVideoDimensions]);
  return (
    <>
      <div
        className="flex flex-row items-center justify-between py-4"
        ref={streamInfoElement}
      >
        <StreamInfo />
      </div>
      <StreamScreen />
      <div
        className="relative mt-auto py-3"
        aria-label="controls"
        ref={streamControlsElement}
      >
        <StreamControl />
      </div>
    </>
  );
};

export default Mainscreen;
