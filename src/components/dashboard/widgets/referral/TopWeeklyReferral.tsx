import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import useGetReferralLeaderboard from "@/hooks/referral/useGetReferralLeaderboard";

const Skeleton = () => {
  const shimmerEffect = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  };

  return (
    <motion.div
      className="p-6 bg-slate-100 text-sm rounded-md w-full flex items-center justify-center flex-col gap-4"
      {...shimmerEffect}
    >
      <motion.div
        className="h-4 bg-slate-300 rounded-md w-40 mb-4"
        {...shimmerEffect}
      ></motion.div>
      <motion.div
        className="w-16 h-16 bg-slate-300 rounded-full"
        {...shimmerEffect}
      ></motion.div>
      <motion.div
        className="h-6 bg-slate-300 rounded-md w-24"
        {...shimmerEffect}
      ></motion.div>
    </motion.div>
  );
};

const NoTopReferral = () => (
  <div className="p-6 bg-slate-100 text-sm rounded-md w-full flex items-center justify-center flex-col gap-4">
    <h3 className="text-base text-slate-500 font-medium">
      Top Referral of the Week
    </h3>
    <div className="w-16 h-16 mx-ato">
      <Image
        src="/svg/sad-face-emoji.svg"
        className="w-full h-full"
        width="100"
        height="100"
        alt="No top referral"
      />
    </div>
    <p className="text-sm font-semibold text-slate-600 uppercase truncate">
      No top referral for this week.
    </p>
  </div>
);

const TopWeeklyReferral = () => {
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);

  const { referralLeaderboard, isLoading } = useGetReferralLeaderboard({
    limit: 1,
    dateFrom,
    dateTo,
  });

  useEffect(() => {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const endOfWeek = new Date(
      today.setDate(today.getDate() + (6 - today.getDay()))
    );

    setDateFrom(startOfWeek.toISOString().split("T")[0]);
    setDateTo(endOfWeek.toISOString().split("T")[0]);
  }, []);

  if (isLoading) return <Skeleton />;

  if (!referralLeaderboard || referralLeaderboard.length === 0) return <NoTopReferral />;

  const sortedData = [...referralLeaderboard].sort((a, b) => b.count - a.count);

  const topReferral = sortedData[0];

  return (
    <div className="p-6 bg-slate-100 text-sm rounded-md w-full flex items-center justify-center flex-col gap-4">
      <h3 className="text-base text-slate-500 font-medium">
        Top Referral of the Week
      </h3>
      <div className="w-16 h-16">
        <AvatarParticipant name={topReferral.username} />
      </div>
      <p className="text-xl font-semibold text-slate-600 uppercase truncate">
        {topReferral.username}
      </p>
    </div>
  );
};

export default TopWeeklyReferral;
