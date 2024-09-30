"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const leaderboardData = [
  {
    rank: 1,
    username: "John Philly",
    points: 6500,
    avatar: "/avatar/user6.png",
  },
  {
    rank: 2,
    username: "Henry Mike",
    points: 20000,
    avatar: "/avatar/user5.jpeg",
  },
  {
    rank: 3,
    username: "Marker Smith",
    points: 1500,
    avatar: "/avatar/user1.webp",
  },
  {
    rank: 4,
    username: "Marshal Fish",
    points: 10000,
    avatar: "/avatar/user4.jpg",
  },
];

const LeaderboardItem = ({
  rank,
  username,
  points,
  avatar,
}: LeaderboardItemProps) => (
  <motion.li
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: rank * 0.1 }}
    className="flex flex-row items-center justify-between bg-gradient-to-r from-slate-900 to-pody-dark_secondary rounded-xl px-6 py-3 mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex items-center gap-x-2">
      <div className="text-lg font-bold text-slate-300 w-6">{rank}</div>
      <div className="flex items-center gap-x-3">
        <Image
          src={avatar}
          width={56}
          height={56}
          alt={username}
          className="rounded-full w-8 h-8 object-cover border-2 border-pody-ptext-pody-primary shadow-md"
        />
        <h3 className="text-sm text-white">{username}</h3>
      </div>
    </div>
    <div>
      <p className="text-sm flex flex-row items-center gap-x-1 font-bold text-pody-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 -960 960 960"
          style={{ msFilter: "" }}
          fill="currentColor"
        >
          <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm-61 83.92 49.62-212.54-164.93-142.84 217.23-18.85L480-777.69l85.08 200.38 217.23 18.85-164.93 142.84L667-203.08 480-315.92 293-203.08ZM480-470Z"/>
        </svg>{" "}
        {points.toLocaleString()} pts
      </p>
    </div>
  </motion.li>
);

const TopThree = ({ data }: { data: LeaderboardItemProps[] }) => (
  <div className="flex flex-row gap-x-1 justify-center mb-12">
    {[1, 0, 2].map((index) => {
      const item = data[index];
      return (
        <motion.div
          key={item.rank}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className={`w-28 relative flex flex-col items-center ${
            index === 0 ? "mt-0 scale-110" : "mt-10"
          }`}
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 shadow-lg">
              <Image
                src={item.avatar}
                alt={`Top ${item.rank}`}
                width={192}
                height={192}
                className="w-full h-full object-cover rounded-full border-2 border-white"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-pody-primary flex items-center justify-center shadow-lg">
              <span className="text-base font-bold text-white">
                {item.rank}
              </span>
            </div>
          </div>
          <h2 className="font-medium text-base mt-4 text-slate-800">
            {item.username}
          </h2>
          <p className="text-sm text-pody-primary font-semibold">
            {item.points.toLocaleString()} pts
          </p>
        </motion.div>
      );
    })}
  </div>
);

const Page = () => {
  return (
    <main className="w-full">
      <div className="w-full bg-pody-primary/20 px-8 py-16">
        <div className="max-w-3xl mx-auto flex flex-1 justify-between items-start gap-6">
          <div className="w-5/12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl text-slate-800">
                Check out the leaderboard Top perfomer of the week
              </h2>
            </motion.div>
          </div>
          <div className="w-6/12 flex justify-center">
            <TopThree data={leaderboardData} />
          </div>
        </div>
      </div>
      <div className="max-w-lg mx-auto py-8">
        <div>
          <ul>
            {leaderboardData.map((item) => (
              <LeaderboardItem key={item.rank} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Page;

type LeaderboardItemProps = {
  rank: number;
  username: string;
  points: number;
  avatar: string;
};
