import React from "react";
import Image from "next/image";
import exploreImg from "/public/illustration/rb_106774.png";
const ExploreHeader = () => {
  return (
    <div className="bg-pody-mintgreen p-8 px-5 md:p-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="w-full md:w-5/12">
          <h2 className="text-3xl text-slate-800 font-medium">
            Get <span className="text-slate-500">Rewarded</span> in real-time when you join an active Classroom
          </h2>
        </div>
        <div className="w-full md:w-6/12 flex justify-center">
          <Image
            src={exploreImg}
            className="object-contain max-h-64 w-full"
            width={800}
            height={600}
            alt="Video Conferencing"
            priority
            
            quality={75}
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreHeader;
