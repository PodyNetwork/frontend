import React from "react";
import Image from "next/image";
import logoIcon from "/public/logo/Logo Icon Varient.png";
import Link from "next/link";

const PodyTM = () => {
  const year = new Date().getFullYear();
  return (
    <div className="relative">
      <Link href="/" className="flex flex-row items-center gap-x-1">
        <Image src={logoIcon} alt="Pody Logo" className="w-5 object-contain" />
        <h5 className="font-bold text-2xl">Pody Network</h5>
      </Link>
      <p className="text-xs font-medium mt-1">
        &#169; {year} All rights reserved.
      </p>
    </div>
  );
};

export default PodyTM;
