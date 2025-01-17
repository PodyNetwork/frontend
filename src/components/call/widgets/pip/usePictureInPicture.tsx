import { useCallback, useEffect, useState } from 'react';

export function usePictureInPicture(videoRef: React.RefObject<HTMLVideoElement>) {
  const [isPiPActive, setIsPiPActive] = useState(false);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);

  const enterPiP = useCallback(async () => {
    try {
      if (videoRef.current && isMetadataLoaded && !document.pictureInPictureElement) {
        await videoRef.current.requestPictureInPicture();
        setIsPiPActive(true);
      }
    } catch (error) {
      console.error('Failed to enter Picture-in-Picture:', error);
    }
  }, [videoRef, isMetadataLoaded]);

  const exitPiP = useCallback(async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiPActive(false);
      }
    } catch (error) {
      console.error('Failed to exit Picture-in-Picture:', error);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => setIsMetadataLoaded(true);
    const handleEnterPiP = () => setIsPiPActive(true);
    const handleLeavePiP = () => setIsPiPActive(false);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('enterpictureinpicture', handleEnterPiP);
    video.addEventListener('leavepictureinpicture', handleLeavePiP);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        enterPiP();
      } else if (document.visibilityState === 'visible' && isPiPActive) {
        exitPiP();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('enterpictureinpicture', handleEnterPiP);
      video.removeEventListener('leavepictureinpicture', handleLeavePiP);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [videoRef, enterPiP, exitPiP, isPiPActive]);

  return { isPiPActive, enterPiP, exitPiP };
}