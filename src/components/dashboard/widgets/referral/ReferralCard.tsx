import useGetReferrals from "@/hooks/referral/useGetReferral";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import SkeletonReferral from "./ReferralCardSkeleton";
import useProfile from "@/hooks/user/useProfile";
import { formatPoints } from "@/func/numberFormater";
import { formatAndTruncateCount } from "@/func/formatAndTruncateCount";

const getReferralLevel = (totalReferrals: number) => {
  if (totalReferrals >= 1000) return "Chancellor"; 
  if (totalReferrals >= 500) return "Elite"; 
  if (totalReferrals >= 100) return "Principal"; 
  if (totalReferrals >= 75) return "Dean";      
  if (totalReferrals >= 50) return "Professor"; 
  if (totalReferrals >= 25) return "Mentor";    
  if (totalReferrals >= 10) return "Scholar";   
  if (totalReferrals >= 1) return "Student";   
  return "Newcomer";                          
};

const ReferralCard = () => {
  const { profile } = useProfile();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText("https://pody.network/signup?ref="+ profile?.username || "unknown")
      .then(() => {
        setCopied(true);
        triggerConfetti();
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    totalReferralsCount,
    isLoading,
  } = useGetReferrals();

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

  if(isLoading) return <SkeletonReferral />
  
  const referralLevel = getReferralLevel(totalReferralsCount);

  return (
    <div className="flex-1 gap-6 flex flex-col p-8 rounded-xl __pd_golden_grd relative select-none">
      <div className="text-slate-50">
        <h1 className="text-lg font-medium">Referral</h1>
        <p className="text-sm">
          Refer users with your referral code to earn points.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="text-slate-50 w-7/12 flex flex-col">
          <div className="pt-3">
            <h2 className="font-bold text-2xl xs:text-4xl md:text-5xl">{formatAndTruncateCount(totalReferralsCount * 10000)}</h2>
            <p className="text-base mt-1">Points Earned</p>
          </div>
          <div
            className="mt-auto pt-8 relative overflow-hidden"
            ref={containerRef}
          >
            <div className="flex flex-row items-center gap-x-2 relative">
              <h2 className="font-bold text-2xl xs:text-4xl md:text-5xl">{profile?.username}</h2>
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
            <h2 className="font-semibold text-2xl">{totalReferralsCount}</h2>
            <p className="text-base mt-1">Total Referral</p>
          </div>
          <div>
            <h2 className="font-semibold text-2xl web3-gradient-text_base">
              {referralLevel}
            </h2>
            <p className="text-base mt-1">Level</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralCard;
