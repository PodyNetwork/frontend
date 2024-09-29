import React from "react";

const LinkStatistics = () => {
  return (
    <div className="flex flex-row gap-x-4 max-w-2xl mx-auto">
      <div className="bg-pody-dark p-6 rounded-xl h-full relative flex flex-col w-full">
        <div className="pb-3">
          <h1 className="text-lg text-slate-200">Link Statistics</h1>
        </div>
        <div className="relative flex flex-row gap-x-6">
          <div className="w-48 mt-auto">
            <div className="flex flex-row text-slate-200 items-center gap-x-3.5 py-4">
              <div className="text-5xl font-bold tracking-tighter">64%</div>
              <div className="text-xs text-slate-400">
                Total <br /> Link Usage
              </div>
            </div>
            <div className="h-1.5 w-full flex flex-row gap-x-1">
              <div className="w-[25%] h-full rounded-[10px] bg-pody-primary"></div>
              <div className="w-[36%] h-full rounded-[10px] bg-[#50c889]"></div>
              <div className="w-[49%] h-full rounded-[10px] bg-[#ff802e]"></div>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3 bg-pody-dark_secondary rounded-2xl p-6">
              <div className="flex flex-col items-center border-r border-slate-900">
                <div className="w-10 h-10 rounded-full bg-pody-primary flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 -960 960 960"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                  >
                    <path d="M424.62-316.92H283.08q-67.68 0-115.38-47.69Q120-412.3 120-479.96t47.7-115.39q47.7-47.73 115.38-47.73h141.54v40H283.08q-50.77 0-86.93 36.16Q160-530.77 160-480t36.15 86.92q36.16 36.16 86.93 36.16h141.54v40ZM340-460v-40h280v40H340Zm195.38 143.08v-40h141.54q50.77 0 86.93-36.16Q800-429.23 800-480t-36.15-86.92q-36.16-36.16-86.93-36.16H535.38v-40h141.54q67.68 0 115.38 47.69Q840-547.7 840-480.04t-47.7 115.39q-47.7 47.73-115.38 47.73H535.38Z" />
                  </svg>
                </div>
                <div className="pt-5 text-center">
                  <h2 className="text-2xl text-slate-200">33</h2>
                  <p className="text-sm text-slate-300 pt-1">Active Link</p>
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
                    <path d="M424.62-316.92H283.08q-67.68 0-115.38-47.69Q120-412.3 120-479.96t47.7-115.39q47.7-47.73 115.38-47.73h141.54v40H283.08q-50.77 0-86.93 36.16Q160-530.77 160-480t36.15 86.92q36.16 36.16 86.93 36.16h141.54v40ZM340-460v-40h280v40H340Zm195.38 143.08v-40h141.54q50.77 0 86.93-36.16Q800-429.23 800-480t-36.15-86.92q-36.16-36.16-86.93-36.16H535.38v-40h141.54q67.68 0 115.38 47.69Q840-547.7 840-480.04t-47.7 115.39q-47.7 47.73-115.38 47.73H535.38Z" />
                  </svg>
                </div>
                <div className="pt-5 text-center">
                  <h2 className="text-2xl text-slate-200">11</h2>
                  <p className="text-sm text-slate-300 pt-1">Inactive Link</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#ff802e] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 -960 960 960"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                  >
                    <path d="M424.62-316.92H283.08q-67.68 0-115.38-47.69Q120-412.3 120-479.96t47.7-115.39q47.7-47.73 115.38-47.73h141.54v40H283.08q-50.77 0-86.93 36.16Q160-530.77 160-480t36.15 86.92q36.16 36.16 86.93 36.16h141.54v40ZM340-460v-40h280v40H340Zm195.38 143.08v-40h141.54q50.77 0 86.93-36.16Q800-429.23 800-480t-36.15-86.92q-36.16-36.16-86.93-36.16H535.38v-40h141.54q67.68 0 115.38 47.69Q840-547.7 840-480.04t-47.7 115.39q-47.7 47.73-115.38 47.73H535.38Z" />
                  </svg>
                </div>
                <div className="pt-5 text-center">
                  <h2 className="text-2xl text-slate-200">44</h2>
                  <p className="text-sm text-slate-300 pt-1">Total Link</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkStatistics;
