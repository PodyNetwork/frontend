import React, { createContext, useContext, useState, useCallback } from 'react';

interface ParticipantPermission {
  canSpeak: boolean;
  canVideo: boolean;
  canShare: boolean;
  isAdmin?: boolean;
}

interface ParticipantPermissionsContextProps {
  permissions: Record<string, ParticipantPermission>;
  updatePermissions: (participantId: string, newPermissions: ParticipantPermission) => void;
}

const ParticipantPermissionsContext = createContext<ParticipantPermissionsContextProps | undefined>(undefined);

export const ParticipantPermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permissions, setPermissions] = useState<Record<string, ParticipantPermission>>({});

  const updatePermissions = useCallback((participantId: string, newPermissions: ParticipantPermission) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [participantId]: newPermissions,
    }));
  }, []);

  return (
    <ParticipantPermissionsContext.Provider value={{ permissions, updatePermissions }}>
      {children}
    </ParticipantPermissionsContext.Provider>
  );
};

export const useParticipantPermissions = () => {
  const context = useContext(ParticipantPermissionsContext);
  if (!context) {
    throw new Error('useParticipantPermissions must be used within a ParticipantPermissionsProvider');
  }
  return context;
};