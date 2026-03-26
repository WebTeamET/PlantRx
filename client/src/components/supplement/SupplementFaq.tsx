"use client";

import { slideUpVariants } from "@/animation/framerMotionVariants";
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
    <section className="relative overflow-hidden to-white py-10 md:py-16 xl:py-20 2xl:py-[150px] new-container">
      <div className="relative max-w-7xl mx-auto">
        <div
          className="rounded-[25px] bg-white px-5 py-10 sm:px-10 xl:py-[100px] relative"
        >
          <svg
            className="pointer-events-none absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="25"
              ry="25"
              fill="none"
              stroke="#385127"
              strokeWidth="2"
              strokeDasharray="21 21"
            />
          </svg>
          <motion.h2 
          variants={slideUpVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ willChange: "transform, opacity" }}
            className="text-center text-[clamp(32px,5vw,80px)] leading-[clamp(34px,6.3vw,109px)] text-black dark:text-black mb-7 xl:mb-[50px]"
          >
            Your Questions, Answered
          </motion.h2>

          <div className="space-y-5 max-w-[880px] mx-auto">
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
                  variants={slideUpVariants as any}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className={`rounded-[10px] md:rounded-[20px] p-5 xl:p-[30px] ${isOpen ? "bg-gold text-white dark:text-white" : "bg-[#FFF8EB] text-[#212121] dark:text-[#212121]"
                      }`}
                  >
                    <div className={`flex items-center justify-between gap-1 2xl:text-[25px] 2xl:leading-7 max-md:text-base max-md:leading-5 font-semibold ${isOpen ? "text-white dark:text-white" : " text-[#212121] dark:text-[#212121]"}`}>
                      <div className="flex items-start gap-1">
                        <div className={`${isOpen ? "text-white dark:text-white" : " text-[#212121] dark:text-[#212121]"}`}>{idx + 1}.</div>
                        <div className="flex-1">
                          <div className={`${isOpen ? "text-white dark:text-white" : " text-[#212121] dark:text-[#212121]"}`}>{item.question}</div>
                        </div>
                      </div>
                      <motion.span
                        className="text-[20px] font-bold leading-none"
                        animate={{ rotate: isOpen ? 0 : 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      >
                        {isOpen ?
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 max-md:size-3">
                            <path d="M13.125 6.09375H1.875C1.35732 6.09375 0.9375 6.51357 0.9375 7.03125V7.96875C0.9375 8.48643 1.35732 8.90625 1.875 8.90625H13.125C13.6427 8.90625 14.0625 8.48643 14.0625 7.96875V7.03125C14.0625 6.51357 13.6427 6.09375 13.125 6.09375Z" fill="currentColor" />
                          </svg>
                          :
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 max-md:size-3">
                            <path d="M13.125 6.09375H8.90625V1.875C8.90625 1.35732 8.48643 0.9375 7.96875 0.9375H7.03125C6.51357 0.9375 6.09375 1.35732 6.09375 1.875V6.09375H1.875C1.35732 6.09375 0.9375 6.51357 0.9375 7.03125V7.96875C0.9375 8.48643 1.35732 8.90625 1.875 8.90625H6.09375V13.125C6.09375 13.6427 6.51357 14.0625 7.03125 14.0625H7.96875C8.48643 14.0625 8.90625 13.6427 8.90625 13.125V8.90625H13.125C13.6427 8.90625 14.0625 8.48643 14.0625 7.96875V7.03125C14.0625 6.51357 13.6427 6.09375 13.125 6.09375Z" fill="currentColor" />
                          </svg>

                        }
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
                        className={`text-base leading-[27px] max-md:text-sm font-medium ${isOpen ? "text-white dark:text-white" : "text-black dark:text-black"
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
