import HeroSection from "@/components/homepage/Hero";
import FeaturesSection from "@/components/homepage/Features";

export default function Home() {
  return (
    <div className="relative float-left w-full h-full overflow-hidden" aria-label="Homepage">
        <HeroSection />
        <FeaturesSection />
    </div>
  );
}
