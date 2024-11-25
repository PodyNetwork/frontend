import useLeaderboard from '@/app/dashboard/leaderboard/hooks/useLeaderboard';
import { useRouter } from 'next/navigation';
import React from 'react'
import { formatUnits } from 'viem';
import LoadingSkeleton from './LoadingSkeleton';
import TopUser from './TopUser';
import approx from "approximate-number";

const RewardStatCTA = () => {
    const { leaderboard, fetchNextPage, isLoading } = useLeaderboard();
    const handleLoadMore = () => {
      fetchNextPage();
    };
  
    const router = useRouter();
  
    const goToLeaderboard = () => {
      router.push("/dashboard/leaderboard");
    };
  
    const totalPoints = leaderboard.reduce(
      (sum, user) => sum + user.totalPoints,
      0
    );
  return (
    <div className="relative flex flex-row gap-x-4 items-center mt-auto">
              <div>
                <h2 className="text-3xl font-bold">
                  {approx(Number(formatUnits(BigInt(totalPoints ?? 0), 18)), {
                    decimal: false,
                  })}
                </h2>
                <p className="text-xs font-medium mt-1">
                  Total Points <br /> accumulated
                </p>
              </div>
              <div className="flex flex-row items-center bg-slate-100 rounded-full p-1.5">
                <div className="flex flex-row items-center -space-x-4">
                  {isLoading ? (
                    <LoadingSkeleton />
                  ) : (
                    leaderboard
                      .slice(0, 3)
                      .map((user, index) => (
                        <TopUser key={index} data={user} index={index} />
                      ))
                  )}
                </div>
                <button
                  onClick={goToLeaderboard}
                  className="w-10 h-10 ms-3 bg-slate-200 text-slate-700 hover:text-slate-500 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 m-auto"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
                  </svg>
                </button>
              </div>
            </div>
  )
}

export default RewardStatCTA