"use client";
import ReferralHeader from "@/components/dashboard/widgets/referral/ReferralHeader";
import WeeklyTask from "@/components/dashboard/widgets/referral/WeeklyTask";
import ReferralTable from "@/components/dashboard/widgets/referral/ReferralTable";
import ReferralLeaderboard from "@/components/dashboard/widgets/referral/ReferralLeaderboard";
import ReferralCard from "@/components/dashboard/widgets/referral/ReferralCard";
import RefereePosition from "@/components/dashboard/widgets/referral/ReferralPosition";

const Page = () => {
  return (
    <main className="w-full">
      <div className="bg-pody-mintgreen p-5 md:p-12">
        <ReferralHeader />
      </div>
      <div className="w-full relative flex flex-col md:flex-row gap-6 p-5 md:p-6">
        <div className="w-full md:max-w-5xl mx-auto">
          <section className="w-full flex flex-col md:flex-row gap-4">
            <ReferralCard />
            <WeeklyTask />
          </section>
          <ReferralTable />
          <section className="w-full flex gap-4 flex-col py-5">
            <div className="w-full flex flex-col md:flex-row items-start gap-4 text-slate-500 rounded-xl">
              <RefereePosition />
              <ReferralLeaderboard />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Page;
