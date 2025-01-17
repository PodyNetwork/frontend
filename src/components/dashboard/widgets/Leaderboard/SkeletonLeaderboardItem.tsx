import { motion } from "framer-motion";

export const SkeletonLeaderboardItem = () => (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-row items-center justify-between bg-slate-700 rounded-xl px-6 py-3 mb-2 shadow-lg"
    >
      <div className="flex items-center gap-x-2">
        <div className="w-6 h-6 bg-slate-500 rounded animate-pulse"></div>
        <div className="flex items-center gap-x-3">
          <div className="w-8 h-8 bg-slate-500 rounded-full animate-pulse"></div>
          <div className="w-20 h-4 bg-slate-500 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="w-16 h-4 bg-slate-500 rounded animate-pulse"></div>
    </motion.li>
  );