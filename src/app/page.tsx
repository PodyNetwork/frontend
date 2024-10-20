import HeroSection from "@/components/homepage/Hero";
import FeaturesSection from "@/components/homepage/Features";
import Roadmap from "@/components/homepage/Roadmap";
import Cta from "@/components/homepage/Cta";
import Footer from "@/components/homepage/Footer";
import RewardSection from "@/components/homepage/PodyReward";
import Faq from "@/components/homepage/Faq";
import PartnerSection from "@/components/homepage/Partner";
import Benefits from "@/components/homepage/Benefits";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: 'Pody Classroom - Get rewarded for your time.',
  description: 'Learn on Open Campus and Earn Rewards Your number one Web3 Alternative to Google Meet and Twitter Space',
  openGraph: {
    title: 'Pody Classroom - Get rewarded for your time.',
    description: 'Learn on Open Campus and Earn Rewards Your number one Web3 Alternative to Google Meet and Twitter Space',
    url: 'https://pody.network',
    images: [
      {
        url: 'https://pody.network/social/banner.png',
        width: 1200,
        height: 630,
        alt: 'Pody Classroom - Get rewarded for your time',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pody Classroom - Get rewarded for your time.',
    description: 'Learn on Open Campus and Earn Rewards Your number one Web3 Alternative to Google Meet and Twitter Space',
    images: ['https://pody.network/social/banner.png'],
  },
}

export default function Home() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Pody",
              url: "https://pody.network",
              logo: "https://pody.network/logo.png",
            }),
          }}
        />
      </Head>
    <main className="relative float-left w-full h-full overflow-hidden" aria-label="Homepage">
        <HeroSection />
        <PartnerSection />
        <Benefits />
        <FeaturesSection />
        <RewardSection />
        <Roadmap />
        <Faq />
        <Cta />
        <Footer />
    </main>
    </>
  );
}
