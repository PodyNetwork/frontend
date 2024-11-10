import React, { createContext, useContext, useState } from "react";

interface UnreadMessageContextType {
  unreadMessageCount: number;
  setUnreadMessageCount: React.Dispatch<React.SetStateAction<number>>;
}

// Create context with the correct type for the context value
const UnreadMessageContext = createContext<UnreadMessageContextType | undefined>(undefined);

// Custom hook to use the context
export const useUnreadMessageContext = () => {
  const context = useContext(UnreadMessageContext);
  if (!context) {
    throw new Error("useUnreadMessageContext must be used within an UnreadMessageProvider");
  }
  return context;
};

// Define the type for props, including children as a ReactNode
interface UnreadMessageProviderProps {
  children: React.ReactNode;  // Type for children
}

export const UnreadMessageProvider: React.FC<UnreadMessageProviderProps> = ({ children }) => {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  return (
    <UnreadMessageContext.Provider value={{ unreadMessageCount, setUnreadMessageCount }}>
      {children}
    </UnreadMessageContext.Provider>
  );
};
