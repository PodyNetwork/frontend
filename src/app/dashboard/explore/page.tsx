"use client";
import Image from "next/image";
import videoConfrenceImg from "/public/illustration/video-conference.png";
import { Call } from "@/app/call/types";
import useGetPublicCalls from "@/hooks/call/useGetPublicCalls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import OngoingCallCard from "@/components/homepage/v2/widgets/OngoingClass/OngoingCallCard";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const SkeletonCard = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-slate-100 p-5 rounded-3xl xs:rounded-[1.7rem] flex flex-col"
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1.5,
          }}
        >
          <motion.div
            className="flex items-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.5,
            }}
          >
            <div className="bg-slate-200 rounded-full px-4 py-2 w-32 h-5"></div>
            <div className="bg-slate-200 rounded-full px-4 py-2 w-20 h-5"></div>
          </motion.div>
          <div className="py-6">
            <motion.div
              className="h-6 bg-slate-300 w-40 rounded mb-2"
              initial={{ width: "60%" }}
              animate={{ width: "100%" }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.2,
              }}
            ></motion.div>
            <motion.div
              className="h-4 bg-slate-300 w-60 rounded"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 0.8 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
            ></motion.div>
          </div>

          <motion.div
            className="flex gap-2 justify-between items-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.5,
            }}
          >
            <div className="flex flex-row items-center gap-x-2 sm:gap-x-3 mt-auto">
              <motion.div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-400"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1.2,
                }}
              ></motion.div>
              <div className="flex-1">
                <motion.div
                  className="h-4 bg-slate-300 w-32 rounded mb-1"
                  initial={{ width: "50%" }}
                  animate={{ width: "75%" }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1.3,
                  }}
                ></motion.div>
                <motion.div
                  className="h-3 bg-slate-300 w-24 rounded"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1.4,
                  }}
                ></motion.div>
              </div>
            </div>
            <motion.div
              className="bg-slate-300 rounded-full px-4 py-3 flex items-center w-32 justify-center"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
            >
              <div className="h-6 w-6 bg-slate-300 rounded-full"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};

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
      <div className="bg-pody-primary/50 p-8 px-5 md:p-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-5/12">
            <h2 className="text-4xl text-slate-800 font-medium">
              Get <span className="text-slate-500">Rewarded</span> Instantly
              when you join active classroom
            </h2>
          </div>
          <div className="w-full md:w-6/12 flex justify-center">
            <Image
              src={videoConfrenceImg}
              className="object-contain w-full"
              width={300}
              height={300}
              alt="Video Conferencing"
            />
          </div>
        </div>
      </div>
      <div className="p-8 sm:p-8 px-5 md:p-12">
        <div className="max-w-4xl mx-auto">
          <Publiccall />
        </div>
      </div>
    </main>
  );
}
