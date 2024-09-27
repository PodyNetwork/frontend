import { simulateContract, writeContract } from "@wagmi/core";
import podyPassportAbi from "../abis/podyPassport.json";
import { config } from "@/utils/wagmi";
import { Address } from "@/types/address";

interface MintPassportArgs {
    account: Address;
    data: Address;
}

const mintPassport = async (args: MintPassportArgs): Promise<string> => {
  const { request, result } = await simulateContract(config, {
    abi: podyPassportAbi,
    address: process.env.NEXT_PUBLIC_PODY_PASSPORT_ADDRESS as `0x${string}`,
    functionName: "mint",
    args: [args.account, args.data],
  });

  await writeContract(config, request);

  return result;
};

export default mintPassport;