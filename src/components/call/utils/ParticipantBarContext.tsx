import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useActiveMenu } from './ActiveMenuContext';

interface ParticipantBarContextType {
  participantBarIsExpanded: boolean;
  toggleParticipantBar: () => void;
  isParticipantBarVisible: boolean;
  hideParticipantBar: () => void;
  showParticipantBar: () => void;
}

const ParticipantBarContext = createContext<ParticipantBarContextType | undefined>(undefined);

const ParticipantBarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activeMenu, setActiveMenu } = useActiveMenu(); 
  const [participantBarIsExpanded, setParticipantBarIsExpanded] = useState(false);
  const [isParticipantBarVisible, setIsParticipantBarVisible] = useState(true);

  const toggleParticipantBar = () => {
    const newState = !participantBarIsExpanded;
    setParticipantBarIsExpanded(newState);
    if (newState) {
      setActiveMenu('participantBar');
    } else {
      setActiveMenu(null); 
    }
  };

  const hideParticipantBar = () => {
    setIsParticipantBarVisible(false); 
    setActiveMenu(null);
  };

  const showParticipantBar = () => {
    setIsParticipantBarVisible(true);
    setActiveMenu('participantBar'); 
  };

  // Effect to close participant bar if activeMenu isn't 'participantBar'
  React.useEffect(() => {
    if (activeMenu !== 'participantBar') {
      setIsParticipantBarVisible(false); // Close participant bar if another menu is open
    }

    if (!activeMenu) {
      setIsParticipantBarVisible(true); // Ensure it's visible
    }
  }, [activeMenu]);

  return (
    <ParticipantBarContext.Provider
      value={{
        participantBarIsExpanded,
        toggleParticipantBar,
        isParticipantBarVisible,
        hideParticipantBar,
        showParticipantBar,
      }}
    >
      {children}
    </ParticipantBarContext.Provider>
  );
};

const useParticipantBar = () => {
  const context = useContext(ParticipantBarContext);
  if (!context) {
    throw new Error('useParticipantBar must be used within a ParticipantBarProvider');
  }
  return context;
};

export { ParticipantBarProvider, useParticipantBar };
