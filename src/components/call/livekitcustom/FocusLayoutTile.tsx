import * as React from "react";
import type { TrackReferenceOrPlaceholder } from "@livekit/components-core";
import { ParticipantCustomTile } from "./ParticipantCustomTile";
import { useSwipe } from "@livekit/components-react";
import { CustomFocusLayout } from "./CustomFocusLayout";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParticipantCustomTileNoIcon } from "./ParticipantCustomTileNoIcon";

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

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(paginatedTracks.length / itemsPerPage);

  const getCurrentPageTracks = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return paginatedTracks.slice(start, end);
  };

  const focusRef = useRef<HTMLDivElement>(null);

  useSwipe(focusRef, {
    onLeftSwipe: () => handleNext(),
    onRightSwipe: () => handlePrev(),
  });

  const handleParticipantClick = (index: number) => {
    const trackIndex = currentPage * itemsPerPage + index;
    if (filteredTracks[trackIndex]) {
      const originalIndex = filteredTracks[trackIndex].originalIndex;
      if (onParticipantClick) {
        onParticipantClick(originalIndex);
      }
    } else {
      console.error(`Index ${index} is out of bounds for filteredTracks.`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const checkFocusedTrack = () => {
      if (!tracks[focusedIndex]) {
        const nextAvailableIndex = tracks.findIndex(
          (track) => track !== undefined
        );
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
                  Waiting for the host to join or someone to present, but you
                  can still earn rewards while staying in the call!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full __stream_vid_screen flex flex-row gap-x-2 justify-center items-center">
        <div
          className="h-full __video_layout_main relative flex-1 flex flex-col justify-center"
          ref={focusRef}
        >
          {tracks[focusedIndex] && (
            <CustomFocusLayout
              trackRef={tracks[focusedIndex]}
              onParticipantClick={() => handleParticipantClick(focusedIndex)}
            />
          )}
        </div>
        {hasOtherParticipants && (
          <div className="h-full relative w-[230px] flex flex-col gap-y-2 justify-center">
            {getCurrentPageTracks().map((trackItem, index) => (
              <div
                key={index}
                className="__carousel_videoHeight w-full flex flex-col justify-center bg-slate-200 rounded-md"
              >
                <ParticipantCustomTileNoIcon
                  trackRef={trackItem}
                  onClick={() => handleParticipantClick(index)}
                />
              </div>
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center flex-col gap-x-2 mt-2">
                <div className="flex items-center gap-x-1">
                  {Array.from({ length: totalPages }).map((_, pageIndex) => (
                    <span
                      key={pageIndex}
                      className={`w-2 h-2 rounded-full ${
                        pageIndex === currentPage ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex flex-row items-center gap-x-2 text-sm mt-2">
                  <button
                    className="bg-blue-300 px-2 py-1 rounded"
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                  >
                    Prev
                  </button>

                  <button
                    className="bg-blue-300 px-2 py-1 rounded"
                    onClick={handleNext}
                    disabled={currentPage >= totalPages - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
