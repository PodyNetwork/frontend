import { LeaderboardEntry } from "@/app/dashboard/leaderboard/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatUnits } from "viem";

export const LeaderboardItem = ({
    rank,
    username,
    totalPoints,
  }: LeaderboardEntry) => (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: rank * 0.1 }}
      className="flex flex-row items-center justify-between bg-white rounded-xl px-3 sm:px-6 py-3 mb-2 __shadow_pody transition-shadow duration-300"
    >
      <div className="flex items-center gap-x-2 flex-grow min-w-0">
        <div className="text-base text-slate-500 w-6 flex-shrink-0">{rank}</div>
        <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0">
          <Image
            src={"/avatar/user6.png"}
            width={56}
            height={56}
            alt={username}
            className="rounded-full w-6 h-6 sm:w-8 sm:h-8 object-cover border-2 border-pody-ptext-pody-primary shadow-md flex-shrink-0"
          />
          <h3 className="text-xs sm:text-sm text-slate-500 truncate">{username}</h3>
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
          {Math.round(Number(formatUnits(BigInt(totalPoints), 18)))}
        </p>
      </div>
    </motion.li>
  );