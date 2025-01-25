import { defineChain } from "viem";

const OpenCampusCodexSepolia = defineChain({
  id: 656476,
  name: "Open Campus Codex Sepolia",
  nativeCurrency: { name: "EDU", symbol: "EDU", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://open-campus-codex-sepolia.drpc.org"] },
  },
  testnet: true,
  blockExplorers: {
    default: {
      name: "EDU Chain Testnet Explorer",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
});

const EDUChainMainnet = defineChain({
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

export const ActiveNetwork = Boolean(process.env.NEXT_PUBLIC_ENABLE_TESTNETS) ? OpenCampusCodexSepolia: EDUChainMainnet;


