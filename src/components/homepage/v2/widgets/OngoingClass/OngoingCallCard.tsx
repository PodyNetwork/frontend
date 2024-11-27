import React from "react";
import dayjs from "dayjs";
import BlockiesSvg from "blockies-react-svg";
import { useRouter } from "next/navigation";
import useProfileById from "@/hooks/user/useGetProfileById";
import { handleAddToCalendar } from "../../utils/AddToCalendar";
import { Call } from "@/app/classroom/types";
import { formatScheduledDate, formatScheduledTime } from "../../utils/FormatScheduleDateAndTime";

const OngoingCallCard = ({ call }: { call: Call }) => {
  const router = useRouter();
  const { profile } = useProfileById(call.userId);
  const nowY = dayjs();
  const scheduledTimeY = dayjs(call.scheduledTime);

  const handleJoinEvent = (url: string) => {
    router.push(`/call/${url}`);
    console.log("Navigating to call:", url);
  };

  const handleButtonClick = () => {
    if (
      (call.status === "pending" || call.status === "ongoing") &&
      scheduledTimeY.isBefore(nowY)
    ) {
      handleJoinEvent(call.url);
    } else if (scheduledTimeY.isAfter(nowY) && call.status !== "ongoing") {
      handleAddToCalendar({ data: call, profile: profile || { username: "User" } });
    }
  };

  const renderStatus = () => {
    if (call.status === "ongoing") {
      return (
        <>
          <p className="live-dot bg-pody-success"></p>
          {call.status}
        </>
      );
    }
    return (
      <p className="capitalize">
        {call.type ? `${call.type} Classroom` : "Instant Classroom"}
      </p>
    );
  };

  const buttonLabel = () => {
    if (call.type === "instant") {
      return call.status === "ended" ? "Classroom Ended" : "Join Call";
    }
    return call.status === "ended"
      ? "Classroom Ended"
      : scheduledTimeY.isAfter(dayjs())
      ? "Add to Calendar"
      : "Join Classroom";
  };

  return (
    <div
      key={call._id}
      className="bg-slate-100 p-5 rounded-3xl xs:rounded-[1.7rem] text-slate-600"
    >
      {/* Scheduled Time */}
      <div className="flex flex-wrap items-center mb-4 text-xs xs:text-sm">
        <span className="bg-slate-200 rounded-full px-4 py-2">
          {call.scheduledTime ? formatScheduledDate(call.scheduledTime) : ""}
        </span>
        <span className="bg-slate-200 rounded-full px-4 py-2">
          {call.scheduledTime ? formatScheduledTime(call.scheduledTime) : ""}
        </span>
      </div>

      {/* Call Details */}
      <div className="py-5">
        <h2 className="text-lg font-medium">
          {call.title || "Untitled Meeting"}
        </h2>
        <div className="text-xs mt-1">Host: {profile?.username}</div>
      </div>

      {/* Call Info */}
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
              {renderStatus()}
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleButtonClick}
        disabled={call?.status === "ended"}
        className={`bg-slate-300 w-full justify-center mt-3 cursor-pointer text-slate-700 text-sm rounded-full px-4 py-2 flex items-center ${
          call?.status === "ended" && "opacity-30"
        }`}
      >
        {buttonLabel()}
        {call?.status === "ongoing" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ms-2"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="m553.85-253.85-42.16-43.38L664.46-450H180v-60h484.46L511.69-662.77l42.16-43.38L780-480 553.85-253.85Z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default OngoingCallCard;
