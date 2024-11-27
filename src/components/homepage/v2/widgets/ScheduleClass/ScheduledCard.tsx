import { Call } from "@/app/call/types";
import useProfileById from "@/hooks/user/useGetProfileById";
import BlockiesSvg from "blockies-react-svg";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import { handleAddToCalendar } from "../../utils/AddToCalendar";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const ScheduledTimeDisplay = ({
  scheduledTime,
}: {
  scheduledTime: string | number | undefined;
}) => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const scheduledDate = dayjs(scheduledTime);

  if (!scheduledTime) return null;

  let timeDisplay = "";
  if (scheduledDate.isSame(currentTime, "minute")) {
    timeDisplay = "Now";
  } else if (scheduledDate.isToday()) {
    timeDisplay = `Today - ${scheduledDate.format("HH:mm")}`;
  } else if (scheduledDate.isTomorrow()) {
    timeDisplay = `Tomorrow - ${scheduledDate.format("HH:mm")}`;
  } else if (scheduledDate.isSame(currentTime.subtract(1, "day"), "day")) {
    timeDisplay = `Yesterday - ${scheduledDate.format("HH:mm")}`;
  } else {
    timeDisplay = scheduledDate.format("MMM D, YYYY HH:mm");
  }

  return <div className="text-sm font-medium">{timeDisplay}</div>;
};

const ScheduledCard = ({ data }: { data: Call }) => {
  const { profile } = useProfileById(data.userId);
  const eventrouter = useRouter();

  const nowY = dayjs();
  const scheduledTimeY = dayjs(data.scheduledTime);

  const handleJoinEvent = (data: string) => {
    eventrouter.push(`/call/${data}`);
    console.log("hello");
  };

  const buttonText =
    data.status === "ended"
      ? "Classroom Ended"
      : scheduledTimeY.isAfter(nowY)
      ? "Add to Calendar"
      : "Join Classroom";

  return (
    <div className="flex flex-col text-slate-600 pb-7 border-b border-slate-200">
      <ScheduledTimeDisplay scheduledTime={data.scheduledTime} />
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
              handleAddToCalendar({ data, profile: profile || { username: "User" } });
            }
          }}
          className={`cursor-pointer rounded-full flex items-center ${
            data.status === "ended" && scheduledTimeY.isBefore(nowY)
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
              <path d="M480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q56.29 0 108.42-19.04 52.12-19.04 95.27-55.11L234.15-683.69q-35.69 43.15-54.92 95.27Q160-536.29 160-480q0 134 93 227t227 93Zm245.85-116.31q36.07-43.15 55.11-95.27Q800-423.71 800-480q0-134-93-227t-227-93q-56.43 0-108.68 18.85-52.24 18.84-95.01 55.3l449.54 449.54Z" />
            ) : scheduledTimeY.isAfter(dayjs()) ? (
              <path d="M690-90v-120H570v-60h120v-120h60v120h120v60H750v120h-60Zm-477.69-90Q182-180 161-201q-21-21-21-51.31v-455.38Q140-738 161-759q21-21 51.31-21h55.38v-84.61h61.54V-780h223.08v-84.61h60V-780h55.38Q698-780 719-759q21 21 21 51.31v236.31q-15-1.85-30-1.85t-30 1.85v-76.31H200v295.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h273.46q0 15 1.85 30 1.84 15 6.76 30H212.31ZM200-607.69h480v-100q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v100Zm0 0V-720v112.31Z" />
            ) : (
              <path d="M432.31-298.46H281.54q-75.34 0-128.44-53.1Q100-404.65 100-479.98q0-75.33 53.1-128.44 53.1-53.12 128.44-53.12h150.77v60H281.54q-50.39 0-85.96 35.58Q160-530.38 160-480q0 50.38 35.58 85.96 35.57 35.58 85.96 35.58h150.77v60ZM330-450v-60h300v60H330Zm197.69 151.54v-60h150.77q50.39 0 85.96-35.58Q800-429.62 800-480q0-50.38-35.58-85.96-35.57-35.58-85.96-35.58H527.69v-60h150.77q75.34 0 128.44 53.1Q860-555.35 860-480.02q0 75.33-53.1 128.44-53.1 53.12-128.44 53.12H527.69Z" />
            )}
          </svg>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ScheduledCard;
