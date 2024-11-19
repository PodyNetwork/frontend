import { useState } from "react";
import Image from "next/image";
import BlockiesSvg from "blockies-react-svg";
import CurvedCircleImage from "/public/illustration/circular_ring.png";

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
      <div className="w-full min-h-screen flex flex-row __scheduled_container_layout max-w-7xl mx-auto">
        <div className="flex-1 __scheduled_layout_lft bg-pody-primary relative overflow-hidden">
          <div className="absolute -bottom-12 -right-12">
            <Image
              src={CurvedCircleImage}
              className="w-[35rem] mix-blend-hard-light blur-lg"
              width={300}
              height={300}
              alt="pody background ring"
            />
          </div>
          <div className="w-full h-full flex flex-row z-40 relative">
            <div className="h-full w-full px-4 md:px-8 lg:px-10 py-7 flex flex-col">
              <div className="mb-40">
                <p>Scheduled Classroom</p>
                <div className="max-w-lg">
                  <p className="text-4xl font-bold mt-1.5 text-slate-900 py-8">
                    Add scheduled classrooms to your calendar to stay organized
                    and never miss a session.
                  </p>
                </div>
              </div>
              <div className="mt-auto relative py-9">
                <div className="max-w-sm">
                  <div className="flex flex-col gap-y-1 text-slate-800">
                    <div>
                      <p className="text-sm">Host Tip</p>
                      <h2 className="text-xl mt-2">
                        Reach a wider audience and boost your rewards by
                        creating a public, scheduled classroom!
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[25rem] __scheduled_layout_rgt bg-white">
          <div className="w-full h-full flex flex-col">
            <div className="bg-slate-50 flex-1 flex flex-col px-4 md:px-8 lg:px-10 py-7">
              <div className="w-full flex flex-col gap-y-8">
                {currentItems.map((report) => (
                  <div
                    key={report.id}
                    className="flex flex-col gap-y-1 text-slate-800 pb-8 border-b border-slate-300"
                  >
                    <div className="text-base font-medium">
                      <p>{report.time}</p>
                    </div>
                    <div className="py-2 flex flex-row items-center gap-2 justify-between">
                      <div className="flex-1 relative overflow-hidden">
                        <p className="text-sm truncate">{report.host}</p>
                        <h2 className="text-lg truncate whitespace-nowrap">
                          {report.title}
                        </h2>
                      </div>
                      <div className="w-9 h-8 relative bg-black/20">
                        <BlockiesSvg
                          address={"012345"}
                          className="w-9 h-9 object-cover rounded-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-row flex-wrap justify-between mt-2 text-sm font-medium">
                      <button
                        className={`cursor-pointer text-slate-800 rounded-full flex items-center`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 me-2"
                          viewBox="0 -960 960 960"
                          fill="currentColor"
                        >
                          <path d="M690-90v-120H570v-60h120v-120h60v120h120v60H750v120h-60Zm-477.69-90Q182-180 161-201q-21-21-21-51.31v-455.38Q140-738 161-759q21-21 51.31-21h55.38v-84.61h61.54V-780h223.08v-84.61h60V-780h55.38Q698-780 719-759q21 21 21 51.31v236.31q-15-1.85-30-1.85t-30 1.85v-76.31H200v295.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h273.46q0 15 1.85 30 1.84 15 6.76 30H212.31ZM200-607.69h480v-100q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v100Zm0 0V-720v112.31Z" />
                        </svg>
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex relative justify-between mt-auto pt-4">
                <button onClick={handlePrevious} disabled={currentPage === 0}>
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages - 1}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="relative mt-auto bg-pody-dark text-slate-200 p-5 md:p-9 gap-y-4 flex flex-col">
              <div className="py-2">
                <h2 className="text-2xl font-medium">
                  Host Public Classroom to Earn Points
                </h2>
                <p className="text-sm text-slate-300 mt-2">
                  Earn an Extra 10% of Students&apos; Points
                </p>
              </div>
              <button className="flex flex-row gap-x-2 items-center justify-between w-full py-5 font-medium border-t border-slate-100/30">
                <span>Host your classroom</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ms-2"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="m553.85-253.85-42.16-43.38L664.46-450H180v-60h484.46L511.69-662.77l42.16-43.38L780-480 553.85-253.85Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduledClass;
