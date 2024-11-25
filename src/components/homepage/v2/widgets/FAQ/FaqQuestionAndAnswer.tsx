import { motion } from "framer-motion";
import React, { useState } from "react";
import faqData from "@/components/homepage/data/faq.json";

const FaqQuestionAndAnswer = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <motion.div
      className="py-7 relative rounded-md overflow-hidden w-full z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="space-y-2.5">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            className="relative"
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <button
              className={`w-full text-left p-4 font-semibold text-sm focus:outline-none transition-colors bg-slate-100 rounded-2xl ${
                activeIndex === index ? "text-slate-500" : "text-slate-700"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </button>

            {activeIndex === index && (
              <motion.div
                className="p-4 text-slate-700 text-sm w-10/12"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                initial={{ opacity: 0, maxHeight: 0 }}
                animate={{ opacity: 1, maxHeight: 200 }}
                exit={{ opacity: 0, maxHeight: 0 }}
                transition={{ duration: 0.5 }}
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FaqQuestionAndAnswer;
