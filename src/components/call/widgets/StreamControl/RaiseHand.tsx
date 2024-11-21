import React, { useState, useRef, useReducer, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDataChannel } from "@livekit/components-react";
import useProfile from "@/hooks/user/useProfile";

type HandRaiseType = {
  id: string;
  raisedBy: string;
};

const HAND_RAISE_DURATION = 2500; 
const HAND_RAISE_COOLDOWN = 60000;

const handRaiseReducer = (state: HandRaiseType[], action: any) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.slice(1);
    default:
      return state;
  }
};

const RaiseHand = () => {
  const { profile } = useProfile();
  
  const [handQueue, dispatch] = useReducer(handRaiseReducer, []);
  const [currentHand, setCurrentHand] = useState<HandRaiseType | null>(null); 
  const [isCooldown, setIsCooldown] = useState(false); 

  const { send } = useDataChannel("hand-raise", (msg) => {
    const handRaise: HandRaiseType = JSON.parse(
      new TextDecoder().decode(msg.payload)
    );
    dispatch({ type: "ADD", payload: handRaise });
  });

  useEffect(() => {
    if (!currentHand && handQueue.length > 0) {
      setCurrentHand(handQueue[0]); 
      dispatch({ type: "REMOVE" });
    }

    if (currentHand) {
      const timeout = setTimeout(() => {
        setCurrentHand(null);
      }, HAND_RAISE_DURATION);

      return () => clearTimeout(timeout);
    }
  }, [currentHand, handQueue]);

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
    <div>
      {/* Raise Hand Button */}
      <div
        onClick={handleRaiseHand}
        className={`bg-white dark:bg-[#202124] h-10 w-10 rounded-full flex justify-center items-center text-slate-400 cursor-pointer relative ${
          isCooldown ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 -960 960 960"
          fill="currentColor"
        >
          <path d="M480-480v-400q0-17 11.5-28.5T520-920q17 0 28.5 11.5T560-880v400h-80Zm-160 0v-360q0-17 11.5-28.5T360-880q17 0 28.5 11.5T400-840v360h-80ZM500-40q-142 0-241-99t-99-241v-380q0-17 11.5-28.5T200-800q17 0 28.5 11.5T240-760v380q0 109 75.5 184.5T500-120q109 0 184.5-75.5T760-380v-140q-17 0-28.5 11.5T720-480v160H600q-33 0-56.5 23.5T520-240v40h-80v-40q0-66 47-113t113-47h40v-400q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v207q10-3 19.5-5t20.5-2h80v220q0 142-99 241T500-40Zm40-320Z" />
        </svg>
      </div>

      {/* Hand Raise Notifications */}
      <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2">
        <AnimatePresence>
          {currentHand && (
            <motion.div
              key={currentHand.id}
              className="bg-slate-400 text-white p-1.5 text-xs rounded-full shadow-xl block px-3 py-2"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {currentHand.raisedBy} Raised their Hand
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RaiseHand;
