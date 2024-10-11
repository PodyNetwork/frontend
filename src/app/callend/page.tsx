"use client";
import React from "react";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pody-dark_secondary text-white p-4">
      {/* Subtle animated icon */}
      <motion.div
        className="mb-8 text-red-500"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14"
          viewBox="0 -960 960 960"
          style={{ msFilter: "" }}
          fill="currentColor"
        >
          <path d="m133.69-334-60.46-58.46q-12.77-12-12.38-29.16.38-17.15 13.15-29.92 78-79.61 186.36-124.04Q368.71-620 479.89-620q111.19 0 219.53 44.42Q807.77-531.15 886-451.54q12.77 12.77 13.15 29.92.39 17.16-12.38 29.16L826.31-334q-13.31 12.54-28.96 14.31-15.66 1.77-29.2-8l-85.23-64.93q-11.84-9.07-17.38-19.44-5.54-10.37-5.54-23.32v-111.7q-48.77-17.38-91.08-25.15Q526.62-580 480-580q-46.62 0-88.92 7.77-42.31 7.77-91.08 25.15v111.7q0 12.95-5.54 23.32-5.54 10.37-17.38 19.44l-85.23 64.93q-13.54 9.77-29.2 8Q147-321.46 133.69-334ZM260-532.77q-42.85 19.62-82.92 47.19Q137-458 108-430.15q-3.85 3.84-3.85 7.69 0 3.84 3.85 7.69l47.69 46.92q3.85 3.85 9.62 5 5.77 1.16 10.38-2.69l75.08-56.77q3.85-3.07 6.54-7.69 2.69-4.62 2.69-8.46v-94.31Zm440 .46v93.85q0 3.84 2.69 8.46 2.69 4.62 6.54 7.69l75.08 56.77q4.61 3.85 10.38 2.69 5.77-1.15 9.62-5L852-414.31q3.85-3.84 3.85-7.69 0-3.85-3.85-7.69-29-28.31-69.08-55.77-40.07-27.46-82.92-46.85Zm-440-.46Zm440 .46Z"/>
        </svg>
      </motion.div>

      <h2 className="xs:text-xl md:text-2xl font-medium mb-2">You left the call</h2>
      <p className="xs:text-sm text-base mb-8">Ready to begin your session?</p>

      <div className="space-y-4 w-full max-w-xs">
        <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition duration-300 ease-in-out">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Page;