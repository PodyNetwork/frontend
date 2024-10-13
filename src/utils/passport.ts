import { simulateContract, writeContract, readContract } from "@wagmi/core";
import podyPassportAbi from "../abis/podyPassport.json";
import { config } from "@/utils/wagmi";
import { Address } from "@/types/address";

interface MintPassportArgs {
    walletAddress: Address;
}

interface GetUserArgs {
    walletAddress: Address;
}


const mintPassport = async (args: MintPassportArgs): Promise<void> => {
    const { request } = await simulateContract(config, {
        abi: podyPassportAbi,
        address: process.env.NEXT_PUBLIC_PODY_PASSPORT_ADDRESS as Address,
        functionName: "mint",
        args: [args.walletAddress, args.walletAddress],
    });

    await writeContract(config, request);
};


const getUser = async (args: GetUserArgs): Promise<Array<bigint>> => {

  const result = await readContract(config, {
    abi: podyPassportAbi,
    address: process.env.NEXT_PUBLIC_PODY_PASSPORT_ADDRESS as Address,
    functionName: "users",
    args: [args.walletAddress],
  }) as Array<bigint>;

  return result;
};

const getHashRate = async (args: GetUserArgs): Promise<bigint> => {
  const user = await getUser(args);
  return user[0];
};

const getUserLevel = async (args: GetUserArgs): Promise<bigint> => {
  const user = await getUser(args);
  return user[2];
};

export  { mintPassport, getUserLevel, getUser, getHashRate };