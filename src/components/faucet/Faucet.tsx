"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Nav from "../homepage/Global/Nav";
import Link from "next/link";

const Faucet = () => {
  const leavesVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 0.15, y: 0, transition: { duration: 1, delay: 0.5 } },
  };

  // Variants for the faucet
  const faucetVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1.5 } },
  };
  return (
    <section className="w-full relative" aria-labelledby="hero">
      <div className="bg-pody-mintgreen relative min-h-screen">
        <div className="h-full">
          {/* Faucet Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={faucetVariants}
            className="w-full object-contain absolute -bottom-10 z-30"
          >
            <Image
              src="/svg/faucet.svg"
              width="1500"
              height="700"
              alt="Pody Faucet"
            />
          </motion.div>
          {/* Leaves Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={leavesVariants}
            className="h-[85%] w-7/12 absolute -right-28 bottom-0 z-10"
          >
            <Image
              src="/svg/leaves.svg"
              width="500"
              height="300"
              className="w-full -bottom-10 absolute"
              alt="Pody Faucet"
            />
          </motion.div>
        </div>
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
        <div className="z-50 relative flex flex-col max-w-7xl min-h-screen flex-1 mx-auto px-5 md:px-6">
          <Nav />
          <div className="relative w-full px-0 flex-1 h-full">
            <div className="max-w-xl">
              <div className="max-w-xl flex flex-col gap-y-3 my-20">
                <div className="text-3xl xs:text-5xl md:text-6xl font-extrabold text-slate-700">
                  <h1>Claim EDU for Gas</h1>
                </div>
                <p className="mt-3 text-sm">
                    Claim free EDU Chain gas on Mainnet to try out our free meeting software.
                </p>
                <div className="mt-6">
                  <Link href="https://discord.gg/TjDpNw28pt"><button className="bg-pody-dark text-sm rounded-full px-8 py-4 text-slate-200 hover:opacity-80 transition-all duration-300">Claim EDU</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faucet;
