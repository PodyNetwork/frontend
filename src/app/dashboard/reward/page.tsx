"use client";
import RewardClaim from "@/components/dashboard/widgets/Reward/rewardClaim";
import RewardHeader from "@/components/dashboard/widgets/Reward/rewardHeader";
import RewardStatistic from "@/components/dashboard/widgets/Reward/rewardStatistic";

const Page = () => {
  return (
    <main className="w-full">
      <div className="bg-pody-primary/50 p-6 md:p-12">
        <div className="w-full md:max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="w-full md:w-4/12">
            <RewardHeader />
          </div>
          <div className="w-full md:w-8/12 flex justify-center mt-6 md:mt-0">
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
