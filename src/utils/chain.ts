import { Chain, defineChain } from "viem";

export const DefaultChain = defineChain(JSON.parse(process.env.NEXT_PUBLIC_CHAIN_CONFIGURATION as string) as Chain);