import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PodyNFT = () => {
  return (
    <section className="w-full relative">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-x-6 pt-8 pb-24">
        {/* Left Side */}
        <div className="w-full items-center flex flex-col py-7">
          <div className="max-w-2xl text-center space-y-4">
            <span className="text-sm font-medium text-gray-500">Pody NFT</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-snug">
              Mint <span className="text-pody-primary">Unique NFT</span> to
              increase your <span>earning power</span>.
            </h1>
            <p className="text-gray-500">
              You can increase your earnings per second by minting more NFTs
              directly from the dashboard.
            </p>
            <button className="flex mx-auto items-center space-x-2 text-indigo-600 font-semibold hover:underline">
              <span>Mint NFT</span>
              <span>→</span>
            </button>
            {/* Supported Logos */}
            <div>
              <div className="flex items-center justify-center space-x-4 pt-4">
                <Image
                  src="/partner/opencampus_logo.svg"
                  className="w-10"
                  width={300}
                  height={400}
                  alt="pody NFT"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex-1 flex-row items-center justify-center flex">
          {/* NFT Cards */}
          <div className="flex flex-col lg:flex-row items-center -gap-x-10" >
            {/* First Card with Tilt */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative w-64 p-2 h-auto border-2 border-slate-600 overflow-hidden blur-md"
            >
              <Image src="/nft/levelpro.png" className="w-full h-60 object-cover" width={300} height={300} alt="Pody NFT" />
              <div className="p-3 space-y-1">
                <h2 className="font-semibold text-lg">Level 1</h2>
                <p className="text-gray-600">Learn and earn</p>
                <div className="flex justify-between text-gray-700 font-medium">
                  <span>20h : 35m : 28s</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-1 px-3 rounded-full text-sm">
                    15.97 ETH
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Middle Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative w-64 p-2 h-auto border-2 border-slate-600 overflow-hidden z-50 bg-white __shadow_pody"
            >
              <Image src="/nft/levelprimary.png" className="w-full h-60 object-cover" width={300} height={300} alt="Pody NFT" />
              <div className="p-3 space-y-1">
                <h2 className="font-semibold text-lg">Level 1</h2>
                <p className="text-gray-600">Learn and earn</p>
                <div className="flex justify-between text-gray-700 font-medium">
                  <span>20h : 35m : 28s</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-1 px-3 rounded-full text-sm">
                    15.97 ETH
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Last Card with Tilt */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative w-64 p-2 h-auto border-2 border-slate-600 overflow-hidden blur-md"
            >
              <Image src="/nft/levelsecondary.png" className="w-full h-60 object-cover" width={300} height={300} alt="Pody NFT" />
              <div className="p-3 space-y-1">
                <h2 className="font-semibold text-lg">Level 1</h2>
                <p className="text-gray-600">Learn and earn</p>
                <div className="flex justify-between text-gray-700 font-medium">
                  <span>20h : 35m : 28s</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-1 px-3 rounded-full text-sm">
                    15.97 ETH
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Stats Section */}
          <div className="absolute right-0 space-y-4 text-right text-indigo-900">
            <div>
              <span className="text-2xl font-bold">5</span>
              <p>Total NFT</p>
            </div>
            <div>
              <span className="text-2xl font-bold">x0.5</span>
              <p>Power</p>
            </div>
            <div>
              <span className="text-2xl font-bold">45K+</span>
              <p>Base</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodyNFT;
