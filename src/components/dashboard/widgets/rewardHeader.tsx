import { motion } from "framer-motion";

const RewardHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-y-4"
    >
      <motion.h2
        className="text-4xl text-slate-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Testnet Reward is{" "}
        <motion.span
          className="text-slate-500"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Here
        </motion.span>{" "}
        earn on every meeting you join
      </motion.h2>
    </motion.div>
  );
};

export default RewardHeader;
