"use client";
import { useEffect, useRef } from "react";
import Controls from "./StreamControl/Controls";
import "@livekit/components-styles";
import StreamVideo from "./StreamVideo";
import StreamInfo from "./StreamInfo";

const StreamScreen = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const calculateHeights = () => {
    if (infoRef.current && controlsRef.current) {
      const infoHeight = infoRef.current.offsetHeight;
      const controlsHeight = controlsRef.current.offsetHeight;

      const availableHeight = window.innerHeight - (infoHeight + controlsHeight + 100);
      const calculatedMaxWidth = `calc(${availableHeight}px * 16 / 9)`; 

      document.documentElement.style.setProperty('--max-video-width', calculatedMaxWidth);
    }
  };

  useEffect(() => {
    // Initial calculation
    calculateHeights();

    // Recalculate on window resize
    const handleResize = () => {
      calculateHeights();
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
