import { motion } from "framer-motion";
import { Address, formatUnits, parseUnits } from "viem";
import { formatPoints } from "@/func/numberFormater";
import { getHashRate } from "@/utils/passport";
import Image from "next/image";
import { useEffect, useState } from "react";
import useProfile from "@/hooks/user/useProfile";

export const PointCounter = ({
  accumulatedPoints,
}: {
  accumulatedPoints: number;
}) => {
  const formattedPoints = parseFloat(
    formatUnits(BigInt(accumulatedPoints), 18)
  );

  const [hashRate, setHashRate] = useState<number>(Number(parseUnits("1", 18)));
  const {profile} = useProfile()


  useEffect(() => {
    const interval = setInterval(() => {
      if (!profile || !profile?.walletAddress) return;
      const walletAddress = profile.walletAddress as Address;

      const _getHashRate = async () => {
        setHashRate(Number(await getHashRate({ walletAddress })));
      };
      _getHashRate();

      return () => {
        clearInterval(interval);
      };
    }, 3600000);
  }, [profile]);

  return (
    <div className="flex items-center gap-2">
      <motion.div className="flex items-center flex-row px-2 py-px bg-white/30 dark:bg-black/30 rounded-full backdrop-blur-xl __shadow_pody">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 me-1 text-red-400"
          viewBox="0 -960 960 960"
          fill="currentColor"
        >
          {formattedPoints > 10000 ? (
            <path d="M480-151.54 103.85-603.08 212.31-820h535.38l108.46 216.92L480-151.54ZM352.69-620h254.62l-80-160h-94.62l-80 160ZM460-237.62V-580H175.69L460-237.62Zm40 0L784.31-580H500v342.38ZM651.69-620h150.62l-80-160H571.69l80 160Zm-494 0h150.62l80-160H237.69l-80 160Z" />
          ) : (
            <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm-61 83.92 49.62-212.54-164.93-142.84 217.23-18.85L480-777.69l85.08 200.38 217.23 18.85-164.93 142.84L667-203.08 480-315.92 293-203.08ZM480-470Z" />
          )}
        </svg>

        <motion.span
          className="text-transparent bg-clip-text bg-gradient-to-r from-pody-primary via-purple-500 to-pody-secondary"
          style={{
            filter: "drop-shadow(0 0 5px rgba(255, 105, 180, 0.5))",
          }}
          animate={{
            textShadow: [
              "0 0 5px rgba(255, 105, 180, 0.5)",
              "0 0 10px rgba(238, 130, 238, 0.5)",
              "0 0 15px rgba(75, 0, 130, 0.5)",
              "0 0 20px rgba(255, 105, 180, 0.5)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {formatPoints(accumulatedPoints)}
        </motion.span>
      </motion.div>
      <div className="flex gap-x-1 gap-y-1.5 items-center text-xs font-medium text-slate-600">
        <Image
          src="/svg/3d-fire.svg"
          width={30}
          height={30}
          className="size-3 flame"
          alt="fire svg"
        />
        {Number(process.env.NEXT_PUBLIC_POINT_BOOST ?? 1) > 1 && (
          <p className="font-medium web3-gradient-text">
            {Number(process.env.NEXT_PUBLIC_POINT_BOOST ?? 1) * hashRate }x Booster
          </p>
        )}
      </div>
    </div>
  );
};
