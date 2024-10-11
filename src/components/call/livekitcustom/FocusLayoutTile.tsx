import * as React from 'react';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import { ParticipantCustomTile } from './ParticipantCustomTile';
import { useSwipe, usePagination } from '@livekit/components-react';
import { CustomFocusLayout } from './CustomFocusLayout';
import { useEffect, useState, useRef } from 'react';

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

/**a
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

  // State to manage orientation
  const [isLandscape, setIsLandscape] = useState(true); // Default orientation

  // ResizeObserver to check orientation
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
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

  // Determine if there are other participants to display
  const hasOtherParticipants = filteredTracks.length > 0;

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
