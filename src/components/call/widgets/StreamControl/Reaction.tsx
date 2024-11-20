import React, { useState, useRef, useReducer, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDataChannel } from "@livekit/components-react";

type ReactionType = {
  id: string;
  emoji: string;
  offset: { x: number; y: number };
};

const emojis = [
  "1F44D",
  "1F44E",
  "1F44F",
  "1F602",
  "1F608",
  "1F625",
  "1F639",
  "1F389",
];

const REACTION_DURATION = 2000;
const DEBOUNCE_DURATION = 200;

// Reducer for managing reactions
const reactionsReducer = (state: ReactionType[], action: any) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((reaction) => reaction.id !== action.payload);
    default:
      return state;
  }
};

const Reaction = () => {
  const [reactions, dispatch] = useReducer(reactionsReducer, []);
  const popoverRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const { send } = useDataChannel("reaction", (msg) => {
    const reaction: ReactionType = JSON.parse(
      new TextDecoder().decode(msg.payload)
    );
    addReaction(reaction);
  });

  const addReaction = (reaction: ReactionType) => {
    dispatch({ type: "ADD", payload: reaction });
    setTimeout(() => {
      dispatch({ type: "REMOVE", payload: reaction.id });
    }, REACTION_DURATION);
  };

  const handleEmojiClick = (emoji: string) => {
    if (!popoverRef.current) return;

    const newReaction: ReactionType = {
      id: crypto.randomUUID(),
      emoji,
      offset: { x: 0, y: -30 },
    };

    // Debounce the send function
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      send(new TextEncoder().encode(JSON.stringify(newReaction)), {});
    }, DEBOUNCE_DURATION);

    addReaction(newReaction);
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <div
            ref={popoverRef}
            className="bg-white dark:bg-[#202124] h-10 w-10 rounded-full flex justify-center items-center text-slate-400 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="M616.24-527.69q21.84 0 37.03-15.29 15.19-15.28 15.19-37.11t-15.28-37.02q-15.28-15.2-37.12-15.2-21.83 0-37.02 15.29-15.19 15.28-15.19 37.11t15.28 37.02q15.28 15.2 37.11 15.2Zm-272.3 0q21.83 0 37.02-15.29 15.19-15.28 15.19-37.11t-15.28-37.02q-15.28-15.2-37.11-15.2-21.84 0-37.03 15.29-15.19 15.28-15.19 37.11t15.28 37.02q15.28 15.2 37.12 15.2ZM480-272.31q62.61 0 114.46-35.04 51.85-35.04 76.46-92.65H289.08q24.61 57.61 76.46 92.65 51.85 35.04 114.46 35.04Zm.07 172.31q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100ZM480-480Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
            </svg>
          </div>
        </PopoverTrigger>
        <PopoverContent className="rounded-full px-3 py-2 flex w-auto border-none shadow-none dark:bg-[#202124] __shadow_pody mb-1.5">
          <div
            className="flex flex-row items-center gap-x-4 cursor-pointer select-none"
            onContextMenu={(e) => e.preventDefault()}
            style={{ userSelect: "none" }}
          >
            {emojis.map((hex) => {
              const emoji = String.fromCodePoint(parseInt(hex, 16));
              return (
                <p
                  key={hex}
                  className="text-[1.45rem] text-muted-foreground"
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji}
                </p>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {reactions.map(({ id, emoji, offset }) => {
            const randomX = Math.random() * 60 - 30;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 1, x: offset.x, y: offset.y }}
                animate={{
                  opacity: 1,
                  x: offset.x + randomX,
                  y: offset.y - 100,
                  scale: 1.4,
                }}
                exit={{
                  opacity: 0,
                  scale: 1,
                  transition: { duration: 0.5 },
                }}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${offset.x}px)`,
                  top: `calc(50% + ${offset.y}px)`,
                }}
                transition={{ duration: 1.5 }}
              >
                <span className="text-[1.6rem]">{emoji}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reaction;
