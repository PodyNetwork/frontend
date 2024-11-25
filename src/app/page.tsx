"use client";
import Hero from "@/components/homepage/v2/Hero";
import OngoingClass from "@/components/homepage/v2/OngoingClass";
import ScheduledClass from "@/components/homepage/v2/ScheduledClass";
import PodyFeatures from "@/components/homepage/v2/PodyFeatures";
import RewardSystem from "@/components/homepage/v2/RewardSystem";
import PodyNFT from "@/components/homepage/v2/PodyNFT";
import PodyRoadmap from "@/components/homepage/v2/PodyRoadmap";
import PodyFaq from "@/components/homepage/v2/PodyFaq";
import PartnerSection from "@/components/homepage/v2/Partner";
import Footer from "@/components/homepage/Global/Footer";

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
