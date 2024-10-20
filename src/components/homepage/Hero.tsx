import React from "react";
import Partner from "./widgets/partner";
import Hero from "./widgets/hero";
import Nav from "./widgets/nav";

const HeroSection = () => {
  return (
    <section className="w-full relative" aria-labelledby="hero">
      <div className="bg-pody-dark relative">
        <div className="_radial_container relative z-10 max-w-4xl mx-auto">
          <div className="_radial_bg"></div>
        </div>
        <div className="z-50 relative min-h-screen flex flex-col">
          <Nav />
          <Hero />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
