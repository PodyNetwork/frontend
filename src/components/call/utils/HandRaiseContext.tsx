import React, { createContext, useContext, useReducer, useState, useEffect, ReactNode } from "react";
import { useDataChannel } from "@livekit/components-react";
import useProfile from "@/hooks/user/useProfile";
import { AnimatePresence, motion } from "framer-motion";

type HandRaiseType = {
  id: string;
  raisedBy: string;
};

type HandRaiseContextType = {
  handleRaiseHand: () => void;
  isCooldown: boolean;
};

const HandRaiseContext = createContext<HandRaiseContextType | undefined>(undefined);

const HAND_RAISE_DURATION = 4500;
const HAND_RAISE_COOLDOWN = 60000;
const MAX_VISIBLE_HANDS = 3;

type HandRaiseAction =
  | { type: "ADD"; payload: HandRaiseType }
  | { type: "REMOVE" };

const handRaiseReducer = (state: HandRaiseType[], action: HandRaiseAction) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.slice(1);
    default:
      return state;
  }
};

export const HandRaiseProvider = ({ children }: { children: ReactNode }) => {
  const { profile } = useProfile();

  const [handQueue, dispatch] = useReducer(handRaiseReducer, []);
  const [visibleHands, setVisibleHands] = useState<HandRaiseType[]>([]);
  const [isCooldown, setIsCooldown] = useState(false);

  const { send } = useDataChannel("hand-raise", (msg) => {
    const handRaise: HandRaiseType = JSON.parse(
      new TextDecoder().decode(msg.payload)
    );
    dispatch({ type: "ADD", payload: handRaise });
  });

  useEffect(() => {
    if (visibleHands.length < MAX_VISIBLE_HANDS && handQueue.length > 0) {
      const nextHand = handQueue[0];
      setVisibleHands((prev) => [...prev, nextHand]);
      dispatch({ type: "REMOVE" });

      setTimeout(() => {
        setVisibleHands((prev) => prev.filter((hand) => hand.id !== nextHand.id));
      }, HAND_RAISE_DURATION);
    }
  }, [visibleHands, handQueue]);

  const handleRaiseHand = () => {
    if (isCooldown) return;

    const newHandRaise: HandRaiseType = {
      id: crypto.randomUUID(),
      raisedBy: profile?.username || "User",
    };

    send(new TextEncoder().encode(JSON.stringify(newHandRaise)), {});
    dispatch({ type: "ADD", payload: newHandRaise });

    setIsCooldown(true);
    setTimeout(() => setIsCooldown(false), HAND_RAISE_COOLDOWN);
  };

  return (
    <HandRaiseContext.Provider value={{ handleRaiseHand, isCooldown }}>
      {children}
      {/* Hand Raise Notifications */}
      <div className="fixed bottom-24 md:bottom-16 left-1/2 transform -translate-x-1/2 space-y-px w-max max-w-[75%]">
        <AnimatePresence>
          {visibleHands.map(({ id, raisedBy }) => (
            <motion.div
              key={id}
              className="bg-slate-400 text-white p-1.5 text-center text-xs rounded-full shadow-xl block max-w-sm px-3 py-2"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {raisedBy} raised their hand
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </HandRaiseContext.Provider>
  );
};

export const useHandRaise = () => {
  const context = useContext(HandRaiseContext);
  if (!context) {
    throw new Error("useHandRaise must be used within a HandRaiseProvider");
  }
  return context;
};
