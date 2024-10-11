"use client";
import React from "react";
import { motion } from "framer-motion";
import useGetPointsHistory from "@/hooks/point/useGetPointsHistory";
import { formatUnits } from "viem";

const RewardClaimSkeleton = () => {
  return <div className="flex flex-col items-center justify-center gap-4">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center gap-4"
    >
      <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
      <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
      <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
    </motion.div>
  </div>
}

const RewardClaim = () => {

  const { pointsHistory, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } = useGetPointsHistory()

  const handleLoadMore = () => {
    fetchNextPage();
  };

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
              className="flex items-center justify-between bg-white p-3 sm:p-4 rounded-lg __shadow_pody"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-7 sm:h-7 text-pody-primary"
                  viewBox="0 -960 960 960"
                  style={{ msFilter: "" }}
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3, type: "spring" }}
                >
                  <path d="M160-296.92v72.3q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69h590.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-72.3H160Zm24.62-381.54H318q-5-9-8.42-19-3.43-10-3.43-21 0-33.85 23.08-56.93 23.08-23.07 56.92-23.07 20.31 0 37.57 10.64t30.13 26.43l24.61 33.7 24.62-33.7q12.61-16.3 30.13-26.69 17.51-10.38 37.72-10.38 33.69 0 56.76 23.07 23.08 23.08 23.08 56.93 0 11-3.04 21t-8.81 19h136.46q27.62 0 46.12 18.5 18.5 18.5 18.5 46.11v389.23q0 27.62-18.5 46.12Q803-160 775.38-160H184.62q-27.62 0-46.12-18.5Q120-197 120-224.62v-389.23q0-27.61 18.5-46.11t46.12-18.5ZM160-383.08h640v-230.77q0-9.23-7.69-16.92-7.69-7.69-16.93-7.69H542.15l79.39 109.38-31.69 22.93-111.39-151.7-111.38 151.7-31.7-22.93 78.93-109.38H184.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.92v230.77Zm226.15-295.38q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5Zm184.62 0q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5Z" />
                </motion.svg>
                <div>
                  <motion.h5
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                    className="font-medium text-sm sm:text-base text-slate-800"
                  >
                    {item.timeCreated.toString()}
                  </motion.h5>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                    className="text-xs sm:text-sm text-slate-400 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 sm:w-5 sm:h-5 text-pody-primary"
                      viewBox="0 -960 960 960"
                      style={{ msFilter: "" }}
                      fill="currentColor"
                    >
                      <path d="M480-160q-140.23 0-230.12-35.73Q160-231.46 160-287.69V-680q0-49.85 93.58-84.92Q347.15-800 480-800t226.42 35.08Q800-729.85 800-680v392.31q0 56.23-89.88 91.96Q620.23-160 480-160Zm0-444.38q85.92 0 173.23-23.97 87.31-23.96 104.46-52.19-16.38-29.77-102.81-54.61Q568.46-760 480-760q-87.15 0-174.65 23.96t-104.58 52.42q16.31 30 103.04 54.62 86.73 24.62 176.19 24.62Zm0 201.3q41.23 0 81-4t76.04-11.88q36.27-7.89 67.38-19.66 31.12-11.76 55.58-26.53V-629q-24.46 14.77-55.58 26.54-31.11 11.77-67.38 19.65-36.27 7.89-76.04 11.89-39.77 4-81 4-42.77 0-83.15-4.39-40.39-4.38-76.27-12.27-35.89-7.88-66.5-19.27Q223.46-614.23 200-629v163.85q23.46 14.77 54.08 26.15 30.61 11.38 66.5 19.27 35.88 7.88 76.27 12.27 40.38 4.38 83.15 4.38ZM480-200q51.38 0 97.73-5.85 46.35-5.84 83.27-16.57 36.92-10.73 62.77-25.62 25.85-14.88 36.23-32.19v-144.92q-24.46 14.77-55.58 26.53-31.11 11.77-67.38 19.66-36.27 7.88-76.04 11.88-39.77 4-81 4-42.77 0-83.15-4.38-40.39-4.39-76.27-12.27-35.89-7.89-66.5-19.27-30.62-11.38-54.08-26.15V-280q10.38 18.08 36.12 32.46 25.73 14.39 62.65 25.12t83.38 16.57Q428.62-200 480-200Z" />
                    </svg>{" "}
                    {item.points} points
                  </motion.p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
      {isFetchingNextPage && (
        <RewardClaimSkeleton/>
      )}
      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            className="bg-pody-primary text-white px-4 py-2 rounded-md hover:bg-pody-primary/80 transition-colors duration-300"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default RewardClaim;
