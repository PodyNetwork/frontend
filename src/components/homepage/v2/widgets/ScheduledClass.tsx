import React, { useState } from "react";

const reports = [
  {
    id: 1,
    title: "The Pody Weekly Report on the effect of socio economic",
    host: "eaxoe",
    callId: "179-ag91-87e",
    time: "Today - 11:29",
  },
  {
    id: 2,
    title: "The Pody Weekly on implementaion of Ai",
    host: "eaxoe",
    callId: "180-bg92-88f",
    time: "Today - 12:30",
  },
  {
    id: 3,
    title: "How to Learn three.js in few seconds",
    host: "eaxoe",
    callId: "181-ch93-89g",
    time: "Today - 13:31",
  },
  {
    id: 4,
    title: "The Pody Weekly Report 4",
    host: "eaxoe",
    callId: "182-di94-90h",
    time: "Today - 14:32",
  },
];

const ScheduledClass = () => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const currentItems = reports.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <section className="w-full relative">
      <div className="px-3 md:px-10 flex flex-col max-w-7xl mx-auto py-16">
        <div className="flex flex-col items-center mb-6">
          <div className="max-w-xl text-center flex flex-col gap-y-2.5">
            <h2 className="text-4xl font-semibold text-pody-secondary">
              Bookmark Scheduled Classroom
            </h2>
            <p className="text-base mt-1.5">
              Your can bookmark down upcoming classroom you can join later, dont
              worry we will notify you when it starts
            </p>
          </div>
        </div>
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
                <h2 className="text-sm font-medium">Scheduled Classroom</h2>
              </div>
              <div className="relative mt-auto pt-12">
                <div className="flex flex-col relative w-full py-6">
                  <div className="flex ml-auto items-center flex-row gap-x-2 __nav_crd_gls relative">
                    <button
                      onClick={handlePrevious}
                      disabled={currentPage === 0}
                      className="w-14 h-14 rounded-full items-center justify-center flex bg-slate-100/20 disabled:bg-slate-100/10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M400-107.69 27.69-480 400-852.31l42.54 42.54L112.77-480l329.77 329.77L400-107.69Z" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages - 1}
                      className="w-14 h-14 rounded-full items-center justify-center flex bg-slate-100/20 disabled:bg-slate-100/10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="m320.23-107.69-42.54-42.54L607.46-480 277.69-809.77l42.54-42.54L692.54-480 320.23-107.69Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {currentItems.map((report) => (
                    <div
                      key={report.id}
                      className="flex flex-row items-start relative"
                    >
                      <div className="bg-pody-secondary text-slate-200 rounded-full p-1.5 me-2.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 -960 960 960"
                          fill="currentColor"
                        >
                          <path d="M240-180v-555.38q0-27.62 18.5-46.12Q277-800 304.62-800h350.76q27.62 0 46.12 18.5Q720-763 720-735.38V-180L480-283.08 240-180Zm40-62 200-86 200 86v-493.38q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H304.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93V-242Zm0-518h400-400Z" />
                        </svg>
                      </div>
                      <div className="pt-1">
                        <h3 className="text-base font-medium">
                          {report.title}
                        </h3>
                        <div className="text-sm flex flex-col mt-1.5 text-slate-300">
                          <p>Host: {report.host}</p>
                          <div className="flex items-center flex-row gap-x-3 text-xs mt-1.5">
                            <p>Call ID: {report.callId}</p>
                            <div className="border-l-2 border-slate-300 h-3"></div>
                            <p>{report.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduledClass;
