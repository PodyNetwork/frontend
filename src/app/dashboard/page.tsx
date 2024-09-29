"use client";
import React from "react";
import Schedule from "@/components/dashboard/widgets/schedule";
import MeetingLinkTable from "@/components/dashboard/widgets/meetingLinkTable";
import MeetingAnalysis from "@/components/dashboard/widgets/meetingAnalysis";
import EarningChart from "@/components/dashboard/widgets/earningChart";
import CreateMeeting from "@/components/dashboard/widgets/createMeeting";


export default function Page() {
  return (
    <main className="w-full">
      <div className="w-full flex flex-row gap-y-6 bg-pody-primary/20 p-12">
        <div className="w-3/12">
          <CreateMeeting />
        </div>
        <div className="w-6/12 flex justify-center">
          <EarningChart />
        </div>
        <div className="w-3/12 my-auto">
          <MeetingAnalysis />
        </div>
      </div>
      <div className="p-12">
        <div className="w-full relative flex flex-row gap-x-6">
          <div className="w-5/12">
            <MeetingLinkTable />
          </div>
          <div className="w-7/12">
            <Schedule />
          </div>
        </div>
      </div>
      
    </main>
  );
}
