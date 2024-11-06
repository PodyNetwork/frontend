import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ParticipantBarContextType {
  participantBarIsExpanded: boolean;
  toggleParticipantBar: () => void;
  isParticipantBarVisible: boolean;
  hideParticipantBar: () => void;
  showParticipantBar: () => void;
}

const ParticipantBarContext = createContext<ParticipantBarContextType | undefined>(undefined);

interface ParticipantBarProviderProps {
  children: ReactNode;
}

export const ParticipantBarProvider = ({ children }: ParticipantBarProviderProps) => {
  const [participantBarIsExpanded, setParticipantBarIsExpanded] = useState(false);
  const [isParticipantBarVisible, setIsParticipantBarVisible] = useState(false);

  const toggleParticipantBar = useCallback(() => {
    setParticipantBarIsExpanded((prev) => !prev);
  }, []);

  const hideParticipantBar = useCallback(() => {
    setIsParticipantBarVisible(false);
  }, []);

  const showParticipantBar = useCallback(() => {
    setIsParticipantBarVisible(true);
  }, []);

  return (
    <ParticipantBarContext.Provider
      value={{ participantBarIsExpanded, toggleParticipantBar, isParticipantBarVisible, hideParticipantBar, showParticipantBar }}
    >
      {children}
    </ParticipantBarContext.Provider>
  );
};

export const useParticipantBar = () => {
  const context = useContext(ParticipantBarContext);
  if (context === undefined) {
    throw new Error("useParticipantBar must be used within a ParticipantBarProvider");
  }
  return context;
};
