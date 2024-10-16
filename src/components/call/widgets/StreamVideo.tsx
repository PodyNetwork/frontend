import { RoomAudioRenderer, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import React, { useState, useMemo } from 'react';
import { EnhancedFocusLayout } from '../livekitcustom/FocusLayoutTile';

const MyVideoConference = () => {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  const filteredTracks = useMemo(
    () => tracks.filter(track => track.participant.permissions?.canPublish),
    [tracks]
  );

  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleFocusChange = (index: number) => {
    setFocusedIndex(index); 
  };

  return (
    <EnhancedFocusLayout
      tracks={filteredTracks}
      focusedIndex={focusedIndex}
      onParticipantClick={handleFocusChange}
    />
  );
};

const StreamVideo = () => {
  return (
    <div className="w-full flex flex-wrap gap-3 my-auto">
      <MyVideoConference />
      <RoomAudioRenderer />
    </div>
  );
};

export default StreamVideo;
