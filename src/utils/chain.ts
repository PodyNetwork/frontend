import { Chain, defineChain } from "viem";

export const DefaultChain = defineChain(JSON.parse(process.env.CHAIN_CONFIGURATION as string) as Chain);