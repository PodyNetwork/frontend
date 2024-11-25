import { Call } from '@/app/call/types';
import useGetPublicCalls from '@/hooks/call/useGetPublicCalls';
import useProfileById from '@/hooks/user/useGetProfileById';
import BlockiesSvg from 'blockies-react-svg';
import dayjs from 'dayjs';
import React from 'react'
import Inactivecall from './Inactivecall';
import SkeletonCard from './SkeletonCard';
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import { useRouter } from 'next/navigation';

  
dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const Publiccall = () => {
    const { calls, hasNextPage, isFetchingNextPage, isLoading } =
      useGetPublicCalls({
        limit: 4,
        sortDirection: "desc",
        type: "instant"
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
  
    const OngoingCallCard = ({ call }: { call: Call }) => {
      const { profile, isLoading: profileLoading } = useProfileById(call.userId);
  
      return (
        <div
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
                      {call.type ? `${call.type} Classroom` : "Instant Classroom"}
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
              call?.status === "ended" && "opacity-30"
            }`}
          >
            {call?.status === "ended" ? "Ended" : "Join Call"}
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

export default Publiccall