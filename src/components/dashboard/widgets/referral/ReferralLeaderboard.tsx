import React from "react";
import ReferralLeaderboardSkeleton from "./ReferralLeaderboardSkeleton";
import useGetReferralLeaderboard from "@/hooks/referral/useGetReferralLeaderboard";
import Image from "next/image";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";

const placementStyles = {
  1: {
    badge: "/milestone/1st-place.svg",
    alt: "First place badge",
  },
  2: {
    badge: "/milestone/2nd-place.svg",
    alt: "Second place badge",
  },
  3: {
    badge: "/milestone/3rd-place.svg",
    alt: "Third place badge",
  },
} as Record<number, { badge: string; alt: string }>;

const ReferralLeaderboard = () => {
  const {
    referralLeaderboard,
    isLoading,
  } = useGetReferralLeaderboard();

  const LeaderboardList = () => (
    <>
      <div className="flex justify-between items-center mb-3 bg-slate-50 px-6 py-4 rounded-t-xl">
        <h2 className="text-base font-medium">Referral Leaderboard</h2>
      </div>
      <ul className="px-6 __pd_list_ldb overflow-x-auto">
        {referralLeaderboard.map((leader, index) => {
          const position = index + 1;
          return (
            <li
              className="py-3 border-b border-slate-100 cursor-pointer"
              key={index}
            >
              <div className="grid grid-cols-[2.5rem_1fr_2rem] gap-3 items-center">
                {/* Position Badge */}
                <div
                  className={`inline-flex justify-center items-center w-6 h-6 text-sm rounded-md text-slate-900 ${
                    position <= 3
                      ? position === 1
                        ? "bg-pody-primary"
                        : position === 2
                        ? "bg-[#C0C0C0]"
                        : "bg-[#CD7F32]"
                      : ""
                  }`}
                >
                  {position}
                </div>

                {/* Leader Information */}
                <div className="flex items-center">
                  <div>
                    <div className="size-8 rounded-full">
                      <AvatarParticipant name={leader.username} />
                    </div>
                  </div>
                  <div className="ms-2.5 gap-y-px font-medium text-sm">
                    <p className=" truncate">{leader.username}</p>
                    <p className="truncate">{(leader.count * 10000).toLocaleString()}  Points</p>
                  </div>
                </div>

                {/* Points & Badge */}
                <div className="flex flex-row text-sm items-center font-medium justify-end gap-2 whitespace-nowrap">
                  {placementStyles[position] ? (
                    <Image
                      className="size-5 mb-1"
                      src={placementStyles[position].badge}
                      width={50}
                      height={50}
                      alt={placementStyles[position].alt}
                    />
                  ) : (
                    <p className="size-5 flex items-center justify-center">
                      #{index + 1}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );

  if (isLoading) return <ReferralLeaderboardSkeleton />;

  return (
    <div className="w-full flex-1 border border-slate-100 rounded-xl">
      {referralLeaderboard.length > 0 ? <LeaderboardList />  : <NoLeaderboardCard />}
    </div>
  );
};

const NoLeaderboardCard = () => (
  <div className="w-full p-8 mx-auto max-w-sm">
    <Image
      src="/illustration/leaderboard-3d.png"
      className="mx-auto size-60 object-cover"
      width={200}
      height={200}
      alt=""
    />
    <div className="text-center">
      <h3 className="text-lg font-medium text-slate-800">
       There is no data available for the leaderboard.
      </h3>
      <p className="text-xs mt-2 text-slate-700">
        Seize the opportunity to top the leaderboard! Copy your unique referral link and share it with friends and your network.
      </p>
    </div>
  </div>
);

export default ReferralLeaderboard;
