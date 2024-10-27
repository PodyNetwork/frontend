import BlockiesSvg from "blockies-react-svg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// const SkeletonCard = () => {
//   return (
//     <>
//       {Array.from({ length: 10 }).map((_, index) => (
//         <motion.div
//           className="p-4 sm:p-5 bg-slate-100 rounded-2xl flex flex-col h-[270px] min-w-[250px] max-w-[250px]"
//           key={index}
//           transition={{
//             repeat: Infinity,
//             repeatType: "mirror",
//             duration: 1.5,
//           }}
//         >
//           <div className="flex flex-col gap-y-1.5">
//             <motion.div
//               className="flex items-center justify-between gap-2 flex-wrap"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.7 }}
//               transition={{
//                 repeat: Infinity,
//                 repeatType: "mirror",
//                 duration: 1.5,
//               }}
//             >
//               <div className="w-16 h-4 bg-slate-200 rounded"></div>
//               <div className="w-12 h-4 bg-slate-200 rounded"></div>
//             </motion.div>

//             <motion.div
//               className="h-6 bg-slate-300 rounded w-full mt-2"
//               initial={{ width: "80%" }}
//               animate={{ width: "100%" }}
//               transition={{
//                 repeat: Infinity,
//                 repeatType: "mirror",
//                 duration: 1.2,
//               }}
//             ></motion.div>

//             <motion.div
//               className="w-20 h-5 bg-slate-200 rounded mt-2"
//               initial={{ opacity: 0.4 }}
//               animate={{ opacity: 0.8 }}
//               transition={{
//                 repeat: Infinity,
//                 repeatType: "mirror",
//                 duration: 1.5,
//               }}
//             ></motion.div>
//           </div>

//           <motion.div
//             className="flex flex-row items-center gap-x-2 sm:gap-x-3 mt-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{
//               repeat: Infinity,
//               repeatType: "mirror",
//               duration: 1.5,
//             }}
//           >
//             <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-300"></div>
//             <div className="flex-1">
//               <motion.div
//                 className="h-4 bg-slate-200 rounded w-3/4"
//                 initial={{ width: "60%" }}
//                 animate={{ width: "75%" }}
//                 transition={{
//                   repeat: Infinity,
//                   repeatType: "mirror",
//                   duration: 1.3,
//                 }}
//               ></motion.div>
//               <motion.div
//                 className="h-4 bg-slate-200 rounded w-1/2 mt-1"
//                 initial={{ opacity: 0.6 }}
//                 animate={{ opacity: 1 }}
//                 transition={{
//                   repeat: Infinity,
//                   repeatType: "mirror",
//                   duration: 1.4,
//                 }}
//               ></motion.div>
//             </div>
//           </motion.div>
//         </motion.div>
//       ))}
//     </>
//   );
// };

const OngoingClass = () => {
  const barCount = 3;
  const [heights, setHeights] = useState(Array(barCount).fill(20));

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(heights.map(() => Math.floor(Math.random() * 80) + 20));
    }, 300);

    return () => clearInterval(interval);
  }, [heights]);

  return (
    <section className="w-full relative">
      <div
        className="px-3 md:px-10 flex flex-col max-w-7xl mx-auto py-24"
        id="publicClassroom"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="max-w-xl text-center flex flex-col gap-y-2.5">
            <h2 className="text-2xl xs:text-4xl font-semibold text-pody-secondary">
              Get Reward Instantly when you join active classroom
            </h2>
            <p className="text-base mt-1.5">
              Your reward is calculated when you join a classroom starts when
              you join
            </p>
          </div>
        </div>
        <div className="w-full mt-6">
          <div className="__ongoing_wrapper __pd_main_veil rounded-3xl relative text-slate-100 p-6">
            <div className="relative z-50 flex flex-col min-h-[600px]">
              <div className="flex flex-row items-center gap-x-2">
                <div className="flex justify-center items-center md:h-[17px]">
                  {heights.map((height, index) => (
                    <motion.div
                      key={index}
                      className="bg-slate-100 dark:bg-slate-100 rounded-lg mx-px"
                      initial={{ height: "20%" }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror",
                      }}
                      style={{
                        width: "3px",
                      }}
                    />
                  ))}
                </div>
                <h2 className="text-sm font-medium">Public Classroom</h2>
              </div>
              <div className="relative mt-auto pt-12 flex flex-row gap-x-3 overflow-x-auto max-w-7xl">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    className="p-4 sm:p-5 __pdy_gls-eft rounded-2xl flex flex-col h-[270px] min-w-[250px] max-w-[250px]"
                    key={index}
                  >
                    <div className="flex flex-col gap-y-1.5 text-slate-600">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="text-xs capitalize">Today - 11:29</p>
                        <p className="text-xs capitalize">instant</p>
                      </div>
                      <h3 className="text-base sm:text-lg font-medium text-slate-800 truncate">
                        The socio economical effect of crude oil in nigeria
                      </h3>
                      <div>
                        <button className="text-xs text-pody-success bg-pody-success/10 px-2 sm:px-3 py-1 font-medium rounded-sm ">
                          Ongoing
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-x-2 sm:gap-x-3 mt-auto">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full relative bg-black/20">
                        <BlockiesSvg
                          address="9zi-s8c-5hb7"
                          className="w-full h-full rounded-full"
                        />
                      </div>
                      <div className="text-xs sm:text-sm flex-1 text-slate-600">
                        <h3 className="font-medium">9zi-s8c-5hb7</h3>
                        <p className="text-xs">Call ID</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OngoingClass;
