"use client";
import { getMetafieldImage } from "@/lib/shopify";
import { ShopifyProduct } from "@/lib/shopify";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ReactNode } from "react";


// ─── Props ────────────────────────────────────────────────────────────────────

interface StripTopicsProps {
  product?: ShopifyProduct;
  children?: ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StripTopics({ product, children }: StripTopicsProps) {
  const topics = [
    {
      title: "Brain Fog",
      img1: "/brain1.svg",
      img2: "/brain2.svg",
    },
    {
      title: "Difficulty concentrating",
      img1: "/brain3.svg",
      img2: "/brain4.svg",
    },
    {
      title: "Mental fatigue",
      img1: "/brain5.svg",
      img2: "/brain6.svg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const focusedIndex = hoverIndex ?? activeIndex;

  return (
    <>
      <section className="topics-wrapper block w-full relative">
        {topics.map((topic, index) => {
          const isFocused = index === focusedIndex;

          return (
            <motion.div
              key={topic.title}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => setActiveIndex(index)}
              className="relative text-center font-heading capitalize text-[80px] p-[70px] cursor-default overflow-hidden"
              initial={false}
              animate={{
                backgroundColor: isFocused ? "#643A3D" : "#F5E2D8",
                color: isFocused ? "#FFFFFF" : "#000000",
                filter: isFocused ? "blur(0px)" : "blur(14px)",
                scale: isFocused ? 1 : 1,
              }}
              transition={{ type: "spring", stiffness: 250, damping: 28 }}
            >
              <motion.div
                className="absolute top-[clamp(20px,_4vw_,60px)] left-[clamp(20px,_3vw_,60px)] w-[221px] h-[182px]"
                animate={{ opacity: isFocused ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <img src={topic.img1} alt="mushroom-group" className="w-full h-full object-cover" />
              </motion.div>

              <motion.div
                className="absolute top-[clamp(20px,_4vw_,60px)] right-[clamp(20px,_3vw_,60px)] w-[230px] h-[175px]"
                animate={{ opacity: isFocused ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <img src={topic.img2} alt="brain" className="w-full h-full object-cover" />
              </motion.div>

              <span>{topic.title}</span>
            </motion.div>
          );
        })}
      </section>
    </>
  );
}

