import { motion } from "framer-motion";
import { formatUnits } from "viem";
import { formatPoints } from "@/func/numberFormater";

export const PointCounter = ({
  accumulatedPoints,
}: {
  accumulatedPoints: number;
}) => {
  const formattedPoints = parseFloat(
    formatUnits(BigInt(accumulatedPoints), 18)
  );
  
  return (
    <motion.div className="flex items-center flex-row px-2 py-px bg-white/30 dark:bg-black/30 rounded-full backdrop-blur-xl __shadow_pody">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 me-1 text-red-400"
        viewBox="0 -960 960 960"
        fill="currentColor"
      >
        {formattedPoints > 100 ? (
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
  );
};
