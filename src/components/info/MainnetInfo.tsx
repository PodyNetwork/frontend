import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const MainnetInfo = () => {
  const [isTestnet, setIsTestnet] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname; 
      const subdomain = hostname.split(".")[0]; 

      if (subdomain === "testnet") {
        setIsTestnet(true);
      } else {
        setIsTestnet(false);
      }
    }
  }, []);
  return (
    <div className="flex flex-row justify-center py-2 bg-pody-oilblack text-slate-300">
      <p className="flex flex-row items-center text-sm web3-gradient-text font-medium gap-1.5">
        {isTestnet ? "Pody Network Testnet Campaign ends 31st January, 2025" : "Pody Network Mainnet is Live on"}{" "}
        <Link href="https://educhain.xyz/" target="_blank">
          <Image
            src="/partner/educhain-logo.svg"
            width={100}
            height={70}
            alt="EDU Chain"
            className="w-11"
          />
        </Link>
      </p>
    </div>
  );
};
