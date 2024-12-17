import { motion } from "framer-motion";
const ReferralLeaderboardSkeleton = () => {
    return(
        Array(8).fill(null).map((_, index) => (
            <li
              className="py-3 border-b border-slate-100 cursor-pointer"
              key={index}
            >
              <div className="grid grid-cols-[2.5rem_1fr_1.5rem] gap-3 items-center">
                <motion.div
                  className="w-6 h-6 rounded-md bg-slate-200"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
      
                <div className="flex items-center">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-slate-200"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <div className="ms-2.5 gap-y-px font-medium text-sm flex flex-col">
                    <motion.div
                      className="w-20 h-4 bg-slate-200"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-24 h-2 mt-1 bg-slate-200"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                </div>
      
                <motion.div
                  className="size-6 bg-slate-200"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </li>
          ))
    )
}

export default ReferralLeaderboardSkeleton