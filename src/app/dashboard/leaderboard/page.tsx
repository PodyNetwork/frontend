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
  }
];

const LeaderboardItem = ({ rank, username, points, avatar }: LeaderboardItemProps) => (
  <motion.li
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: rank * 0.1 }}
    className="flex flex-row items-center justify-between bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl px-6 py-3 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex items-center gap-x-2">
      <div className="text-lg font-bold text-slate-300 w-6">{rank}</div>
      <div className="flex items-center gap-x-3">
        <Image
          src={avatar}
          width={56}
          height={56}
          alt={username}
          className="rounded-full w-10 h-10 object-cover border-2 border-amber-400 shadow-md"
        />
        <h3 className="text-sm text-white">{username}</h3>
      </div>
    </div>
    <div>
      <p className="text-sm font-bold text-amber-400">
        {points.toLocaleString()} pts
      </p>
    </div>
  </motion.li>
);

const TopThree = ({ data }: { data: LeaderboardItemProps[] }) => (
  <div className="flex flex-row gap-x-4 justify-center mb-12">
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
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold text-white">{item.rank}</span>
            </div>
          </div>
          <h2 className="font-bold text-base mt-4 text-white">{item.username}</h2>
          <p className="text-sm text-amber-400 font-semibold">
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
      <div className="w-full bg-pody-dark px-8 py-16 min-h-screen">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Leaderboard</h2>
            <p className="text-slate-400">Top performers of the week</p>
          </motion.div>
          <TopThree data={leaderboardData} />
          <div className="shadow-2xl">
            <ul>
              {leaderboardData.map((item) => (
                <LeaderboardItem key={item.rank} {...item} />
              ))}
            </ul>
          </div>
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
