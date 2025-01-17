import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useActiveMenu } from './ActiveMenuContext';

interface GiftMenuContextType {
  isGiftOpen: boolean;
  openGiftMenu: () => void;
  closeGiftMenu: () => void;
}

const GiftMenuContext = createContext<GiftMenuContextType | undefined>(undefined);

const GiftMenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activeMenu, setActiveMenu } = useActiveMenu(); // Use active menu context
  const [isGiftOpen, setIsOpen] = useState(false);

  const openGiftMenu = () => {
    setActiveMenu('gift'); 
    setIsOpen(true); 
  };

  const closeGiftMenu = () => {
    if (activeMenu === 'gift') {
      setIsOpen(false); 
      setActiveMenu(null); 
    }
  };

  React.useEffect(() => {
    if (activeMenu !== 'gift') {
      setIsOpen(false);
    }
  }, [activeMenu]);

  return (
    <GiftMenuContext.Provider value={{ isGiftOpen, openGiftMenu, closeGiftMenu }}>
      {children}
    </GiftMenuContext.Provider>
  );
};

const useGiftMenu = (): GiftMenuContextType => {
  const context = useContext(GiftMenuContext);
  if (!context) {
    throw new Error('useGiftMenu must be used within a GiftMenuProvider');
  }
  return context;
};

export { GiftMenuProvider, useGiftMenu };
