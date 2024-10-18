"use client";
import { useState } from "react";
import faqData from "../data/faq.json";
import { motion } from "framer-motion";

const FaqCard = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row items-start gap-6 mt-6">
        <div className="py-7 relative overflow-hidden w-full md:w-5/12">
          <div className="relative z-50">
            <h3 className="text-2xl xs:text-3xl md:text-4xl font-medium text-slate-200">
              Frequently Asked Questions
            </h3>
          </div>
        </div>
        <motion.div
          className="py-7 relative rounded-md overflow-hidden w-full md:w-7/12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="relative"
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <motion.button
                  className={`w-full text-left p-4 font-medium text-sm text-slate-200 focus:outline-none transition-colors
                ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-pody-secondary to-pody-dark_secondary"
                    : "__pd_faq_bg"
                }`}
                  onClick={() => toggleFAQ(index)}
                  whileHover={{ backgroundColor: "#3F3B60" }}
                >
                  {faq.question}
                </motion.button>

                {activeIndex === index && (
                  <motion.div
                    className="p-4 text-slate-300 text-sm"
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
      </div>
    </>
  );
};

export default FaqCard;
