import useGetReferrals from "@/hooks/referral/useGetReferral";
import React from "react";
import { motion } from "framer-motion";

const Skeleton = () => {
  const shimmerEffect = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse" as "reverse",
    },
  };

  return (
    <motion.div
      className="flex flex-row justify-between gap-x-2 __pd_light_gradient px-6 py-8 rounded-xl w-full"
      {...shimmerEffect}
    >
      <div className="text-left w-full">
        <motion.div
          className="h-4 bg-slate-300 rounded-md w-16 mb-4"
          {...shimmerEffect}
        ></motion.div>
        <motion.div
          className="h-6 bg-slate-300 rounded-md w-32"
          {...shimmerEffect}
        ></motion.div>
      </div>
      <div className="text-right w-full">
        <motion.div
          className="h-4 bg-slate-300 rounded-md w-16 mb-4"
          {...shimmerEffect}
        ></motion.div>
        <motion.div
          className="h-6 bg-slate-300 rounded-md w-32"
          {...shimmerEffect}
        ></motion.div>
      </div>
    </motion.div>
  );
};

const ReferralRank = () => {
  const { rank, totalReferralsCount, isLoading } = useGetReferrals();

  if (isLoading) return <Skeleton />;
  return (
    <div className="flex flex-row justify-between gap-x-2 __pd_light_gradient px-6 py-8 rounded-xl w-full">
      <div className="text-left">
        <div className="text-sm mb-4">My Rank</div>
        <div className="text-xl font-semibold">
          {rank === 0
            ? "Unranked"
            : `${rank}${
                [1, 2, 3].includes(rank % 10) &&
                ![11, 12, 13].includes(rank % 100)
                  ? rank % 10 === 1
                    ? "st"
                    : rank % 10 === 2
                    ? "nd"
                    : "rd"
                  : "th"
              } Place`}
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm mb-4">My Points</div>
        <div className="text-xl font-semibold">{totalReferralsCount}</div>
      </div>
    </div>
  );
};

export default ReferralRank;
