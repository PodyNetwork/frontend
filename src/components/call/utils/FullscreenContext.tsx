import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Add type definitions for vendor prefixed properties
interface DocumentWithFullscreen extends Document {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
}

interface DocumentElementWithFullscreen extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
}

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
      const doc = document as DocumentWithFullscreen;
      const isFullscreen =
        doc.fullscreenElement !== null || doc.webkitFullscreenElement !== null;
      setIsFullscreen(isFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const enterFullscreen = () => {
    const docElement = document.documentElement as DocumentElementWithFullscreen;
    if (docElement.requestFullscreen) {
      docElement.requestFullscreen();
    } else if (docElement.webkitRequestFullscreen) {
      docElement.webkitRequestFullscreen();
    } else {
      console.warn('Fullscreen API is not supported on this device/browser.');
    }
  };

  const exitFullscreen = () => {
    const doc = document as DocumentWithFullscreen;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen(); // iOS Safari
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
