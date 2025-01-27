import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const RewardHeader = () => {
  const [isTestnet, setIsTestnet] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const subdomain = hostname.split(".")[0];

      if (subdomain === "testnet") {
        setIsTestnet(true);
      } else {
        setIsTestnet(false);
      }
    }
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-y-4"
    >
      <motion.h2
        className="text-3xl text-slate-800 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {isTestnet ? "Testnet": "Mainnet"}{" "}
        <motion.span
          className="text-slate-500"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {" "}
          Reward
        </motion.span>{" "}
        is here Earn on every Classroom you Join
      </motion.h2>
      <p className="text-sm text-slate-600 font-normal">
        📌 Earn points for every classroom you create or join, and for friends you refer to Pody. These points will be converted to Yuzu Points.
      </p>
    </motion.div>
  );
};

export default RewardHeader;
