import React from "react";
import { motion } from "framer-motion";
import useCallStats from "@/hooks/call/useCallStats";

const LinkStatisticsSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-700 p-6 rounded-xl h-full relative flex flex-col w-full"
    >
      <motion.h1
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        className="text-xl font-semibold text-slate-300 mb-4"
      >
        Loading Statistics...
      </motion.h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:w-48"
        >
          <div className="flex items-center gap-x-3.5 mb-4">
            <div className="text-5xl font-bold text-slate-300 tracking-tighter">
              --%
            </div>
            <div className="text-xs text-slate-500">
              Loading <br /> Link Usage
            </div>
          </div>
          <div className="h-2 w-full flex gap-x-1 overflow-hidden">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ width: 0 }}
                animate={{ width: "30%" }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`h-full bg-slate-500 rounded-full`}
              />
            ))}
          </div>
        </motion.div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-slate-600 rounded-xl p-4 flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-full bg-slate-500 flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="M424.62-316.92H283.08q-67.68 0-115.38-47.69Q120-412.3 120-479.96t47.7-115.39q47.7-47.73 115.38-47.73h141.54v40H283.08q-50.77 0-86.93 36.16Q160-530.77 160-480t36.15 86.92q36.16 36.16 86.93 36.16h141.54v40ZM340-460v-40h280v40H340Zm195.38 143.08v-40h141.54q50.77 0 86.93-36.16Q800-429.23 800-480t-36.15-86.92q-36.16-36.16-86.93-36.16H535.38v-40h141.54q67.68 0 115.38 47.69Q840-547.7 840-480.04t-47.7 115.39q-47.7 47.73-115.38 47.73H535.38Z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-300">--</h2>
              <p className="text-sm text-slate-400 mt-1">Loading...</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const LinkStatistics = () => {
  const { stats, isLoading } = useCallStats();

  const statItems = [
    {
      title: "Active Link",
      value: stats?.activeCalls ?? 0,
      color: "bg-pody-success",
      svg: "M424.62-316.92H283.08q-67.68 0-115.38-47.69Q120-412.3 120-479.96t47.7-115.39q47.7-47.73 115.38-47.73h141.54v40H283.08q-50.77 0-86.93 36.16Q160-530.77 160-480t36.15 86.92q36.16 36.16 86.93 36.16h141.54v40ZM340-460v-40h280v40H340Zm195.38 143.08v-40h141.54q50.77 0 86.93-36.16Q800-429.23 800-480t-36.15-86.92q-36.16-36.16-86.93-36.16H535.38v-40h141.54q67.68 0 115.38 47.69Q840-547.7 840-480.04t-47.7 115.39q-47.7 47.73-115.38 47.73H535.38Z",
    },
    {
      title: "Inactive Link",
      value: stats?.inactiveLinks ?? 0,
      color: "bg-pody-danger",
      svg: "M740.77-329.69 710-360.92q40.77-11 65.38-44.04Q800-438 800-480q0-50.77-35.77-86.92-35.77-36.16-85.77-36.16H533.85v-40h144.61q66.85 0 114.19 47.73Q840-547.62 840-480q0 49.31-27.58 89.23-27.57 39.92-71.65 61.08ZM612.46-460l-40-40h46v40h-6ZM819.69-83.69l-736-736L112-848l736 736-28.31 28.31ZM426.15-316.92H283.08q-67.62 0-115.35-47.73Q120-412.38 120-480q0-64.38 43.92-111.08 43.93-46.69 107.62-50.61H290l38.62 38.61h-45.54q-50.77 0-86.93 36.16Q160-530.77 160-480t36.15 86.92q36.16 36.16 86.93 36.16h143.07v40ZM341.54-460v-40h90.38l39 40H341.54Z",
    },
    {
      title: "Total Link",
      value: stats?.totalLinks ?? 0,
      color: "bg-[#ff802e]",
      svg: "M424.62-316.92H283.08q-67.68 0-115.38-47.69Q120-412.3 120-479.96t47.7-115.39q47.7-47.73 115.38-47.73h141.54v40H283.08q-50.77 0-86.93 36.16Q160-530.77 160-480t36.15 86.92q36.16 36.16 86.93 36.16h141.54v40ZM340-460v-40h280v40H340Zm195.38 143.08v-40h141.54q50.77 0 86.93-36.16Q800-429.23 800-480t-36.15-86.92q-36.16-36.16-86.93-36.16H535.38v-40h141.54q67.68 0 115.38 47.69Q840-547.7 840-480.04t-47.7 115.39q-47.7 47.73-115.38 47.73H535.38Z",
    },
    {
      title: "Schedule",
      value: stats?.scheduledCalls ?? 0,
      color: "bg-[#f06db5]",
      svg: "m625.85-305.85 28.3-28.3L500-488.33V-680h-40v208.31l165.85 165.84ZM480.13-120q-74.67 0-140.41-28.34-65.73-28.34-114.36-76.92-48.63-48.58-76.99-114.26Q120-405.19 120-479.87q0-74.67 28.34-140.41 28.34-65.73 76.92-114.36 48.58-48.63 114.26-76.99Q405.19-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.67-28.34 140.41-28.34 65.73-76.92 114.36-48.58 48.63-114.26 76.99Q554.81-120 480.13-120ZM480-480Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"
    },
  ];

  const calculateTotalLinkUsage = () => {
    if (!stats || stats.totalLinks === 0) return 0;
    return Math.round((stats.activeCalls / stats.totalLinks) * 100);
  };

  const totalLinkUsage = calculateTotalLinkUsage();

  if (isLoading) return <LinkStatisticsSkeleton />;

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
            <div className="text-5xl font-bold text-slate-200 tracking-tighter">
              {totalLinkUsage}%
            </div>
            <div className="text-xs text-slate-400">
              Total <br /> Link Usage
            </div>
          </div>
          <div className="h-2 w-full flex gap-x-1 overflow-hidden">
            {statItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ width: 0 }}
                animate={{
                  width: `${(item.value / (stats?.totalLinks || 1)) * 100}%`,
                }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`h-full ${item.color} rounded-full`}
              />
            ))}
          </div>
        </motion.div>
        <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-pody-dark_secondary rounded-xl p-4 flex flex-col items-center"
            >
              <div
                className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mb-3`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d={item.svg} />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-200">
                {item.value}
              </h2>
              <p className="text-sm text-slate-300 mt-1">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LinkStatistics;
