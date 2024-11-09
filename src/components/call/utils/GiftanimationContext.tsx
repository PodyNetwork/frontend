import React, { createContext, useContext, useState, ReactNode } from "react";

type AnimationData = {
  participantId: string;
  giftId: string;
  amount: number;
};

type GiftAnimationContextType = {
  animationData: AnimationData | null;
  setAnimationData: React.Dispatch<React.SetStateAction<AnimationData | null>>;
};

const GiftAnimationContext = createContext<GiftAnimationContextType | undefined>(undefined);

export const useGiftAnimation = () => {
  const context = useContext(GiftAnimationContext);
  if (!context) {
    throw new Error("useGiftAnimation must be used within a GiftAnimationProvider");
  }
  return context;
};

export const GiftAnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [animationData, setAnimationData] = useState<AnimationData | null>(null);

  return (
    <GiftAnimationContext.Provider value={{ animationData, setAnimationData }}>
      {children}
    </GiftAnimationContext.Provider>
  );
};
