import { motion } from "framer-motion";

export const RewardClaimSkeleton = () => {
    const index = 0;
    return (
      <motion.li
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
        className="flex flex-row items-center justify-between bg-gray-200 rounded-xl px-3 sm:px-6 py-3 mb-2 animate-pulse"
      >
        <motion.div
          className="flex items-center gap-x-2 flex-grow min-w-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
        >
          <div className="w-6 h-4 bg-gray-300 rounded"></div>
          <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0">
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
        >
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </motion.div>
      </motion.li>
    );
};