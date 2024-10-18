import HeroSection from "@/components/homepage/Hero";
import FeaturesSection from "@/components/homepage/Features";
import Roadmap from "@/components/homepage/Roadmap";
import Cta from "@/components/homepage/Cta";
import Footer from "@/components/homepage/Footer";
import RewardSection from "@/components/homepage/PodyReward";
import Faq from "@/components/homepage/Faq";

export default function Home() {
  return (
    <main className="relative float-left w-full h-full overflow-hidden" aria-label="Homepage">
        <HeroSection />
        <FeaturesSection />
        <RewardSection />
        <Roadmap />
        <Faq />
        <Cta />
        <Footer />
    </main>
  );
}
