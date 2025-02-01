"use client";
import NftList from "@/components/dashboard/widgets/nft/nftList";
import NftStatistics from "@/components/dashboard/widgets/nft/nftStatistics";
import React from "react";

const page = () => {
  return (
    <main className="w-full">
      <div className="w-full bg-pody-mintgreen px-5 md:px-12 pt-12 pb-24">
        <div className="flex flex-row gap-x-4 max-w-3xl mx-auto">
          <NftStatistics />
        </div>
      </div>
      <div className="w-full px-5 md:px-12">
        <div className="rounded-xl relative -top-16 flex flex-col max-w-3xl mx-auto">
          <NftList />
        </div>
      </div>
    </main>
  );
};

export default page;
