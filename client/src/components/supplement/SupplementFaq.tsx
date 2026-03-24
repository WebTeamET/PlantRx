"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type QAItem = {
  question: string;
  answer: string;
};


const QA_ITEMS: QAItem[] = [
  {
    question: "Is this a stimulant?",
    answer: "No. Moringa is a natural plant-based supplement and is not classified as a stimulant. It supports overall wellness without causing jittery effects.",
  },
  {
    question: "Will it make me feel energized?",
    answer: "Yes, it naturally supports steady energy and reduces fatigue without caffeine spikes.",
  },
  {
    question: "When is the best time to take it?",
    answer: "Take it in the morning or before meals for best absorption and daily consistency.",
  },
  {
    question: "Is it suitable for daily use?",
    answer: "Yes, it is safe and effective for regular daily use as part of a healthy routine.",
  },
  {
    question: "Who should avoid using it?",
    answer: "Pregnant, breastfeeding individuals or those with medical conditions should consult a doctor before use.",
  },
];

export default function SupplementFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden to-white py-24 lg:py-25 new-container">
      <div className="relative max-w-7xl mx-auto">
        <div
          className="rounded-[25px] bg-white px-5 py-10 sm:px-10 xl:py-[100px] border-[2px] border-dashed border-[#6E4B4C]"
        >  
          <h2
            className="text-center font-semibold text-[clamp(38px,_6vw,_64px)] leading-[1.05] text-[#000] mb-7 xl:mb-[50px]"
          >
            Your Questions, Answered
          </h2>

          <div className="space-y-4 max-w-[880px] mx-auto">
            {QA_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <motion.button
                  key={item.question}
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left"
                  aria-expanded={isOpen}
                  aria-controls={`qa-panel-${idx}`}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className={`rounded-[16px] sm:rounded-[18px] px-5 sm:px-6 py-4 sm:py-5 ${
                      isOpen ? "bg-gold text-white" : "bg-[#FFF8EB] text-[#2B1E1E]"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <div className="text-[17px] font-semibold opacity-80">{idx + 1}.</div>
                      <div className="flex-1 space-y-2">
                        <div className="text-[17px] sm:text-[18px] font-semibold">{item.question}</div>
                        
                      </div>
                      <motion.span
                        className="text-[20px] font-bold leading-none"
                        animate={{ rotate: isOpen ? 0 : 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      >
                        {isOpen ? "-" : "+"}
                      </motion.span>
                    </div>
                    <motion.div
                      id={`qa-panel-${idx}`}
                      className="overflow-hidden"
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                        marginTop: isOpen ? 16 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      aria-hidden={!isOpen}
                    >
                      <p
                        className={`text-[14px] sm:text-[15px] leading-[1.55] ${
                          isOpen ? "text-white/90" : "text-[#2B1E1E]"
                        }`}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
