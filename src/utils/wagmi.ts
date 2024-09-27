import { OpenCampusCodexSepolia } from "@/utils/chain";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
  appName: "EduVR",
  projectId: "d4a6f4edae5c0b3b2352b1e169c92123",
  chains: [OpenCampusCodexSepolia],
  ssr: true,
});