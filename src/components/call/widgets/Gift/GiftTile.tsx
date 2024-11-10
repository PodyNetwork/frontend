import React from "react";
import GiftUI from "../GiftCard";

const gifts = [
    {
      id: "1",
      name: "PodyToken",
      icon: "/icon/Pody.jpg",
      price: 1,
      isAvailable: true,
    },
    {
      id: "2",
      name: "EDUCHAIN",
      icon: "/icon/educhain.png",
      price: 5,
      isHot: true,
      isAvailable: false,
    },
  ];


const GiftTile = () => {
  return (
    <div
      className={`z-50 w-full relative __chat_full h-full bg-white dark:bg-slate-800 __shadow_pody transition-all duration-300 ease-in-out`}
    >
      <div>
        <GiftUI gifts={gifts} />
      </div>
    </div>
  );
};

export default GiftTile;
