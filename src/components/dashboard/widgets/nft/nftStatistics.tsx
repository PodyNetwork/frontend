import React from "react";
import { motion } from "framer-motion";

const NftStatistics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-pody-dark rounded-xl relative flex flex-col w-full"
    >
      <div className="__bg_nftcontainer w-full min-h-60 rounded-2xl flex flex-col justify-center">
        <div className="p-8 max-w-md">
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
              className="text-white text-3xl font-semibold mb-3"
            >
              Pody NFT
            </motion.h2>
            <motion.p
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white text-sm mt-2"
            >
              Unlock unique NFTs, each NFT increase your Points earnings per second.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default NftStatistics;
