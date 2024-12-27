"use client";


import { Call } from "@/app/classroom/types";
import useGetPublicCalls from "@/hooks/call/useGetPublicCalls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import OngoingCallCard from "@/components/homepage/v2/widgets/OngoingClass/OngoingCallCard";
import SkeletonCard from "@/components/dashboard/widgets/explore/ExploreSkeleton";
import ExploreHeader from "@/components/dashboard/widgets/explore/ExploreHeader";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const Inactivecall = () => {
  return (
    <div className="relative mt-auto">
      <div className="flex flex-col items-start relative max-w-lg">
        <div className="pt-1">
          <h3 className="text-2xl font-medium">Public Classroom</h3>
          <div className="text-base flex flex-col mt-1.5 text-slate-500">
            <p>
              You can join public classroom and earn rewards, Public classrooms
              will be posted here as soon as they become available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Publiccall = () => {
  const [activeTab, setActiveTab] = useState<"instant" | "scheduled" | "all">(
    "all"
  );

  const {
    calls,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetPublicCalls({
    type: activeTab === "all" ? undefined : activeTab,
    limit: 6,
    sortDirection: "desc",
  });

  useEffect(() => {
    refetch();
  }, [activeTab, refetch]);

  const pd_tabs_class = `xs:rounded-full w-full xs:w-auto px-4 py-2.5 h-auto shadow-none focus:outline-none data-[state=active]:bg-pody-dark data-[state=active]:text-white`;

  const renderCalls = () => (
    <>
      {calls.length === 0 && !isLoading && <Inactivecall />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading && <SkeletonCard />}
        {calls?.map((call: Call) => (
          <OngoingCallCard key={call._id} call={call} />
        ))}
        {isFetchingNextPage && <SkeletonCard />}
      </div>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 bg-pody-dark text-sm rounded-full px-8 py-4 text-slate-200 hover:opacity-80 transition-all duration-300"
        >
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
    </>
  );

  return (
    <Tabs
      defaultValue="all"
      className="w-full mt-6"
      onValueChange={(value) =>
        setActiveTab(value as "instant" | "scheduled" | "all")
      }
    >
      <TabsList className="w-full xs:w-auto xs:rounded-full h-auto p-2 flex-col xs:flex-row">
        <TabsTrigger value="all" className={pd_tabs_class}>
          All
        </TabsTrigger>
        <TabsTrigger value="instant" className={pd_tabs_class}>
          Instant
        </TabsTrigger>
        <TabsTrigger value="scheduled" className={pd_tabs_class}>
          Scheduled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="w-full mt-4">{renderCalls()}</div>
      </TabsContent>
      <TabsContent value="instant">
        <div className="w-full mt-4">{renderCalls()}</div>
      </TabsContent>
      <TabsContent value="scheduled">
        <div className="w-full mt-4">{renderCalls()}</div>
      </TabsContent>
    </Tabs>
  );
};

export default function Page() {
  return (
    <main className="w-full">
      <ExploreHeader />
      <div className="p-8 sm:p-8 px-5 md:p-12">
        <div className="max-w-4xl mx-auto">
          <Publiccall />
        </div>
      </div>
    </main>
  );
}
