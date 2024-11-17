"use client";
import NftList from "@/components/dashboard/widgets/nftList";
import NftStatistics from "@/components/dashboard/widgets/nftStatistics";
import React from "react";

const page = () => {
  return (
    <main className="w-full">
      <div className="w-full bg-pody-primary/50 px-6 md:px-12 pt-12 pb-24">
        <div className="flex flex-row gap-x-4 max-w-4xl mx-auto">
          <NftStatistics />
        </div>
      </div>
      <div className="w-full px-6 md:px-12">
        <div className="rounded-xl relative -top-16 flex flex-col max-w-4xl mx-auto">
          <NftList />
        </div>
      </div>
    </main>
  );
};

export default page;
