import { RoomAudioRenderer, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import React, { useMemo } from 'react';
import { EnhancedGridLayout } from '../livekitcustom/GridLayoutTile';

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

  const handleFocusChange = (index: number) => {
    console.log(`Participant at index ${index} was clicked`);
  };

  return (
    <EnhancedGridLayout
      tracks={filteredTracks}
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
