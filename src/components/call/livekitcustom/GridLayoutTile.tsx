import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { TrackReferenceOrPlaceholder } from "@livekit/components-core";
import { ParticipantCustomTile } from "./ParticipantCustomTile";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface EnhancedGridLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tracks: TrackReferenceOrPlaceholder[];
  onParticipantClick?: (index: number) => void;
}
interface CustomCSSProperties extends CSSProperties {
  "--max-video-height"?: string;
  "--video-count"?: number;
}

export function EnhancedGridLayout({
  tracks,
  onParticipantClick,
}: EnhancedGridLayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const tracksPerPage = 4;
  const totalPages = Math.ceil(tracks.length / tracksPerPage);
  const [focusedTrackIndex, setFocusedTrackIndex] = useState<number | null>(
    null
  );

  const noTracksAvailable = tracks.length === 0;

  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleParticipantClick = () => {
    if (onParticipantClick) {
      onParticipantClick(currentIndex);
    }
  };

  const handleDragEnd = (event: any, info: { offset: { x: number } }) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      setCurrentIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    } else if (info.offset.x < -swipeThreshold) {
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

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePageDotClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const currentTracks = tracks.slice(
    currentPage * tracksPerPage,
    (currentPage + 1) * tracksPerPage
  );

  const limitedVideoCount = Math.min(currentTracks.length, 4);

  const paginationRef = useRef<HTMLDivElement>(null);
  const [paginationHeight, setPaginationHeight] = useState(0);

  const calculateHeights = useCallback(() => {
    if (paginationRef.current) {
      const height = paginationRef.current.offsetHeight;
      setPaginationHeight(height);

      console.log(height);

      document.documentElement.style.setProperty(
        "--pagination-height",
        `${height}px`
      );
    }
  }, []);

  useEffect(() => {
    calculateHeights();

    const handleResize = () => calculateHeights();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateHeights, tracks.length]);

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1500);
  };

  useEffect(() => {
    const handleMouseMove = () => resetControlsTimeout();
    window.addEventListener("mousemove", handleMouseMove);

    resetControlsTimeout();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, []);

  const handleFocusToggle = (index: number) => {
    setFocusedTrackIndex((prev) => {
      return prev !== null ? null : index;
    });
  };

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
              onFocusToggle={() => handleFocusToggle(0)}
              isFocused={focusedTrackIndex !== null}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dots Navigation */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
          {tracks.map((_, index) => (
            <motion.div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-slate-700" : "bg-slate-400"
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
          currentTracks.length === 1 || focusedTrackIndex !== null
            ? "grid-cols-1"
            : "sm:grid-cols-2 lg:grid-cols-2"
        }`}
        style={
          {
            "--video-count": limitedVideoCount,
          } as CustomCSSProperties
        }
      >
        {(focusedTrackIndex !== null
          ? [tracks[focusedTrackIndex]]
          : currentTracks
        ).map((track, index) => (
          <ParticipantCustomTile
              key={index}
              trackRef={track}
              onClick={() => {
                onParticipantClick?.(index);
                handleFocusToggle(index); // Ensure toggle is triggered here
              }}
              onFocusToggle={() => handleFocusToggle(index)}
              isFocused={focusedTrackIndex !== null}
            />
        ))}
      </div>
      {/* Pagination & controls desktop */}
      {tracks.length > 4 && (
        <div
          ref={paginationRef}
          className={`hidden sm:block py-2 absolute bottom-0 right-0 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-end items-center space-x-1.5 text-sm">
            <button
              onClick={handlePrevPage}
              className="px-3 py-1 bg-pody-secondary text-white rounded-md cursor-pointer disabled:bg-slate-200"
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <div className="left-0 right-0 flex justify-center space-x-2 mt-1.5">
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <motion.div
                  key={pageIndex}
                  onClick={() => handlePageDotClick(pageIndex)}
                  className={`w-1.5 h-1.5 rounded-full cursor-pointer ${
                    pageIndex === currentPage ? "bg-slate-500" : "bg-slate-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNextPage}
              className="px-3 py-1 bg-pody-secondary text-white rounded-md cursor-pointer disabled:bg-slate-200"
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
