import React, { createContext, useContext, useState, ReactNode } from "react";
import type { TrackReferenceOrPlaceholder } from "@livekit/components-core";

interface PaginationContextProps {
  currentPage: number;
  totalPages: number;
  currentTracks: TrackReferenceOrPlaceholder[];
  tracksPerPage: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  setPage: (pageIndex: number) => void;
}

const PaginationContext = createContext<PaginationContextProps | undefined>(
  undefined
);

export const PaginationProvider = ({
  children,
  tracks,
  tracksPerPage = 4,
}: {
  children: ReactNode;
  tracks: TrackReferenceOrPlaceholder[];
  tracksPerPage?: number;
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(tracks.length / tracksPerPage);

  const currentTracks = tracks.slice(
    currentPage * tracksPerPage,
    (currentPage + 1) * tracksPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const setPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        totalPages,
        currentTracks,
        tracksPerPage,
        goToNextPage,
        goToPreviousPage,
        setPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};
