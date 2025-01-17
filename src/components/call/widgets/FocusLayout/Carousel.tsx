import React, { useState } from "react";
import { ParticipantCustomTileNoIcon } from "../../livekitcustom/ParticipantCustomTileNoIcon";
import { TrackReferenceOrPlaceholder } from "@livekit/components-core";

interface CarouselProps {
  tracks: TrackReferenceOrPlaceholder[];
  itemsPerPage: number;
  onParticipantClick: (index: number) => void;
}

export function Carousel({ tracks, itemsPerPage, onParticipantClick }: CarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);

  // Filtered and paginated tracks
  const totalPages = Math.ceil(tracks.length / itemsPerPage);

  const getCurrentPageTracks = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return tracks.slice(start, end);
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

  return (
    <div className="h-full relative w-[240px] flex flex-col gap-y-2 justify-center">
      {getCurrentPageTracks().map((trackItem, index) => (
        <div
          key={index}
          className="__carousel_videoHeight w-full flex flex-col justify-center bg-slate-200 rounded-md"
        >
          <ParticipantCustomTileNoIcon
            trackRef={trackItem}
            onClick={() => onParticipantClick(index)} // Use onParticipantClick from props
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
                  pageIndex === currentPage ? "bg-slate-700" : "bg-slate-200"
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
  );
}
