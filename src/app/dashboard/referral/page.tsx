"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import ReferralHeader from "@/components/dashboard/widgets/referral/ReferralHeader";
import WeeklyTask from "@/components/dashboard/widgets/referral/WeeklyTask";
import ReferralTable from "@/components/dashboard/widgets/referral/ReferralTable";
import ReferralLeaderboardSkeleton from "@/components/dashboard/widgets/referral/ReferralLeaderboardSkeleton";
import ReferralLeaderboard from "@/components/dashboard/widgets/referral/ReferralLeaderboard";

const leaderboardData = [
  {
    name: "RABBITS RUSH",
    point: 10049,
  },
  {
    name: "BRAIN SPILLERZ",
    point: 10049,
  },
  {
    name: "JamtSPILLERZ",
    point: 890049,
  },
  {
    name: "JaLLERZ",
    point: 8049,
  },
  {
    name: "RABBITS RUSH",
    point: 10049,
  },
];

const Page = () => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleCopy = () => {
    navigator.clipboard
      .writeText("pody")
      .then(() => {
        setCopied(true);
        triggerConfetti();
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  const triggerConfetti = () => {
    if (containerRef.current) {
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const originX = (left + width / 2) / window.innerWidth;
      const originY = (top + height / 2) / window.innerHeight;
      confetti({
        particleCount: 100,
        spread: 60,
        startVelocity: 30,
        origin: { x: originX, y: originY },
        angle: 90,
        colors: ["#FFD700", "#ff8c00", "#ff007f", "#7b00ff", "#FF69B4"],
        gravity: 0.5,
        scalar: 0.8,
      });
    }
  };

  return (
    <main className="w-full">
      <div className="bg-pody-mintgreen p-5 md:p-12">
        <ReferralHeader />
      </div>
      <div className="w-full relative flex flex-col md:flex-row gap-6 p-5 md:p-6">
        <div className="w-full md:max-w-5xl mx-auto">
          <section className="w-full flex flex-col md:flex-row gap-4">
            <div className="flex-1 gap-6 flex flex-col p-8 rounded-xl __pd_golden_grd relative">
              <div className="text-slate-50">
                <h1 className="text-lg font-medium">Referral</h1>
                <p className="text-sm">
                  Refer users with your referral code to earn points.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="text-slate-50 w-7/12 flex flex-col">
                  <div className="pt-3">
                    <h2 className="font-bold text-5xl">100,000</h2>
                    <p className="text-base mt-1">Points Earned</p>
                  </div>
                  <div
                    className="mt-auto pt-8 relative overflow-hidden"
                    ref={containerRef}
                  >
                    <div className="flex flex-row items-center gap-x-2 relative">
                      <h2 className="font-bold text-4xl">pody</h2>
                      <svg
                        onClick={handleCopy}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mt-1.5"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                      >
                        <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                      </svg>
                      <AnimatePresence>
                        {copied && (
                          <motion.p
                            className="text-pody-success text-xs"
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                          >
                            Copied!
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <p className="text-base mt-1">Referral Code</p>
                  </div>
                </div>
                <div className="w-5/12 flex flex-col justify-between gap-y-6 text-slate-50">
                  <div className="pt-3">
                    <h2 className="font-semibold text-2xl">100</h2>
                    <p className="text-base mt-1">Total Referral</p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-2xl web3-gradient-text">
                      Diamond
                    </h2>
                    <p className="text-base mt-1">Level</p>
                  </div>
                </div>
              </div>
            </div>
            <WeeklyTask />
          </section>
          <ReferralTable />
          <section className="w-full flex gap-4 flex-col py-5">
            <div className="w-full flex flex-col md:flex-row items-start gap-4 text-slate-500 rounded-xl">
              <div className="w-full md:w-[21rem] flex flex-col gap-y-4">
                <div className="flex flex-row justify-between gap-x-2 __pd_light_gradient px-6 py-8 rounded-xl w-full">
                  <div className="text-left">
                    <div className="text-sm mb-4">My Rank</div>
                    <div className="text-xl font-semibold">3RD PLACE</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm mb-4">My Points</div>
                    <div className="text-xl font-semibold">200K</div>
                  </div>
                </div>
                <div className="p-6 bg-slate-100 text-sm rounded-md w-full flex items-center justify-center flex-col gap-4">
                  <h3 className="text-base text-slate-500 font-medium">
                    Top Referral of the Week
                  </h3>
                  <div className="w-16 h-16">
                    <AvatarParticipant name="eax" />
                  </div>
                  <p className="text-xl font-semibold text-slate-600 uppercase truncate">
                    eax
                  </p>
                </div>
              </div>
              <ReferralLeaderboard />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Page;
