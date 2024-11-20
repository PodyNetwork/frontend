import { useCallback, useState } from "react";
import Image from "next/image";
import BlockiesSvg from "blockies-react-svg";
import CurvedCircleImage from "/public/illustration/circular_ring.png";
import useGetPublicCalls from "@/hooks/call/useGetPublicCalls";
import useProfileById from "@/hooks/user/useGetProfileById";

const ScheduledCall = () => {
  const {
    calls,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetPublicCalls({
    limit: 3,
    sortDirection: "desc",
    type: "scheduled",
  });

  const handleFetchMore = useCallback(() => {
    if (hasNextPage && fetchNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  return (
    <>
      <div className="w-full flex flex-col gap-y-8">
        {calls.map((data) => {
          // const { profile, isLoading: profileLoading } = useProfileById(1);
          return (
            <div
              key={data._id}
              className="flex flex-col text-slate-600 pb-8 border-b border-slate-300"
            >
              <div className="text-sm font-medium">
                <p>{data.scheduledTime}</p>
              </div>
              <div className="py-2 flex flex-row items-center gap-2 justify-between">
                <div className="flex-1 relative overflow-hidden">
                  <h2 className="text-lg truncate whitespace-nowrap font-medium">
                    {data.title}
                  </h2>
                  {/* {profileLoading ? (
                    <p className="text-sm text-gray-400">Loading profile...</p>
                  ) : (
                    <p className="text-sm truncate">
                      {profile?.username || data.userId}
                    </p>
                  )} */}
                </div>
                <div className="w-9 h-8 relative bg-black/20 rounded-full">
                  <BlockiesSvg
                    address={data.url}
                    className="w-9 h-9 object-cover rounded-full"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 flex-row flex-wrap justify-between mt-2 text-sm font-medium">
                <button
                  className={`cursor-pointer text-slate-800 rounded-full flex items-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 me-2"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                  >
                    <path d="M690-90v-120H570v-60h120v-120h60v120h120v60H750v120h-60Zm-477.69-90Q182-180 161-201q-21-21-21-51.31v-455.38Q140-738 161-759q21-21 51.31-21h55.38v-84.61h61.54V-780h223.08v-84.61h60V-780h55.38Q698-780 719-759q21 21 21 51.31v236.31q-15-1.85-30-1.85t-30 1.85v-76.31H200v295.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h273.46q0 15 1.85 30 1.84 15 6.76 30H212.31ZM200-607.69h480v-100q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v100Zm0 0V-720v112.31Z" />
                  </svg>
                  Add to Calendar
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex relative justify-between mt-auto pt-4">
        {/* <button>Previous</button> */}
        {hasNextPage && (
          <button
            onClick={handleFetchMore}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            Next
          </button>
        )}
      </div>
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
          <div className="w-full flex flex-row z-40 relative">
            <div className="min-h-screen w-full px-5 md:px-6 py-7 flex flex-col">
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
                      <p className="text-sm">Host Tip</p>
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
