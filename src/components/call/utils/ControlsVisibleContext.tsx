import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ControlMenuContextType {
    isControlsVisible: boolean;
    showControls: () => void;
    hideControls: () => void;
}

const ControlMenuContext = createContext<ControlMenuContextType | undefined>(undefined);

const ControlMenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isControlsVisible, setIsControlsVisible] = useState(false);

    const showControls = () => setIsControlsVisible(true);
    const hideControls = () => setIsControlsVisible(false);

    return (
        <ControlMenuContext.Provider value={{ isControlsVisible, showControls, hideControls }}>
            {children}
        </ControlMenuContext.Provider>
    );
};

const useControlVisibleMenu = (): ControlMenuContextType => {
    const context = useContext(ControlMenuContext);
    if (!context) {
        throw new Error('useControlVisibleMenu must be used within a ControlMenuProvider');
    }
    return context;
};

export { ControlMenuProvider, useControlVisibleMenu };
