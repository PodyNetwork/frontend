import { EDUChainMainnet, OpenCampusCodexSepolia } from "@/utils/chain";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const network = Boolean(process.env.NEXT_PUBLIC_ENABLE_TESTNETS) ? EDUChainMainnet : OpenCampusCodexSepolia;

export const config = getDefaultConfig({
  appName: "Pody",
  projectId: "d4a6f4edae5c0b3b2352b1e169c92123",
  chains: [network],
  ssr: true,
});