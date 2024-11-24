import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PodyNFT = () => {
  const router = useRouter();
  const goToNFT = () => {
    router.push("/dashboard/NFT");
  };
  return (
    <section className="w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-6 flex flex-col justify-between gap-x-6 pt-8 pb-24">
        <div className="w-full items-center flex flex-col py-7">
          <div className="max-w-4xl text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-none">
              Mint <span className="text-pody-secondary">Unique NFT</span> to
              increase your <span>earning power</span>.
            </h1>
            <p className="text-gray-500">
              You can increase your earnings per second by minting more NFTs
              directly from the dashboard.
            </p>
            <button
              onClick={goToNFT}
              className="flex mx-auto items-center space-x-2 text-indigo-600 font-semibold hover:underline"
            >
              <span>Mint NFT</span>
              <span>→</span>
            </button>
            {/* Supported Logos */}
            <div>
              <div className="flex items-center justify-center space-x-4 pt-4">
                <Link
                  href="https://opencampus.xyz/"
                  className="cursor-pointer"
                  target="_blank"
                >
                  <Image
                    src="/partner/opencampus_logo.svg"
                    className="w-10"
                    width={300}
                    height={400}
                    alt="pody NFT"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

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
      </div>
    </section>
  );
};

export default PodyNFT;
