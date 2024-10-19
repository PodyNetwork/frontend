"use client";
import { useEffect, useRef, useCallback } from "react";
import Controls from "./StreamControl/Controls";
import "@livekit/components-styles";
import StreamVideo from "./StreamVideo";
import StreamInfo from "./StreamInfo";
import { useCarouselHeight } from "../utils/CarouselHeightContext";

const StreamScreen = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const { carouselHeight } = useCarouselHeight();

  const calculateHeights = useCallback(() => {
    if (infoRef.current && controlsRef.current) {
      const infoHeight = infoRef.current.offsetHeight;
      const controlsHeight = controlsRef.current.offsetHeight;

      const availableHeight = window.innerHeight - (infoHeight + controlsHeight + 100);
      const availableHeightCarousel = window.innerHeight - (infoHeight + controlsHeight + carouselHeight + 100);
      const calculatedMaxWidth = `calc(${availableHeight}px * 16 / 9)`; 
      const calculatedMaxWidthCarousel = `calc(${availableHeightCarousel}px * 16 / 9)`; 
      const calculatedMaxWidthPortrait = `calc((${availableHeight}px * 9 / 16 * 2) - ${infoHeight + controlsHeight}px)`;
      const calculatedMaxWidthPortraitCarousel = `calc((${availableHeight}px * 9 / 16 * 2) - ${infoHeight + controlsHeight + carouselHeight}px)`;

      document.documentElement.style.setProperty('--max-video-width', calculatedMaxWidth);
      document.documentElement.style.setProperty('--max-video-width-carousel', calculatedMaxWidthCarousel);
      document.documentElement.style.setProperty('--max-video-width-potrait', calculatedMaxWidthPortrait);
      document.documentElement.style.setProperty('--max-video-width-potrait-carousel', calculatedMaxWidthPortraitCarousel);
    }
  }, [carouselHeight]); 

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
