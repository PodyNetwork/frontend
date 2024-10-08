import * as React from 'react';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import { ParticipantCustomTile } from './ParticipantCustomTile';
import { useSwipe, usePagination } from '@livekit/components-react';
import { CustomFocusLayout } from './CustomFocusLayout';

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
  const pagination = usePagination(tracks.length, tracks); // Handle pagination
  const focusRef = React.createRef<HTMLDivElement>();

  useSwipe(focusRef, {
    onLeftSwipe: pagination.nextPage,
    onRightSwipe: pagination.prevPage,
  });

  const handleParticipantClick = (index: number) => {
    if (onParticipantClick) {
      onParticipantClick(index);
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
  const hasOtherParticipants = tracks.length > 1;

  return (
    <div className="enhanced-focus-layout" ref={focusRef}>
      <div className="focused-participant-container">
        {/* Display the focused participant */}
        {tracks[focusedIndex] && ( // Check if the focusedIndex is valid
          <CustomFocusLayout
            trackRef={tracks[focusedIndex]} // Pass the trackRef explicitly
            onParticipantClick={() => handleParticipantClick(focusedIndex)}
          />
        )}
      </div>
        
      {/* Display other participants in a carousel only if there are more than one */}
      {hasOtherParticipants && (
        <div className="participant-carousel">
          {pagination.tracks.map((track, index) => (
            <ParticipantCustomTile 
              key={index} 
              trackRef={track} 
              onClick={() => handleParticipantClick(index)} // Click handler for participant tiles
            />
          ))}
        </div>
      )}
    </div>
  );
}
