import { config } from "@/utils/wagmi";
import { switchChain } from "@wagmi/core";
import { ActiveNetwork } from "./config";


export const switchToDefaultChain = async () => {
    await switchChain(config, { chainId: ActiveNetwork.id });
}