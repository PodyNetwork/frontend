import React from "react";

const RewardSystem = () => {
  return (
    <section className="w-full relative">
      <div className="px-3 md:px-10 flex flex-col max-w-7xl mx-auto pt-16 pb-40">
        <div className="w-full mt-6">
          <div className="__schedule_wrapper __pd_main_veil rounded-3xl relative text-slate-100 p-6">
            <div className="relative z-50 flex flex-col min-h-[550px]">
              <div className="flex flex-row items-center gap-x-2">
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 -960 960 960"
                    fill="#e8eaed"
                  >
                    <path d="m618.92-298.92 42.16-42.16L510-492.16V-680h-60v212.15l168.92 168.93ZM480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100ZM480-480Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                  </svg>
                </div>
                <h2 className="text-sm font-medium">
                  Overview of the Reward System
                </h2>
              </div>
              <div className="relative mt-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col items-start relative max-w-md">
                    <div className="pt-1">
                      <h3 className="text-xl font-medium">Host</h3>
                      <div className="text-base flex flex-col mt-2 text-slate-300">
                        <p>
                          In addition to the points earned, hosts are rewarded
                          10% of the points accumulated points by their
                          students.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start relative max-w-md">
                    <div className="pt-1">
                      <h3 className="text-xl font-medium">Participant</h3>
                      <div className="text-base flex flex-col mt-2 text-slate-300">
                        <p>
                          Students earn points for the total time spent in a
                          meeting. The longer you stay and engage, the more
                          points you earn.
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
    </section>
  );
};

export default RewardSystem;
