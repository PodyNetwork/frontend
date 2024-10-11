import { RoomAudioRenderer, useTracks } from '@livekit/components-react';
import { Track } from "livekit-client";
import React, { useState } from 'react'
import { EnhancedFocusLayout } from '../livekitcustom/FocusLayoutTile';

const MyVideoConference = () => {
    const tracks = useTracks(
      [
        { source: Track.Source.Camera, withPlaceholder: true },
        { source: Track.Source.ScreenShare, withPlaceholder: false },
      ],
      { onlySubscribed: false }
    ).filter((track) => track.participant.permissions?.canPublish);
  
    const [focusedIndex, setFocusedIndex] = useState(0); // Manage focused participant state
  
    const handleParticipantClick = (index: number) => {
      setFocusedIndex(index); // Update focused index on click
    };
  
    return (
      // <GridLayout
      //   tracks={tracks}
      // >
      //   <ParticipantCustomTile />
      // </GridLayout>
      <EnhancedFocusLayout
        tracks={tracks}
        focusedIndex={focusedIndex}
        onParticipantClick={handleParticipantClick}
      />
    );
  };

const StreamVideo = () => {
  return (
    <div className="w-full flex flex-wrap gap-3 my-auto">
        <MyVideoConference />
        <RoomAudioRenderer />
      </div>
  )
}

export default StreamVideo