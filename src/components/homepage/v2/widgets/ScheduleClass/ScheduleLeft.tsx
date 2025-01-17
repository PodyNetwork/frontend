import React from "react";
import Image from "next/image";
import CurvedCircleImage from "/public/illustration/circular_ring.png";

const ScheduleLeft = () => {
  return (
    <div className="flex-1 __scheduled_layout_lft bg-pody-primary relative overflow-hidden">
      <div className="absolute bottom-0 -right-12">
        <Image
          src={CurvedCircleImage}
          className="w-[35rem] mix-blend-hard-light blur-2xl"
          width={300}
          height={300}
          alt="pody background ring"
        />
      </div>
      <div className="w-full flex flex-row z-40 relative h-full">
        <div className="w-full __schedule__wrapper px-5 md:px-6 py-7 flex flex-col">
          <div className="mb-40">
            <div className="max-w-lg">
              <p className="text-3xl font-semibold text-slate-900">
                Add scheduled classrooms to your calendar to stay organized and
                never miss a session.
              </p>
            </div>
          </div>
          <div className="mt-auto relative pt-9">
            <div className="max-w-sm">
              <div className="flex flex-col gap-y-1 text-slate-800">
                <div className="font-medium">
                  <p className="text-sm">Tip of the Day</p>
                  <h2 className="text-lg mt-2">
                    Reach a wider audience and boost your rewards by creating a
                    public, scheduled classroom!
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleLeft;
