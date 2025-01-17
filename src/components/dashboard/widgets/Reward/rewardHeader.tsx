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
        className="text-3xl text-slate-800 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Testnet{" "}
        <motion.span
          className="text-slate-500"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {" "}
          Reward
        </motion.span>{" "}
        is here Earn on every Classroom you Join
      </motion.h2>
      <p className="text-sm text-slate-600 font-normal">📌 Every Classroom You Join Isn&apos;t Just a Step Forward It&apos;s a Reward Waiting to Be Claimed! Don&apos;t Just Learn, Earn Big.</p>
    </motion.div>
  );
};

export default RewardHeader;
