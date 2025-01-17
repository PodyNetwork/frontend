import useGetPublicCalls from '@/hooks/call/useGetPublicCalls';
import { useRouter } from 'next/navigation';
import React from 'react'
import InactiveSchedule from './InactiveSchedule';
import LoadingSkeleton from './LoadingSkeleton';
import ScheduledCard from './ScheduledCard';

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

export default ScheduledCall