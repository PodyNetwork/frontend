import Nav from "../../widgets/nav";
import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full relative bg-[#E9EADB]/80">
      <div className="flex flex-col max-w-7xl h-full mx-auto px-4 md:px-6">
        <Nav />
        <div className="w-full py-16 relative">
          {/* Hero Text */}
          <motion.div
            className="flex items-center justify-center flex-col text-slate-700 max-w-3xl mx-auto text-center gap-y-2.5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 className="font-bold text-4xl xs:text-5xl md:text-7xl leading-none" variants={itemVariants}>
              Join Classroom and Earn Rewards
            </motion.h1>
            <motion.p className="font-medium text-lg" variants={itemVariants}>
              Your number one Web3 Alternative to Google Meet and X Space
            </motion.p>
          </motion.div>

          {/* Cards and Images */}
          <motion.div
            className="relative pt-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="gap-5 grid grid-cols-1 __pdsm:grid-rows-[auto_auto] __pdsm:grid-cols-2 __pdsm:[&>*:last-child]:col-span-2 md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[18rem_1fr_18rem] md:[&>*:last-child]:col-span-1"
              variants={containerVariants}
            >
              <motion.div
                className="h-full hidden __pdsm:flex flex-col md:order-1"
                variants={itemVariants}
              >
                <div className="text-sm">
                  Let's earn <br /> reward together
                </div>
                <div className="relative mt-auto pt-16">
                  <motion.div
                    className="bg-slate-50 rounded-3xl mt-2 __shadow_pody"
                    variants={imageVariants}
                  >
                    <Image
                      src="/illustration/host.png"
                      className="w-full h-36 rounded-3xl object-cover"
                      width={300}
                      height={400}
                      alt="Pody Getting started"
                    />
                    <div className="p-5">
                      <h3 className="font-medium text-lg">Connect Wallet</h3>
                      <p className="text-sm mt-2 text-slate-600">
                        Connect your wallet and mint a Pody passport to securely
                        login to your Dashboard
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className="h-full hidden __pdsm:flex flex-col card md:order-3"
                variants={itemVariants}
              >
                <div className="text-sm __pdsm:ml-auto">
                  <p>
                    Pody Classroom <br /> New Features
                  </p>
                </div>
                <div className="relative mt-auto pt-16">
                  <motion.div
                    className="bg-slate-50 rounded-3xl mt-2 __shadow_pody"
                    variants={imageVariants}
                  >
                    <Image
                      src="/illustration/participant.png"
                      className="w-full h-36 rounded-3xl object-cover"
                      width={300}
                      height={400}
                      alt="Pody Getting started"
                    />
                    <div className="p-5">
                      <h3 className="font-medium text-lg">Create Classroom</h3>
                      <p className="text-sm mt-2 text-slate-600">
                        Create or Schedule a Public or Private Classroom and
                        watch the rewards roll in!
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div className="relative md:order-2" variants={itemVariants}>
                <div className="flex flex-col h-full">
                  <motion.div
                    className="xs:w-full lg:w-[90%] mx-auto object-cover main-image mt-auto"
                    variants={imageVariants}
                  >
                    <Image
                      src="/illustration/video-conference_screen.png"
                      className="rounded-2xl"
                      width={900}
                      height={700}
                      alt="Pody Getting started"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
