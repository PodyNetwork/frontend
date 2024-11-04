import { simulateContract, writeContract, readContract } from "@wagmi/core";
import podyTokenAbi from "../abis/podyToken.json";
import { config } from "@/utils/wagmi";
import { Address } from "@/types/address";

interface BaseTokenArgs {
  account: Address;
}

interface ApproveTokenArgs extends BaseTokenArgs {
  recipient: Address;
  amount: bigint;
}

interface TokenBalanceArgs extends BaseTokenArgs {}

interface TokenAllowanceArgs extends BaseTokenArgs {
  recipient: Address;
}

const simulateAndWriteContract = async (args: ApproveTokenArgs, functionName: string, address: Address): Promise<void> => {
  const { request } = await simulateContract(config, {
    abi: podyTokenAbi,
    address,
    functionName,
    args: [args.recipient, args.amount],
  });

  await writeContract(config, request);
};

const readContractBigInt = async (args: BaseTokenArgs, functionName: string, address: Address): Promise<bigint> => {
  const result = await readContract(config, {
    abi: podyTokenAbi,
    address,
    functionName,
    args: [args.account],
  }) as bigint;

  return result;
};

const approveTokens = async (args: ApproveTokenArgs): Promise<void> => {
  await simulateAndWriteContract(args, "approve", process.env.NEXT_PUBLIC_PODY_TOKEN_ADDRESS as Address);
};

const approveCustomToken = async (args: ApproveTokenArgs & { tokenAddress: Address }): Promise<void> => {
  await simulateAndWriteContract(args, "approve", args.tokenAddress);
};

const getBalance = async (args: TokenBalanceArgs): Promise<bigint> => {
  return readContractBigInt(args, "balanceOf", process.env.NEXT_PUBLIC_PODY_TOKEN_ADDRESS as Address);
};

const getCustomTokenBalance = async (args: TokenBalanceArgs & { tokenAddress: Address }): Promise<bigint> => {
  return readContractBigInt(args, "balanceOf", args.tokenAddress);
};

const getAllowance = async (args: TokenAllowanceArgs): Promise<bigint> => {
  return readContractBigInt(args, "allowance", process.env.NEXT_PUBLIC_PODY_TOKEN_ADDRESS as Address);
};

const getCustomTokenAllowance = async (args: TokenAllowanceArgs & { tokenAddress: Address }): Promise<bigint> => {
  return readContractBigInt(args, "allowance", args.tokenAddress);
};

export { approveTokens, getBalance, getAllowance, getCustomTokenBalance, getCustomTokenAllowance, approveCustomToken };