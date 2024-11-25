import React from "react";
import Image from "next/image";

const RewardImage = () => {
  return (
    <div className="w-full md:w-1/2">
      <div className="h-full">
        <Image
          src="/abstract/rewardsystem.png"
          width={400}
          height={400}
          alt="reward system image"
          className="w-9/12 mx-auto"
        />
      </div>
    </div>
  );
};

export default RewardImage;
