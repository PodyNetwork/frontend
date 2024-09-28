import type { SignupCredentials } from "@/types/signup";
import { getUserLevel, mintPassport } from "@/utils/passport";
import { signMessage } from "@/utils/signature";
import { getUserAddress } from "@/utils/address";

const handleCreatePassport = async ({ username }:  { username: string }): Promise<SignupCredentials> => {
    const walletAddress = getUserAddress();

    if (!walletAddress) {
      throw new Error("Wallet address not found");
    }

    const userLevel = await getUserLevel({ walletAddress });

    if (userLevel < BigInt(1)) {
      try {
         await mintPassport({ walletAddress });
      } catch (error) {
         throw new Error("Failed to mint passport");
      }
    }

    const timestamp = Date.now() + (30 * 1000);
    let signature: string;

    try {
      signature = await signMessage(`${walletAddress}:${timestamp}`);
    } catch (error) {
      throw new Error("Failed to sign message");
    }

    return {
      username,
      walletAddress,
      signature,
      timestamp,
    };
};

export default handleCreatePassport;