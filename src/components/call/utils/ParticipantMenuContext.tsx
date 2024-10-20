"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context
interface MenuContextProps {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

// Create the context with a default value
const MenuContext = createContext<MenuContextProps | undefined>(undefined);

// Create a provider component
export const ParticipanMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <MenuContext.Provider value={{ isMenuOpen, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

// Create a custom hook to use the MenuContext
export const useParticipantMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a ParticipanMenuProvider");
  }
  return context;
};
