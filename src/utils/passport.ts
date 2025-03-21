import { simulateContract, writeContract, readContract } from "@wagmi/core";
import podyPassportAbi from "../abis/podyPassport.json";
import { config } from "@/utils/wagmi";
import { Address } from "@/types/address";

interface MintPassportArgs {
    walletAddress: Address;
    value: bigint;
}

interface GetUserArgs {
    walletAddress: Address;
}

interface ClaimPointsArgs {
  userAddress: string,
  nonce: string,
  points: bigint,
  signature: string
}


const mintPassport = async (args: MintPassportArgs): Promise<void> => {
    const { request } = await simulateContract(config, {
        abi: podyPassportAbi,
        address: process.env.NEXT_PUBLIC_PODY_PASSPORT_ADDRESS as Address,
        functionName: "mint",
        args: [args.walletAddress, args.walletAddress],
        value: args.value
    });

    await writeContract(config, request);
};

const claimPoints = async (args: ClaimPointsArgs): Promise<void> => {
  const { request } = await simulateContract(config, {
      abi: podyPassportAbi,
      address: process.env.NEXT_PUBLIC_PODY_PASSPORT_ADDRESS as Address,
      functionName: "claimPoints",
      args: [args.userAddress, args.nonce, args.points, args.signature],
    });

  await writeContract(config, request);
};

const getLevelFee = async (args: { level: bigint}): Promise<bigint> => {

  const result = await readContract(config, {
    abi: podyPassportAbi,
    address: process.env.NEXT_PUBLIC_PODY_PASSPORT_ADDRESS as Address,
    functionName: "prices",
    args: [args.level],
  }) as bigint;

  return result;
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

export  { mintPassport, getUserLevel, getUser, getHashRate, claimPoints, getLevelFee };