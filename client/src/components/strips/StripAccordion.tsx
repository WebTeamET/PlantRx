"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { ShopifyProduct } from "@/lib/shopify";
import { slideUpVariants } from "@/animation/framerMotionVariants";

interface StripAccordionProps {
  product?: ShopifyProduct;
}

type QAItem = {
  question: string;
  answer: string;
};


export default function StripAccordion({ product }: StripAccordionProps) {
  const hardcodedQA: QAItem[] = [
    {
      question: "Is this a stimulant?",
      answer: "No. It uses functional mushroom extracts traditionally associated with cognitive support.",
    },
    {
      question: "Will it make me feel wired?",
      answer: "You should feel clear and steady, not jittery. The formula favors focus over buzz.",
    },
    {
      question: "When is best to take it?",
      answer: "Most people enjoy it in the morning or early afternoon so the focus benefits line up with their day.",
    },
  ];

  const qaItems = useMemo(() => {
    const list = product?.faqList?.faq_list || product?.faqList?.faq_items || product?.faqList?.questions;
    if (!list || !Array.isArray(list) || list.length === 0) return hardcodedQA;

    return list.map((node: any) => ({
      question: node.question || node.faq_question || "",
      answer: node.answer || node.faq_answer || "",
    }));
  }, [product]);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,transparent_0%,var(--product-background-color)_51.44%,transparent_100%)] py-[50px] lg:py-28">
      <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
        <div
          className="rounded-[25px] bg-white px-5 py-10 md:px-10 md:py-12 border-[2px] border-dashed border-StripPrimary"
        >
          <motion.h2
          variants={slideUpVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ willChange: "transform, opacity" }}
            className="text-center font-semibold text-[clamp(38px,_6vw,_64px)] leading-[1.05] text-[#000] dark:text-[#000] mb-10"
          >
            Your Questions, Answered
          </motion.h2>

          <div className="space-y-4 lg:px-[100px]">
            {qaItems.map((item, idx) => {
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
                    className={`rounded-[16px] sm:rounded-[18px] px-5 sm:px-6 py-4 sm:py-5 ${
                      isOpen ? "bg-StripPrimary text-white dark:*:text-white" : "bg-[#EDEDED] text-[#2B1E1E] dark:*:text-[#2B1E1E]"
                    }`}
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className={`pt-[2px] text-[17px] font-semibold ${
                          isOpen ? "text-white dark:text-white" : "text-[#2B1E1E] dark:text-[#2B1E1E]"
                        }`}>{idx + 1}.</div>
                      <div className="flex-1 space-y-2">
                        <div className={`text-[17px] sm:text-[18px] font-semibold ${
                          isOpen ? "text-white dark:text-white" : "text-[#2B1E1E] dark:text-[#2B1E1E]"
                        }`}>{item.question}</div>
                        
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
                          isOpen ? "text-white dark:text-white" : "text-[#2B1E1E] dark:text-[#2B1E1E]"
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
