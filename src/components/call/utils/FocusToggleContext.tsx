import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FocusToggleContextType {
  handleFocusToggle: (index: number) => void;
}

// Define the prop type for the provider component
interface FocusToggleProviderProps {
  children: ReactNode; // This ensures the provider can accept children as a prop
}

const FocusToggleContext = createContext<FocusToggleContextType | undefined>(undefined);

export const FocusToggleProvider: React.FC<FocusToggleProviderProps> = ({ children }) => {
  const [focusedTrackIndex, setFocusedTrackIndex] = useState<number | null>(null);

  const handleFocusToggle = (index: number) => {
    setFocusedTrackIndex((prev) => (prev === index ? null : index));
  };

  return (
    <FocusToggleContext.Provider value={{ handleFocusToggle }}>
      {children}
    </FocusToggleContext.Provider>
  );
};

export const useFocusToggle = (): FocusToggleContextType => {
  const context = useContext(FocusToggleContext);
  if (!context) {
    throw new Error('useFocusToggle must be used within a FocusToggleProvider');
  }
  return context;
};
