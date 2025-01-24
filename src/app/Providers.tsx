'use client'; 

import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/utils/wagmi";
import queryClient from "@/utils/queryClient";

const customLightTheme = lightTheme({
  accentColor: "#0D0E14",
  accentColorForeground: "white",
  fontStack: "system", 
  borderRadius: "medium", 
  overlayBlur: "small",
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={customLightTheme}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
