"use client"
import React from "react";
import Nav from "../homepage/widgets/nav";
import Image from "next/image";
import { motion } from "framer-motion";
const Termsheader = () => {
  return (
    <section className="w-full relative" aria-labelledby="hero">
      <div className="bg-pody-mintgreen/80 relative">
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[14rem] md:w-[22rem] sm:w-[18rem] -top-32 left-0 blur-xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.1, 1],
              y: 0,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 0.2,
            }}
          >
            <Image
              src="/abstract/hero15.png"
              width={500}
              height={500}
              className="object-contain"
              alt="Hero abstract background 1"
            />
          </motion.div>
          <motion.div
            className="absolute w-[14rem] md:w-[18rem] sm:w-[16rem] -top-10 -right-5 blur-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.15, 1],
              x: 0,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 0.4,
            }}
          >
            <Image
              src="/abstract/hero16.png"
              width={500}
              height={500}
              className="object-contain"
              alt="Hero abstract background 2"
            />
          </motion.div>
        </div>
        <div className="z-50 relative flex flex-col max-w-7xl h-full mx-auto px-5 md:px-6">
          <Nav />
          <div className="relative w-full px-0 md:px-16 flex-1">
            <div className="max-w-5xl mx-auto">
              <div className="max-w-2xl flex flex-col gap-y-3 my-20">
                <div className="text-2xl xs:text-3xl md:text-4xl font-bold text-slate-700">
                  <h1>Terms of Service for Pody Network</h1>
                </div>
                <div className="text-base text-slate-600">
                  <p>Effective Date: October 1, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Termsheader;
