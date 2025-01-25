import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { ActiveNetwork } from "./config";


export const config = getDefaultConfig({
  appName: "Pody",
  projectId: "d4a6f4edae5c0b3b2352b1e169c92123",
  chains: [ActiveNetwork],
  ssr: true,
});