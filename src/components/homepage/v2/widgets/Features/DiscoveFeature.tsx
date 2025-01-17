import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import React from "react";

const DiscoveFeature = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <h2 className="text-5xl xs:text-7xl md:text-8xl lg:text-8xl font-extrabold">
          Discover
        </h2>
        <h3 className="text-xl mt-2">Pody&apos;s Unique Features</h3>
      </div>
      <div className="mt-auto relative">
        <div className="flex flex-row items-center gap-x-2">
          <div className="flex items-center -space-x-5 __img_participant_dsc">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                className="w-9 h-9"
                key={index}
                style={{ zIndex: 30 - index * 10 }}
              >
                <AvatarParticipant name={`unknownuser_${index}`} />
              </div>
            ))}
          </div>
          <div className="w-28">
            <p className="text-xs">300+ satisified Teacher & Learners</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveFeature;
