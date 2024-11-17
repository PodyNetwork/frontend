import { RoomAudioRenderer, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import React, { useMemo } from 'react';
import { EnhancedGridLayout } from '../livekitcustom/GridLayoutTile';
import { CustomRoomAudioRenderer } from '../livekitcustom/CustomAudioRenderVolume';
import { CustomStartAudio } from '../livekitcustom/CustomStartAudio';


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
    return "";
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
      <CustomRoomAudioRenderer />
      <CustomStartAudio label="Click to allow audio playback" />
    </div>
  );
};

export default StreamVideo;
