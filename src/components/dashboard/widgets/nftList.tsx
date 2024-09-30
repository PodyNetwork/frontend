import React from "react";
import nftlist from "../data/nft.json";
import Image from "next/image";
import { motion } from "framer-motion";

const NftList = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {nftlist.map((nft, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.5 }}
          className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square"
          >
            <Image
              src={nft.image}
              layout="fill"
              objectFit="cover"
              alt={nft.title}
              className="rounded-t-xl"
            />
          </motion.div>
          <div className="p-4">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + 0.1 * index, duration: 0.5 }}
              className="font-semibold text-lg text-slate-800 mb-2"
            >
              {nft.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + 0.1 * index, duration: 0.5 }}
              className="text-sm text-slate-600"
            >
              {nft.desc}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + 0.1 * index, duration: 0.5 }}
              className="mt-4 flex justify-between items-center"
            >
              <span className="text-xs font-medium text-slate-500">
                #{nft.title.padStart(4, '0')}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-pody-primary text-white text-sm font-medium rounded-full hover:bg-pody-primary/80 transition-colors duration-300"
              >
                View Details
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default NftList;
