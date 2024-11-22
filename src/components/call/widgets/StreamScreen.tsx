"use client";
import { useEffect, useRef, useCallback } from "react";
import Controls from "./StreamControl/Controls";
import "@livekit/components-styles";
import StreamVideo from "./StreamVideo";
import StreamInfo from "./StreamInfo";
import { useFullscreen } from "../utils/FullscreenContext";
import GiftAnimationPage from "./Gift/GiftAnimation";
import { StartAudio } from "@livekit/components-react";

const StreamScreen = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const { isFullscreen } = useFullscreen();

  const calculateHeights = useCallback(() => {
    if (infoRef.current && controlsRef.current) {
      const infoHeight = infoRef.current.offsetHeight;
      const controlsHeight = controlsRef.current.offsetHeight;

      const availableHeight = window.innerHeight - (infoHeight + controlsHeight);
      const availableHeightCarousel = (window.innerHeight - (infoHeight + controlsHeight)) / 3;
      const availableHeightPotrait = (window.innerHeight - (infoHeight + controlsHeight + 100)) / 2;
  
      const calculatedMaxWidth = `calc(${availableHeight}px * 16 / 9)`;
      const calculatedMaxHeight = `calc(${availableHeight}px)`;
      const calculatedMaxHeightCarousel = `calc(${availableHeightCarousel}px)`;
      const calculatedFullMaxWidth = `calc(${window.innerHeight}px * 16 / 9)`;
      const calculatedMaxHeightPortrait = `calc((${availableHeightPotrait}px * 9 / 16 * 2))`;
  
      const maxWidth = isFullscreen ? calculatedFullMaxWidth : calculatedMaxWidth;
  
      document.documentElement.style.setProperty('--max-video-width', maxWidth);
      document.documentElement.style.setProperty('--max-video-height-potrait', calculatedMaxHeightPortrait);
      document.documentElement.style.setProperty('--max-video-height', calculatedMaxHeight);
      document.documentElement.style.setProperty('--max-video-height-carousel', calculatedMaxHeightCarousel);
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

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty(
        "--widthMobile",
        isFullscreen ? "100vh" : "65vh"
      );
    }
  }, [isFullscreen]);

  return (
    <>
      <div ref={infoRef} className={`${isFullscreen ? "md:py-0 py-0" : "py-4"}`}>
        <StreamInfo />
      </div>
      <StreamVideo />
      <div ref={controlsRef} className={`z-40 ${isFullscreen ? "md:py-0" : "md:py-4"}`}>
        <div className="relative mx-auto">
          <GiftAnimationPage />
        </div>
        <Controls />
      </div>
    </>
  );
};

export default StreamScreen;
