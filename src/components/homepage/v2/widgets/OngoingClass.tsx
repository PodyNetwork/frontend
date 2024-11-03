import useGetPublicCalls from "@/hooks/call/useGetPublicCalls";
import BlockiesSvg from "blockies-react-svg";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";

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
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.div
          className="p-4 sm:p-5 bg-slate-100 rounded-2xl flex flex-col h-[270px] min-w-[250px] max-w-[250px]"
          key={index}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1.5,
          }}
        >
          <div className="flex flex-col gap-y-1.5">
            <motion.div
              className="flex items-center justify-between gap-2 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
            >
              <div className="w-16 h-4 bg-slate-200 rounded"></div>
              <div className="w-12 h-4 bg-slate-200 rounded"></div>
            </motion.div>

            <motion.div
              className="h-6 bg-slate-300 rounded w-full mt-2"
              initial={{ width: "80%" }}
              animate={{ width: "100%" }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.2,
              }}
            ></motion.div>

            <motion.div
              className="w-20 h-5 bg-slate-200 rounded mt-2"
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
            className="flex flex-row items-center gap-x-2 sm:gap-x-3 mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.5,
            }}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-300"></div>
            <div className="flex-1">
              <motion.div
                className="h-4 bg-slate-200 rounded w-3/4"
                initial={{ width: "60%" }}
                animate={{ width: "75%" }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1.3,
                }}
              ></motion.div>
              <motion.div
                className="h-4 bg-slate-200 rounded w-1/2 mt-1"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1.4,
                }}
              ></motion.div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};

const Publiccall = () => {
  const { calls, isLoading } = useGetPublicCalls();

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (!calls || calls.length === 0) {
    return <Inactivecall />;
  }

  const router = useRouter();

  function goToMeeting(callUrl: string) {
    const fullUrl = `/call/${callUrl}`;
    router.push(fullUrl);
  }

  return (
    <>
      {calls.map((call: Call) => (
        <div
          key={call._id} // Make sure to use a unique key
          className="p-4 sm:p-5 __pdy_gls-eft rounded-2xl flex flex-col h-[270px] min-w-[250px] max-w-[250px]"
        >
          <div className="flex flex-col gap-y-1.5 text-slate-600">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <p className="text-xs capitalize">
                {(() => {
                  if (!call || !call?.scheduledTime) {
                    return "";
                  }
                  const scheduledDate = dayjs(call.scheduledTime);
                  if (scheduledDate.isSame(dayjs(), "minute")) return "Now";
                  if (scheduledDate.isToday())
                    return "Today - " + scheduledDate.format("HH:mm");
                  if (scheduledDate.isTomorrow())
                    return "Tomorrow - " + scheduledDate.format("HH:mm");
                  if (scheduledDate.isSame(dayjs().subtract(1, "day"), "day"))
                    return "Yesterday - " + scheduledDate.format("HH:mm");
                  return scheduledDate.format("MMM D, YYYY HH:mm");
                })()}
              </p>
              <p className="text-xs capitalize">{call.type}</p>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-slate-800 truncate">
              {call.title}
            </h3>
            <div>
              <button className="text-xs text-pody-success bg-pody-success/10 px-2 sm:px-3 py-1 font-medium rounded-sm ">
                {call.status}
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-2 sm:gap-x-3 mt-auto">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full relative bg-black/20">
              <BlockiesSvg
                address={call.url} // Ensure `userId` or appropriate identifier is provided
                className="w-full h-full rounded-full"
              />
            </div>
            <div className={`text-xs sm:text-sm flex-1 ${call?.status === "ended" && "opacity-50"}`} onClick={() => goToMeeting(call.url)}>
                <h3 className="font-medium">{call?.url}</h3>
                <p className="text-xs capitalize">{call?.privacy} Call</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const Inactivecall = () => {
  return (
    <div className="relative mt-auto">
      <div className="flex flex-col items-start relative max-w-md">
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
        <div className="w-full mt-6">
          <div className="__ongoing_wrapper __pd_main_veil rounded-3xl relative text-slate-100 p-6">
            <div className="relative z-50 flex flex-col min-h-[600px]">
              <div className="flex flex-row items-center gap-x-2">
                <div className="flex justify-center items-center md:h-[17px]">
                  {heights.map((height, index) => (
                    <motion.div
                      key={index}
                      className="bg-slate-100 dark:bg-slate-100 rounded-lg mx-px"
                      initial={{ height: "20%" }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror",
                      }}
                      style={{
                        width: "3px",
                      }}
                    />
                  ))}
                </div>
                <h2 className="text-sm font-medium">Public Classroom</h2>
              </div>
              <div className="relative mt-auto pt-12 flex flex-row gap-x-3 overflow-x-auto max-w-7xl">
                <Publiccall />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OngoingClass;
