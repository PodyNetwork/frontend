import { motion } from "framer-motion";
import React from "react";

const HeroText = () => {
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

  return (
    <motion.div
      className="flex items-center justify-center flex-col text-slate-700 max-w-3xl mx-auto text-center gap-y-2.5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="font-bold text-4xl xs:text-5xl md:text-7xl leading-none"
        variants={itemVariants}
      >
        Join Classrooms and Earn Rewards.
      </motion.h1>
      <motion.p className="font-medium text-lg" variants={itemVariants}>
        Your #1 Web3 Alternative to Google Meet and X Spaces.
      </motion.p>
    </motion.div>
  );
};

export default HeroText;
