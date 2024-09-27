import { defineChain } from "viem";

export const OpenCampusCodexSepolia = defineChain({
  id: 656476,
  name: "Open Campus Codex Sepolia",
  nativeCurrency: { name: "EDU", symbol: "EDU", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://open-campus-codex-sepolia.drpc.org"] },
  },
  blockExplorers: {
    default: {
      name: "EDU Chain Testnet Explorer",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
});

