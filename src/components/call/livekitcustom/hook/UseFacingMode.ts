import { useEffect, useState } from 'react';

type FacingMode = 'user' | 'environment';

const useFacingMode = (): [FacingMode, (newFacingMode: FacingMode) => Promise<void>] => {
  const [facingMode, setFacingMode] = useState<FacingMode>('user'); // Default to front camera

  const switchCamera = async (newFacingMode: FacingMode): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newFacingMode },
      });

      const tracks = stream.getVideoTracks();

      // If the local participant has a video track, stop it and replace it
      if (tracks.length > 0) {
        // Convert NodeList to array
        const localTracks = Array.from(document.querySelectorAll('video')).map((video) => {
          const mediaStream = video.srcObject as MediaStream; // Type assertion
          return mediaStream?.getVideoTracks()[0]; // Access video tracks
        });

        localTracks.forEach((track) => {
          track?.stop(); // Stop each track if it exists
        });

        const videoElement = document.querySelector('video') as HTMLVideoElement;
        if (videoElement) {
          videoElement.srcObject = stream; // Set the new stream
        }
      }

      setFacingMode(newFacingMode); // Update the facing mode
    } catch (error) {
      console.error('Error switching camera:', error);
    }
  };

  useEffect(() => {
    // Cleanup function to stop video tracks when the component unmounts
    return () => {
      const localStream = document.querySelector('video')?.srcObject as MediaStream;
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return [facingMode, switchCamera];
};

export default useFacingMode;
