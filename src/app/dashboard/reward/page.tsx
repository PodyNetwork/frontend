"use client";
import RewardChart from "@/components/dashboard/widgets/rewardChart";
import RewardClaim from "@/components/dashboard/widgets/rewardClaim";
import RewardHeader from "@/components/dashboard/widgets/rewardHeader";
import RewardStatistic from "@/components/dashboard/widgets/rewardStatistic";
import React from "react";

const page = () => {
  return (
    <main className="w-full">
      <div className="flex flex-row bg-pody-primary/20 p-12">
        <div className="max-w-5xl mx-auto flex flex-1 justify-between items-start gap-6">
          <div className="w-5/12">
            <RewardHeader />
            <div className="mt-12 h-[120px] w-full">
              <RewardChart />
            </div>
          </div>
          <div className="w-6/12 flex justify-center">
            <RewardStatistic />
          </div>
        </div>
      </div>
      <div className="p-12">
        <div className="w-full relative flex flex-row gap-x-6">
          <div className="max-w-4xl mx-auto flex-1">
            <RewardClaim />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
