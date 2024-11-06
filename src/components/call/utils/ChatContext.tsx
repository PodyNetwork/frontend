import { createContext, useContext, useState, ReactNode } from 'react';

type ChatContextType = {
  isChatOpen: boolean;
  toggleChat: () => void; // Only the toggle function to control the chat state
};

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContext.Provider");
  }
  return context;
};

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Function to toggle the chat open/close
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <ChatContext.Provider value={{ isChatOpen, toggleChat }}>
      {children}
    </ChatContext.Provider>
  );
};
