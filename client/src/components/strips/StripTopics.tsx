"use client";
import { getMetafieldImage } from "@/lib/shopify";
import { ShopifyProduct } from "@/lib/shopify";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ReactNode, CSSProperties } from "react";


// ─── Props ────────────────────────────────────────────────────────────────────

interface StripTopicsProps {
  product?: ShopifyProduct;
  children?: ReactNode;
}

type Topic = {
  title: string;
  img1: string;
  img2: string;
  img1Position?: CSSProperties;
  img2Position?: CSSProperties;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function StripTopics({ product, children }: StripTopicsProps) {
  const baseImg1Style: CSSProperties = {
    top: "clamp(20px, 4vw, 60px)",
    left: "clamp(20px, 3vw, 60px)",
    width: "221px",
    height: "182px",
  };

  const baseImg2Style: CSSProperties = {
    top: "clamp(20px, 4vw, 60px)",
    right: "clamp(20px, 3vw, 60px)",
    width: "230px",
    height: "175px",
  };

  const topics: Topic[] = [
    {
      title: "Brain Fog",
      img1: "/brain1.svg",
      img2: "/brain2.svg",
      img1Position: { top: "clamp(12px, 2vw, 72px)", left: "clamp(20px, 4vw, 70px)", width: "clamp(90px, 15.35vw, 221px)", height: "clamp(70px, 12.64vw, 182px)" },
      img2Position: { top: "clamp(6px, 2vw, 60px)", right: "clamp(24px, 4vw, 70px)", width: "clamp(110px, 15.97vw, 230px)", height: "clamp(70px, 12.15vw, 175px)" },
    },
    {
      title: "Difficulty concentrating",
      img1: "/brain3.svg",
      img2: "/brain4.svg",
      img1Position: { top: "clamp(0px, 3vw, 42px)", left: "clamp(12px, 3vw, 50px)", width: "clamp(60px, 14.44vw, 208px)", height: "clamp(60px, 14.44vw, 208px)" },
      img2Position: { top: "clamp(8px, 4vw, 60px)", right: "clamp(12px, 3vw, 50px)", width: "clamp(60px, 14.58vw, 210px)", height: "clamp(60px, 14.24vw, 205px)" },
    },
    {
      title: "Mental fatigue",
      img1: "/brain5.svg",
      img2: "/brain6.svg",
      img1Position: { top: "clamp(0px, 2vw, 60px)", left: "clamp(36px, 5vw, 90px)", width: "clamp(60px, 10.69vw, 154px)", height: "clamp(90px, 14.44vw, 208px)" },
      img2Position: { top: "clamp(0px, 0.5vw, 8px)", right: "clamp(20px, 4vw, 70px)", width: "clamp(70px, 11.81vw, 170px)", height: "clamp(70px, 15.28vw, 220px)" },
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
              className="relative text-center font-heading capitalize text-[clamp(22px,_5vw,_80px)] py-[25px] px-[50px] lg:p-[70px] cursor-default"
              initial={false}
              animate={{
                backgroundColor: isFocused ? "#643A3D" : "#F5E2D8",
                color: isFocused ? "#FFFFFF" : "#000000",
                filter: isFocused ? "blur(0px)" : "blur(8px)",
                scale: isFocused ? 1 : 1,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 18, mass: 1 }}
            >
              <motion.div
                className="absolute z-1"
                style={{ ...baseImg1Style, ...topic.img1Position }}
                animate={{ opacity: isFocused ? 1 : 0, scale: isFocused ? 1 : 0.2 }}
                initial={{ scale: 0.2 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <img src={topic.img1} alt="mushroom-group" className="w-full h-full object-contain" />
              </motion.div>

              <motion.div
                className="absolute z-1"
                style={{ ...baseImg2Style, ...topic.img2Position }}
                animate={{ opacity: isFocused ? 1 : 0, scale: isFocused ? 1 : 0.2 }}
                initial={{ scale: 0.2 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <img src={topic.img2} alt="brain" className="w-full h-full object-contain" />
              </motion.div>

              <span>{topic.title}</span>
            </motion.div>
          );
        })}
      </section>
    </>
  );
}
