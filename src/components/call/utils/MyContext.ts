import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type MyContextType = {
  isChatOpen: boolean;
  setIsChatOpen: Dispatch<SetStateAction<boolean>>;
};

export const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContext.Provider");
  }
  return context;
};
