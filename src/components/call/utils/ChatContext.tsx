import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useActiveMenu } from './ActiveMenuContext';

type ChatContextType = {
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activeMenu, setActiveMenu } = useActiveMenu(); // Use active menu context
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const openChat = () => {
    setActiveMenu('chat'); // Set active menu to 'chat'
    setIsChatOpen(true); // Open the Chat menu
  };

  const closeChat = () => {
    if (activeMenu === 'chat') {
      setIsChatOpen(false); // Close the Chat menu
      setActiveMenu(null); // Reset active menu
    }
  };

  const toggleChat = () => {
    const newState = !isChatOpen;
    setIsChatOpen(newState);
    if (newState) {
      setActiveMenu('chat'); // Set active menu to 'chat' when opened
    } else {
      setActiveMenu(null); // Reset active menu when closed
    }
  };

  // Effect to close the chat menu if activeMenu is not 'chat'
  React.useEffect(() => {
    if (activeMenu !== 'chat') {
      setIsChatOpen(false);
    }
  }, [activeMenu]);

  return (
    <ChatContext.Provider value={{ isChatOpen, openChat, closeChat, toggleChat }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatContext.Provider');
  }
  return context;
};

export { ChatContextProvider, useChatContext };
