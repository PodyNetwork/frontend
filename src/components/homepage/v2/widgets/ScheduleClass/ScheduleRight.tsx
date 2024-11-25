import React from "react";
import ScheduleCTA from "./ScheduleCTA";
import ScheduledCall from "./ScheduledCall";

const ScheduleRight = () => {
  return (
    <div className="w-[25rem] __scheduled_layout_rgt bg-white">
      <div className="w-full min-h-screen flex flex-col">
        <div className="bg-slate-50 flex-1 flex flex-col px-5 md:px-6 py-7">
          <ScheduledCall />
        </div>
        <ScheduleCTA />
      </div>
    </div>
  );
};

export default ScheduleRight;
