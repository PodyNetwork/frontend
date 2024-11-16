"use client";

import Footer from "@/components/homepage/Footer";
import Hero from "@/components/homepage/v2/widgets/Hero";
import OngoingClass from "@/components/homepage/v2/widgets/OngoingClass";
import ScheduledClass from "@/components/homepage/v2/widgets/ScheduledClass";
import PodyFeatures from "@/components/homepage/v2/widgets/PodyFeatures";
import RewardSystem from "@/components/homepage/v2/widgets/RewardSystem";
import PodyNFT from "@/components/homepage/v2/widgets/PodyNFT";
import PodyRoadmap from "@/components/homepage/v2/widgets/PodyRoadmap";
import PodyFaq from "@/components/homepage/v2/widgets/PodyFaq";
import PartnerSection from "@/components/homepage/Partner";

const page = () => {
  return (
    <main className="relaive flex flex-col w-full" aria-label="class">
      <Hero />
      <PartnerSection />
      <OngoingClass />
      <ScheduledClass />
      <PodyFeatures />
      <RewardSystem />
      <PodyNFT />
      <PodyRoadmap />
      <PodyFaq />
      <Footer />
    </main>
  );
};

export default page;
