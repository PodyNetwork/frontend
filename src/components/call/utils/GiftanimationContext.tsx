import { useDataChannel } from "@livekit/components-react";
import { DataPublishOptions } from "livekit-client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AnimationData = {
  participantId: string;
  senderId: string;
  giftId: string;
  giftIcon: string;
  amount: number;
};

type GiftAnimationContextType = {
  animationData: AnimationData | null;
  setAnimationData: React.Dispatch<React.SetStateAction<AnimationData | null>>;
  send: (payload: Uint8Array, options: DataPublishOptions) => void;
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

  // Data Channel Listener for Gifts
  const { send } = useDataChannel("gift", (msg) => {
    try {
      const giftData: AnimationData = JSON.parse(new TextDecoder().decode(msg.payload));
      setAnimationData(giftData);
    } catch (error) {
      console.error("Failed to parse incoming gift message:", error);
    }
  });

  return (
    <GiftAnimationContext.Provider value={{ animationData, setAnimationData, send }}>
      {children}
    </GiftAnimationContext.Provider>
  );
};

