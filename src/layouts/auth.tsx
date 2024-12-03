"use client";
import AuthIntro from "@/components/Auth/AuthIntro";
import React, { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const auth = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -bottom-28 w-full flex justify-center blur-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.9, 1, 0.9],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.6,
          }}
        >
          <Image
            src="/abstract/hero17.png"
            width={500}
            height={500}
            className="object-contain w-[22rem] md:w-[33rem] sm:w-[26rem]"
            alt="Hero abstract background 3"
          />
        </motion.div>
      </div>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="w-full flex flex-col md:flex-row mx-auto h-full">
          <AuthIntro />
          <div className="md:w-1/2 lg:w-[33rem] flex flex-col justify-center items-center h-full px-5">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default auth;
