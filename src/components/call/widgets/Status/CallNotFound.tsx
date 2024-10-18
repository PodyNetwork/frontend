"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const CallNotFound = () => {
  const EndCallIcon = () => (
    <motion.div
      className="mb-4 text-red-500"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
        viewBox="0 -960 960 960"
        fill="currentColor"
      >
        <path d="M740.77-329.69 710-360.92q40.77-11 65.38-44.04Q800-438 800-480q0-50.77-35.77-86.92-35.77-36.16-85.77-36.16H533.85v-40h144.61q66.85 0 114.19 47.73Q840-547.62 840-480q0 49.31-27.58 89.23-27.57 39.92-71.65 61.08ZM612.46-460l-40-40h46v40h-6ZM819.69-83.69l-736-736L112-848l736 736-28.31 28.31ZM426.15-316.92H283.08q-67.62 0-115.35-47.73Q120-412.38 120-480q0-64.38 43.92-111.08 43.93-46.69 107.62-50.61H290l38.62 38.61h-45.54q-50.77 0-86.93 36.16Q160-530.77 160-480t36.15 86.92q36.16 36.16 86.93 36.16h143.07v40ZM341.54-460v-40h90.38l39 40H341.54Z" />
      </svg>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pody-dark_secondary text-white p-4">
      <div className="max-w-xs flex justify-center items-center flex-col text-center flex-1">
        <EndCallIcon />
        <h2 className="text-base xs:text-xl font-medium mb-2">
           Classroom Not Found
        </h2>
        <p className="text-xs mb-8">The requested classroom could not be located check the link and retry</p>
        <div className="space-y-4 flex flex-col w-full text-xs xs:text-sm">
          <Link href="/dashboard">
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition duration-300 ease-in-out">
              Create Classroom
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallNotFound;
