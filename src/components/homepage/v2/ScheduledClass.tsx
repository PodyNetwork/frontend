import Image from "next/image";

import ScheduledCall from "./widgets/ScheduleClass/ScheduledCall";
import ScheduleCTA from "./widgets/ScheduleClass/ScheduleCTA";
import ScheduleLeft from "./widgets/ScheduleClass/ScheduleLeft";
import ScheduleRight from "./widgets/ScheduleClass/ScheduleRight";

const ScheduledClass = () => {
  return (
    <section className="w-full relative">
      <div className="w-full flex flex-row __scheduled_container_layout max-w-7xl px-0 md:px-6 mx-auto">
        <ScheduleLeft />
        <ScheduleRight />
      </div>
    </section>
  );
};

export default ScheduledClass;
