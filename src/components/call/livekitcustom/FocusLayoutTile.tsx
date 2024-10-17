import * as React from "react";
import type { TrackReferenceOrPlaceholder } from "@livekit/components-core";
import { ParticipantCustomTile } from "./ParticipantCustomTile";
import { useSwipe, usePagination } from "@livekit/components-react";
import { CustomFocusLayout } from "./CustomFocusLayout";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-unused-expressions */
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
  ...props
}: EnhancedFocusLayoutProps) {
  const filteredTracks = tracks
    .map((track, index) => ({ track, originalIndex: index })) // Map to keep track of original index
    .filter(({ originalIndex }) => originalIndex !== focusedIndex);

  const paginatedTracks = filteredTracks.map(({ track }) => track);

  const pagination = usePagination(paginatedTracks.length, paginatedTracks); // Handle pagination

  const focusRef = useRef<HTMLDivElement>(null);

  useSwipe(focusRef, {
    onLeftSwipe: pagination.nextPage,
    onRightSwipe: pagination.prevPage,
  });

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

  React.useEffect(() => {
    const checkFocusedTrack = () => {
      if (!tracks[focusedIndex]) {
        // Find the next available track
        const nextAvailableIndex = tracks.findIndex(
          (track) => track !== undefined
        );
        if (nextAvailableIndex !== -1) {
          // Update the focusedIndex to the next available track
          onParticipantClick && onParticipantClick(nextAvailableIndex);
        } else {
          console.warn("No available tracks to focus.");
        }
      }
    };

    checkFocusedTrack();
  }, [focusedIndex, tracks, onParticipantClick]);

  const [isLandscape, setIsLandscape] = useState(true); // Default orientation
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setIsLandscape(width >= height);
      }
    });

    const videoElement = focusRef.current;
    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [focusRef]);

  const hasOtherParticipants = filteredTracks.length > 0;

  // Check if there are no tracks available
  const noTracksAvailable = tracks.length === 0 || !tracks.some(Boolean);

  // Avoid rendering the layout if no tracks are available
  if (noTracksAvailable) {
    return (
      <div
      className={`enhanced-focus-layout ${
        isLandscape ? "focus_landscape" : "focus_portrait"
      }`}
      ref={focusRef}
    >
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
              <span className="text-[0.6rem] xs:text-xs text-slate-800">
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
    <div
      className={`enhanced-focus-layout ${
        isLandscape ? "focus_landscape" : "focus_portrait"
      }`}
      ref={focusRef}
    >
      <div className="focused-participant-container">
        {/* Display the focused participant */}
        {tracks[focusedIndex] && (
          <CustomFocusLayout
            trackRef={tracks[focusedIndex]}
            onParticipantClick={() => handleParticipantClick(focusedIndex)}
          />
        )}
      </div>

      {/* Display other participants in a carousel only if there are any */}
      {hasOtherParticipants && (
        <div className="participant-carousel">
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
