import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
interface GiftMenuContextType {
    isGiftOpen: boolean;
    openGiftMenu: () => void;
    closeGiftMenu: () => void;
}

// Create the context
const GiftMenuContext = createContext<GiftMenuContextType | undefined>(undefined);

// Create a provider component
const GiftMenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isGiftOpen, setIsOpen] = useState(false);

    const openGiftMenu = () => setIsOpen(true);
    const closeGiftMenu = () => setIsOpen(false);

    return (
        <GiftMenuContext.Provider value={{ isGiftOpen, openGiftMenu, closeGiftMenu }}>
            {children}
        </GiftMenuContext.Provider>
    );
};

// Custom hook to use the GiftMenuContext
const useGiftMenu = (): GiftMenuContextType => {
    const context = useContext(GiftMenuContext);
    if (!context) {
        throw new Error('useGiftMenu must be used within a GiftMenuProvider');
    }
    return context;
};

export { GiftMenuProvider, useGiftMenu };
