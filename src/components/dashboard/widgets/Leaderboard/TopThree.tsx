import { SkeletonTopThree } from "./SkeletonTopThree";
import { formatUnits } from "viem";
import { LeaderboardEntry } from "@/app/dashboard/leaderboard/types";
import { motion } from "framer-motion";
import { formatNumber } from "@/lib/formatNumber";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";

export const TopThree = ({ data }: { data: LeaderboardEntry[] }) => {
  if (data.length === 0) {
    return <SkeletonTopThree />;
  }

  return (
    <div className="flex flex-row gap-x-1 justify-center mb-12">
      {[1, 0, 2].map((index) => {
        const item = data[index];
        return (
          <motion.div
            key={item.rank}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`w-24 relative flex flex-col items-center ${
              index === 0 ? "mt-0 scale-110" : "mt-10"
            }`}
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 shadow-lg">
                <AvatarParticipant name={item.username} />
              </div>
              <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-pody-primary flex items-center justify-center shadow-lg">
                <span className="text-sm font-bold text-white">
                  {item.rank}
                </span>
              </div>
            </div>
            <h2 className="font-medium text-sm mt-2 text-slate-800">
              {item.username}
            </h2>
            <p className="text-sm text-pody-primary font-semibold truncate">
              {formatNumber(
                Number(formatUnits(BigInt(item.totalPoints ?? 0), 18))
              )}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};
