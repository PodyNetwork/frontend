"use client";
import LinkStatistics from "@/components/dashboard/widgets/linkStatistics";
import MeetingLinkTable from "@/components/dashboard/widgets/meetingLinkTable";
import React from "react";

const page = () => {
  return (
    <main className="w-full">
      <div className="w-full bg-pody-primary/20 p-12">
        <LinkStatistics />
      </div>
      <div className="p-12">
        <div className="relative max-w-2xl mx-auto">
          <MeetingLinkTable />
        </div>
      </div>
    </main>
  );
};

export default page;
