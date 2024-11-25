import React from 'react'
import Image from "next/image";
import { motion } from "framer-motion";

const GradientBackground = () => {
  return (
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
  )
}

export default GradientBackground