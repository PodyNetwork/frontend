import React from "react";
import nftlist from "../data/nft.json"
import Image from "next/image";

const NftList = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {nftlist.map((datalist, index) => (
        <div className="text-white bg-white __shadow_pody p-3 rounded-xl flex flex-row gap-x-3" key={index}>
            <div className="w-1/2">
                <div className="aspect-square">
                    <Image src={datalist.image} width={400} height={400} className="w-full h-full rounded-xl object-cover" alt={datalist.image} />
                </div>
            </div>
            <div className="w-1/2">
                <h3 className="font-medium text-sm text-slate-800">{datalist.title}</h3>
                <p className="text-xs text-slate-700 mt-1">
                    {datalist.desc}
                </p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default NftList;
