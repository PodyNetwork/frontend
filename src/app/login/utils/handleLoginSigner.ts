import { getUserLevel } from "@/utils/passport";
import { signMessage } from "@/utils/signature";
import { getUserAddress } from "@/utils/address";
import { LoginCredentials } from "../types";

const handleCreatePassport = async (): Promise<LoginCredentials> => {
    const walletAddress = getUserAddress();

    if (!walletAddress) {
      throw new Error("Wallet address not found");
    }

    const userLevel = await getUserLevel({ walletAddress });

    if (userLevel < BigInt(1)) {
        throw new Error("You do not have a passport, sign up to mint for free");
    }

    const timestamp = Date.now() + (30 * 1000);
    let signature: string;

    try {
      signature = await signMessage(`${walletAddress.toLowerCase()}:${timestamp}`);
    } catch (error) {
      console.error(error)
      throw new Error("Failed to sign message");
    }

    return {
      walletAddress,
      signature,
      timestamp,
    };
};

export default handleCreatePassport;