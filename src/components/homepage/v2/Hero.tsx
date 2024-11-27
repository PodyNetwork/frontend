
import GradientBackground from "./widgets/Hero/GradientBackground";
import HeroText from "./widgets/Hero/HeroText";
import CardsAndImage from "./widgets/Hero/CardsAndImage";
import Nav from "../Global/Nav";

const Hero = () => {


  return (
    <section className="w-full relative bg-pody-mintgreen/80 overflow-hidden">
      <GradientBackground />
      <div className="flex flex-col max-w-7xl h-full mx-auto px-5 md:px-6">
        <Nav />
        <div className="w-full py-16 relative">
          {/* Hero Text */}
          <HeroText />
          {/* Cards and Images */}
          <CardsAndImage />
        </div>
      </div>
    </section>
  );
};

export default Hero;
