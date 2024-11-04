import * as React from "react";
import type { TrackReferenceOrPlaceholder } from "@livekit/components-core";
import { ParticipantCustomTile } from "./ParticipantCustomTile";
import { useSwipe, usePagination } from "@livekit/components-react";
import { CustomFocusLayout } from "./CustomFocusLayout";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCarouselHeight } from "../utils/CarouselHeightContext";
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
  const [showCarousel, setShowCarousel] = useState(true); // State to toggle carousel visibility
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
    if (carouselRef.current && showCarousel) {
      const hasParticipants = paginatedTracks.length > 0;
      const carouselHeight = hasParticipants
        ? carouselRef.current.offsetHeight
        : 0;
      document.documentElement.style.setProperty(
        "--carousel-height",
        `${carouselHeight}px`
      );
      setCarouselHeight(carouselHeight);
    } else {
      setCarouselHeight(0);
      document.documentElement.style.setProperty("--carousel-height", `0px`);
    }
  }, [paginatedTracks.length, setCarouselHeight, showCarousel]);

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

  const [isOpen, setIsOpen] = useState(false);
  const [timer, setTimer] = useState<number | null>(null); // Set initial type here

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
    // Clear existing timer if it's being opened
    if (!isOpen) {
      clearTimeout(timer!); // Use non-null assertion since timer can be null
    }
  };

  const handleMouseEnter = () => {
    // Clear the timer if mouse enters the sidebar
    if (timer) {
      clearTimeout(timer);
      setTimer(null); // Reset timer state
    }
  };

  const handleMouseLeave = () => {
    // Set a timer to close the sidebar after 3 seconds
    const newTimer = window.setTimeout(() => {
      setIsOpen(false);
    }, 3000); // Change this duration as needed
    setTimer(newTimer); // Set the new timer ID
  };

  useEffect(() => {
    // Cleanup timer on component unmount
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

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
      <div className="enhanced-focus-layout" ref={focusRef}>
        <div className="focused-participant-container">
          {tracks[focusedIndex] && (
            <CustomFocusLayout
              trackRef={tracks[focusedIndex]}
              onParticipantClick={() => handleParticipantClick(focusedIndex)}
            />
          )}
          <button
            onClick={() => setShowCarousel(!showCarousel)}
            className="absolute top-[10px] right-[10px] text-slate-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-5 h-5"
              fill="currentColor"
            >
              {showCarousel ? (
                <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
              ) : (
                <path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {showCarousel && hasOtherParticipants && (
        <div>
          <div
            className={`absolute top-0 bg-slate-50 dark:bg-slate-800 h-screen max-h-screen z-50 left-0 py-5 flex flex-col gap-y-2 __shadow_pody transition-all duration-300 ease-in-out ${isOpen ? 'min-w-44 max-w-44 px-2' : 'w-0'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute h-full right-0 top-0 flex justify-end items-center">
              <button
                className="w-7 h-7 rounded-sm bg-pody-secondary flex flex-col items-center justify-center relative z-50 left-8"
                onClick={toggleSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-slate-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (<path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>) : (<path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>)}
                </svg>
              </button>
            </div>
            {isOpen && (
              <div className="participant-carousel h-full overflow-y-auto" ref={carouselRef}>
                {pagination.tracks.map((trackItem, index) => (
                  <ParticipantCustomTileNoIcon
                    key={index}
                    trackRef={trackItem}
                    onClick={() => handleParticipantClick(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
