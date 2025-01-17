import { motion } from "framer-motion";

export const SkeletonTopThree = () => (
    <div className="flex flex-row gap-x-1 justify-center mb-12">
      {[1, 2, 3].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className={`w-28 relative flex flex-col items-center ${
            index === 2 ? "mt-0 scale-110" : "mt-10"
          }`}
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-slate-700 shadow-lg animate-pulse"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-500 animate-pulse"></div>
          </div>
          <div className="h-4 w-20 bg-slate-500 rounded mt-4 animate-pulse"></div>
          <div className="h-3 w-16 bg-slate-500 rounded mt-2 animate-pulse"></div>
        </motion.div>
      ))}
    </div>
  );