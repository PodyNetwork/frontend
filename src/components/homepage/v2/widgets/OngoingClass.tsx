import useGetPublicCalls from "@/hooks/call/useGetPublicCalls";
import BlockiesSvg from "blockies-react-svg";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import useProfileById from "@/hooks/user/useGetProfileById";

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

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const SkeletonCard = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
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
              className="h-6 bg-slate-300 w-6/12 rounded mb-2"
              initial={{ width: "50%" }}
              animate={{ width: "90%" }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.2,
              }}
            ></motion.div>
            <motion.div
              className="h-4 bg-slate-300 w-6/12 rounded"
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
  const {
    calls,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetPublicCalls({
    limit: 4,
    sortDirection: "desc",
  });

  const router = useRouter();

  function goToMeeting(callUrl: string) {
    const fullUrl = `/call/${callUrl}`;
    router.push(fullUrl);
  }

  function goToExplore() {
    const fullUrl = `/dashboard/explore`;
    router.push(fullUrl);
  }

  const OngoingCallCard = ({call} : {call: Call}) => {
    const { profile, isLoading: profileLoading } = useProfileById(call.userId);
    
    return(<div
      key={call._id}
      className="bg-slate-100 p-5 rounded-3xl xs:rounded-[1.7rem] text-slate-600"
    >
      <div className="flex flex-wrap items-center mb-4 text-xs xs:text-sm">
        <span className="bg-slate-200 rounded-full px-4 py-2">
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
        <span className="bg-slate-200 rounded-full px-4 py-2">
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
      <div className="py-5">
        <h2 className="text-lg font-medium">
          {call.title || "Untitled Meeting"}
        </h2>
        <div className="text-xs mt-1">Host: {profile?.username}</div>
      </div>
      <div className="flex gap-3 justify-between flex-wrap items-center mt-2">
        <div className="flex flex-row items-center gap-x-2 sm:gap-x-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full relative bg-black/20">
            <BlockiesSvg
              address={call.url || "012345"}
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="text-xs sm:text-sm flex-1">
            <h3 className="font-medium">{call.url}</h3>
            <div className="text-xs mt-px flex items-center gap-x-1 capitalize">
              {call.status === "ongoing" ? (
                <>
                  <p className="live-dot bg-pody-success"></p>
                  {call.status}
                </>
              ) : (
                <p className="capitalize">
                  {call.type
                    ? `${call.type} Classroom`
                    : "Instant Classroom"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => goToMeeting(call.url)}
        disabled={call?.status === "ended"}
        className={`bg-slate-300 w-full justify-center mt-3 cursor-pointer text-slate-700 text-sm rounded-full px-4 py-2 flex items-center ${
          call?.status === "ended" && "opaciy-30"
        }`}
      >
        {call?.status === "ended" ? "Ended" : "Join Call"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 ms-2"
          viewBox="0 -960 960 960"
          fill="currentColor"
        >
          <path d="m553.85-253.85-42.16-43.38L664.46-450H180v-60h484.46L511.69-662.77l42.16-43.38L780-480 553.85-253.85Z" />
        </svg>
      </button>
    </div>)
  }

  const renderCalls = () => (
    <>
      {calls.length === 0 && !isLoading && <Inactivecall />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading && <SkeletonCard />}
        {calls?.map((call: Call) => (
          <OngoingCallCard key={call._id} call={call} />
        ))}
      </div>
      {hasNextPage && (
        <button
          className="mt-4 bg-pody-dark text-sm rounded-full px-8 py-4 text-slate-200 hover:opacity-80 transition-all duration-300"
          onClick={goToExplore}
        >
          Explore More
        </button>
      )}
    </>
  );

  return <div className="w-full mt-4">{renderCalls()}</div>;
};

const OngoingClass = () => {
  return (
    <section className="w-full relative">
      <div
        className="flex flex-col max-w-7xl mx-auto pt-6 pb-24 px-5 md:px-6"
        id="publicClassroom"
      >
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full">
            <div className="flex flex-col items-centr mb-6">
              <div className="max-w-xl text-centr flex flex-col gap-y-2.5">
                <h2 className="text-2xl xs:text-4xl font-semibold text-pody-dark">
                  Get Rewarded for Joining an Active Classroom.
                </h2>
                <p className="text-base mt-1.5 text-slate-700">
                Your accumulated reward is shown in real-time when you join a classroom.
                </p>
              </div>
            </div>
            <Publiccall />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OngoingClass;
