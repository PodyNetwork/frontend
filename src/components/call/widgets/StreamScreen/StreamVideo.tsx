import { RoomAudioRenderer, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useMemo } from "react";
import { CustomRoomAudioRenderer } from "../../livekitcustom/CustomAudioRenderVolume";
import { CustomStartAudio } from "../../livekitcustom/CustomStartAudio";
import { EnhancedGridLayout } from "../../livekitcustom/GridLayoutTile";
import AudioPlaybackCheck from "../Audio/AudioPlayback";


const MyVideoConference = () => {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  const filteredTracks = useMemo(
    () => tracks.filter((track) => track.participant.permissions?.canPublish),
    [tracks]
  );

  const handleFocusChange = () => {
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
    <div className="w-full flex flex-wrap gap-3 my-auto relative">
      <MyVideoConference />
      <RoomAudioRenderer />
      <CustomStartAudio label="Click to allow audio playback" />
      <AudioPlaybackCheck />
    </div>
  );
};

export default StreamVideo;
