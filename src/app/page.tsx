import HeroSection from "@/components/homepage/Hero";
import FeaturesSection from "@/components/homepage/Features";
import Roadmap from "@/components/homepage/Roadmap";
import Cta from "@/components/homepage/Cta";
import Footer from "@/components/homepage/Footer";
import RewardSection from "@/components/homepage/PodyReward";
import Faq from "@/components/homepage/Faq";
import PartnerSection from "@/components/homepage/Partner";

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
        {/* <Benefits /> */}
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
