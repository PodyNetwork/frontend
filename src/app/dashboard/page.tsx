"use client";
import React from "react";
import CallHistory from "@/components/dashboard/widgets/callHistory";
import EarningChart from "@/components/dashboard/widgets/earningChart";
import CreateMeeting from "@/components/dashboard/widgets/createMeeting";


export default function Page() {
  return (
    <main className="w-full">
      <div className="bg-pody-primary/20 p-8 sm:p-8 md:p-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-5/12 lg:w-4/12">
            <CreateMeeting />
          </div>
          <div className="w-full md:w-7/12 flex justify-center">
            <EarningChart />
          </div>
        </div>
      </div>
      <div className="p-8 sm:p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <CallHistory calls={[]} isLoading={false} isError={false}/>
        </div>
      </div>
    </main>
  );
}
