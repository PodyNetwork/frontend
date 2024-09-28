import { simulateContract, writeContract, readContract } from "@wagmi/core";
import podyPassportAbi from "../abis/podyPassport.json";
import { config } from "@/utils/wagmi";
import { Address } from "@/types/address";

interface MintPassportArgs {
    account: Address;
}

interface GetUserArgs {
    account: Address;
}

interface User {
    hashRate: bigint;
    points: bigint;
    level: bigint;
}

const mintPassport = async (args: MintPassportArgs): Promise<string> => {
  const { request, result } = await simulateContract(config, {
    abi: podyPassportAbi,
    address: process.env.NEXT_PUBLIC_PODY_PASSPORT_ADDRESS as Address,
    functionName: "mint",
    args: [args.account, "0x"],
  });

  await writeContract(config, request);

  return result;
};


interface User {
  hashRate: bigint;
  points: bigint;
  level: bigint;
}

const getUser = async (args: GetUserArgs): Promise<User> => {
  const result = await readContract(config, {
    abi: podyPassportAbi,
    address: process.env.NEXT_PUBLIC_PODY_PASSPORT_ADDRESS as Address,
    functionName: "users",
    args: [args.account],
  }) as User;

  return result;
};

const getUserLevel = async (args: GetUserArgs): Promise<bigint> => {
  const user = await getUser(args);
  return user.level;
};

export  { mintPassport, getUserLevel, getUser };