import React from "react";
import Image from "next/image";
import exploreImg from "/public/illustration/rb_106774.png";
const ExploreHeader = () => {
  return (
    <div className="bg-pody-mintgreen p-8 px-5 md:p-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="w-full md:w-5/12">
          <h2 className="text-4xl text-slate-800 font-medium">
            Get <span className="text-slate-500">Rewarded</span> Instantly when
            you join active classroom
          </h2>
        </div>
        <div className="w-full md:w-6/12 flex justify-center">
          <Image
            src={exploreImg}
            className="object-cover object-top max-h-80 w-full"
            width={800}
            height={600}
            alt="Video Conferencing"
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreHeader;
