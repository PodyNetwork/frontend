import React from "react";
import Image from "next/image";

const RewardImage = () => {
  return (
    <div className="w-full md:w-1/2 mt-16 md:mt-0">
      <div className="h-full">
        <Image
          src="/abstract/rewardsystem.webp"
          width={400}
          height={400}
          alt="reward system image"
          className="w-full md:w-9/12 mx-auto"
          priority
          
          quality={75}
        />
      </div>
    </div>
  );
};

export default RewardImage;
