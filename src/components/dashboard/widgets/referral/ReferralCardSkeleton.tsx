"use client";

import React from "react";
import { motion } from "framer-motion";

const SkeletonReferral = () => {
  const skeletonVariant = {
    initial: { opacity: 0.4 },
    animate: { opacity: [0.4, 0.7, 0.4] },
    transition: { duration: 1.5, repeat: Infinity },
  };

  return (
    <div className="flex-1 gap-6 flex flex-col p-8 rounded-xl __pd_golden_grd relative bg-slate-800">
      <div className="text-slate-50">
        <motion.div
          className="h-6 w-32 bg-slate-100 rounded-lg"
          {...skeletonVariant}
        />
        <motion.div
          className="h-4 w-60 bg-slate-100 rounded-lg mt-2"
          {...skeletonVariant}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        <div className="text-slate-50 w-7/12 flex flex-col">
          <div className="pt-3">
            <motion.div
              className="h-12 w-36 bg-slate-100 rounded-lg"
              {...skeletonVariant}
            />
            <motion.div
              className="h-4 w-32 bg-slate-100 rounded-lg mt-2"
              {...skeletonVariant}
            />
          </div>

          <div className="mt-auto pt-8">
            <div className="flex flex-row items-center gap-x-2">
              <motion.div
                className="h-10 w-24 bg-slate-100 rounded-lg"
                {...skeletonVariant}
              />
              <motion.div
                className="h-6 w-6 bg-slate-100 rounded-full"
                {...skeletonVariant}
              />
            </div>
            <motion.div
              className="h-4 w-32 bg-slate-100 rounded-lg mt-2"
              {...skeletonVariant}
            />
          </div>
        </div>

        <div className="w-5/12 flex flex-col justify-between gap-y-6 text-slate-50">
          <div className="pt-3">
            <motion.div
              className="h-8 w-20 bg-slate-100 rounded-lg"
              {...skeletonVariant}
            />
            <motion.div
              className="h-4 w-32 bg-slate-100 rounded-lg mt-2"
              {...skeletonVariant}
            />
          </div>
          <div>
            <motion.div
              className="h-8 w-24 bg-slate-100 rounded-lg"
              {...skeletonVariant}
            />
            <motion.div
              className="h-4 w-32 bg-slate-100 rounded-lg mt-2"
              {...skeletonVariant}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonReferral;
