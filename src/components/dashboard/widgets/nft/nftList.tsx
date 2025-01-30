import React from "react";
import nftlist from "../../data/nft.json";
import Image from "next/image";
import { motion } from "framer-motion";
import { getLevelFee, getUserLevel } from "@/utils/passport";
import { useAccount } from "wagmi";
import { Address } from "@/types/address";
import { useEffect } from "react";
import { mintPassport } from "@/utils/passport";
import { toast, Toaster } from "sonner";
import { getBalance } from "@wagmi/core";
import { config } from "@/utils/wagmi";
import { formatEther } from "viem";
import useProfile from "@/hooks/user/useProfile";
import Link from "next/link";

const NftList = () => {
  const account = useAccount();
  const [level, setLevel] = React.useState<bigint>(BigInt(0));
  const [nextLevelFee, setNextLevelFee] = React.useState<bigint>(BigInt(0));
  const [isMinting, setIsMinting] = React.useState<boolean>(false);
  const { profile } = useProfile();

  useEffect(() => {
    const fetchLevelAndFee = async () => {
      const userLevel = await getUserLevel({
        walletAddress: account.address as Address,
      });

      const _nextLevelFee = await getLevelFee({ level: userLevel });

      setLevel(userLevel);
      setNextLevelFee(_nextLevelFee);
    };

    fetchLevelAndFee();
  }, [account.address]);

  const totalLevels = 5;
  const nftsPerLevel = nftlist.length / totalLevels;

  const handleMint = async () => {
    try {
      setIsMinting(true);
      const balance = await getBalance(config, {
        address: account.address as Address,
      });
      if (nextLevelFee > balance.value) {
        toast("Error", {
          description: "Insufficient balance",
        });
      } else {
        await mintPassport({
          walletAddress: account.address as Address,
        });
        const newLevel = await getUserLevel({
          walletAddress: account.address as Address,
        });
        setLevel(newLevel);
      }
    } catch (error) {
      console.error("Error minting passport:", error);
    } finally {
      setIsMinting(false);
    }
  };

  const renderNftCard = (levelIndex: number) => {
    const isUnlocked = BigInt(levelIndex + 1) <= level;
    const isNextLevel = BigInt(levelIndex + 1) === level + BigInt(1);

    return (
      <motion.div
        key={levelIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * levelIndex, duration: 0.5 }}
        className="bg-white rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <Image
            src={nftlist[levelIndex * nftsPerLevel].image}
            width={600}
            height={600}
            alt={`Pody Level ${levelIndex + 1} NFT`}
            className={`rounded-t-md object-cover aspect-square ${
              BigInt(levelIndex + 1) > level ? "filter blur-md" : ""
            }`}
            priority
            
            quality={75}
          />
        </motion.div>
        <div className="p-4">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + 0.1 * levelIndex, duration: 0.5 }}
            className="font-semibold text-base text-slate-800 mb-2"
          >
            Level {levelIndex + 1}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + 0.1 * levelIndex, duration: 0.5 }}
            className="text-sm text-slate-600"
          >
            {isUnlocked && profile?.walletAddress
              ? `Unlocked`
              : isNextLevel
              ? `Fee: ${formatEther(nextLevelFee)} EDU`
              : <span className={`text-sm font-medium text-red-500`}>Locked</span>}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + 0.1 * levelIndex, duration: 0.5 }}
            className="mt-4 flex justify-between items-center"
          >
            <span className="text-xs font-medium text-slate-500">
              Level {levelIndex + 1}
            </span>
            {isNextLevel ? (
              profile?.walletAddress ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-pody-primary text-slate-800 text-xs font-medium rounded-sm hover:bg-pody-primary/80 transition-colors duration-300"
                  onClick={handleMint}
                  disabled={isMinting}
                >
                  {isMinting ? "Minting..." : "Mint NFT"}
                </motion.button>
              ) : (
                <span className={`text-sm font-medium text-red-500`}>Locked</span>
              )
            ) : (
              <span
                className={`text-sm font-medium ${
                  isUnlocked ? "text-green-500" : "text-red-500"
                }`}
              >
                {isUnlocked
                  ? profile?.walletAddress
                    ? "Unlocked"
                    : <Link href={'/signup'} className="px-3 py-1 bg-pody-primary text-slate-800 text-xs font-medium rounded-sm hover:bg-pody-primary/80 transition-colors duration-300">Signup</Link>
                  : "Locked"}
              </span>
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3"
    >
      {[...Array(totalLevels)].map((_, levelIndex) => renderNftCard(levelIndex))}
      <Toaster />
    </motion.div>
  );
};

export default NftList;
