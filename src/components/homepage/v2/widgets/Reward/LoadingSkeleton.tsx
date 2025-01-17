import { motion } from 'framer-motion';
import React from 'react'

const LoadingSkeleton = () => {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            className="relative w-10 h-10 bg-slate-200 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
            key={index}
          ></motion.div>
        ))}
      </>
    );
  };
  

export default LoadingSkeleton