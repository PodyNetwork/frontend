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
      const isFullscreen =
        document.fullscreenElement !== null || (document as any).webkitFullscreenElement !== null;
      setIsFullscreen(isFullscreen);
    };
  
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari on iOS
  
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari on iOS
    };
  }, []);
  

  const enterFullscreen = () => {
    const docElement = document.documentElement; // Use the full page element
    if (docElement.requestFullscreen) {
      docElement.requestFullscreen();
    } else if ((docElement as any).webkitRequestFullscreen) {
      (docElement as any).webkitRequestFullscreen(); // Safari on iOS
    } else {
      console.warn('Fullscreen API is not supported on this device/browser.');
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen(); // iOS Safari
    } else {
      console.warn('Exit Fullscreen API is not supported on this device/browser.');
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
