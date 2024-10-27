import { simulateContract, writeContract, readContract } from "@wagmi/core";
import podyGiftAbi from "../abis/podyGift.json";
import { config } from "@/utils/wagmi";
import { Address } from "@/types/address";
import { approveTokens, getAllowance, getBalance } from "@/utils/token";

interface GiftArgs {
    recipient: Address;
    amount: bigint
}


const giftTokens = async (args: GiftArgs): Promise<void> => {
    const { request } = await simulateContract(config, {
        abi: podyGiftAbi,
        address: process.env.NEXT_PUBLIC_PODY_PASSPORT_ADDRESS as Address,
        functionName: "giftTokens",
        args: [args.recipient, args.amount],
    });

    await writeContract(config, request);
};



const gift = async (sender: Address, recipient: Address, amount: bigint) : Promise<boolean> => {
    if(await getBalance({recipient}) < amount)  {
        throw new Error('insufficient balance to perform this action')
    }

    if(await getAllowance({sender, recipient}) < amount) {
       try {
        await approveTokens({
            recipient,
            amount
        })
       } catch (error) {
        throw new Error('token approval failed')
       }
    }

    await giftTokens({
        amount,
        recipient
    })

    return true
}


export { gift }