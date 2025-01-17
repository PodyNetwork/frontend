import React, { useRef } from 'react';
import { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import { VideoTrack } from '@livekit/components-react';
import { usePictureInPicture } from './usePictureInPicture';

interface CustomPiPProps {
  track: TrackReferenceOrPlaceholder;
}

const CustomPiP: React.FC<CustomPiPProps> = ({ track }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isPiPActive, enterPiP, exitPiP } = usePictureInPicture(videoRef);

  return (
    <div className="custom-pip-container">
      <video ref={videoRef} autoPlay playsInline muted className="custom-pip-video">
        {track.publication && <VideoTrack trackRef={track} />}
      </video>
      <div className="custom-pip-controls">
        <button onClick={isPiPActive ? exitPiP : enterPiP}>
          {isPiPActive ? 'Exit PiP' : 'Enter PiP'}
        </button>
      </div>
    </div>
  );
};

export default CustomPiP;