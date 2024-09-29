import React from "react";

const ScheduleStatistics = () => {
  return (
    <div className="flex flex-row gap-x-4 max-w-2xl mx-auto">
      <div className="bg-pody-dark p-6 rounded-xl h-full relative flex flex-col w-full">
        <div className="pb-3">
          <h1 className="text-lg text-slate-200">Schedule Statistics</h1>
        </div>
        <div className="relative flex flex-row gap-x-6">
          <div className="w-48 mt-auto">
            <div className="flex flex-row text-slate-200 items-center gap-x-3.5 py-4">
              <div className="text-4xl">33%</div>
              <div className="text-xs text-slate-400">
                Total <br /> Schedule Created
              </div>
            </div>
            <div className="h-1.5 w-full flex flex-row gap-x-1">
              <div className="w-[20%] h-full rounded-[10px] bg-pody-primary"></div>
              <div className="w-[40%] h-full rounded-[10px] bg-[#50c889]"></div>
              <div className="w-[30%] h-full rounded-[10px] bg-[#ff802e]"></div>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 bg-pody-dark_secondary rounded-2xl p-6">
              <div className="flex flex-col items-center border-r border-slate-900">
                <div className="w-10 h-10 rounded-full bg-[#50c889] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 -960 960 960"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                  >
                    <path d="M602.31-120v-40h133.07q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-350.76H200V-380h-40v-315.38q0-27.62 18.5-46.12Q197-760 224.62-760h70.76v-89.23h43.08V-760h286.16v-89.23h40V-760h70.76q27.62 0 46.12 18.5Q800-723 800-695.38v510.76q0 27.62-18.5 46.12Q763-120 735.38-120H602.31ZM320-28.46 292.46-56l122.23-124H60v-40h354.69L292.46-344 320-371.54 491.54-200 320-28.46ZM200-575.39h560v-119.99q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v119.99Zm0 0V-720-575.39Z"/>
                  </svg>
                </div>
                <div className="pt-5 text-center">
                  <h2 className="text-2xl text-slate-200">05</h2>
                  <p className="text-sm text-slate-300 pt-1">Upcoming</p>
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
                    <path d="M224.62-120q-27.62 0-46.12-18.5Q160-157 160-184.62v-510.76q0-27.62 18.5-46.12Q197-760 224.62-760h70.76v-89.23h43.08V-760h286.16v-89.23h40V-760h70.76q27.62 0 46.12 18.5Q800-723 800-695.38v510.76q0 27.62-18.5 46.12Q763-120 735.38-120H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-350.76H200v350.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-575.39h560v-119.99q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v119.99Zm0 0V-720-575.39Zm280 181.54q-12.38 0-21.58-9.19-9.19-9.19-9.19-21.58 0-12.38 9.19-21.57 9.2-9.19 21.58-9.19 12.38 0 21.58 9.19 9.19 9.19 9.19 21.57 0 12.39-9.19 21.58-9.2 9.19-21.58 9.19Zm-160 0q-12.38 0-21.58-9.19-9.19-9.19-9.19-21.58 0-12.38 9.19-21.57 9.2-9.19 21.58-9.19 12.38 0 21.58 9.19 9.19 9.19 9.19 21.57 0 12.39-9.19 21.58-9.2 9.19-21.58 9.19Zm320 0q-12.38 0-21.58-9.19-9.19-9.19-9.19-21.58 0-12.38 9.19-21.57 9.2-9.19 21.58-9.19 12.38 0 21.58 9.19 9.19 9.19 9.19 21.57 0 12.39-9.19 21.58-9.2 9.19-21.58 9.19ZM480-240q-12.38 0-21.58-9.19-9.19-9.19-9.19-21.58 0-12.38 9.19-21.58 9.2-9.19 21.58-9.19 12.38 0 21.58 9.19 9.19 9.2 9.19 21.58 0 12.39-9.19 21.58Q492.38-240 480-240Zm-160 0q-12.38 0-21.58-9.19-9.19-9.19-9.19-21.58 0-12.38 9.19-21.58 9.2-9.19 21.58-9.19 12.38 0 21.58 9.19 9.19 9.2 9.19 21.58 0 12.39-9.19 21.58Q332.38-240 320-240Zm320 0q-12.38 0-21.58-9.19-9.19-9.19-9.19-21.58 0-12.38 9.19-21.58 9.2-9.19 21.58-9.19 12.38 0 21.58 9.19 9.19 9.2 9.19 21.58 0 12.39-9.19 21.58Q652.38-240 640-240Z"/>
                  </svg>
                </div>
                <div className="pt-5 text-center">
                  <h2 className="text-2xl text-slate-200">33</h2>
                  <p className="text-sm text-slate-300 pt-1">Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleStatistics;
