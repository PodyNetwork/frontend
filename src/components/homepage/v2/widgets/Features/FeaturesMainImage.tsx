import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import discoverImage from "/public/abstract/discoverAbstract.png";

const FeaturesMainImage = () => {
  return (
    <motion.div
      className="w-full __discover_img"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
    >
      <Image
        src={discoverImage}
        className="w-full object-contain"
        width={183}
        height={516}
        alt="discover"
        priority
        
        quality={75}
      />
    </motion.div>
  );
};

export default FeaturesMainImage;
