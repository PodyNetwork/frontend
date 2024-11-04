import { simulateContract, writeContract, readContract } from "@wagmi/core";
import podyGiftAbi from "../abis/podyGift.json";
import { config } from "@/utils/wagmi";
import { Address } from "@/types/address";
import { approveCustomToken, approveTokens, getAllowance, getBalance, getCustomTokenAllowance, getCustomTokenBalance } from "@/utils/token";

interface GiftArgs {
    recipient: Address;
    amount: bigint
}

interface GiftCustomArgs extends GiftArgs {
    tokenAddress: Address
}


const giftTokens = async (args: GiftArgs): Promise<void> => {
    const { request } = await simulateContract(config, {
        abi: podyGiftAbi,
        address: process.env.podyGiftAbi as Address,
        functionName: "giftTokens",
        args: [args.recipient, args.amount],
    });

    await writeContract(config, request);
};

const getMinGiftAmountForToken = async (args: { tokenAddress: Address }): Promise<bigint> => {

    const result = await readContract(config, {
        abi: podyGiftAbi,
        address: process.env.podyGiftAbi as Address,
        functionName: "minGiftAmountForToken",
        args: [args.tokenAddress],
    }) as bigint;

    return result;
};

const getMaxGiftAmountForToken = async (args: { tokenAddress: Address }): Promise<bigint> => {

    const result = await readContract(config, {
        abi: podyGiftAbi,
        address: process.env.podyGiftAbi as Address,
        functionName: "maxGiftAmountForToken",
        args: [args.tokenAddress],
    }) as bigint;

    return result;
};

const giftCustomTokens = async (args: GiftCustomArgs): Promise<void> => {
    const { request } = await simulateContract(config, {
        abi: podyGiftAbi,
        address: process.env.NEXT_PUBLIC_PODY_GIFT_ADDRESS as Address,
        functionName: "giftTokens",
        args: [args.recipient, args.amount, args.tokenAddress],
    });

    await writeContract(config, request);
};


const gift = async (sender: Address, recipient: Address, amount: bigint): Promise<boolean> => {
    const tokenAddress = process.env.NEXT_PUBLIC_PODY_TOKEN_ADDRESS as Address


    if (await getMinGiftAmountForToken({ tokenAddress }) > amount) {
        throw new Error('Amount is too low')
    }

    if (await getMaxGiftAmountForToken({ tokenAddress }) < amount) {
        throw new Error('Amount is too high')
    }

    const podyGiftAddress = process.env.NEXT_PUBLIC_PODY_GIFT_ADDRESS as Address


    if (await getCustomTokenBalance({ tokenAddress, account: sender }) < amount) {
        throw new Error('insufficient balance to perform this action')
    }

    if (await getAllowance({ account: sender, recipient: podyGiftAddress }) < amount) {
        try {
            await approveTokens({
                recipient: podyGiftAddress,
                amount,
                account: sender
            })
        } catch {
            throw new Error('token approval failed')
        }
    }

    await giftTokens({
        amount,
        recipient
    })

    return true
}

const customGift = async (tokenAddress: Address, sender: Address, recipient: Address, amount: bigint): Promise<boolean> => {
    if (await getMinGiftAmountForToken({ tokenAddress }) > amount) {
        throw new Error('Amount is too low')
    }

    if (await getMaxGiftAmountForToken({ tokenAddress }) < amount) {
        throw new Error('Amount is too high')
    }

    const podyGiftAddress = process.env.NEXT_PUBLIC_PODY_GIFT_ADDRESS as Address

    if (await getCustomTokenBalance({ account: sender, tokenAddress }) < amount) {
        throw new Error('insufficient balance to perform this action')
    }

    if (await getCustomTokenAllowance({ account: sender, recipient: podyGiftAddress, tokenAddress }) < amount) {
        try {
            await approveCustomToken({
                recipient: podyGiftAddress,
                amount,
                account: sender,
                tokenAddress
            })
        } catch {
            throw new Error('token approval failed')
        }
    }

    await giftCustomTokens({
        amount,
        recipient,
        tokenAddress
    })

    return true
}



export { gift, customGift }