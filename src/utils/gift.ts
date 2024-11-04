import { simulateContract, writeContract, readContract, getBalance as getEtherBalance } from "@wagmi/core";
import podyGiftAbi from "../abis/podyGift.json";
import { config } from "@/utils/wagmi";
import { Address } from "@/types/address";
import { approveCustomToken, getCustomTokenAllowance, getCustomTokenBalance } from "@/utils/token";

interface GiftArgs {
    recipient: Address;
    amount: bigint;
}

interface GiftCustomArgs extends GiftArgs {
    tokenAddress: Address;
}

const validateGiftAmount = async (tokenAddress: Address, amount: bigint): Promise<void> => {
    if (await getMinGiftAmountForToken({ tokenAddress }) > amount) {
        throw new Error('Amount is too low');
    }
    if (await getMaxGiftAmountForToken({ tokenAddress }) < amount) {
        throw new Error('Amount is too high');
    }
};

const checkAndApproveTokens = async (sender: Address, recipient: Address, amount: bigint, tokenAddress: Address): Promise<void> => {
    if (await getCustomTokenBalance({ account: sender, tokenAddress }) < amount) {
        throw new Error('insufficient balance to perform this action');
    }
    if (await getCustomTokenAllowance({ account: sender, recipient, tokenAddress }) < amount) {
        try {
            await approveCustomToken({ recipient, amount, account: sender, tokenAddress });
        } catch {
            throw new Error('token approval failed');
        }
    }
};

const simulateAndWriteGiftContract = async (args: GiftArgs | GiftCustomArgs, functionName: string, extraArg?: Address): Promise<void> => {
    const { request } = await simulateContract(config, {
        abi: podyGiftAbi,
        address: process.env.NEXT_PUBLIC_PODY_GIFT_ADDRESS as Address,
        functionName,
        args: [args.recipient, args.amount, ...(extraArg ? [extraArg] : [])],
    });
    await writeContract(config, request);
};

const readBigIntFromGiftContract = async (functionName: string, args: { tokenAddress: Address }): Promise<bigint> => {
    const result = await readContract(config, {
        abi: podyGiftAbi,
        address: process.env.NEXT_PUBLIC_PODY_GIFT_ADDRESS as Address,
        functionName,
        args: [args.tokenAddress],
    }) as bigint;
    return result;
};

const giftTokens = async (args: GiftArgs): Promise<void> => {
    await simulateAndWriteGiftContract(args, "giftTokens");
};

const giftEther = async (args: GiftArgs): Promise<void> => {
    const { request } = await simulateContract(config, {
        abi: podyGiftAbi,
        address: process.env.NEXT_PUBLIC_PODY_GIFT_ADDRESS as Address,
        functionName: 'giftEther',
        value: args.amount,
        args: [args.recipient],
    });
    await writeContract(config, request);
};

const getMinEtherGiftAmount = async (): Promise<bigint> => {
    const result = await readContract(config, {
        abi: podyGiftAbi,
        address: process.env.NEXT_PUBLIC_PODY_GIFT_ADDRESS as Address,
        functionName: 'minEtherGiftAmount',
    }) as bigint;
    return result;
}

const getMaxEtherGiftAmount = async (): Promise<bigint> => {
    const result = await readContract(config, {
        abi: podyGiftAbi,
        address: process.env.NEXT_PUBLIC_PODY_GIFT_ADDRESS as Address,
        functionName: 'maxEtherGiftAmount',
    }) as bigint;
    return result;
}

const getMinGiftAmountForToken = async (args: { tokenAddress: Address }): Promise<bigint> => {
    return readBigIntFromGiftContract("minGiftAmountForToken", args);
};

const getMaxGiftAmountForToken = async (args: { tokenAddress: Address }): Promise<bigint> => {
    return readBigIntFromGiftContract("maxGiftAmountForToken", args);
};

const giftCustomTokens = async (args: GiftCustomArgs): Promise<void> => {
    await simulateAndWriteGiftContract(args, "giftTokens", args.tokenAddress);
};

const gift = async (sender: Address, recipient: Address, amount: bigint): Promise<boolean> => {
    const tokenAddress = process.env.NEXT_PUBLIC_PODY_TOKEN_ADDRESS as Address;
    const podyGiftAddress = process.env.NEXT_PUBLIC_PODY_GIFT_ADDRESS as Address;

    await validateGiftAmount(tokenAddress, amount);
    await checkAndApproveTokens(sender, podyGiftAddress, amount, tokenAddress);
    
    await giftTokens({ amount, recipient });
    return true;
};

const customTokenGift = async (tokenAddress: Address, sender: Address, recipient: Address, amount: bigint): Promise<boolean> => {
    await validateGiftAmount(tokenAddress, amount);
    const podyGiftAddress = process.env.NEXT_PUBLIC_PODY_GIFT_ADDRESS as Address;

    await checkAndApproveTokens(sender, podyGiftAddress, amount, tokenAddress);
    
    await giftCustomTokens({ amount, recipient, tokenAddress });
    return true;
};


const etherGift = async ( sender: Address, recipient: Address, amount: bigint): Promise<boolean> => {
    if (await getMinEtherGiftAmount() > amount) {
        throw new Error('Insuficient balance');
    }

    if (await getMaxEtherGiftAmount() < amount) {
        throw new Error('Amount is too high');
    }

    if(amount > (await getEtherBalance(config, {address: sender })).value) {
        throw new Error('Amount is too low');
    }

    await giftEther({recipient, amount})

    return true

}

export { gift, customTokenGift, etherGift };
