import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const NFTCard = () => {
  const router = useRouter();
  const goToNFT = () => {
    router.push("/dashboard/NFT");
  };
  return (
    <div className="relative flex-1 items-center justify-center flex">
      <div className="flex flex-row items-center -gap-x-10">
        <motion.div
          whileHover={{ rotate: 0, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative min-w-64 max-w-64 p-2 h-auto border-2 border-slate-600 blur-md"
        >
          <Image
            src="/nft/levelpro.png"
            className="w-full h-60 object-cover"
            width={300}
            height={300}
            alt="Pody NFT"
          />
          <div className="p-3">
            <h2 className="font-semibold text-lg">Level 1</h2>
            <p className="text-gray-600">Learn and earn</p>
            <button
              onClick={goToNFT}
              className="bg-gradient-to-r from-pody-dark_secondary to-pody-secondary text-white py-1 px-3 mt-1.5 rounded-full text-xs"
            >
              Mint NFT
            </button>
          </div>
        </motion.div>

        {/* Middle Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative min-w-64 max-w-64 p-2 h-auto border-2 border-slate-600 z-40 bg-white __shadow_pody"
        >
          <Image
            src="/nft/levelprimary.png"
            className="w-full h-60 object-cover"
            width={300}
            height={300}
            alt="Pody NFT"
          />
          <div className="p-3">
            <h2 className="font-medium text-lg">PodyNFT</h2>
            <p className="text-gray-600">Learn and earn</p>
            <button
              onClick={goToNFT}
              className="bg-gradient-to-r from-pody-dark_secondary to-pody-secondary text-white py-1 px-3 mt-1.5 rounded-full text-xs"
            >
              Mint NFT
            </button>
          </div>
        </motion.div>

        {/* Last Card with Tilt */}
        <motion.div
          whileHover={{ rotate: 0, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative min-w-64 max-w-64 p-2 h-auto border-2 border-slate-600 blur-md"
        >
          <Image
            src="/nft/levelsecondary.png"
            className="w-full h-60 object-cover"
            width={300}
            height={300}
            alt="Pody NFT"
          />
          <div className="p-3">
            <h2 className="font-semibold text-lg">Level 1</h2>
            <p className="text-gray-600">Learn and earn</p>
            <button
              onClick={goToNFT}
              className="bg-gradient-to-r from-pody-dark_secondary to-pody-secondary text-white py-1 px-3 mt-1.5 rounded-full text-xs"
            >
              Mint NFT
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NFTCard;