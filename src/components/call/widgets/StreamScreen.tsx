"use client";
import { useEffect, useRef, useCallback } from "react";
import Controls from "./StreamControl/Controls";
import "@livekit/components-styles";
import StreamVideo from "./StreamVideo";
import StreamInfo from "./StreamInfo";
import { useFullscreen } from "../utils/FullscreenContext";

const StreamScreen = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const { isFullscreen } = useFullscreen();

  const calculateHeights = useCallback(() => {
    if (infoRef.current && controlsRef.current) {
      const infoHeight = infoRef.current.offsetHeight;
      const controlsHeight = controlsRef.current.offsetHeight;
  
      const availableHeight = window.innerHeight - (infoHeight + controlsHeight + 100);
  
      const calculatedMaxWidth = `calc(${availableHeight}px * 16 / 9)`;
      const calculatedFullMaxWidth = `calc(${window.innerHeight}px * 16 / 9)`;
      const calculatedMaxWidthPortrait = `calc((${availableHeight}px * 9 / 16 * 2) - ${infoHeight + controlsHeight}px)`;
  
      const maxWidth = isFullscreen ? calculatedFullMaxWidth : calculatedMaxWidth;
      const maxWidthPortrait = isFullscreen ? "100%" : calculatedMaxWidthPortrait;
  
      document.documentElement.style.setProperty('--max-video-width', maxWidth);
      document.documentElement.style.setProperty('--max-video-width-potrait', maxWidthPortrait);
    }
  }, [isFullscreen]);

  useEffect(() => {
    calculateHeights();

    const handleResize = () => {
      calculateHeights();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateHeights]); 

  return (
    <>
      <div ref={infoRef}>
        <StreamInfo />
      </div>
      <StreamVideo />
      <div ref={controlsRef}>
        <Controls />
      </div>
    </>
  );
};

export default StreamScreen;
