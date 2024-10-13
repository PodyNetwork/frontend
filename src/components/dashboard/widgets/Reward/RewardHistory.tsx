import React from "react";
import { motion } from "framer-motion";

const RewardHistory = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex h-fit w-full items-center justify-between rounded-t-2xl pb-[20px] pt-4"
      >
        <h4 className="text-base text-slate-700 dark:text-slate-800 font-medium">
          History
        </h4>
      </motion.div>
      <div className="gap-4">
        <ul className="space-y-3 sm:space-y-4">
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 * 0.1, duration: 0.5 }}
            className="flex flex-row items-center justify-between bg-gray-200 rounded-xl px-3 sm:px-6 py-3 mb-2 animate-pulse"
          >
            <motion.div
              className="flex items-center gap-x-2 flex-grow min-w-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 * 0.1, duration: 0.3 }}
            >
              <div className="w-6 h-4 bg-gray-300 rounded"></div>
              <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 * 0.1, duration: 0.3 }}
            >
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </motion.div>
          </motion.li>
        </ul>
      </div>
    </>
  );
};

export default RewardHistory;
