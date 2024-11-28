import { getTrackReferenceId, isLocal } from '@livekit/components-core';
import { Track } from 'livekit-client';
import * as React from 'react';
import { AudioTrack, useTracks } from '@livekit/components-react';

/** @public */
export interface RoomAudioRendererProps {
  volume?: number;
  muted?: boolean;
}


export function CustomRoomAudioRenderer({ volume, muted }: RoomAudioRendererProps) {
  const tracks = useTracks(
    [Track.Source.Microphone, Track.Source.ScreenShareAudio, Track.Source.Unknown],
    {
      updateOnlyOn: [],
      onlySubscribed: true,
    },
  ).filter((ref) => !isLocal(ref.participant) && ref.publication.kind === Track.Kind.Audio);

  return (
    <div style={{ display: 'none' }}>
      {tracks.map((trackRef) => (
        <AudioTrack
          key={getTrackReferenceId(trackRef)}
          trackRef={trackRef}
          volume={volume}
          muted={muted}
        />
      ))}
    </div>
  );
}
