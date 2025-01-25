import { Chain, defineChain } from "viem";

export const DefaultChain = defineChain(JSON.parse(process.env.NEXT_PUBLIC_ENABLE_TESTNETS as string) as Chain);