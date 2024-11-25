import React from "react";
import Image from "next/image";
import user from "/public/avatar/user1.webp";
import user2 from "/public/avatar/user2.webp";
import user3 from "/public/avatar/user3.jpeg";
import useLeaderboard from "@/app/dashboard/leaderboard/hooks/useLeaderboard";
import { LeaderboardEntry } from "@/app/dashboard/leaderboard/types";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import approx from "approximate-number";
import { formatUnits } from "viem";

const RewardSystem = () => {
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
    <section className="w-full relative" id="reward">
      <div className="flex flex-col max-w-7xl mx-auto px-5 md:px-6 pt-16 pb-32">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="w-1/2 flex flex-col">
            <div className="relative max-w-xl">
              <h2 className="text-5xl md:text-6xl leading-[1.12] font-extrabold">
                <span className="text-pody-secondary">Reward</span> system for
                Student and Teacher
              </h2>
              <p className="text-base mt-10 text-slate-500 max-w-lg">
                Students earn points based on their total time spent in a
                meeting. The longer you stay and engage, the more points you
                accumulate. Additionally, hosts receive a 10% bonus of the
                points accumulated by their students.
              </p>
            </div>
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
          </div>
          <div className="w-full md:w-1/2">
            <div className="h-full">
              <Image
                src="/abstract/rewardsystem.png"
                width={400}
                height={400}
                alt="reward system image"
                className="w-9/12 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardSystem;

const TopUser = ({ data, index }: { data: any; index: number }) => {
  return (
    <div className="relative w-10 h-10" style={{ zIndex: 30 - index * 10 }}>
      <AvatarParticipant name={data.username} />
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          className="relative w-10 h-10 bg-slate-200 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
          key={index}
        ></motion.div>
      ))}
    </>
  );
};
