import React, { createContext, useContext, useEffect, useState } from 'react';

interface PiPContextType {
  isPipActive: boolean;
  setIsPipActive: (active: boolean) => void;
}

const PiPContext = createContext<PiPContextType | undefined>(undefined);

export function PiPProvider({ children }: { children: React.ReactNode }) {
  const [isPipActive, setIsPipActive] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsPipActive(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <PiPContext.Provider value={{ isPipActive, setIsPipActive }}>
      {children}
    </PiPContext.Provider>
  );
}

export const usePiP = () => {
  const context = useContext(PiPContext);
  if (!context) throw new Error('usePiP must be used within PiPProvider');
  return context;
};
