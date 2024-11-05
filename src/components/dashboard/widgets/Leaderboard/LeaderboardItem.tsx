import { LeaderboardEntry } from "@/app/dashboard/leaderboard/types";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import { motion } from "framer-motion";
import { formatUnits } from "viem";
import approx from 'approximate-number'

export const LeaderboardItem = ({
    rank,
    username,
    totalPoints,
  }: LeaderboardEntry) => (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-row items-center justify-between bg-white rounded-xl px-3 sm:px-6 py-3 mb-2 __shadow_pody transition-shadow duration-300"
    >
      <div className="flex items-center gap-x-2 flex-grow min-w-0">
        <div className="text-base text-slate-500 w-6 flex-shrink-0">{rank}</div>
        <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 ">
              <AvatarParticipant name={username || "Unknown User"} />
          </div>
          <h3 className="text-xs sm:text-sm text-slate-500 truncate">{username}</h3>
        </div>
      </div>
      <div className="flex-shrink-0 ml-2">
        <p className="text-xs sm:text-sm flex flex-row items-center gap-x-1 font-bold text-pody-primary whitespace-nowrap">
          {approx(Number(formatUnits(BigInt(totalPoints), 18)), {decimal: true})}
        </p>
      </div>
    </motion.li>
  );