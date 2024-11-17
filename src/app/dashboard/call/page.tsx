"use client";
import LinkStatistics from "@/components/dashboard/widgets/linkStatistics";
import CallHistory from "@/components/dashboard/widgets/callHistory";
import React from "react";
import useGetCalls from "@/hooks/call/useGetCalls";

const Page = () => {
  const {calls, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetCalls({limit: 6})
  return (
    <main className="w-full">
      <div className="w-full bg-pody-primary/50 p-6 md:p-12">
        <div className="flex flex-row gap-x-4 w-full md:max-w-4xl mx-auto">
          <LinkStatistics />  
        </div>
      </div>
      <div className="p-6 md:p-12">
        <div className="relative w-full md:max-w-4xl mx-auto">
          <CallHistory isError={isError} isLoading={isLoading} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} calls={calls ?? []} />
        </div>
      </div>
    </main>
  );
};

export default Page;
