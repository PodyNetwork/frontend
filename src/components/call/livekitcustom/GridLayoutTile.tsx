import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { TrackReferenceOrPlaceholder } from "@livekit/components-core";
import { ParticipantCustomTile } from "./ParticipantCustomTile";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
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
  const [showPinbar, setShowPinbar] = useState(false);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hidePinbarTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const availableTracks = tracks.filter(
    (track) => track?.source && track?.participant
  );

  const calculateHeights = useCallback(() => {
    if (paginationRef.current) {
      const height = paginationRef.current.offsetHeight;
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

  const resetPinbarTimeout = () => {
    setShowPinbar(true); // Show the pinbar when the mouse moves
    if (hidePinbarTimeoutRef.current) {
      clearTimeout(hidePinbarTimeoutRef.current); // Clear previous timeout if any
    }
    hidePinbarTimeoutRef.current = setTimeout(() => {
      setShowPinbar(false); // Hide the pinbar after 1500ms of no mouse movement
    }, 1500);
  };

  useEffect(() => {
    const handleMouseMove = () => resetPinbarTimeout(); // Trigger pinbar reset on mouse move
    window.addEventListener("mousemove", handleMouseMove);

    resetPinbarTimeout(); // Ensure pinbar is shown on initial load

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hidePinbarTimeoutRef.current) {
        clearTimeout(hidePinbarTimeoutRef.current); // Clean up the timeout on unmount
      }
    };
  }, []);

  const handleFocusToggle = (index: number) => {
    const track = tracks[index];

    if (!track || !track.source || !track.participant) {
      setFocusedTrackIndex(null);
      return;
    }
    setFocusedTrackIndex((prev) => {
      return prev !== null ? null : index;
    });
  };

  useEffect(() => {
    if (!availableTracks[currentIndex]) {
      const nextIndex = availableTracks.length > 0 ? 0 : -1;
      setCurrentIndex(nextIndex);
    }
  }, [availableTracks, currentIndex]);

  const handleDragEnd = (event: MouseEvent | TouchEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      setCurrentIndex((prev) =>
        prev === 0 ? availableTracks.length - 1 : prev - 1
      );
    } else if (info.offset.x < -swipeThreshold) {
      setCurrentIndex((prev) => (prev + 1) % availableTracks.length);
    }
  };

  if (noTracksAvailable) {
    return (
      <div className="enhanced-focus-layout">
        <div className="focused-participant-container">
          <div className="camera-off-placeholder relative overflow-hidden">
            <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center">
              <div className="max-w-md px-3 flex flex-col items-center justify-center text-center">
                <motion.div
                  className="w-9 h-9 object-contain"
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
                    className="w-full h-full object-contain"
                    width={200}
                    height={200}
                    alt="Pody Logo"
                  />
                </motion.div>
                <span className="text-[0.6rem] xs:text-xs mt-1 text-slate-800 dark:text-slate-300">
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
            {availableTracks[currentIndex] && (
              <ParticipantCustomTile
                trackRef={availableTracks[currentIndex]}
                onClick={() => onParticipantClick?.(currentIndex)}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dots Navigation */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
          {availableTracks.map((_, index) => (
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
        {(focusedTrackIndex !== null && tracks[focusedTrackIndex]
          ? [tracks[focusedTrackIndex]]
          : currentTracks
        ).map((track, index) => (
          <div
            className="relative __video_controlled_height items-center grid grid-cols-1 justify-center __bg_screen__card"
            key={index}
          >
            {track && track.source && track.participant && (
              <ParticipantCustomTile
                trackRef={track}
                onClick={() => onParticipantClick?.(index)}
              />
            )}
            {tracks.length > 1 && (
              <button
                className={`absolute hidden sm:block top-[10px] cursor-pointer z-50 right-[10px] text-slate-500 transition-opacity duration-300 ${
                  showPinbar ? "opacity-100" : "opacity-0"
                }`}
                onClick={() => handleFocusToggle(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  className="w-5 h-5"
                  fill="currentColor"
                >
                  {focusedTrackIndex !== null ? (
                    <path d="M660-820v60h-40v307l-60-60v-247H400v87l-64.31-64.31-20.3-43H300V-820h360ZM480-90l-30-30v-220H268.46v-60L340-471.54v-62.92l-254.77-256 42.16-42.15 689.84 689.84-43.39 42.15L534.46-340H510v220l-30 30ZM354-400h121.23l-74-73.23L400-446l-46 46Zm126-193Zm-78.77 119.77Z" />
                  ) : (
                    <path d="M620-471.54 691.54-400v60H510v220l-30 30-30-30v-220H268.46v-60L340-471.54V-760h-40v-60h360v60h-40v288.46ZM354-400h252l-46-46v-314H400v314l-46 46Zm126 0Z" />
                  )}
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
      {/* Pagination & controls desktop */}
      {focusedTrackIndex === null && tracks.length > 4 && (
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
