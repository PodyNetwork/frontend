import Image from "next/image";
import BlockiesSvg from "blockies-react-svg";
import CurvedCircleImage from "/public/illustration/circular_ring.png";
import useGetPublicCalls from "@/hooks/call/useGetPublicCalls";
import { createEvent, EventAttributes } from "ics";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useProfileById from "@/hooks/user/useGetProfileById";
import { useState, useEffect } from "react";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

interface EventData {
  scheduledTime?: number | string | undefined;
  title: string;
  userId: string;
  url: string;
}

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

const InactiveSchedule = () => {
  return (
    <div>
      <Image
        src="/illustration/calendarschedule.png"
        className="object-contain w-full"
        width={400}
        height={300}
        alt="scheduled call not available"
      />
      <div className="text-base mt-8 font-medium text-slate-700">
        Oops! There are no active scheduled classrooms right now. However, you
        can schedule a classroom for a global audience.
      </div>
    </div>
  );
};

const ScheduledCard = ({ data }: { data: Call }) => {
  const { profile, isLoading: profileLoading } = useProfileById(data.userId);

  const handleAddToCalendar = (data: EventData) => {
    const scheduledTime = data.scheduledTime ?? "0";
    const scheduledDate = new Date(scheduledTime);
    const alarms = [];

    const eventStart: [number, number, number, number, number] = [
      scheduledDate.getFullYear(),
      scheduledDate.getMonth() + 1,
      scheduledDate.getDate(),
      scheduledDate.getHours(),
      scheduledDate.getMinutes(),
    ];

    alarms.push({
      action: "DISPLAY",
      description: `Pody Classroom with ${profile?.username}`,
      trigger: {
        minutes: 10,
        before: true,
      },
      repeat: 1,
      attachType: "VALUE=TEXT",
      attach: `Reminder: Pody Classroom with ${profile?.username}`,
    });

    const event: EventAttributes = {
      start: eventStart,
      duration: { hours: 1, minutes: 0 },
      title: data.title,
      description: `Join ${data.userId} Classroom on Pody`,
      location: "Pody Classroom",
      url: `https://pody.network/call/${data.url}`,
      status: "CONFIRMED",
      busyStatus: "BUSY",
    };

    createEvent(event, (error, value) => {
      if (error) {
        console.error(error);
      } else {
        const blob = new Blob([value], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.title}.ics`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const eventrouter = useRouter();

  const handleJoinEvent = (data: string) => {
    eventrouter.push(`/call/${data}`);
    console.log("hello");
  };

  const nowY = dayjs();
  const scheduledTimeY = dayjs(data.scheduledTime);

  const ScheduledTimeDisplay = ({ scheduledTime }: { scheduledTime: string | number | undefined }) => {
    const [currentTime, setCurrentTime] = useState(dayjs()); 
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(dayjs()); 
      }, 60000); 
  
      return () => clearInterval(interval);
    }, []);
  
    const scheduledDate = dayjs(scheduledTime);
  
    let timeDisplay = "";
    if (!scheduledTime) {
      timeDisplay = "";
    } else {
      if (scheduledDate.isSame(currentTime, "minute")) {
        timeDisplay = "Now";
      } else if (scheduledDate.isToday()) {
        timeDisplay = "Today - " + scheduledDate.format("HH:mm");
      } else if (scheduledDate.isTomorrow()) {
        timeDisplay = "Tomorrow - " + scheduledDate.format("HH:mm");
      } else if (scheduledDate.isSame(currentTime.subtract(1, "day"), "day")) {
        timeDisplay = "Yesterday - " + scheduledDate.format("HH:mm");
      } else {
        timeDisplay = scheduledDate.format("MMM D, YYYY HH:mm");
      }
    }
  
    return <div className="text-sm font-medium">{timeDisplay}</div>;
  };

  return (
    <div
      key={data._id}
      className="flex flex-col text-slate-600 pb-7 border-b border-slate-200"
    >
      <ScheduledTimeDisplay scheduledTime={data?.scheduledTime} />
      <div className="py-2 flex flex-row items-center gap-2 justify-between">
        <div className="flex-1 relative overflow-hidden">
          <h2 className="text-lg truncate whitespace-nowrap font-medium">
            {data.title}
          </h2>
          <p className="text-sm truncate">Host: {profile?.username}</p>
        </div>
        <div className="w-9 h-8 relative bg-black/20 rounded-full">
          <BlockiesSvg
            address={data.url}
            className="w-9 h-9 object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 flex-row flex-wrap justify-between mt-2 text-sm font-medium cursor-pointer">
        <button
          onClick={() => {
            if (
              (data.status === "pending" || data.status === "ongoing") &&
              scheduledTimeY.isBefore(nowY)
            ) {
              handleJoinEvent(data.url);
            } else if (
              scheduledTimeY.isAfter(nowY) &&
              data.status !== "ongoing"
            ) {
              handleAddToCalendar(data);
            }
          }}
          className={`cursor-pointer rounded-full flex items-center ${
            data.status === "ended" &&
            dayjs(data.scheduledTime).isBefore(dayjs())
              ? "opacity-50 cursor-not-allowed text-pody-danger"
              : "text-slate-700"
          }`}
          disabled={data.status === "ended"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 me-2"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            {data.status === "ended" ? (
              <path d="M480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q56.29 0 108.42-19.04 52.12-19.04 95.27-55.11L234.15-683.69q-35.69 43.15-54.92 95.27Q160-536.29 160-480q0 134 93 227t227 93Zm245.85-116.31q36.07-43.15 55.11-95.27Q800-423.71 800-480q0-134-93-227t-227-93q-56.43 0-108.68 18.85-52.24 18.84-95.01 55.3l449.54 449.54Z"/>
            ) : scheduledTimeY.isAfter(dayjs()) ? (
              <path d="M690-90v-120H570v-60h120v-120h60v120h120v60H750v120h-60Zm-477.69-90Q182-180 161-201q-21-21-21-51.31v-455.38Q140-738 161-759q21-21 51.31-21h55.38v-84.61h61.54V-780h223.08v-84.61h60V-780h55.38Q698-780 719-759q21 21 21 51.31v236.31q-15-1.85-30-1.85t-30 1.85v-76.31H200v295.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h273.46q0 15 1.85 30 1.84 15 6.76 30H212.31ZM200-607.69h480v-100q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v100Zm0 0V-720v112.31Z" />
            ) : (
              <path d="M432.31-298.46H281.54q-75.34 0-128.44-53.1Q100-404.65 100-479.98q0-75.33 53.1-128.44 53.1-53.12 128.44-53.12h150.77v60H281.54q-50.39 0-85.96 35.58Q160-530.38 160-480q0 50.38 35.58 85.96 35.57 35.58 85.96 35.58h150.77v60ZM330-450v-60h300v60H330Zm197.69 151.54v-60h150.77q50.39 0 85.96-35.58Q800-429.62 800-480q0-50.38-35.58-85.96-35.57-35.58-85.96-35.58H527.69v-60h150.77q75.34 0 128.44 53.1Q860-555.35 860-480.02q0 75.33-53.1 128.44-53.1 53.12-128.44 53.12H527.69Z"/>
            )}
          </svg>

          {data.status === "ended"
            ? "Classroom Ended"
            : scheduledTimeY.isAfter(dayjs())
            ? "Add to Calendar"
            : "Join Classroom"}
        </button>
      </div>
    </div>
  );
};

const ScheduledCall = () => {
  const { calls, hasNextPage, isLoading } = useGetPublicCalls({
    limit: 3,
    sortDirection: "desc",
    type: "scheduled",
  });

  const router = useRouter();

  function goToExplore() {
    const fullUrl = `/dashboard/explore`;
    router.push(fullUrl);
  }

  function goTodashboard() {
    const fullUrl = `/dashboard`;
    router.push(fullUrl);
  }

  const LoadingSkeleton = () => {
    const shimmerAnimation = {
      initial: { backgroundPosition: "-200% 0" },
      animate: {
        backgroundPosition: "200% 0",
        transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
      },
    };

    return (
      <div className="w-full flex flex-col gap-y-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col text-slate-600 pb-8 border-b border-slate-300"
          >
            {/* Date Placeholder */}
            <motion.div
              className="h-4 w-32 bg-gray-300 rounded-md"
              {...shimmerAnimation}
            ></motion.div>

            {/* Title and Host Section */}
            <div className="py-2 flex flex-row items-center gap-2 justify-between">
              <div className="flex-1">
                <motion.div
                  className="h-6 w-3/4 bg-gray-300 rounded-md mb-2"
                  {...shimmerAnimation}
                ></motion.div>
                <motion.div
                  className="h-4 w-1/2 bg-gray-300 rounded-md"
                  {...shimmerAnimation}
                ></motion.div>
              </div>
              <motion.div
                className="w-9 h-9 bg-gray-300 rounded-full"
                {...shimmerAnimation}
              ></motion.div>
            </div>

            {/* Buttons Placeholder */}
            <div className="flex items-center gap-3 flex-row flex-wrap justify-between mt-2">
              <motion.div
                className="h-8 w-40 bg-gray-300 rounded-full"
                {...shimmerAnimation}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {calls.length === 0 && !isLoading && <InactiveSchedule />}
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="w-full flex flex-col gap-y-7">
          {calls.map((data, index) => {
            return <ScheduledCard data={data} key={index} />;
          })}
        </div>
      )}
      {hasNextPage ? (
        <div className="flex relative justify-between mt-auto pt-4">
          <button
            className="mt-4 bg-pody-dark text-sm rounded-full px-8 py-4 text-slate-200 hover:opacity-80 transition-all duration-300"
            onClick={goToExplore}
          >
            Explore More
          </button>
        </div>
      ) : (
        <div className="flex relative justify-between mt-auto pt-4">
          <button
            className="mt-4 bg-pody-dark text-sm rounded-full px-8 py-4 text-slate-200 hover:opacity-80 transition-all duration-300"
            onClick={goTodashboard}
          >
            Schedule Classroom
          </button>
        </div>
      )}
    </>
  );
};

const ScheduledClass = () => {
  return (
    <section className="w-full relative">
      <div className="w-full flex flex-row __scheduled_container_layout max-w-7xl px-0 md:px-6 mx-auto">
        <div className="flex-1 __scheduled_layout_lft bg-pody-primary relative overflow-hidden">
          <div className="absolute bottom-0 -right-12">
            <Image
              src={CurvedCircleImage}
              className="w-[35rem] mix-blend-hard-light blur-2xl"
              width={300}
              height={300}
              alt="pody background ring"
            />
          </div>
          <div className="w-full flex flex-row z-40 relative h-full">
            <div className="w-full min-h-screen px-5 md:px-6 py-7 flex flex-col">
              <div className="mb-40">
                <div className="max-w-lg">
                  <p className="text-3xl font-semibold text-slate-900">
                    Add scheduled classrooms to your calendar to stay organized
                    and never miss a session.
                  </p>
                </div>
              </div>
              <div className="mt-auto relative pt-9">
                <div className="max-w-sm">
                  <div className="flex flex-col gap-y-1 text-slate-800">
                    <div className="font-medium">
                      <p className="text-sm">Tip of the Day</p>
                      <h2 className="text-lg mt-2">
                        Reach a wider audience and boost your rewards by
                        creating a public, scheduled classroom!
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[25rem] __scheduled_layout_rgt bg-white">
          <div className="w-full min-h-screen flex flex-col">
            <div className="bg-slate-50 flex-1 flex flex-col px-5 md:px-6 py-7">
              <ScheduledCall />
            </div>
            <div className="relative mt-auto bg-pody-dark min-h-72 text-slate-200 p-5 md:p-9 flex items-center">
              <div className="gap-y-4 flex flex-col">
                <div className="py-2">
                  <h2 className="text-2xl font-medium">
                    Host Public Classroom to Earn Points
                  </h2>
                  <p className="text-sm text-slate-300 mt-2">
                    Earn an Extra 10% of Students&apos; Points
                  </p>
                </div>
                <button className="flex flex-row gap-x-2 items-center justify-between w-full py-5 font-medium border-t border-slate-100/30">
                  <span>Host your classroom</span>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduledClass;
