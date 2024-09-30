"use client";
import React from "react";
import CallHistory from "@/components/dashboard/widgets/callHistory";
import EarningChart from "@/components/dashboard/widgets/earningChart";
import CreateMeeting from "@/components/dashboard/widgets/createMeeting";


export default function Page() {
  return (
    <main className="w-full">
      <div className="flex flex-row bg-pody-primary/20 p-12">
        <div className="max-w-4xl mx-auto flex flex-1 justify-between items-cnter gap-6">
          <div className="w-4/12">
            <CreateMeeting />
          </div>
          <div className="w-7/12 flex justify-center">
            <EarningChart />
          </div>
        </div>
      </div>
      <div className="p-12">
        <div className="w-full relative flex flex-row gap-x-6">
          <div className="max-w-4xl mx-auto">
            <CallHistory calls={[]} isLoading={false} isError={false}/>
          </div>
        </div>
      </div>
      
    </main>
  );
}
