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
  img1Position?: CSSProperties & Record<string, string>;
  img2Position?: CSSProperties & Record<string, string>;
  img1Rotate?: string;
  img2Rotate?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function StripTopics({ product, children }: StripTopicsProps) {
  const baseImg1Style: CSSProperties = {
    top: "clamp(20px, 4vw, 60px)",
    left: "clamp(20px, 3vw, 60px)",
  };

  const baseImg2Style: CSSProperties = {
    top: "clamp(20px, 4vw, 60px)",
    right: "clamp(20px, 3vw, 60px)",
  };

  const topics: Topic[] = [
    {
      title: "Brain Fog",
      img1: "/brain1.svg",
      img2: "/brain2.svg",
      img1Position: { top: "clamp(5px, 1.98vw, 38px)", left: "clamp(60px, 12vw, 230px)", "--w": "221px", "--h": "182px" },
      img2Position: { top: "clamp(5px, 2.19vw, 42px)", right: "clamp(60px, 10.83vw, 208px)", "--w": "230px", "--h": "175px" },
      img1Rotate: "7.6deg",
      img2Rotate: "-20deg",
    },
    {
      title: "Difficulty concentrating",
      img1: "/brain3.svg",
      img2: "/brain4.svg",
      img1Position: { top: "clamp(0px, 3vw, 42px)", left: "clamp(12px, 3vw, 50px)", "--w": "208px", "--h": "208px" },
      img2Position: { top: "clamp(8px, 4vw, 60px)", right: "clamp(12px, 3vw, 50px)", "--w": "210px", "--h": "205px" },
    },
    {
      title: "Mental fatigue",
      img1: "/brain5.svg",
      img2: "/brain6.svg",
      img1Position: { top: "clamp(0px, 2vw, 60px)", left: "clamp(36px, 5vw, 90px)", "--w": "154px", "--h": "208px" },
      img2Position: { top: "clamp(0px, 0.5vw, 8px)", right: "clamp(20px, 4vw, 70px)", "--w": "170px", "--h": "220px" },
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
                className="absolute z-1 w-[50px] md:w-[100px] lg:w-[145px] xl:w-[185px] 2xl:w-[var(--w)] h-[50px] md:h-[100px] lg:h-[145px] xl:h-[185px] 2xl:h-[var(--h)]"
                style={{ ...baseImg1Style, ...topic.img1Position } as CSSProperties}
                animate={{ opacity: isFocused ? 1 : 0, scale: isFocused ? 1 : 0.2 }}
                initial={{ scale: 0.2 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <div className="w-full h-full" style={topic.img1Rotate ? { transform: `rotate(${topic.img1Rotate})` } : undefined}>
                  <img src={topic.img1} alt="mushroom-group" className="w-full h-full object-contain" />
                </div>
              </motion.div>

              <motion.div
                className="absolute z-1 w-[50px] md:w-[100px] lg:w-[145px] xl:w-[185px] 2xl:w-[var(--w)] h-[50px] md:h-[100px] lg:h-[145px] xl:h-[185px] 2xl:h-[var(--h)]"
                style={{ ...baseImg2Style, ...topic.img2Position } as CSSProperties}
                animate={{ opacity: isFocused ? 1 : 0, scale: isFocused ? 1 : 0.2 }}
                initial={{ scale: 0.2 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <div className="w-full h-full" style={topic.img2Rotate ? { transform: `rotate(${topic.img2Rotate})` } : undefined}>
                  <img src={topic.img2} alt="brain" className="w-full h-full object-contain" />
                </div>
              </motion.div>

              <span>{topic.title}</span>
            </motion.div>
          );
        })}
      </section>
    </>
  );
}
