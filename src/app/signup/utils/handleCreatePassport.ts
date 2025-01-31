import { getUserLevel, mintPassport } from "@/utils/passport";
import { signMessage } from "@/utils/signature";
import { getUserAddress } from "@/utils/address";
import { SignupCredentials } from "../types";

type PassportPayload = {
  username: string;
  referralCode?: string | null;
};

const handleCreatePassport = async ({
  username,
  referralCode,
}: PassportPayload): Promise<SignupCredentials> => {
  const walletAddress = getUserAddress();

  if (!walletAddress) {
    throw new Error("Wallet address not found");
  }

  const userLevel = await getUserLevel({ walletAddress });

  if (userLevel < BigInt(1)) {
    try {
      await mintPassport({ walletAddress, value: BigInt(0) });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to mint passport");
    }
  }

  const timestamp = Date.now() + (10 * 60 * 1000);
  let signature: string;

  try {
    signature = await signMessage(`${walletAddress.toLowerCase()}:${timestamp}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to sign message");
  }

  return {
    username,
    walletAddress,
    signature,
    timestamp,
    referralCode,
  };
};

export default handleCreatePassport;
