import React from "react";
import GiftUI from "../GiftCard";



const GiftTile = () => {
  return (
    <div
      className={`z-30 fixed md:absolute top-0 right-0 w-[20rem] __chat_full h-full bg-white dark:bg-pody-dark_secondary __shadow_pody transition-all duration-300 ease-in-out`}
    >
      <div>
        <GiftUI />
      </div>
    </div>
  );
};

export default GiftTile;
