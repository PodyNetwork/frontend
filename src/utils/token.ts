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

const approveCustomToken = async (args: ApproveTokenArgs & { tokenAddress: Address }): Promise<void> => {
  await simulateAndWriteContract(args, "approve", args.tokenAddress);
};

const getCustomTokenBalance = async (args: TokenBalanceArgs & { tokenAddress: Address }): Promise<bigint> => {
  return readContractBigInt(args, "balanceOf", args.tokenAddress);
};

const getCustomTokenAllowance = async (args: TokenAllowanceArgs & { tokenAddress: Address }): Promise<bigint> => {
  return readContractBigInt(args, "allowance", args.tokenAddress);
};

export { getCustomTokenBalance, getCustomTokenAllowance, approveCustomToken };