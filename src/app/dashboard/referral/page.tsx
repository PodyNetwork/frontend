import React from "react";
import Image from "next/image";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";

const campaigns = [
  { name: "John", date: "2024-11-30 9:14 AM", point: 10049 },
  { name: "Campaign ", date: "2024-11-29 12:14 PM", point: 12334 },
  { name: "Research", date: "2024-11-28 11:14 AM", point: 11025 },
  { name: "Project", date: "2024-11-27 08:14 AM", point: 19919 },
  { name: "House", date: "2024-11-26 07:14 AM", point: 82905 },
];

const leaderboardData = [
  {
    name: "RABBITS RUSH",
    point: 10049,
  },
  {
    name: "BRAIN SPILLERZ",
    point: 10049,
  },
  {
    name: "JamtSPILLERZ",
    point: 890049,
  },
  {
    name: "JaLLERZ",
    point: 8049,
  },
  {
    name: "RABBITS RUSH",
    point: 10049,
  },
  {
    name: "BRAIN SPILLERZ",
    point: 10049,
  },
  {
    name: "JamtSPILLERZ",
    point: 890049,
  },
  {
    name: "JaLLERZ",
    point: 8049,
  },
  // Add more data as needed
];

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

const page = () => {
  return (
    <main className="w-full">
      <div className="bg-pody- p-5 md:pt-12 md:pb-3">
        <section className="w-full md:max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="bg-pody-primary rounded-2xl w-full __img_reward_grab">
            <div className="__img_veil_grab p-10">
              <h2 className="text-[2.3rem] leading-tight font-semibold text-white">
                $4999.99 Reward <br /> Up for Grab
              </h2>
              <p className="text-sm mt-6 max-w-lg text-slate-100">
                Pody is offering a one of kind Referral Reward! The top referrer
                will receive 4,999.99 USD in equivalent of PodyToken at the time
                of Token launch. Don’t miss this opportunity to earn big while
                sharing Pody with others.
              </p>
              <div className="mt-6 flex flex-row items-center text-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 me-1"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="M450-290h60v-230h-60v230Zm30-298.46q13.73 0 23.02-9.29t9.29-23.02q0-13.73-9.29-23.02-9.29-9.28-23.02-9.28t-23.02 9.28q-9.29 9.29-9.29 23.02t9.29 23.02q9.29 9.29 23.02 9.29Zm.07 488.46q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
                <p className="text-xs">Terms and Condition Apply</p>
              </div>
            </div>
            <div></div>
          </div>
        </section>
      </div>
      <div className="w-full relative flex flex-col md:flex-row gap-6 p-5 md:p-6">
        <div className="w-full md:max-w-5xl mx-auto">
          <section className="w-full flex flex-row gap-4">
            <div className="flex-1 gap-6 flex flex-col p-8 rounded-xl __pd_golden_grd">
              <div className="text-slate-50">
                <h1 className="text-lg font-medium">Referral</h1>
                <p className="text-sm">Refer users with your referral code to earn points.</p>
              </div>
              <div className="flex flex-row gap-4">
                <div className="text-slate-50 w-7/12 flex flex-col">
                  <div className="pt-3">
                    <h2 className="font-bold text-5xl">100,000</h2>
                    <p className="text-base mt-1">Points Earned</p>
                  </div>
                  <div className="mt-auto pt-8">
                    <div className="flex flex-row items-center gap-x-2">
                      <h2 className="font-bold text-4xl">eax</h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mt-1.5"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                      >
                        <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                      </svg>
                    </div>
                    <p className="text-base mt-1">Referral Code</p>
                  </div>
                </div>
                <div className="w-5/12 flex flex-col justify-between gap-y-4 text-slate-50">
                  <div>
                    <h2 className="font-semibold text-2xl">729</h2>
                    <p className="text-base mt-1">Total Referral</p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-2xl">1.25</h2>
                    <p className="text-base mt-1">Current xP</p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-2xl web3-gradient-text">
                      Diamond
                    </h2>
                    <p className="text-base mt-1">Level</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[18rem] bg-slate-50 rounded-xl">
              <div>
                <Image
                  src="/illustration/Group139383.png"
                  className="w-full h-[50%] object-cover rounded-t-xl"
                  width={150}
                  height={150}
                  alt="referral task"
                />
              </div>
              <div className="p-4">
                <h2 className="text-sm">Weekly Task</h2>
                <p className="blur-sm">Weekly Task 1</p>
                <div className="flex flex-row items-center justify-between py-4">
                  <h3 className="text-sm blur-sm">+300 Points</h3>
                  <button
                    disabled
                    className="text-xs border-2 border-slate-400 text-slate-500 rounded-full px-2 py-1"
                  >
                    Coming soon
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full flex gap-4 flex-col py-5 mt-5">
            <div className="relative overflow-x-auto -8 border border-slate-100 rounded-xl">
              <table className="w-full text-sm text-left rtl:text-right text-slate-500">
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
                  {leaderboardData.map((data, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b border-slate-100 text-sm hover:bg-slate-50"
                    >
                      <td className="w-4 p-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-3 text-slate-900 whitespace-nowrap"
                      >
                        <div className="w-8 h-8">
                          <AvatarParticipant name={data.name} />
                        </div>
                        <div className="ps-3">
                          <div className="text-sm font-medium">{data.name}</div>
                        </div>
                      </th>
                      <td className="px-6 py-3">Referral Bonus</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center">{data.point}</div>
                      </td>
                      <td className="px-6 py-3">29 Dec, 2024 9:18 AM</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="w-full flex gap-4 flex-col py-5">
            <div className="w-full flex flex-row items-start gap-4 text-slate-500 rounded-xl">
              <div className="w-[21rem] flex flex-col gap-y-4">
                <div className="flex flex-row justify-between gap-x-2 __pd_light_gradient p-6 rounded-xl w-full">
                  <div className="text-left">
                    <div className="text-sm mb-3">My Rank</div>
                    <div className="text-xl font-semibold">3RD PLACE</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm mb-3">My Points</div>
                    <div className="text-xl font-semibold">200K</div>
                  </div>
                </div>
                <div className="p-6 bg-slate-100 text-sm rounded-md w-full flex items-center justify-center flex-col gap-4">
                  <h3 className="text-base text-slate-500 font-medium">
                    Top Referral of the Week
                  </h3>
                  <div className="w-16 h-16">
                    <AvatarParticipant name="eax" />
                  </div>
                  <p className="text-xl font-semibold text-slate-600 uppercase truncate">
                    eax
                  </p>
                </div>
              </div>
              <div className="flex-1 border border-slate-100 rounded-xl">
                <div className="flex justify-between items-center mb-3 bg-slate-50 px-6 py-4 rounded-t-xl">
                  <h2 className="text-base font-medium">
                    Referral Leaderboard
                  </h2>
                </div>
                <ul className="px-6 __pd_list_ldb">
                  {leaderboardData.map((leader, index) => {
                    const position = index + 1;
                    return (
                      <li className="py-3 border-b border-slate-100 cursor-pointer" key={index}>
                        <div className="grid grid-cols-[3rem_3fr_1fr] gap-3 items-center">
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
                          <div>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full">
                                <AvatarParticipant name={leader.name} />
                              </div>
                              <span className="ml-2.5 truncate font-medium text-sm">
                                {leader.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row items-center gap-x-2 justify-end">
                            <span className="font-medium text-sm">
                              {leader.point}
                            </span>
                            {placementStyles[position] ? (
                              <Image
                                className="w-4 h-4 mb-1"
                                src={placementStyles[position].badge}
                                width={50}
                                height={50}
                                alt={placementStyles[position].alt}
                              />
                            ) : (
                              <p className="w-4 h-4 flex items-center justify-center">
                                -
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
