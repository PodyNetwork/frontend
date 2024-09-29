"use client";
import LinkStatistics from "@/components/dashboard/widgets/linkStatistics";
import CallHistory from "@/components/dashboard/widgets/callHistory";
import React from "react";

const page = () => {
  return (
    <main className="w-full">
      <div className="w-full bg-pody-primary/20 p-12">
        <div className="flex flex-row gap-x-4 max-w-4xl mx-auto">
          <LinkStatistics />
        </div>
      </div>
      <div className="p-12">
        <div className="relative max-w-4xl mx-auto">
          <CallHistory />
        </div>
      </div>
    </main>
  );
};

export default page;
