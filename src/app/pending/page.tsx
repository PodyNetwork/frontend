"use client";
import React from "react";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pody-dark_secondary text-white p-4">
      {/* Subtle animated icon */}
      <motion.div
        className="mb-8 text-pody-primary"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24"
          viewBox="0 -960 960 960"
          style={{ msFilter: "" }}
          fill="currentColor"
        >
          <path d="M181.54-402.08 251-471.54 181.54-541l-69.46 69.46 69.46 69.46Zm527.69-11.77L780-527.69l71.54 113.84H709.23ZM480.27-440q-36.42 0-62.19-25.58-25.77-25.57-25.77-62.11 0-37.27 25.57-62.48 25.58-25.22 62.12-25.22 37.27 0 62.48 25.14 25.21 25.13 25.21 62.29 0 36.42-25.13 62.19Q517.43-440 480.27-440ZM480-575.39q-19.31 0-33.5 13.72-14.19 13.71-14.19 33.98 0 19.3 14.19 33.5Q460.69-480 480.38-480q19.7 0 33.5-14.19 13.81-14.2 13.81-33.89t-13.71-33.5q-13.71-13.81-33.98-13.81Zm0 47.7ZM40-256.92v-34.54q0-37.08 39.16-61.27 39.16-24.19 101.63-24.19 11.44 0 21.9.88 10.46.89 19.93 2.89-8.62 15.38-13.31 32.31-4.69 16.93-4.69 36.07v47.85H40Zm240 0v-45q0-49.62 55.48-78.85Q390.95-410 480.21-410q90.1 0 144.94 29.23Q680-351.54 680-301.92v45H280Zm500-120q63 0 101.5 24.19t38.5 61.27v34.54H755.38v-47.85q0-19.14-4.19-36.07t-12.57-32.31q9.46-2 19.95-2.89 10.49-.88 21.43-.88ZM479.91-370q-67.68 0-112.29 18.08-44.62 18.07-46.47 46.54v8.46h317.93v-8.46q-2.08-28.47-46.2-46.54Q548.77-370 479.91-370Zm.09 73.08Z"/>
        </svg>
      </motion.div>

      <h2 className="text-2xl font-medium mb-2">Call Has Not Started</h2>
      <p className="text-base mb-8">Ready to begin your session?</p>

      <div className="space-y-4 w-full max-w-xs">
        <button className="w-full bg-pody-primary hover:bg-pody-primary/30 text-white py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
          Launch Call
        </button>
        <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Page;