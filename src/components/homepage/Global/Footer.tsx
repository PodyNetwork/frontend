"use client";

import LegalLinks from "../widgets/Footer/LegalLinks";
import PodyTM from "../widgets/Footer/PodyTM";
import PodyTOS from "../widgets/Footer/PodyTOS";
import QuickLinks from "../widgets/Footer/QuickLinks";
import SocialLink from "../widgets/Footer/SocialLink";
import StarRingSvg from "../widgets/Footer/StarRingSvg";

const Footer = () => {
  return (
    <section
      className="bg-[#E9EADB] relative py-4 flex flex-col justify-center text-slate-400 text-sm overflow-hidden"
      aria-label="Footer"
    >
      <div className="relative z-30">
        <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-30">
          <div className="w-full relative">
            <PodyTOS />
            <div className="flex md:flex-row flex-col gap-y-10 gap-x-16 py-7 text-pody-secondary">
              <PodyTM />
              <div className="relative grid grid-cols-1 __pdsm:grid-cols-2 md:grid-cols-3 flex-1 max-w-4xl gap-7">
                <QuickLinks />
                <SocialLink />
                <LegalLinks />
              </div>
            </div>
            <div className="pt-7 flex flex-row justify-between gap-3 relative z-30">
              <p className="text-6xl md:text-8xl font-semibold text-pody-secondary/5">
                PODY NETWORK
              </p>
            </div>
          </div>
        </div>
      </div>
      <StarRingSvg />
    </section>
  );
};

export default Footer;
