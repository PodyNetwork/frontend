import React from "react";
import { motion } from "framer-motion";
import useGetPointsBalance from "@/hooks/point/useGetPointsBalance";
import { formatUnits } from "viem";
import useClaimPoint from "@/hooks/point/useClaimPoints";
import approx from "approximate-number";

const RewardStatistic = () => {
  const { pointsBalance } = useGetPointsBalance();

  const { points, claimedPoints } = pointsBalance ?? {};

  const claimedPointsInEther = Number(
    formatUnits(BigInt(claimedPoints ?? 0), 18)
  );
  const unclaimedPointsInEther = Number(formatUnits(BigInt(points ?? 0), 18));
  const totalPoints = unclaimedPointsInEther + claimedPointsInEther;

  const FormatedclaimedPointsInEther = Number(
    formatUnits(BigInt(claimedPoints ?? 0), 18)
  );
  const FormatedunclaimedPointsInEther = Number(
    formatUnits(BigInt(points ?? 0), 18)
  );

  const rewardData = [
    {
      title: "Total",
      value: approx(totalPoints),
      icon: "trophy",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      title: "Claimed",
      value: approx(FormatedclaimedPointsInEther),
      icon: "star",
      color: "from-amber-400 to-amber-600",
    },
    {
      title: "Unclaimed",
      value: approx(FormatedunclaimedPointsInEther) ?? 0,
      icon: "gift",
      color: "from-purple-400 to-purple-600",
    },
  ];

  const { claimPoint, loading } = useClaimPoint();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-br from-pody-dark to-pody-dark_secondary p-6 rounded-2xl shadow-xl"
    >
      <div className="flex items-center justify-between gap-2 flex-wrap mb-6">
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl font-medium text-slate-100"
        >
          Reward Points
        </motion.h1>
        {(points ?? 0) > 0 && (
          <div>
            <button
              onClick={() => {
                claimPoint.mutate();
              }}
              disabled={loading}
              className={`text-xs px-4 py-1.5 ${
                loading ? "bg-pody-mintgreen" : "bg-pody-primary"
              } text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all w-full xs:w-auto ${
                loading ? "cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Claiming..." : "Claim Points"}
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rewardData.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            className="bg-pody-dark_secondary rounded-xl p-4 flex items-center space-x-3 shadow-lg"
          >
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path
                  d={
                    item.icon === "trophy"
                      ? "M335.38-160v-40H460v-150.15q-52.85-9.47-92.5-44.2-39.65-34.73-54.58-86.11-63.46-7.46-108.19-52.04T160-640v-40q0-16.08 11.96-28.04T200-720h106.15v-80h347.7v80H760q16.08 0 28.04 11.96T800-680v40q0 62.92-44.73 107.5t-108.19 52.04q-14.93 51.38-54.58 86.11t-92.5 44.2V-200h124.62v40H335.38Zm-29.23-363.38V-680H200v40q0 45.69 30.46 78.5t75.69 38.12ZM480-389.23q55.38 0 93.85-38.46 38.46-38.46 38.46-93.85V-760H347.69v238.46q0 55.39 38.46 93.85 38.47 38.46 93.85 38.46Zm173.85-134.15q45.23-5.31 75.69-38.12Q760-594.31 760-640v-40H653.85v156.62ZM480-574.62Z"
                      : item.icon === "star"
                      ? "m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm-61 83.92 49.62-212.54-164.93-142.84 217.23-18.85L480-777.69l85.08 200.38 217.23 18.85-164.93 142.84L667-203.08 480-315.92 293-203.08ZM480-470Z"
                      : "M160-296.92v72.3q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69h590.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-72.3H160Zm24.62-381.54H318q-5-9-8.42-19-3.43-10-3.43-21 0-33.85 23.08-56.93 23.08-23.07 56.92-23.07 20.31 0 37.57 10.64t30.13 26.43l24.61 33.7 24.62-33.7q12.61-16.3 30.13-26.69 17.51-10.38 37.72-10.38 33.69 0 56.76 23.07 23.08 23.08 23.08 56.93 0 11-3.04 21t-8.81 19h136.46q27.62 0 46.12 18.5 18.5 18.5 18.5 46.11v389.23q0 27.62-18.5 46.12Q803-160 775.38-160H184.62q-27.62 0-46.12-18.5Q120-197 120-224.62v-389.23q0-27.61 18.5-46.11t46.12-18.5ZM160-383.08h640v-230.77q0-9.23-7.69-16.92-7.69-7.69-16.93-7.69H542.15l79.39 109.38-31.69 22.93-111.39-151.7-111.38 151.7-31.7-22.93 78.93-109.38H184.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.92v230.77Zm226.15-295.38q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5Zm184.62 0q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5Z"
                  }
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-slate-100">{item.value}</h2>
              <p className="text-xs text-slate-300 mt-1 truncate">
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-6 h-1 bg-gradient-to-r from-emerald-400 via-amber-400 to-purple-400 rounded-full"
      />
    </motion.div>
  );
};

export default RewardStatistic;
