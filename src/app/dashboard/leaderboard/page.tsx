"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import useLeaderboard from "./hooks/useLeaderboard";
import noLeaderboardError from "/public/illustration/wormies noleaderboard.svg";
import { SkeletonLeaderboardItem } from "@/components/dashboard/widgets/Leaderboard/SkeletonLeaderboardItem";
import { SkeletonTopThree } from "@/components/dashboard/widgets/Leaderboard/SkeletonTopThree";
import { TopThree } from "@/components/dashboard/widgets/Leaderboard/TopThree";
import { LeaderboardItem } from "@/components/dashboard/widgets/Leaderboard/LeaderboardItem";

const Page = () => {
  const { leaderboard, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useLeaderboard();
  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <main className="w-full">
      <div className="w-full bg-pody-primary/20 p-6 md:p-12">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6">
          <div className="w-full sm:w-6/12 mb-6 sm:mb-0">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl text-slate-800 text-center sm:text-left">
                Leaderboard top performer, with points updated in real-time.
              </h2>
            </motion.div>
          </div>
          <div className="w-6/12 flex justify-center">
            {isLoading ? <SkeletonTopThree /> : <TopThree data={leaderboard.slice(0, 3)} />}
          </div>
        </div>
      </div>
      <div className="max-w-sm sm:max-w-md lg:max-w-2xl mx-auto py-6 sm:py-8 px-4 sm:px-0">
        <div>
          {isLoading && !isFetchingNextPage ? (
            Array(5).fill(0).map((_, index) => <SkeletonLeaderboardItem key={index} />)
          ) : leaderboard.length === 0 ? (
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
              <div className="w-full md:w-4/12">
                <p className="break-words text-lg sm:text-xl">No leaderboard data available, create classroom to start earning points</p>
              </div>
              <div className="w-full md:w-7/12">
                <Image src={noLeaderboardError} className="w-full h-64 object-contain" width={300} height={300} alt="user" />
              </div>
            </div>
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