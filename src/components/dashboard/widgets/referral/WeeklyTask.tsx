import React from "react";

const WeeklyTask = () => {
  return (
    <div className="w-full md:w-[22rem] border border-slate-100 rounded-xl">
      <div className="p-6 text-sm flex flex-col relative h-full text-slate-500">
        <h2 className="text-xl text-slate-800 font-medium">Weekly Task</h2>
        <p className="mt-1">Earn Points when you complete weekly task</p>
        <ul className="mt-4">
          <li>
            There&apos;s no weekly task, but you can start a referral campaign
            and earn points.
          </li>
        </ul>
        <div className="flex flex-row items-center justify-between py-4 mt-auto">
          <h3 className="font-medium blur-sm">+0.00 Points</h3>
          <button
            disabled
            className="text-xs border-2 border-slate-400 text-slate-500 rounded-full px-2 py-1"
          >
            Coming soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTask;
