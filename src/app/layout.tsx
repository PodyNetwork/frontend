import { ReactNode } from "react";
import "../styles/globals.css";
import manrope from "@/fonts/Manrope/localFont";
import Providers from "./Providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pody Classroom - Get rewarded for your time.",
  description:
    "Teach on Open-campus and earn rewards, Decentralized and privacy-focused.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={manrope.variable}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
