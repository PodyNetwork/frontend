"use client";
import NftList from "@/components/dashboard/widgets/nftList";
import React from "react";

const page = () => {
  return (
    <main className="w-full">
      <div className="w-full bg-pody-primary/20 px-12">
        <div className="flex flex-col justify-center items-center gap-x-4 relative pb-36">
          <div className="top-16 rounded-xl absolute flex flex-col max-w-5xl">
            <NftList />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
