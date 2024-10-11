"use client";
import RewardChart from "@/components/dashboard/widgets/rewardChart";
import RewardClaim from "@/components/dashboard/widgets/rewardClaim";
import RewardHeader from "@/components/dashboard/widgets/rewardHeader";
import RewardStatistic from "@/components/dashboard/widgets/rewardStatistic";
import React from "react";

const Page = () => {
  return (
    <main className="w-full">
      <div className="bg-pody-primary/20 p-6 md:p-12">
        <div className="w0full md:max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="w-full md:w-5/12">
            <RewardHeader />
            <div className="mt-6 md:mt-12 h-[120px] w-full">
              <RewardChart />
            </div>
          </div>
          <div className="w-full md:w-7/12 flex justify-center mt-6 md:mt-0">
            <RewardStatistic />
          </div>
        </div>
      </div>
      <div className="p-6 md:p-6">
        <div className="w-full relative flex flex-col md:flex-row gap-6">
          <div className="w-full md:max-w-2xl mx-auto">
            <RewardClaim />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
