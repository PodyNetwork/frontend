"use client";
import CallHistory from "@/components/dashboard/widgets/callHistory";
import RewardChart from "@/components/dashboard/widgets/rewardChart";
import RewardHeader from "@/components/dashboard/widgets/rewardHeader";
import React from "react";

const page = () => {
  return (
    <main className="w-full">
      <div className="flex flex-row bg-pody-primary/20 p-12">
        <div className="max-w-5xl mx-auto flex flex-1 justify-between items-start gap-6">
          <div className="w-5/12">
            <RewardHeader />
            <div className="mt-12 h-[120px] w-full">
              <RewardChart />
            </div>
          </div>
          <div className="w-6/12 flex justify-center">
            <div className="w-full">
              <div className="bg-pody-dark p-6 rounded-xl h-full relative flex flex-col w-full">
                <div className="pb-3">
                  <h1 className="text-lg text-slate-200">
                    Reward Points
                  </h1>
                </div>
                <div className="relative flex flex-row gap-x-6">
                  <div className="flex-1">
                    <div className="grid grid-cols-3 bg-pody-dark_secondary rounded-2xl p-6">
                      <div className="flex flex-col items-center border-r border-slate-900">
                        <div className="w-10 h-10 rounded-full bg-[#50c889] flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            viewBox="0 -960 960 960"
                            style={{ msFilter: "" }}
                            fill="currentColor"
                          >
                            <path d="M335.38-160v-40H460v-150.15q-52.85-9.47-92.5-44.2-39.65-34.73-54.58-86.11-63.46-7.46-108.19-52.04T160-640v-40q0-16.08 11.96-28.04T200-720h106.15v-80h347.7v80H760q16.08 0 28.04 11.96T800-680v40q0 62.92-44.73 107.5t-108.19 52.04q-14.93 51.38-54.58 86.11t-92.5 44.2V-200h124.62v40H335.38Zm-29.23-363.38V-680H200v40q0 45.69 30.46 78.5t75.69 38.12ZM480-389.23q55.38 0 93.85-38.46 38.46-38.46 38.46-93.85V-760H347.69v238.46q0 55.39 38.46 93.85 38.47 38.46 93.85 38.46Zm173.85-134.15q45.23-5.31 75.69-38.12Q760-594.31 760-640v-40H653.85v156.62ZM480-574.62Z"/>
                          </svg>
                        </div>
                        <div className="pt-5 text-center">
                          <h2 className="text-2xl text-slate-200">1,000</h2>
                          <p className="text-sm text-slate-300 pt-1">
                            Total
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#3F3B60] flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            viewBox="0 -960 960 960"
                            style={{ msFilter: "" }}
                            fill="currentColor"
                          >
                            <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm-61 83.92 49.62-212.54-164.93-142.84 217.23-18.85L480-777.69l85.08 200.38 217.23 18.85-164.93 142.84L667-203.08 480-315.92 293-203.08ZM480-470Z"/>
                          </svg>
                        </div>
                        <div className="pt-5 text-center">
                          <h2 className="text-2xl text-slate-200">2,000</h2>
                          <p className="text-sm text-slate-300 pt-1">Claimed</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center border-r border-slate-900">
                        <div className="w-10 h-10 rounded-full bg-[#50c889] flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            viewBox="0 -960 960 960"
                            style={{ msFilter: "" }}
                            fill="currentColor"
                          >
                            <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm-61 83.92 49.62-212.54-164.93-142.84 217.23-18.85L480-777.69l85.08 200.38 217.23 18.85-164.93 142.84L667-203.08 480-315.92 293-203.08ZM480-470Z"/>
                          </svg>
                        </div>
                        <div className="pt-5 text-center">
                          <h2 className="text-2xl text-slate-200">500</h2>
                          <p className="text-sm text-slate-300 pt-1">
                            Unclaimed
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-12">
        <div className="w-full relative flex flex-row gap-x-6">
          <div className="max-w-4xl mx-auto">
            <CallHistory />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
