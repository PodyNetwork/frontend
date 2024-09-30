import React from "react";
import { motion } from "framer-motion";
import useCallStats from "@/hooks/call/useCallStats";

const LinkStatistics = () => {
  const { stats, isLoading, isError } = useCallStats();

  const statItems = [
    { title: "Active Link", value: stats?.activeCalls ?? 0, color: "bg-pody-primary" },
    { title: "Inactive Link", value: stats?.inactiveLinks ?? 0, color: "bg-[#50c889]" },
    { title: "Total Link", value: stats?.totalLinks ?? 0, color: "bg-[#ff802e]" },
    { title: "Schedule", value: stats?.scheduledCalls ?? 0, color: "bg-[#f06db5]" },
  ];

  const calculateTotalLinkUsage = () => {
    if (!stats || stats.totalLinks === 0) return 0;
    return Math.round((stats.activeCalls / stats.totalLinks) * 100);
  };

  const totalLinkUsage = calculateTotalLinkUsage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-pody-dark p-6 rounded-xl h-full relative flex flex-col w-full"
    >
      <motion.h1
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        className="text-xl font-semibold text-slate-200 mb-4"
      >
        Meeting Statistics
      </motion.h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:w-48"
        >
          <div className="flex items-center gap-x-3.5 mb-4">
            <div className="text-5xl font-bold text-slate-200 tracking-tighter">{totalLinkUsage}%</div>
            <div className="text-xs text-slate-400">
              Total <br /> Link Usage
            </div>
          </div>
          <div className="h-2 w-full flex gap-x-1 rounded-full overflow-hidden">
            {statItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / (stats?.totalLinks || 1)) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`h-full ${item.color}`}
              />
            ))}
          </div>
        </motion.div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-pody-dark_secondary rounded-xl p-4 flex flex-col items-center"
            >
              <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mb-3`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="M424.62-316.92H283.08q-67.68 0-115.38-47.69Q120-412.3 120-479.96t47.7-115.39q47.7-47.73 115.38-47.73h141.54v40H283.08q-50.77 0-86.93 36.16Q160-530.77 160-480t36.15 86.92q36.16 36.16 86.93 36.16h141.54v40ZM340-460v-40h280v40H340Zm195.38 143.08v-40h141.54q50.77 0 86.93-36.16Q800-429.23 800-480t-36.15-86.92q-36.16-36.16-86.93-36.16H535.38v-40h141.54q67.68 0 115.38 47.69Q840-547.7 840-480.04t-47.7 115.39q-47.7 47.73-115.38 47.73H535.38Z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-200">{item.value}</h2>
              <p className="text-sm text-slate-300 mt-1">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LinkStatistics;