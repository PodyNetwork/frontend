"use client";
import rewardforparticipation from "/public/illustration/reward.png";
import decentralizedandprivate from "/public/illustration/privacy.png";
import Image from "next/image";
import ReadyToGo from "./readyToGo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
/* eslint-disable  @typescript-eslint/no-unused-vars */
const FeaturesCard = () => {
    const [count, setCount] = useState(1);
    const [power, setPower] = useState(1);
    const [level, setLevel] = useState(1);
  
    useEffect(() => {
      // Function to randomly increase the power level within the 60s
      const powerBoostInterval = setInterval(() => {
        const randomPower = Math.floor(Math.random() * 5) + 1;
        setPower(randomPower);
        setLevel(randomPower); // Update level when power changes
      }, Math.floor(Math.random() * ((60 * 1000) / 5))); // Random interval spread within 60 seconds
  
      // Function to count based on the current power level
      const counterInterval = setInterval(() => {
        setCount((prevCount) => {
          const newCount = prevCount + power; // Increment count based on power level
  
          // If the count reaches or exceeds 1000, reset it
          if (newCount >= 1000) {
            // Reset count, power, and level after reaching 1000
            setCount(1); // Reset count
            setPower(1); // Reset power level
            setLevel(1); // Reset level
            return 1; // Return 1 for the next round
          }
          return newCount; // Otherwise, return the new count
        });
      }, 1000); // Update every second
  
      return () => {
        clearInterval(counterInterval);
        clearInterval(powerBoostInterval);
      };
    }, [power]);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 _features_card_x2">
        <div className="p-7 relative rounded-xl shadow-xl overflow-hidden">
          <ReadyToGo />
        </div>
        <div className="p-7 relative rounded-xl shadow-xl overflow-hidden">
          <div className="_grad_card_main_2"></div>
          <div className="relative z-50 h-full flex flex-col">
            <h3 className="text-xl font-medium text-slate-200">
              Advanced Host Management
            </h3>
            <p className="text-sm mt-2.5 text-slate-400 flex items-center flex-wrap gap-x-2 leading-relaxed">
              You can remove students from the call or grant them speaking
              privileges.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 _features_card_x3">
        <div className="p-6 relative rounded-xl shadow-xl overflow-hidden">
          <div className="_grad_card_base"></div>
          <div className="relative z-50 flex flex-col h-full">
            <h3 className="text-xl font-medium text-slate-200">
              Earn Rewards for Participation
            </h3>
            <p className="text-sm mt-2.5 text-slate-400 flex items-center leading-relaxed">
              Not ready to start the class right away? You can schedule it for
              later.
            </p>
            <div className="flex-grow"></div>
            <div className="flex flex-col gap-y-4 text-sm pt-8">
              <Image
                src={rewardforparticipation}
                className="object-cover h-60 md:h-56 rounded-xl"
                alt="Rewards for Participation"
              />
            </div>
          </div>
        </div>
        <div className="p-6 relative rounded-xl shadow-xl overflow-hidden">
          <div className="_grad_card_base"></div>
          <div className="relative z-50 flex flex-col h-full">
            <h3 className="text-xl font-medium text-slate-200">
              Earning Power Boost
            </h3>
            <p className="text-sm mt-2.5 text-slate-400 flex items-center leading-relaxed">
              You can increase your earnings per second by minting more NFTs
              directly from the dashboard.
            </p>
            <div className="flex flex-col gap-y-4 text-lg mt-auto pt-36">
              <div className="flex">
                <motion.div className="flex items-center flex-row px-4 py-2 bg-pody-secondary/30 rounded-full backdrop-blur-xl shadow-md shadow-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 me-1.5 text-red-400"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                  >
                    <path d="M480-151.54 103.85-603.08 212.31-820h535.38l108.46 216.92L480-151.54ZM352.69-620h254.62l-80-160h-94.62l-80 160ZM460-237.62V-580H175.69L460-237.62Zm40 0L784.31-580H500v342.38ZM651.69-620h150.62l-80-160H571.69l80 160Zm-494 0h150.62l80-160H237.69l-80 160Z" />
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
                    {count}
                  </motion.span>
                </motion.div>
              </div>
              <div className="text-slate-300 text-xs flex items-center">
                This is your estimated earning rate per second at Level {power}
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 relative rounded-xl shadow-xl overflow-hidden">
          <div className="_grad_card_base"></div>
          <div className="relative z-50 h-full flex flex-col">
            <h3 className="text-xl font-medium text-slate-200">
              View Earning Statistics
            </h3>
            <p className="text-sm mt-1.5 text-slate-400 flex items-center">
              Track your points in real-time, redeem them, and seamlessly
              transfer them on-chain.
            </p>
            <div className="flex-grow"></div>
            <div className="flex flex-col gap-y-4 text-sm pt-8">
              <Image
                src={decentralizedandprivate}
                className="object-cover h-60 md:h-56 rounded-xl"
                alt="Rewards for Participation"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesCard;
