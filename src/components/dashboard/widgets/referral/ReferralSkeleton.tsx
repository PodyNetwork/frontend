import { motion } from "framer-motion";

const ReferralSkeleton = () => {
  const pulseAnimation = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  };

  return (
    <section className="w-full flex gap-4 flex-col py-5 mt-5">
      <div className="relative overflow-x-auto md:border md:border-slate-100 md:rounded-xl">
        {/* Table Skeleton */}
        <table className="hidden md:table w-full text-sm text-left rtl:text-right text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="p-4">
                S/N
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Reward
              </th>
              <th scope="col" className="px-6 py-3">
                Point
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <motion.tr
                key={index}
                className="bg-white border-b border-slate-100 text-sm"
                variants={pulseAnimation}
                initial="initial"
                animate="animate"
              >
                <td className="w-4 p-4">
                  <motion.div
                    className="h-4 w-8 bg-slate-200 rounded"
                    {...pulseAnimation}
                  ></motion.div>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-8 h-8 bg-slate-200 rounded-full"
                      {...pulseAnimation}
                    ></motion.div>
                    <motion.div
                      className="h-4 w-24 bg-slate-200 rounded"
                      {...pulseAnimation}
                    ></motion.div>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <motion.div
                    className="h-4 w-20 bg-slate-200 rounded"
                    {...pulseAnimation}
                  ></motion.div>
                </td>
                <td className="px-6 py-3">
                  <motion.div
                    className="h-4 w-16 bg-slate-200 rounded"
                    {...pulseAnimation}
                  ></motion.div>
                </td>
                <td className="px-6 py-3">
                  <motion.div
                    className="h-4 w-24 bg-slate-200 rounded"
                    {...pulseAnimation}
                  ></motion.div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View Skeleton */}
        <div className="md:hidden">
          {[...Array(5)].map((_, index) => (
            <div
              className="grid grid-cols-[2rem_1fr] items-center gap-1 mb-2"
              key={index}
            >
              <motion.div
                className="h-6 w-8 bg-slate-200 rounded"
                {...pulseAnimation}
              ></motion.div>
              <div className="grid grid-cols-[2.5rem_1fr] items-center gap-4 p-2 bg-white shadow-md shadow-slate-100 rounded-xl">
                <motion.div
                  className="w-10 h-10 bg-slate-200 rounded-full"
                  {...pulseAnimation}
                ></motion.div>
                <div className="flex-1">
                  <motion.div
                    className="h-4 w-24 bg-slate-200 rounded mb-2"
                    {...pulseAnimation}
                  ></motion.div>
                  <motion.div
                    className="h-3 w-32 bg-slate-200 rounded"
                    {...pulseAnimation}
                  ></motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReferralSkeleton;
