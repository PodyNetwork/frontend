import useGetReferrals from "@/hooks/referral/useGetReferral";
import React from "react";
import ReferralSkeleton from "./ReferralSkeleton";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import Image from "next/image";

interface ReferralData {
  _id: string;
  count?: number;
  username: string;
  timeJoined?: string;
}

const ReferralTable = () => {
  const {
    referralData,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    isLoading,

  } = useGetReferrals({ limit: 10, sortDirection: "desc" });

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A"; // Handle undefined dates
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };
  

  const ReferralTableList = () => (
    <>
      <table className="hidden md:table w-full text-sm text-left rtl:text-right text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th scope="col" className="p-4">
                  S/N
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Reward
                </th>
                <th scope="col" className="px-6 py-3">
                  Point
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="__pdy_tbl_bdy">
              {referralData.map((data: ReferralData, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b border-slate-100 text-sm hover:bg-slate-50"
                >
                  <td className="w-4 p-4">{index + 1}</td>
                  <td
                    scope="row"
                    className="flex items-center px-6 py-3 text-slate-900 whitespace-nowrap"
                  >
                    <div className="w-8 h-8">
                      <AvatarParticipant name={data?.username} />
                    </div>
                    <div className="ps-3">
                      <div className="text-sm font-medium">{data?.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">Referral Bonus</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center">1000</div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                  {formatDate(data.timeJoined)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          {/* Mobile View */}
          <div className="md:hidden">
            {referralData.map((data: ReferralData, index: number) => (
              <div
                className="grid grid-cols-[2rem_1fr] items-center gap-1 mb-2"
                key={index}
              >
                <div>
                  <h3 className="font-semibold text-lg">{index + 1}</h3>
                </div>
                <div
                  key={index}
                  className="grid grid-cols-[2.5rem_1fr] items-center gap-4 p-2 bg-white shadow-md shadow-slate-100 rounded-xl"
                >
                  <div className="w-10 max-w-10 h-10">
                    <AvatarParticipant name={data?.username} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm font-medium text-slate-900 truncate">
                      <span>{data?.username}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      <span>1000 points</span> • {formatDate(data.timeJoined)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          <div className="py-4 flex flex-row gap-x-2 md:px-4 text-xs items-center text-slate-800">
            <button
              className="bg-slate-100 p-2 rounded-md disabled:opacity-50"
              onClick={previousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-slate-100 p-2 rounded-md disabled:opacity-50"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
    </>
  )

  if (isLoading) return <ReferralSkeleton />;

  return (
    <section className="w-full flex gap-4 flex-col py-5 mt-5">
      <div className="relative overflow-x-auto md:border md:border-slate-100 md:rounded-2xl">
        {referralData.length > 0 ? <ReferralTableList /> : <NoreferralCard /> }
      </div>
    </section>
  );
};

const NoreferralCard = () => (
  <div className="w-full p-8 mx-auto max-w-sm">
    <Image src="/illustration/chain-3d.png" className="mx-auto size-40" width={200} height={200} alt="" />
    <div className="text-center">
    <h3 className="text-lg font-medium text-slate-800">You don't have a Referral Currently</h3>
    <p className="text-xs mt-2 text-slate-700">Take advantage of an exciting opportunity to earn rewards! Copy your unique referral link and share it with your friends and network.</p>
    </div>
  </div>
)

export default ReferralTable;
