import { createContext, useContext, useState, ReactNode } from 'react';

interface DialogContextType {
  isOpen: (id: string) => boolean;
  openDialog: (id: string) => void;
  closeDialog: (id: string) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [dialogs, setDialogs] = useState<Record<string, boolean>>({});

  const isOpen = (id: string): boolean => dialogs[id] || false;

  const openDialog = (id: string): void => {
    setDialogs((prev) => ({ ...prev, [id]: true }));
  };

  const closeDialog = (id: string): void => {
    setDialogs((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <DialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};
