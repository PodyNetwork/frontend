import React, { createContext, useContext, useState, useCallback } from 'react';

interface ParticipantPermissionsContextProps {
  permissions: Record<string, any>;
  updatePermissions: (participantId: string, newPermissions: any) => void;
}

const ParticipantPermissionsContext = createContext<ParticipantPermissionsContextProps | undefined>(undefined);

export const ParticipantPermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permissions, setPermissions] = useState<Record<string, any>>({});

  const updatePermissions = useCallback((participantId: string, newPermissions: any) => {
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