import React, { useState } from "react";
import { motion } from "framer-motion";
import FaqHeader from "./widgets/FAQ/FaqHeader";
import FaqQuestionAndAnswer from "./widgets/FAQ/FaqQuestionAndAnswer";

const PodyFaq = () => {
  return (
    <section className="w-full relative" id="faq">
      <div className="px-5 md:px-6 flex flex-col max-w-3xl mx-auto py-24">
        <FaqHeader />
        <FaqQuestionAndAnswer />
      </div>
    </section>
  );
};

export default PodyFaq;
