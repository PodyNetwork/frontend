import React, { useState } from "react";
import type { TrackReferenceOrPlaceholder } from "@livekit/components-core";
import { ParticipantCustomTile } from "./ParticipantCustomTile";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface EnhancedGridLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tracks: TrackReferenceOrPlaceholder[];
  onParticipantClick?: (index: number) => void;
}

export function EnhancedGridLayout({
  tracks,
  onParticipantClick,
}: EnhancedGridLayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page for pagination
  const tracksPerPage = 4; // Number of tracks per page
  const totalPages = Math.ceil(tracks.length / tracksPerPage); // Total pages

  const noTracksAvailable = tracks.length === 0;

  const handleParticipantClick = () => {
    if (onParticipantClick) {
      onParticipantClick(currentIndex);
    }
  };

  const handleDragEnd = (event: any, info: { offset: { x: number } }) => {
    const swipeThreshold = 100; // Minimum swipe distance in pixels to change participant
    if (info.offset.x > swipeThreshold) {
      // Swipe Right
      setCurrentIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe Left
      setCurrentIndex((prev) => (prev + 1) % tracks.length);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTracks = tracks.slice(
    currentPage * tracksPerPage,
    (currentPage + 1) * tracksPerPage
  );

  if (noTracksAvailable) {
    return (
      <div className="enhanced-focus-layout">
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
    <div className="w-full h-full relative">
      {/* Mobile view (Swipeable) */}
      <div className="block sm:hidden w-full h-full overflow-hidden __video_layout_main mx-auto">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            className="w-full h-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <ParticipantCustomTile
              trackRef={tracks[currentIndex]}
              onClick={handleParticipantClick}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {tracks.map((_, index) => (
            <motion.div
              key={index}
              className={`w-1 h-1 rounded-full ${
                index === currentIndex ? "bg-slate-700" : "bg-gray-400"
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: index === currentIndex ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Desktop view (Grid Layout) */}
      <div
        className={`hidden __video_layout_main sm:grid gap-2 mx-auto text-center justify-center ${
          currentTracks.length === 1
            ? "grid-cols-1"
            : "sm:grid-cols-2 lg:grid-cols-2"
        }`}
      >
        {currentTracks.map((track, index) => (
          <ParticipantCustomTile
            key={index}
            trackRef={track}
            onClick={() => onParticipantClick?.(index)}
          />
        ))}
      </div>

      <div className="hidden">
        {/* Pagination Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>

        {/* Dots Navigation for Desktop */}
        <div className="left-0 right-0 flex justify-center space-x-2">
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <motion.div
              key={pageIndex}
              className={`w-2 h-2 rounded-full ${
                pageIndex === currentPage ? "bg-blue-500" : "bg-gray-400"
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: pageIndex === currentPage ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
