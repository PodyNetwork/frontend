import { createContext, Dispatch, SetStateAction, useContext } from 'react';

// Define the type for your context
type MyContextType = {
  isChatOpen: boolean;
  setIsChatOpen: Dispatch<SetStateAction<boolean>>;
};

// Create the context with undefined as the initial value
export const MyContext = createContext<MyContextType | undefined>(undefined);

// Create a custom hook to use the context safely
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContext.Provider");
  }
  return context;
};
