import { ReactNode } from "react";
import "../styles/globals.css";
import manrope from "@/fonts/Manrope/localFont";
import Providers from "./Providers";
import type { Metadata, Viewport } from "next";
import OCProvider from "./OCProviders";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Pody Classroom - Get rewarded for your time.",
    template: "%s | Pody Classroom",
  },
  description:
    "Learn on Open Campus and Earn Rewards your number one Web3 Alternative to Google Meet and Twitter Space",
  keywords: [
    "web3 education",
    "blockchain learning",
    "online classroom",
    "earn while learning",
    "decentralized education",
    "pody classroom",
    "crypto rewards",
    "educational platform",
    "virtual classroom",
    "defi learning",
    "web3 meetings",
    "blockchain classroom",
    "learn to earn",
    "educational rewards",
    "peer learning"
  ],
  authors: [{ name: "Pody Network", url: "https://pody.network" }],
  openGraph: {
    title: "Pody Classroom - Get rewarded for your time.",
    description:
      "Learn on Open Campus and Earn Rewards your number one Web3 Alternative to Google Meet and Twitter Space",
    url: "https://pody.network",
    siteName: "Pody",
    images: [
      {
        url: "https://pody.network/social/banner.png",
        width: 1200,
        height: 630,
        alt: "Pody Classroom - Learn & Earn in Web3",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pody Classroom | Learn & Earn in Web3",
    description:
      "Learn on Open Campus and Earn Rewards your number one Web3 Alternative to Google Meet and Twitter Space",
    images: ["https://pody.network/social/banner.png"],
    creator: "@PodyNetwork",
    site: "@PodyNetwork",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    { rel: "icon", url: "/logo.png" },
    { rel: "apple-touch-icon", url: "/logo.png", sizes: "180x180" },
  ],
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#07070A" },
    { media: "(prefers-color-scheme: dark)", color: "#07070A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <Providers>
          <OCProvider>
            <main>{children}</main>
          </OCProvider>
        </Providers>
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
          `}
        </Script>
      </body>
    </html>
  );
}
