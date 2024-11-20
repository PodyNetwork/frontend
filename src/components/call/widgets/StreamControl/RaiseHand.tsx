import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RaiseHand = () => {
  const [isRaised, setIsRaised] = useState(false);

  const handleClick = () => {
    setIsRaised(true);
    setTimeout(() => setIsRaised(false), 1500); // Dismiss after 1.5 seconds
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="bg-white dark:bg-[#202124] h-10 w-10 rounded-full flex justify-center items-center text-slate-400 cursor-pointer relative"
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
      <div className="fixed">
        <AnimatePresence>
          {isRaised && (
            <motion.div
              className="bg-blue-500 block text-white px-3 py-2 rounded-md shadow-lg text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -40 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                top: "0%",
                left: "50%",
                transform: "translate(-50%, -100%)",
              }}
            >
              Hand Raised
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RaiseHand;
