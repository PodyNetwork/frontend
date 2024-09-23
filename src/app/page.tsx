import Image from "next/image";
import Nav from "@/components/homepage/nav";
import Hero from "@/components/homepage/hero";

export default function Home() {
  return (
    <div className="relative float-left w-full h-full overflow-hidden" aria-label="Homepage">
      <section className="w-full relative" aria-labelledby="hero">
        <div className="bg-pody-dark min-h-screen relative">
          <div className="_radial_container relative z-10">
            <div className="_radial_bg"></div>
          </div>
          <div className="z-50 relative">
            <Nav />
            <Hero />
          </div>
        </div>
      </section>
    </div>
  );
}
