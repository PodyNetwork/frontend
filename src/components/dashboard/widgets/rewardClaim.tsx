"use client";
import React from "react";
import { motion } from "framer-motion";
import useGetPointsHistory from "@/hooks/point/useGetPointsHistory";

const RewardClaim = () => {
  const { pointsHistory } = useGetPointsHistory({});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex pb-4 w-full flex-col rounded-3xl"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex h-fit w-full items-center justify-between rounded-t-2xl pb-[20px] pt-4"
      >
        <h4 className="text-base sm:text-lg text-slate-700 dark:text-slate-800 font-medium">
          Rewards
        </h4>
        <button className="text-sm px-4 py-1.5 bg-pody-primary text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all w-full xs:w-auto">Claim Points</button>
      </motion.div>
      <div className="gap-4">
        <ul className="space-y-3 sm:space-y-4">
          {pointsHistory.map((item, index) => (
            <motion.li
              key={item._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="flex flex-row items-center justify-between bg-white rounded-xl px-3 sm:px-6 py-3 mb-2 __shadow_pody transition-shadow duration-300"
            >
              <motion.div
                className="flex items-center gap-x-2 flex-grow min-w-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
              >
                <div className="text-base text-slate-500 w-6 flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0">
                  <h3 className="text-xs sm:text-sm text-slate-800 truncate">
                    {item.points} points
                  </h3>
                </div>
              </motion.div>
              <div>
                <motion.h5
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                  className="font-medium text-sm text-slate-500"
                >
                  {item.timeCreated.toString()}
                </motion.h5>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default RewardClaim;
