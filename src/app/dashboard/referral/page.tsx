"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

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
  }
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
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleCopy = () => {
    navigator.clipboard
      .writeText("eax")
      .then(() => {
        setCopied(true);
        triggerConfetti();
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  const triggerConfetti = () => {
    if (containerRef.current) {
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const originX = (left + width / 2) / window.innerWidth;
      const originY = (top + height / 2) / window.innerHeight;
      confetti({
        particleCount: 100,
        spread: 60,
        startVelocity: 30,
        origin: { x: originX, y: originY },
        angle: 90,
        colors: ["#FFD700", "#ff8c00", "#ff007f", "#7b00ff", "#FF69B4"],
        gravity: 0.5,
        scalar: 0.8,
      });
    }
  };

  return (
    <main className="w-full">
      <div className="bg-pody-mintgreen p-5 md:p-12">
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
              <div className="mt-6 flex flex-row items-center text-slate-100">
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
          <section className="w-full flex flex-col md:flex-row gap-4">
            <div className="flex-1 gap-6 flex flex-col p-8 rounded-xl __pd_golden_grd relative">
              <div className="text-slate-50">
                <h1 className="text-lg font-medium">Referral</h1>
                <p className="text-sm">
                  Refer users with your referral code to earn points.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="text-slate-50 w-7/12 flex flex-col">
                  <div className="pt-3">
                    <h2 className="font-bold text-5xl">100,000</h2>
                    <p className="text-base mt-1">Points Earned</p>
                  </div>
                  <div
                    className="mt-auto pt-8 relative overflow-hidden"
                    ref={containerRef}
                  >
                    <div className="flex flex-row items-center gap-x-2 relative">
                      <h2 className="font-bold text-4xl">eax</h2>
                      <svg
                        onClick={handleCopy}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mt-1.5"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                      >
                        <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                      </svg>
                      <AnimatePresence>
                        {copied && (
                          <motion.p
                            className="text-pody-success text-xs"
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                          >
                            Copied!
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <p className="text-base mt-1">Referral Code</p>
                  </div>
                </div>
                <div className="w-5/12 flex flex-col justify-between gap-y-6 text-slate-50">
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
            <div className="w-full md:w-[22rem] border border-slate-100 rounded-xl">
              <div className="p-6 text-sm flex flex-col relative h-full text-slate-500">
                <h2 className="text-xl text-slate-800 font-medium">
                  Weekly Task
                </h2>
                <p className="mt-1">
                  Earn Points when you complete weekly task
                </p>
                <ul className="mt-4">
                  <li>
                    There&apos;s no weekly task right now, but you can start a
                    referral campaign and earn points instead!"
                  </li>
                </ul>
                <div className="flex flex-row items-center justify-between py-4 mt-auto">
                  <h3 className="font-medium">+300 Points</h3>
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
                  {leaderboardData.map((data, index) => (
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
                          <AvatarParticipant name={data.name} />
                        </div>
                        <div className="ps-3">
                          <div className="text-sm font-medium">{data.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        Referral Bonus
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center">{data.point}</div>
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
                {leaderboardData.map((data, index) => (
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
                        <AvatarParticipant name={data.name} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm font-medium text-slate-900 truncate">
                          <span>{data.name}</span>
                        </div>
                        <div className="text-xs text-slate-500">
                          <span>{data.point} points</span> • 29 Dec, 2024
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full flex gap-4 flex-col py-5">
            <div className="w-full flex flex-col md:flex-row items-start gap-4 text-slate-500 rounded-xl">
              <div className="w-full md:w-[21rem] flex flex-col gap-y-4">
                <div className="flex flex-row justify-between gap-x-2 __pd_light_gradient px-6 py-8 rounded-xl w-full">
                  <div className="text-left">
                    <div className="text-sm mb-4">My Rank</div>
                    <div className="text-xl font-semibold">3RD PLACE</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm mb-4">My Points</div>
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
              <div className="w-full flex-1 border border-slate-100 rounded-xl">
                <div className="flex justify-between items-center mb-3 bg-slate-50 px-6 py-4 rounded-t-xl">
                  <h2 className="text-base font-medium">
                    Referral Leaderboard
                  </h2>
                </div>
                <ul className="px-6 __pd_list_ldb overflow-x-auto">
                  {leaderboardData.map((leader, index) => {
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
                                <AvatarParticipant name={leader.name} />
                              </div>
                            </div>
                            <div className="ms-2.5 gap-y-px font-medium text-sm">
                              <p className=" truncate">
                                {leader.name}
                              </p>
                              <p className="truncate">
                                {leader.point}{" "}Points
                              </p>
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
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
