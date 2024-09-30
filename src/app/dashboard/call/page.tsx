"use client";
import LinkStatistics from "@/components/dashboard/widgets/linkStatistics";
import CallHistory from "@/components/dashboard/widgets/callHistory";
import React from "react";
import useGetCalls from "@/hooks/call/useGetCalls";

const page = () => {
  const {calls, isLoading, isError, hasNextPage, fetchNextPage } = useGetCalls()
  return (
    <main className="w-full">
      <div className="w-full bg-pody-primary/20 p-12">
        <div className="flex flex-row gap-x-4 max-w-4xl mx-auto">
          <LinkStatistics />
        </div>
      </div>
      <div className="p-12">
        <div className="relative max-w-4xl mx-auto">
          <CallHistory isError={isError} isLoading={isLoading} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} calls={calls ?? []} />
        </div>
      </div>
    </main>
  );
};

export default page;