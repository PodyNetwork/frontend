import useGetReferrals from "@/hooks/referral/useGetReferral";
import React from "react";
import ReferralSkeleton from "./ReferralSkeleton";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";

const ReferralTable = () => {
  const {
    referralData,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    isLoading,

  } = useGetReferrals({ limit: 10, sortDirection: "asc" });

  if (isLoading) return <ReferralSkeleton />;

  return (
    <section className="w-full flex gap-4 flex-col py-5 mt-5">
      <div className="relative overflow-x-auto md:border md:border-slate-100 md:rounded-xl">
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
            {referralData.map((data, index) => (
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
                  <div className="flex items-center">{data.count}</div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  29 Dec, 2024 9:18 AM
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="md:hidden">
          {referralData.map((data, index) => (
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
                    <span>{data.count} points</span> • 29 Dec, 2024
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="py-4 flex flex-row gap-x-2 px-4 text-xs items-center text-slate-800">
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
      </div>
    </section>
  );
};

export default ReferralTable;
