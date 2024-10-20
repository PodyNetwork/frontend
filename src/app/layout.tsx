import { ReactNode } from "react";
import "../styles/globals.css";
import manrope from "@/fonts/Manrope/localFont";
import Providers from "./Providers";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: 'Pody Classroom - Get rewarded for your time.',
    template: 'Pody - %s',  
  },
  description: 'Learn on Open Campus and Earn Rewards your number one Web3 Alternative to Google Meet and Twitter Space',
  keywords: ['pody', 'pody network', 'SocialFi', 'EduFi', 'reward', 'classroom', 'teacher', 'student', 'meeting', 'earn on open campus', 'points', 'web3'],
  authors: [{ name: 'podyteam', url: 'https://pody.network' }],
  openGraph: {
    title: 'Pody Classroom - Get rewarded for your time.',
    description: 'Learn on Open Campus and Earn Rewards your number one Web3 Alternative to Google Meet and Twitter Space',
    url: 'https://pody.network',
    siteName: 'Pody',
    images: [
      {
        url: 'https://pody.network/social/banner.png',
        width: 1200,
        height: 630,
        alt: 'Pody Site Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pody',
    description: 'Learn on Open Campus and Earn Rewards your number one Web3 Alternative to Google Meet and Twitter Space',
    images: ['https://pody.network/social/banner.png'],
    creator: '@PodyNetwork',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: [
    { rel: 'icon', url: '/logo.png' }, 
    { rel: 'apple-touch-icon', url: '/logo.png', sizes: '180x180' } 
  ]
}
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#07070A' },
    { media: '(prefers-color-scheme: dark)', color: '#07070A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
