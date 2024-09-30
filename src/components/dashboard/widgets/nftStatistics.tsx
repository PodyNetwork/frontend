import React from "react";
import { motion } from "framer-motion";

const NftStatistics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-pody-dark rounded-2xl relative flex flex-col w-full"
    >
      <div className="__bg_nftcontainer w-full min-h-72 rounded-2xl">
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-md"
          >
            <motion.h2
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-white text-4xl font-bold mb-3"
            >
              NFT Collection & Milestones
            </motion.h2>
            <motion.p
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white text-lg mt-2"
            >
              Unlock unique NFTs as you achieve your goals
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default NftStatistics;
