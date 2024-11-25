import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const goToNFT = () => {
    router.push("/dashboard/NFT");
  };
  return (
    <div className="w-full items-center flex flex-col py-7">
      <div className="max-w-4xl text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-none">
          Mint <span className="text-pody-secondary">Unique NFT</span> to
          increase your <span>earning power</span>.
        </h1>
        <p className="text-gray-500">
          You can increase your earnings per second by minting more NFTs
          directly from the dashboard.
        </p>
        <button
          onClick={goToNFT}
          className="flex mx-auto items-center space-x-2 text-indigo-600 font-semibold hover:underline"
        >
          <span>Mint NFT</span>
          <span>→</span>
        </button>
        {/* Supported Logos */}
        <div>
          <div className="flex items-center justify-center space-x-4 pt-4">
            <Link
              href="https://opencampus.xyz/"
              className="cursor-pointer"
              target="_blank"
            >
              <Image
                src="/partner/opencampus_logo.svg"
                className="w-10"
                width={300}
                height={400}
                alt="pody NFT"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
