"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import userIcon from "/public/avatar/user5.jpeg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Call } from "@/app/call/types";
import meetingImageError from "/public/illustration/wormies nocall.svg";
import EditDrawer from "@/components/dashboard/widgets/editDrawer";
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';

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
  return (
    <>
      {calls.map((call: Call, index: number) => {
        return  <div
        key={index}
        className="p-4 sm:p-5 bg-slate-50 rounded-2xl flex flex-col h-[270px]"
      >
        <div className="flex flex-col gap-y-1.5">
          <p className="text-xs text-slate-700">{call.scheduledTime}</p>
          <h3 className="text-base sm:text-lg font-medium text-slate-800">
            {call.title}
          </h3>
          <div>
            <button className="text-xs text-pody-danger bg-pody-danger/10 px-2 sm:px-3 py-1 font-medium rounded-sm">
              {call.status}
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-2 sm:gap-x-3 mt-auto">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/20">
            <Image
              src={userIcon}
              width={100}
              height={100}
              className="w-full h-full object-cover rounded-full"
              alt="user"
            />
          </div>
          <div className="text-xs sm:text-sm">
            <h3 className="font-medium">0x3ax</h3>
            <p>Host</p>
          </div>
          <EditDrawer call={{...call, participantsCanPublish: call.permissions.canPublish}} />
        </div>
      </div>
      })}
    </>
  );
};

const CallMessageDisplay = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="w-4/12">
        <p className="break-words text-xl sm:text-2xl">{message}</p>
      </div>
      <div className="w-7/12">
        <Image
          src={meetingImageError}
          className="w-full h-64 object-contain"
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
}: CallHistoryProps) => {
  const pathname = usePathname();

  const handleFetchMore = useCallback(() => {
    if (hasNextPage && fetchNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const renderCalls = () => {
    if (isError) {
      return <CallMessageDisplay message="Error fetching calls" />;
    }
    if (calls.length > 0) {
      return <CallsCard calls={calls} />;
    }
    return (
      <CallMessageDisplay message="Opps no meeting found. Click the 'Create Meeting' button to start one." />
    );
  };

  return (
    <div className="relative flex pb-4 w-full flex-col rounded-3xl __shadow_pody">
      <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 sm:px-6 pb-[20px] pt-4">
        <h4 className="text-base sm:text-lg text-slate-700 dark:text-slate-800 font-medium">
          Meeting
        </h4>
        {pathname !== "/dashboard/call" && (
          <Link href="/dashboard/call">
            <button className="text-xs bg-pody-primary/40 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full">
              Show All
            </button>
          </Link>
        )}
      </div>
      <div
        className={` gap-4 px-4 sm:px-6 ${
          calls.length < 1
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
            className="text-sm bg-pody-primary/40 px-3 py-1.5 rounded-full"
          >
            {isFetchingNextPage ? "Loading more..." : "Fetch More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CallHistory;
