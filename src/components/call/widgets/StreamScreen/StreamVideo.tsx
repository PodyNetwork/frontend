import { RoomAudioRenderer, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useMemo } from "react";
import { CustomStartAudio } from "../../livekitcustom/CustomStartAudio";
import { EnhancedGridLayout } from "../GridLayout/GridLayoutTile";
import AudioPlaybackCheck from "../Audio/AudioPlayback";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import { useParams } from "next/navigation";

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
  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
      });
      navigator.mediaSession.setActionHandler('pause', () => {
      });
      
      navigator.mediaSession.metadata = new MediaMetadata({
        title: call?.title || 'Classroom Session',
        artist: 'Classroom Session',
        artwork: [
          { src: '/logo/Pody Logo Icon 002.jpg', sizes: '96x96', type: 'image/png' },
        ]
      });
    }

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          await navigator.wakeLock.request('screen');
        }
      } catch (err) {
        console.error('Wake Lock error:', err);
      }
    };

    requestWakeLock();
  }, [call?.title]);
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
