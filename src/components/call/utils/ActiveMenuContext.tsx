import React, { createContext, useContext, useState, ReactNode } from 'react';

// Centralized context for tracking which menu is open
interface ActiveMenuContextType {
  activeMenu: string | null; // Track which menu is active
  setActiveMenu: (menu: string | null) => void; // Set the active menu
}

const ActiveMenuContext = createContext<ActiveMenuContextType | undefined>(undefined);

const ActiveMenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <ActiveMenuContext.Provider value={{ activeMenu, setActiveMenu }}>
      {children}
    </ActiveMenuContext.Provider>
  );
};

const useActiveMenu = (): ActiveMenuContextType => {
  const context = useContext(ActiveMenuContext);
  if (!context) {
    throw new Error('useActiveMenu must be used within an ActiveMenuProvider');
  }
  return context;
};

export { ActiveMenuProvider, useActiveMenu };
