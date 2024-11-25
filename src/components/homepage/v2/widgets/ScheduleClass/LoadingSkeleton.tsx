import { motion } from 'framer-motion';
import React from 'react'

const LoadingSkeleton = () => {
    const shimmerAnimation = {
      initial: { backgroundPosition: "-200% 0" },
      animate: {
        backgroundPosition: "200% 0",
        transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
      },
    };

    return (
      <div className="w-full flex flex-col gap-y-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col text-slate-600 pb-8 border-b border-slate-300"
          >
            {/* Date Placeholder */}
            <motion.div
              className="h-4 w-32 bg-gray-300 rounded-md"
              {...shimmerAnimation}
            ></motion.div>

            {/* Title and Host Section */}
            <div className="py-2 flex flex-row items-center gap-2 justify-between">
              <div className="flex-1">
                <motion.div
                  className="h-6 w-3/4 bg-gray-300 rounded-md mb-2"
                  {...shimmerAnimation}
                ></motion.div>
                <motion.div
                  className="h-4 w-1/2 bg-gray-300 rounded-md"
                  {...shimmerAnimation}
                ></motion.div>
              </div>
              <motion.div
                className="w-9 h-9 bg-gray-300 rounded-full"
                {...shimmerAnimation}
              ></motion.div>
            </div>

            {/* Buttons Placeholder */}
            <div className="flex items-center gap-3 flex-row flex-wrap justify-between mt-2">
              <motion.div
                className="h-8 w-40 bg-gray-300 rounded-full"
                {...shimmerAnimation}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    );
  };

export default LoadingSkeleton