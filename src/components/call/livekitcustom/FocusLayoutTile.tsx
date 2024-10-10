import * as React from 'react';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import { ParticipantCustomTile } from './ParticipantCustomTile';
import { useSwipe, usePagination } from '@livekit/components-react';
import { CustomFocusLayout } from './CustomFocusLayout';
import { useEffect, useState } from 'react';

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-unused-expressions */

/** @public */
export interface EnhancedFocusLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The list of tracks to display in the focus layout. */
  tracks: TrackReferenceOrPlaceholder[];
  /** The index of the currently focused track. */
  focusedIndex: number;
  /** Callback for when a participant is clicked. */
  onParticipantClick?: (index: number) => void;
}

/**
 * The `EnhancedFocusLayout` component displays a focused participant
 * and a carousel of other participants who are not in focus.
 * It supports pagination and swipe navigation for easy participant management.
 * @public
 */
export function EnhancedFocusLayout({ tracks, focusedIndex, onParticipantClick, ...props }: EnhancedFocusLayoutProps) {
  // Filter out the focused track from the pagination tracks and keep original index
  const filteredTracks = tracks
    .map((track, index) => ({ track, originalIndex: index })) // Map to keep track of original index
    .filter(({ originalIndex }) => originalIndex !== focusedIndex);

  // Extract only the tracks for pagination
  const paginatedTracks = filteredTracks.map(({ track }) => track);

  const pagination = usePagination(paginatedTracks.length, paginatedTracks); // Handle pagination
  
  const focusRef = React.createRef<HTMLDivElement>();

  useSwipe(focusRef, {
    onLeftSwipe: pagination.nextPage,
    onRightSwipe: pagination.prevPage,
  });

  const handleParticipantClick = (index: number) => {
    const originalIndex = filteredTracks[index].originalIndex; // Get the original index of the clicked participant
    if (onParticipantClick) {
      onParticipantClick(originalIndex); // Pass the original index back
    }
  };

  // Effect to handle switching back to an available track if the focused track is not available
  React.useEffect(() => {
    const checkFocusedTrack = () => {
      if (!tracks[focusedIndex]) {
        // Find the next available track
        const nextAvailableIndex = tracks.findIndex(track => track !== undefined);
        if (nextAvailableIndex !== -1) {
          // Update the focusedIndex to the next available track
          onParticipantClick && onParticipantClick(nextAvailableIndex);
        }
      }
    };

    checkFocusedTrack();
  }, [focusedIndex, tracks, onParticipantClick]);

  // Determine if there are other participants to display
  const hasOtherParticipants = filteredTracks.length > 0;

  const [isLandscape, setIsLandscape] = useState(true); // Default orientation

  useEffect(() => {
    const videoElement = document.querySelector<HTMLVideoElement>(
      ".lk-participant-media-video"
    );

    const checkOrientation = () => {
      if (videoElement && videoElement.videoWidth > videoElement.videoHeight) {
        setIsLandscape(true);
      } else {
        setIsLandscape(false);
      }
    };

    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", checkOrientation);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadedmetadata", checkOrientation);
      }
    };
  }, []);

  return (
    <div className={`enhanced-focus-layout ${isLandscape ? 'focus_landscape' : 'focus_portrait'}`} ref={focusRef}>
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
