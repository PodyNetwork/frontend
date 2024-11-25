import { motion } from 'framer-motion'
import React from 'react'

const SkeletonCard = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-slate-100 p-5 rounded-3xl xs:rounded-[1.7rem] flex flex-col"
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1.5,
          }}
        >
          <motion.div
            className="flex items-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.5,
            }}
          >
            <div className="bg-slate-200 rounded-full px-4 py-2 w-32 h-5"></div>
            <div className="bg-slate-200 rounded-full px-4 py-2 w-20 h-5"></div>
          </motion.div>
          <div className="py-6">
            <motion.div
              className="h-6 bg-slate-300 w-6/12 rounded mb-2"
              initial={{ width: "50%" }}
              animate={{ width: "90%" }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.2,
              }}
            ></motion.div>
            <motion.div
              className="h-4 bg-slate-300 w-6/12 rounded"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 0.8 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
            ></motion.div>
          </div>

          <motion.div
            className="flex gap-2 justify-between items-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.5,
            }}
          >
            <div className="flex flex-row items-center gap-x-2 sm:gap-x-3 mt-auto">
              <motion.div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-400"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1.2,
                }}
              ></motion.div>
              <div className="flex-1">
                <motion.div
                  className="h-4 bg-slate-300 w-32 rounded mb-1"
                  initial={{ width: "50%" }}
                  animate={{ width: "75%" }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1.3,
                  }}
                ></motion.div>
                <motion.div
                  className="h-3 bg-slate-300 w-24 rounded"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1.4,
                  }}
                ></motion.div>
              </div>
            </div>
            <motion.div
              className="bg-slate-300 rounded-full px-4 py-3 flex items-center w-32 justify-center"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
            >
              <div className="h-6 w-6 bg-slate-300 rounded-full"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </>
  )
}

export default SkeletonCard