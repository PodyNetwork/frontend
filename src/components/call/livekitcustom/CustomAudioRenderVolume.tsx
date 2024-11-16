import { getTrackReferenceId, isLocal } from '@livekit/components-core';
import { Track } from 'livekit-client';
import * as React from 'react';
import { AudioTrack, useTracks } from '@livekit/components-react';

/** @public */
export interface RoomAudioRendererProps {
  /** Sets the volume for all audio tracks rendered by this component. By default, the range is between `0.0` and `1.0`. */
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
