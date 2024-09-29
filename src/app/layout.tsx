"use client"

import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";
import { Manrope } from "next/font/google";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/utils/wagmi";
import queryClient from "@/utils/queryClient";
import manrope from "@/fonts/Manrope/localFont";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider modalSize="compact">
              <main>{children}</main>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}