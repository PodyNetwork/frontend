import React from "react";
import Image from "next/image";

const PodyNFT = () => {
  return (
    <section className="w-full relative">
      <div className="__class_wrapper_bg_base px-3 md:px-10 flex flex-col overflow-hidden">
        <div className="w-full my-auto relative flex flex-col items-center py-32">
          <div className="flex items-center justify-center flex-col text-slate-100 max-w-2xl text-center gap-y-3.5">
            <h1 className="font-extrabold text-3xl leading-[1.15]">
              Mint Unique NFT to increase your reward Boost
            </h1>
          </div>
          <div className="flex flex-row my-28 flex-nowrap __nft_card_lineup">
            <div className="__nft_ard">
              <div className="p-1.5 bg-white __shadow_pody rounded-xl flex flex-col min-w-[200px] max-w-[200px]">
                <Image
                  src="/nft/levelpro.png"
                  width={200}
                  height={200}
                  alt="nft"
                  className="w-full aspect-square object-cover z-50 relative rounded-md"
                />
                <div className="flex flex-col gap-y-1.5 text-slate-600 py-2">
                  <h3 className="text-base font-medium text-slate-800">
                    Podies NFT
                  </h3>
                  <div>
                    <button className="text-xs px-4 py-1.5 bg-pody-primary text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all w-full xs:w-auto">
                      Mint NFT
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="__nft_ard">
              <div className="p-1.5 bg-white __shadow_pody rounded-xl flex flex-col min-w-[200px] max-w-[200px]">
                <Image
                  src="/nft/levelpro.png"
                  width={200}
                  height={200}
                  alt="nft"
                  className="w-full aspect-square object-cover z-50 relative rounded-md"
                />
                <div className="flex flex-col gap-y-1.5 text-slate-600 py-2 __scale_x">
                  <h3 className="text-sm font-medium text-slate-800">
                    Podies NFT
                  </h3>
                  <div>
                    <button className="text-xs px-2 py-1 bg-pody-primary text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all w-full xs:w-auto">
                      Mint NFT
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="__nft_ard">
              <div className="p-1.5 bg-white __shadow_pody rounded-xl flex flex-col min-w-[200px] max-w-[200px]">
                <Image
                  src="/nft/levelpro.png"
                  width={200}
                  height={200}
                  alt="nft"
                  className="w-full aspect-square object-cover z-50 relative rounded-md"
                />
                <div className="flex flex-col gap-y-1.5 text-slate-600 py-2">
                  <h3 className="text-base font-medium text-slate-800">
                    Podies NFT
                  </h3>
                  <div>
                    <button className="text-xs px-4 py-1.5 bg-pody-primary text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all w-full xs:w-auto">
                      Mint NFT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full relative flex justify-center text-center">
          <p className="text-sm text-slate-100 max-w-3xl py-5">
            You can increase your earnings per second by minting more NFTs
            directly from the dashboard.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PodyNFT;
