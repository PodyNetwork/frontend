import { simulateContract, writeContract, readContract } from "@wagmi/core";
import podyTokenAbi from "../abis/podyToken.json";
import { config } from "@/utils/wagmi";
import { Address } from "@/types/address";

interface ApproveTokenArgs {
    recipient: Address;
    amount: bigint
}

interface TokenBalanceArgs {
    recipient: Address;
}

interface TokenAllowanceArgs {
    sender: Address;
    recipient: Address;
}



const approveTokens = async (args: ApproveTokenArgs): Promise<void> => {
    const { request } = await simulateContract(config, {
        abi: podyTokenAbi,
        address: process.env.NEXT_PUBLIC_PODY_GIFT_ADDRESS as Address,
        functionName: "approve",
        args: [args.recipient, args.amount],
    });

    await writeContract(config, request);
};


const getBalance = async (args: TokenBalanceArgs): Promise<bigint> => {

    const result = await readContract(config, {
      abi: podyTokenAbi,
      address: process.env.NEXT_PUBLIC_PODY_GIFT_ADDRESS as Address,
      functionName: "balanceOf",
      args: [args.recipient],
    }) as bigint;
  
    return result;
  };


  const getAllowance = async (args: TokenAllowanceArgs): Promise<bigint> => {

    const result = await readContract(config, {
      abi: podyTokenAbi,
      address: process.env.NEXT_PUBLIC_PODY_GIFT_ADDRESS as Address,
      functionName: "allowance",
      args: [args.sender,args.recipient],
    }) as bigint;
  
    return result;
  };

 
export  { approveTokens, getBalance, getAllowance };