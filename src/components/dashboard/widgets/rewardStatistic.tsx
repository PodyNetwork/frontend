import React from "react";
import { motion } from "framer-motion";

const RewardStatistic = () => {
  const rewardData = [
    { title: "Total", value: 1000, icon: "trophy", color: "from-emerald-400 to-emerald-600" },
    { title: "Claimed", value: 2000, icon: "star", color: "from-amber-400 to-amber-600" },
    { title: "Unclaimed", value: 500, icon: "gift", color: "from-purple-400 to-purple-600" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-br from-pody-dark to-pody-dark_secondary p-6 rounded-2xl shadow-xl"
    >
      <motion.h1
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl font-bold text-slate-100 mb-6"
      >
        Reward Points
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rewardData.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            className="bg-pody-dark_secondary rounded-xl p-4 flex items-center space-x-3 shadow-lg"
          >
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d={item.icon === "trophy" 
                  ? "M335.38-160v-40H460v-150.15q-52.85-9.47-92.5-44.2-39.65-34.73-54.58-86.11-63.46-7.46-108.19-52.04T160-640v-40q0-16.08 11.96-28.04T200-720h106.15v-80h347.7v80H760q16.08 0 28.04 11.96T800-680v40q0 62.92-44.73 107.5t-108.19 52.04q-14.93 51.38-54.58 86.11t-92.5 44.2V-200h124.62v40H335.38Z" 
                  : item.icon === "star"
                  ? "m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Z"
                  : "M280-80v-366q-51-14-85.5-56T160-600v-280h80v-40h480v40h80v280q0 56-34.5 98T680-446v366H280Zm80-80h240v-286H360v286Zm-120-366h480q26 0 43-17t17-43v-200H180v200q0 26 17 43t43 17Zm240 0q-17 0-28.5-11.5T460-566q0-17 11.5-28.5T500-606q17 0 28.5 11.5T540-566q0 17-11.5 28.5T500-526Zm-320-314v-40h600v40H180Zm180 314h240-240Z"
                } />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-slate-100">
                {item.value.toLocaleString()}
              </h2>
              <p className="text-sm text-slate-300 mt-1 truncate">
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-6 h-1 bg-gradient-to-r from-emerald-400 via-amber-400 to-purple-400 rounded-full"
      />
    </motion.div>
  );
};

export default RewardStatistic;