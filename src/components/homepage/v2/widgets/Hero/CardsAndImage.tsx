import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

const CardsAndImage = () => {
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
            Let&apos;s earn <br /> Rewards together
          </div>
          <div className="relative mt-auto pt-16">
            <motion.div
              className="bg-slate-50 rounded-3xl mt-2 __shadow_pody"
              variants={imageVariants}
            >
              <Image
                src="/illustration/9987365.webp"
                className="w-full h-40 rounded-3xl object-cover"
                width={300}
                height={400}
                alt="Pody Getting started"
                priority
                loading="eager"
                quality={75}
              />
              <div className="p-5">
                <h3 className="font-medium text-lg">Gifting</h3>
                <p className="text-sm mt-2 text-slate-600">
                  Participants can exchange gifts during classrooms to show
                  support.
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
                src="/illustration/9090261.webp"
                className="w-full h-40 rounded-3xl object-cover"
                width={300}
                height={400}
                alt="Pody Getting started"
                priority
                loading="eager"
                quality={75}
              />
              <div className="p-5">
                <h3 className="font-medium text-lg">Go Global</h3>
                <p className="text-sm mt-2 text-slate-600">
                  Make your classroom accessible to a global audience by making
                  it public.
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
                src="/illustration/video-conference_screen.webp"
                className="rounded-2xl"
                width={900}
                height={700}
                alt="Pody Getting started"
                priority
                loading="eager"
                quality={75}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CardsAndImage;
