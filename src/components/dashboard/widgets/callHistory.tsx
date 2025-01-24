"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Call } from "@/app/classroom/types";
import meetingImageError from "/public/illustration/wormies nocall.svg";
import EditDrawer from "@/components/dashboard/widgets/editDrawer";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import BlockiesSvg from "blockies-react-svg";
import { isMobile } from "react-device-detect";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip } from "@/components/misc/tooltip";
import StreamShareUrl from "@/components/call/widgets/share/StreamShareUrl";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
interface Calls {
  calls: Array<Call>;
}
interface CallHistoryProps extends Calls {
  isLoading: boolean;
  isError: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  filterStatus?: "all" | "pending" | "ongoing" | "ended" | "cancelled"; // Strictly type the status
  setFilterStatus?: React.Dispatch<
    React.SetStateAction<"all" | "pending" | "ongoing" | "ended" | "cancelled">
  >; // Update to reflect correct types
}

const CallSkeleton = () => {
  return (
    <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl flex flex-col h-[270px]">
      <div className="flex flex-col gap-y-1.5">
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div>
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-row gap-x-3 mt-auto">
        <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="text-sm">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mt-1"></div>
        </div>
      </div>
    </div>
  );
};

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const CallsCard = ({ calls }: Calls) => {
  const router = useRouter();
  const [copied, setCopied] = useState<Record<string, boolean>>({});

  function goToMeeting(callUrl: string) {
    const fullUrl = `/classroom/${callUrl}`;
    router.push(fullUrl);
  }

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

    return (
      <div className="text-xs text-slate-700 capitalize">{timeDisplay}</div>
    );
  };

  const handleCopy = ({ callId }: { callId: string }) => {
    const referralLink = `https://pody.network/classroom/${callId}`;
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopied((prev) => ({
          ...prev,
          [callId]: true,
        }));
        setTimeout(() => {
          setCopied((prev) => ({
            ...prev,
            [callId]: false,
          }));
        }, 1000); // Reset the copied state after 3 seconds
      })
      .catch((error) => console.error("Failed to copy text:", error));
  };

  return (
    <>
      {calls.map((call: Call, index: number) => {
        return (
          <div
            key={index}
            className="p-4 sm:p-5 bg-slate-50 rounded-2xl flex flex-col h-[270px]"
            onClick={() => {
              if (call.status !== "ended") {
                goToMeeting(call.url);
              }
            }}
          >
            <div className="flex flex-col gap-y-1.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <ScheduledTimeDisplay scheduledTime={call.scheduledTime} />
                <p className="text-xs capitalize">{call?.type}</p>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-slate-800 truncate">
                {call?.title}
              </h3>
              <div>
                <button
                  className={`text-xs bg-pody-danger/10 px-2 sm:px-3 py-1 font-medium rounded-sm 
                    ${
                      call?.status === "ended"
                        ? "text-pody-danger bg-pody-danger/10"
                        : call?.status === "ongoing"
                        ? "text-pody-success bg-pody-success/10"
                        : call?.status === "pending"
                        ? "text-pody-primary bg-pody-primary/10"
                        : "text-white bg-slate-600"
                    }`}
                >
                  {call?.status}
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-2 sm:gap-x-3 mt-auto">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full relative bg-black/20">
                <BlockiesSvg
                  address={call?.url}
                  className="w-full h-full rounded-full"
                />
              </div>
              <div
                className={`text-xs flex-1 text-slate-700 ${
                  call?.status === "ended" && "opacity-40"
                }`}
              >
                <h3 className="font-medium">{call?.url}</h3>
                <p className="text-xs capitalize">{call?.privacy} Call</p>
              </div>
              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {call?.type === "scheduled" && call?.status === "pending" && (
                  <Tooltip text="Edit Classroom">
                    <div className="edit-drawer-container cursor-crosshair">
                      <EditDrawer
                        call={{
                          ...call,
                          participantsCanPublish: call.permissions.canPublish,
                        }}
                      />
                    </div>
                  </Tooltip>
                )}
                {isMobile ? (
                  <Tooltip text="Share Classroom">
                    <StreamShareUrl url={call?.url}>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-pody-dark"
                          viewBox="0 -960 960 960"
                          fill="currentColor"
                        >
                          <path d="M252.31-60Q222-60 201-81q-21-21-21-51.31v-415.38Q180-578 201-599q21-21 51.31-21h102.3v60h-102.3q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v415.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-415.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85h-102.3v-60h102.3Q738-620 759-599q21 21 21 51.31v415.38Q780-102 759-81q-21 21-51.31 21H252.31ZM450-330v-441.23l-74 74L333.85-740 480-886.15 626.15-740 584-697.23l-74-74V-330h-60Z" />
                        </svg>
                      </div>
                    </StreamShareUrl>
                  </Tooltip>
                ) : (
                  <Tooltip
                    text={copied[call?.url] ? "Copied!" : "Copy Classroom Link"}
                  >
                    <div className="relative">
                      <div
                        onClick={() => handleCopy({ callId: call?.url || "" })}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-5 h-5 ${copied[call?.url] ? "text-green-500" : "text-pody-dark"}`}
                          viewBox="0 -960 960 960"
                          fill="currentColor"
                        >
                          <path d="M362.31-260Q332-260 311-281q-21-21-21-51.31v-455.38Q290-818 311-839q21-21 51.31-21h335.38Q728-860 749-839q21 21 21 51.31v455.38Q770-302 749-281q-21 21-51.31 21H362.31Zm0-60h335.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H362.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-140 200Q192-120 171-141q-21-21-21-51.31v-515.38h60v515.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h395.38v60H222.31ZM350-320v-480 480Z" />
                        </svg>
                      </div>
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
const CallMessageDisplay = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row items-center justify-between w-full">
      <div className="w-full md:w-4/12">
        <p className="break-words text-sm sm:text-base text-slate-500">
          {message}
        </p>
      </div>
      <div className="w-full md:w-7/12">
        <Image
          src={meetingImageError}
          className="w-full h-52 object-contain"
          width={300}
          height={300}
          alt="user"
        />
      </div>
    </div>
  );
};

const CallHistory = ({
  calls,
  isError,
  isLoading,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  filterStatus,
  setFilterStatus,
}: CallHistoryProps) => {
  const pathname = usePathname();

  const handleFetchMore = useCallback(() => {
    if (hasNextPage && fetchNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const handleFilterChange = (
    value: "all" | "pending" | "ongoing" | "ended" | "cancelled"
  ) => {
    if (setFilterStatus) {
      setFilterStatus(value);
    }
  };

  const renderCalls = () => {
    if (isLoading) {
      return Array.from({ length: 3 }, (_, index) => (
        <CallSkeleton key={index} />
      ));
    }
    if (isError) {
      return <CallMessageDisplay message="Error fetching calls" />;
    }
    if (calls.length > 0) {
      return <CallsCard calls={calls} />;
    }
    return (
      <CallMessageDisplay message="Opps no meeting found. Click the 'Create Classroom' button to start one." />
    );
  };

  return (
    <div className="relative flex pb-4 w-full flex-col rounded-3xl __shadow_pody cursor-pointer">
      <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 sm:px-6 pb-[20px] pt-4">
        <h4 className="text-base sm:text-lg text-slate-700 dark:text-slate-800 font-medium">
          Classroom
        </h4>
        {pathname !== "/dashboard/call" ? (
          <Link href="/dashboard/call">
            <button className="bg-pody-dark text-sm rounded-full px-6 py-2.5 text-slate-200 hover:opacity-80 transition-all duration-300">
              Show All
            </button>
          </Link>
        ) : (
          <Select value={filterStatus} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-auto">
              <SelectValue>
                {filterStatus === "all" ? "Filter" : filterStatus}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
      <div
        className={` gap-4 px-4 sm:px-6 ${
          !isLoading && calls.length < 1
            ? "w-full"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {renderCalls()}
        {isLoading ||
          (isFetchingNextPage &&
            Array.from({ length: 3 }, (_, index) => (
              <CallSkeleton key={index} />
            )))}
      </div>
      {hasNextPage && (
        <div className="col-span-full mt-4 text-center">
          <button
            onClick={handleFetchMore}
            disabled={isFetchingNextPage}
            className="bg-pody-dark text-sm rounded-full px-8 py-4 text-slate-200 hover:opacity-80 transition-all duration-300"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CallHistory;
