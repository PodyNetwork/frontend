"use client"
import Faucet from "@/components/faucet/Faucet";
import { MainnetInfo } from "@/components/info/MainnetInfo";
const page = () => {
  return (
    <>
      <main
        className="relative float-left w-full h-full overflow-hidden"
        aria-label="Terms"
      >
        <MainnetInfo />
        <Faucet />
      </main>
    </>
  );
};

export default page;
