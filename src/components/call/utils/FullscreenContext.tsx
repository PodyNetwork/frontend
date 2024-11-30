import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type FullscreenContextType = {
  isFullscreen: boolean;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
};

const FullscreenContext = createContext<FullscreenContextType | undefined>(undefined);

export const FullscreenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange); 
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const enterFullscreen = () => {
    const docElement = document.documentElement;

    const elementToFullscreen = document.querySelector('video') || docElement; 

    if (elementToFullscreen) {
      const el = elementToFullscreen as HTMLElement & {
        webkitRequestFullscreen?: () => void;
        mozRequestFullScreen?: () => void;
        msRequestFullscreen?: () => void;
      };

      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) { 
        el.webkitRequestFullscreen();
      } else if (el.mozRequestFullScreen) { 
        el.mozRequestFullScreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }
    }
  };

  const exitFullscreen = () => {
    const documentWithFullScreenExit = document as Document & {
      webkitExitFullscreen?: () => void;
      mozCancelFullScreen?: () => void;
      msExitFullscreen?: () => void;
    };

    if (documentWithFullScreenExit.exitFullscreen) {
      documentWithFullScreenExit.exitFullscreen();
    } else if (documentWithFullScreenExit.webkitExitFullscreen) { 
      documentWithFullScreenExit.webkitExitFullscreen();
    } else if (documentWithFullScreenExit.mozCancelFullScreen) { 
      documentWithFullScreenExit.mozCancelFullScreen();
    } else if (documentWithFullScreenExit.msExitFullscreen) {
      documentWithFullScreenExit.msExitFullscreen();
    }
  };

  return (
    <FullscreenContext.Provider value={{ isFullscreen, enterFullscreen, exitFullscreen }}>
      {children}
    </FullscreenContext.Provider>
  );
};

export const useFullscreen = (): FullscreenContextType => {
  const context = useContext(FullscreenContext);
  if (!context) {
    throw new Error('useFullscreen must be used within a FullscreenProvider');
  }
  return context;
};
