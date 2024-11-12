import useGetPublicCalls from "@/hooks/call/useGetPublicCalls";
import BlockiesSvg from "blockies-react-svg";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Call {
  _id: string;
  userId: string;
  scheduledTime?: number;
  type: string;
  status: string;
  title: string;
  key: string;
  url: string;
  privacy?: string;
}

interface Calls {
  calls: Call[];
}

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const SkeletonCard = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-pody-dark p-5 rounded-3xl xs:rounded-[1.7rem] text-slate-200 flex flex-col"
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
            <div className="bg-[#262626] rounded-full px-4 py-2 w-32 h-5"></div>
            <div className="bg-[#262626] rounded-full px-4 py-2 w-20 h-5"></div>
          </motion.div>
          <div className="py-6">
            <motion.div
              className="h-6 bg-slate-700 w-40 rounded mb-2"
              initial={{ width: "60%" }}
              animate={{ width: "100%" }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.2,
              }}
            ></motion.div>
            <motion.div
              className="h-4 bg-slate-700 w-60 rounded"
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
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-700"
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
                  className="h-4 bg-slate-700 w-32 rounded mb-1"
                  initial={{ width: "50%" }}
                  animate={{ width: "75%" }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1.3,
                  }}
                ></motion.div>
                <motion.div
                  className="h-3 bg-slate-700 w-24 rounded"
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
              className="bg-slate-700 rounded-full px-4 py-3 flex items-center w-32 justify-center"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
            >
              <div className="h-6 w-6 bg-slate-600 rounded-full"></div>
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
          <div className="text-base flex flex-col mt-1.5 text-slate-300">
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
    isError,
    refetch,
  } = useGetPublicCalls({
    type: activeTab === "all" ? undefined : activeTab,
    limit: 3,
    sortDirection: "desc",
  });

  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [activeTab, refetch]);

  const pd_tabs_class = `xs:rounded-full w-full xs:w-auto px-4 py-2.5 h-auto shadow-none focus:outline-none data-[state=active]:bg-pody-dark data-[state=active]:text-white`;

  function goToMeeting(callUrl: string) {
    const fullUrl = `/call/${callUrl}`;
    router.push(fullUrl);
  }

  const renderCalls = () => (
    <>
      {isError && <Inactivecall />}
      {calls.length === 0 && !isLoading && <Inactivecall />}
      <div className="__container_grid gap-5">
        {isLoading && <SkeletonCard />}
        {calls?.map((call: Call) => (
          <div
            key={call._id}
            className="bg-pody-dark p-5 rounded-3xl xs:rounded-[1.7rem] text-slate-300"
          >
            <div className="flex flex-wrap items-center mb-4 text-xs xs:text-sm">
              <span className="bg-[#262626] rounded-full px-4 py-2">
                {(() => {
                  if (!call || !call?.scheduledTime) {
                    return "";
                  }
                  const scheduledDate = dayjs(call.scheduledTime);
                  if (scheduledDate.isSame(dayjs(), "minute")) return "Now";
                  if (scheduledDate.isToday()) return "Today";
                  if (scheduledDate.isTomorrow()) return "Tomorrow";
                  if (scheduledDate.isSame(dayjs().subtract(1, "day"), "day"))
                    return "Yesterday";
                  return scheduledDate.format("MMM D, YYYY");
                })()}
              </span>
              <span className="bg-[#262626] rounded-full px-4 py-2">
                {(() => {
                  if (!call || !call?.scheduledTime) {
                    return "";
                  }
                  const scheduledDate = dayjs(call.scheduledTime);
                  scheduledDate.format("HH:mm");
                  return scheduledDate.format("HH:mm");
                })()}
              </span>
            </div>
            <div className="py-6">
              <h2 className="text-xl">{call.title || "Untitled Meeting"}</h2>
              <div className="text-xs mt-1 flex items-center gap-x-1 capitalize">
                {call.status === "ongoing" && <p className="live-dot bg-pody-success"></p>}
                {call.status}
              </div>
            </div>
            <div className="flex gap-3 justify-between flex-wrap items-center mt-4">
              <div className="flex flex-row items-center gap-x-2 sm:gap-x-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full relative bg-black/20">
                  <BlockiesSvg
                    address={call.url || "012345"}
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="text-xs sm:text-sm flex-1">
                  <h3 className="font-medium">{call.url}</h3>
                  <p className="text-xs capitalize">
                    {call.type ? `${call.type} Classroom` : "Instant Classroom"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => goToMeeting(call.url)}
                disabled={call?.status === "ended"}
                className={`bg-white cursor-pointer text-slate-800 text-sm rounded-full px-4 py-1.5 flex items-center ${
                  call?.status === "ended" && "opacity-20"
                }`}
              >
                Join Call
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ms-2"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="m553.85-253.85-42.16-43.38L664.46-450H180v-60h484.46L511.69-662.77l42.16-43.38L780-480 553.85-253.85Z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {isFetchingNextPage && <SkeletonCard />}
      </div>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 bg-pody-dark text-sm rounded-full px-8 py-4 text-slate-200 text-sm hover:opacity-80 transition-all duration-300"
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
      onValueChange={(value) => setActiveTab(value as any)}
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

const OngoingClass = () => {
  const barCount = 3;
  const [heights, setHeights] = useState(Array(barCount).fill(20));

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(heights.map(() => Math.floor(Math.random() * 80) + 20));
    }, 300);

    return () => clearInterval(interval);
  }, [heights]);

  return (
    <section className="w-full relative">
      <div
        className="px-3 md:px-10 flex flex-col max-w-7xl mx-auto py-24"
        id="publicClassroom"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="max-w-xl text-center flex flex-col gap-y-2.5">
            <h2 className="text-2xl xs:text-4xl font-semibold text-pody-dark">
              Get Reward Instantly when you join active classroom
            </h2>
            <p className="text-base mt-1.5 text-slate-700">
              Your reward is calculated when you join a classroom starts when
              you join
            </p>
          </div>
        </div>
        <Publiccall />
      </div>
    </section>
  );
};

export default OngoingClass;
