import { useRouter } from "next/navigation";
import React from "react";

const ScheduleCTA = () => {
  const router = useRouter();
  function goTodashboard() {
    const fullUrl = `/dashboard`;
    router.push(fullUrl);
  }

  return (
    <div className="relative mt-auto bg-pody-dark min-h-72 text-slate-200 p-5 md:p-9 flex items-center">
      <div className="gap-y-4 flex flex-col">
        <div className="py-2">
          <h2 className="text-2xl font-medium">
            Host Public Classroom to Earn Points
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Earn an Extra 10% of Students&apos; Points
          </p>
        </div>
        <button onClick={goTodashboard} className="flex flex-row gap-x-2 items-center justify-between w-full py-5 font-medium border-t border-slate-100/30">
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
  );
};

export default ScheduleCTA;
