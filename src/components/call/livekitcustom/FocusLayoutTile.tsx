import * as React from "react";
import type { TrackReferenceOrPlaceholder } from "@livekit/components-core";
import { ParticipantCustomTile } from "./ParticipantCustomTile";
import { useSwipe, usePagination } from "@livekit/components-react";
import { CustomFocusLayout } from "./CustomFocusLayout";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCarouselHeight } from "../utils/CarouselHeightContext";

export interface EnhancedFocusLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tracks: TrackReferenceOrPlaceholder[];
  focusedIndex: number;
  onParticipantClick?: (index: number) => void;
}

export function EnhancedFocusLayout({
  tracks,
  focusedIndex,
  onParticipantClick,
}: EnhancedFocusLayoutProps) {
  const filteredTracks = tracks
    .map((track, index) => ({ track, originalIndex: index }))
    .filter(({ originalIndex }) => originalIndex !== focusedIndex);

  const paginatedTracks = filteredTracks.map(({ track }) => track);
  const pagination = usePagination(paginatedTracks.length, paginatedTracks);
  const focusRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { setCarouselHeight } = useCarouselHeight();

  useSwipe(focusRef, {
    onLeftSwipe: pagination.nextPage,
    onRightSwipe: pagination.prevPage,
  });

  const updateCarouselHeight = React.useCallback(() => {
    if (carouselRef.current) {
      const hasParticipants = paginatedTracks.length > 0;
      const carouselHeight = hasParticipants ? carouselRef.current.offsetHeight : 0;

      document.documentElement.style.setProperty("--carousel-height", `${carouselHeight}px`);
      setCarouselHeight(carouselHeight);

    } else {
      setCarouselHeight(0);
      document.documentElement.style.setProperty("--carousel-height", `0px`);
    }
  }, [paginatedTracks.length, setCarouselHeight]);

  useEffect(() => {
    const observer = new MutationObserver(updateCarouselHeight);

    if (carouselRef.current) {
      observer.observe(carouselRef.current, {
        childList: true,
        subtree: true,
      });

      updateCarouselHeight(); // Initial update
    }

    return () => {
      observer.disconnect();
    };
  }, [updateCarouselHeight]);

  useEffect(() => {
    const handleResize = () => {
      updateCarouselHeight();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateCarouselHeight]);

  useEffect(() => {
    updateCarouselHeight(); // Check height when tracks change
  }, [tracks, updateCarouselHeight]);

  const handleParticipantClick = (index: number) => {
    if (filteredTracks[index]) {
      const originalIndex = filteredTracks[index].originalIndex;
      if (onParticipantClick) {
        onParticipantClick(originalIndex);
      }
    } else {
      console.error(`Index ${index} is out of bounds for filteredTracks.`);
    }
  };

  useEffect(() => {
    const checkFocusedTrack = () => {
      if (!tracks[focusedIndex]) {
        const nextAvailableIndex = tracks.findIndex((track) => track !== undefined);
        if (nextAvailableIndex !== -1) {
          if (onParticipantClick) {
            onParticipantClick(nextAvailableIndex);
          }
        }
      }
    };

    checkFocusedTrack();
  }, [focusedIndex, tracks, onParticipantClick]);

  const hasOtherParticipants = filteredTracks.length > 0;
  const noTracksAvailable = tracks.length === 0 || !tracks.some(Boolean);

  if (noTracksAvailable) {
    return (
      <div className="enhanced-focus-layout" ref={focusRef}>
        <div className="focused-participant-container">
          <div className="camera-off-placeholder relative overflow-hidden">
            <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center">
              <div className="max-w-md px-3 flex flex-col items-center justify-center text-center">
                <motion.div
                  className="w-20 h-20 object-contain"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: [1, 0.8], opacity: [1, 0.5] }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  <Image
                    src="/logo/Logo Icon Varient.png"
                    width={200}
                    height={200}
                    alt="Pody Logo"
                  />
                </motion.div>
                <span className="text-[0.6rem] xs:text-xs text-slate-800 dark:text-slate-300">
                  Waiting for the host to join or someone to present, but you can still earn rewards while staying in the call!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="enhanced-focus-layout" ref={focusRef}>
      <div className="focused-participant-container">
        {tracks[focusedIndex] && (
          <CustomFocusLayout
            trackRef={tracks[focusedIndex]}
            onParticipantClick={() => handleParticipantClick(focusedIndex)}
          />
        )}
      </div>

      {hasOtherParticipants && (
        <div className="participant-carousel" ref={carouselRef}>
          {pagination.tracks.map((trackItem, index) => (
            <ParticipantCustomTile
              key={index}
              trackRef={trackItem}
              onClick={() => handleParticipantClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
