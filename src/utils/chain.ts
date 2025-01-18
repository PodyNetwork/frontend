import { defineChain } from "viem";

export const OpenCampusCodexSepolia = defineChain({
  id: 656476,
  name: "Open Campus Codex Sepolia",
  nativeCurrency: { name: "EDU", symbol: "EDU", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
  },
  testnet: true,
  blockExplorers: {
    default: {
      name: "EDU Chain Testnet Explorer",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
});

export const EDUChainMainnet = defineChain({
  id: 41923,
  name: "EDU Chain Mainnet",
  nativeCurrency: { name: "EDU", symbol: "EDU", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.edu-chain.raas.gelato.cloud"] },
  },
  blockExplorers: {
    default: {
      name: "EDU Chain Mainnet",
      url: "https://educhain.blockscout.com/",
    },
  },
});


