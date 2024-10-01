"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useLeaderboard from "./hooks/useLeaderboard";
import { LeaderboardEntry } from "./types";

const SkeletonLeaderboardItem = () => (
  <motion.li
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-row items-center justify-between bg-gradient-to-r from-slate-900 to-pody-dark_secondary rounded-xl px-6 py-3 mb-2 shadow-lg"
  >
    <div className="flex items-center gap-x-2">
      <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
      <div className="flex items-center gap-x-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
    <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
  </motion.li>
);

const LeaderboardItem = ({
  rank,
  username,
  points,
}: LeaderboardEntry) => (
  <motion.li
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: rank * 0.1 }}
    className="flex flex-row items-center justify-between bg-gradient-to-r from-slate-900 to-pody-dark_secondary rounded-xl px-3 sm:px-6 py-3 mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex items-center gap-x-2 flex-grow min-w-0">
      <div className="text-base sm:text-lg font-bold text-slate-300 w-6 flex-shrink-0">{rank}</div>
      <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0">
        <Image
          src={"/avatar/user6.png"}
          width={56}
          height={56}
          alt={username}
          className="rounded-full w-6 h-6 sm:w-8 sm:h-8 object-cover border-2 border-pody-ptext-pody-primary shadow-md flex-shrink-0"
        />
        <h3 className="text-xs sm:text-sm text-white truncate">{username}</h3>
      </div>
    </div>
    <div className="flex-shrink-0 ml-2">
      <p className="text-xs sm:text-sm flex flex-row items-center gap-x-1 font-bold text-pody-primary whitespace-nowrap">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
          viewBox="0 -960 960 960"
          style={{ msFilter: "" }}
          fill="currentColor"
        >
          <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm-61 83.92 49.62-212.54-164.93-142.84 217.23-18.85L480-777.69l85.08 200.38 217.23 18.85-164.93 142.84L667-203.08 480-315.92 293-203.08ZM480-470Z"/>
        </svg>{" "}
        {points}
      </p>
    </div>
  </motion.li>
);

const SkeletonTopThree = () => (
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
          <div className="w-20 h-20 rounded-full bg-gray-300 shadow-lg animate-pulse"></div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-400 animate-pulse"></div>
        </div>
        <div className="h-4 w-20 bg-gray-300 rounded mt-4 animate-pulse"></div>
        <div className="h-3 w-16 bg-gray-300 rounded mt-2 animate-pulse"></div>
      </motion.div>
    ))}
  </div>
);

const TopThree = ({ data }: { data: LeaderboardEntry[] }) => {
  if (data.length === 0) {
    return <SkeletonTopThree />;
  }

  return (
    <div className="flex flex-row gap-x-1 justify-center mb-12">
      {data.map((item, index) => {
        return (
          <motion.div
            key={item.rank}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`w-28 relative flex flex-col items-center ${
              index === 0 ? "mt-0 scale-110" : "mt-10"
            }`}
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 shadow-lg">
                <Image
                  src={"/avatar/user6.png"}
                  alt={`Top ${item.rank}`}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-pody-primary flex items-center justify-center shadow-lg">
                <span className="text-base font-bold text-white">
                  {item.rank}
                </span>
              </div>
            </div>
            <h2 className="font-medium text-base mt-4 text-slate-800">
              {item.username}
            </h2>
            <p className="text-sm text-pody-primary font-semibold">
              {item.points} 
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

const Page = () => {
  const { leaderboard, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useLeaderboard();

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <main className="w-full">
      <div className="w-full bg-pody-primary/20 p-8 sm:p-8 md:p-12">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6">
          <div className="w-full sm:w-5/12 mb-6 sm:mb-0">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl text-slate-800 text-center sm:text-left">
                Leaderboard Top performer of the week
              </h2>
            </motion.div>
          </div>
          <div className="w-6/12 flex justify-center">
            {isLoading ? <SkeletonTopThree /> : <TopThree data={leaderboard.slice(0, 3)} />}
          </div>
        </div>
      </div>
      <div className="max-w-sm sm:max-w-md lg:max-w-lg mx-auto py-6 sm:py-8 px-4 sm:px-0">
        <div>
          {isLoading && !isFetchingNextPage ? (
            Array(5).fill(0).map((_, index) => <SkeletonLeaderboardItem key={index} />)
          ) : leaderboard.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No leaderboard data available.</p>
          ) : (
            <ul>
              {leaderboard.map((item) => (
                <LeaderboardItem key={item.rank} {...item} />
              ))}
            </ul>
          )}
          {isFetchingNextPage && 
            Array(5).fill(0).map((_, index) => <SkeletonLeaderboardItem key={`loading-${index}`} />)
          }
          {isError && (
            <p className="text-center text-red-500 py-4">An error occurred while fetching more data. Please try again.</p>
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
        </div>
      </div>
    </main>
  );
};

export default Page;
