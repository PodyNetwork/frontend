import { simulateContract, writeContract, readContract } from "@wagmi/core";
import podyTokenAbi from "../abis/podyToken.json";
import { config } from "@/utils/wagmi";
import { Address } from "@/types/address";

interface ApproveTokenArgs {
  recipient: Address;
  amount: bigint
}

interface TokenBalanceArgs {
  account: Address;
}

interface TokenAllowanceArgs {
  sender: Address;
  recipient: Address;
}

const approveCustomToken = async (args: ApproveTokenArgs & { tokenAddress: Address }): Promise<void> => {
  const { request } = await simulateContract(config, {
    abi: podyTokenAbi,
    address: args.tokenAddress,
    functionName: "approve",
    args: [args.recipient, args.amount],
  });

  await writeContract(config, request);
};

const getCustomTokenBalance = async (args: TokenBalanceArgs & { tokenAddress: Address }): Promise<bigint> => {
  const result = await readContract(config, {
    abi: podyTokenAbi,
    address: args.tokenAddress,
    functionName: "balanceOf",
    args: [args.account],
  }) as bigint;

  return result;
};

const getCustomTokenAllowance = async (args: TokenAllowanceArgs  & { tokenAddress: Address }): Promise<bigint> => {

  const result = await readContract(config, {
    abi: podyTokenAbi,
    address: args.tokenAddress,
    functionName: "allowance",
    args: [args.sender, args.recipient],
  }) as bigint;

  return result;
};


export { getCustomTokenBalance, getCustomTokenAllowance,  approveCustomToken };