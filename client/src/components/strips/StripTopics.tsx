"use client";

import { ShopifyProduct } from "@/lib/shopify";
import { motion } from "framer-motion";
import { useState, useMemo, useRef, useEffect, ReactNode, CSSProperties } from "react";

// ─── Props ────────────────────────────────────────────────────────────────────

interface StripTopicsProps {
  product?: ShopifyProduct;
  children?: ReactNode;
}

type ImgVars = {
  "--img-top": string;
  "--img-left"?: string;
  "--img-right"?: string;
  "--img-w": string;
  "--img-h": string;
};

type Topic = {
  title: string;
  img1: string;
  img2: string;
  img1Vars?: ImgVars;
  img2Vars?: ImgVars;
  img1Rotate?: string;
  img2Rotate?: string;
};

// ─── Sub-Component for individual Topic Logic ────────────────────────────────

function TopicItem({
  topic,
  index,
  focusedIndex,
  setHoverIndex,
  setActiveIndex,
  defaultImg1Vars,
  defaultImg2Vars,
  itemRef,
}: {
  topic: Topic;
  index: number;
  focusedIndex: number;
  setHoverIndex: (i: number | null) => void;
  setActiveIndex: (i: number) => void;
  defaultImg1Vars: ImgVars;
  defaultImg2Vars: ImgVars;
  itemRef: (el: HTMLDivElement | null) => void;
}) {
  const isFocused = index === focusedIndex;
  const img1Vars = topic.img1Vars ?? defaultImg1Vars;
  const img2Vars = topic.img2Vars ?? defaultImg2Vars;

  return (
    <motion.div
      ref={itemRef}
      onMouseEnter={() => setHoverIndex(index)}
      onMouseLeave={() => setHoverIndex(null)}
      onClick={() => setActiveIndex(index)}
      className="relative text-center font-heading capitalize max-[370px]:text-base text-[22px] leading-[26px] sm:text-[28px] sm:leading-[32px] md:text-[40px] md:leading-[46px] xl:text-[56px] xl:leading-[64px] 2xl:text-[80px] 2xl:leading-[90px] p-5 lg:px-[50px] xl:py-[70px] xl:px-[240px] cursor-default max-xl:flex items-center justify-between gap-5"
      initial={false}
      animate={{
        backgroundColor: isFocused
          ? "var(--product-primary-color)"
          : "var(--product-secondary-color)",
        color: isFocused ? "#FFFFFF" : "#000000",
        filter: isFocused ? "blur(0px)" : "blur(8px)",
      }}
      transition={{
        backgroundColor: { duration: 0.35, ease: "easeInOut" },
        color: { duration: 0.35, ease: "easeInOut" },
        filter: { duration: 0.35, ease: "easeInOut" },
      }}
      style={{ willChange: "background-color, filter" }}
    >
      <motion.div
        className="xl:absolute z-[9]
          top-1/2 max-[1799px]:xl:!-translate-y-1/2 min-[1800px]:top-[var(--img-top)]
          left-[10px] sm:left-[20px] md:left-[30px] min-[1800px]:left-[var(--img-left)]
          w-20 md:w-[100px] xl:w-[140px] min-[1800px]:w-[var(--img-w)] max-[370px]:!w-16
          h-20 md:h-[100px] xl:h-[140px] min-[1800px]:h-[var(--img-h)] max-[370px]:!h-16"
        style={img1Vars as CSSProperties}
        animate={{ opacity: isFocused ? 1 : 0, scale: isFocused ? 1 : 0.2 }}
        initial={{ scale: 0.2 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <div
          className="w-full h-full"
          style={topic.img1Rotate ? { transform: `rotate(${topic.img1Rotate})` } : undefined}
        >
          <img src={topic.img1} alt="decoration-left" className="w-full h-full object-contain" />
        </div>
      </motion.div>

      <span>{topic.title}</span>

      <motion.div
        className="xl:absolute z-[9]
          top-1/2 max-[1799px]:xl:!-translate-y-1/2 min-[1800px]:top-[var(--img-top)]
          right-[10px] sm:right-[20px] md:right-[30px] min-[1800px]:right-[var(--img-right)]
          max-[370px]:!w-16 w-20 md:w-[100px] xl:w-[140px] min-[1800px]:w-[var(--img-w)]
          max-[370px]:!h-16 h-20 md:h-[100px] xl:h-[140px] min-[1800px]:h-[var(--img-h)]"
        style={img2Vars as CSSProperties}
        animate={{ opacity: isFocused ? 1 : 0, scale: isFocused ? 1 : 0.2 }}
        initial={{ scale: 0.2 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <div
          className="w-full h-full"
          style={topic.img2Rotate ? { transform: `rotate(${topic.img2Rotate})` } : undefined}
        >
          <img src={topic.img2} alt="decoration-right" className="w-full h-full object-contain" />
        </div>
      </motion.div>
    </motion.div>
  );
}


export default function StripTopics({ product }: StripTopicsProps) {
  const defaultImg1Vars: ImgVars = { "--img-top": "60px", "--img-left": "60px", "--img-w": "185px", "--img-h": "185px" };
  const defaultImg2Vars: ImgVars = { "--img-top": "60px", "--img-right": "60px", "--img-w": "185px", "--img-h": "185px" };

  const hardcodedTopics: Topic[] = [
    {
      title: "Brain Fog",
      img1: "/brain1.svg",
      img2: "/brain2.svg",
      img1Vars: { "--img-top": "20px", "--img-left": "140px", "--img-w": "200px", "--img-h": "182px" },
      img2Vars: { "--img-top": "30px", "--img-right": "130px", "--img-w": "190px", "--img-h": "175px" },
      img1Rotate: "7.6deg",
      img2Rotate: "-20deg",
    },
    {
      title: "Difficulty concentrating", 
      img1: "/brain3.svg",
      img2: "/brain2.svg",
      img1Vars: { "--img-top": "20px", "--img-left": "50px", "--img-w": "180px", "--img-h": "208px" },
      img2Vars: { "--img-top": "30px", "--img-right": "50px", "--img-w": "180px", "--img-h": "205px" },
    },
    {
      title: "Mental fatigue",
      img1: "/brain5.svg",
      img2: "/brain6.svg",
      img1Vars: { "--img-top": "30px", "--img-left": "90px", "--img-w": "154px", "--img-h": "208px" },
      img2Vars: { "--img-top": "8px",  "--img-right": "70px", "--img-w": "170px", "--img-h": "220px" },
    },
  ];

  const topics = useMemo(() => {
    const list = product?.iconWithText;
    if (!list || list.length === 0) return hardcodedTopics;
    return list.map((node: any, i: number) => {
      const fallback = hardcodedTopics[i % hardcodedTopics.length];
      return {
        title: node.text || fallback.title,
        img1: node.left_icon || fallback.img1,
        img2: node.right_icon || fallback.img2,
        img1Vars: fallback.img1Vars,
        img2Vars: fallback.img2Vars,
        img1Rotate: fallback.img1Rotate,
        img2Rotate: fallback.img2Rotate,
      };
    });
  }, [product]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const focusedIndex = hoverIndex ?? activeIndex;

  const [isDesktop, setIsDesktop] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isDesktop) return;
    const handleScroll = () => {
      const center = window.innerHeight / 2;
      let activeIdx = 0;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= center) {
          activeIdx = i;
        }
      });
      setActiveIndex(activeIdx);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  return (
    <section className="topics-wrapper block w-full relative">
      {topics.map((topic, index) => (
        <TopicItem
          key={topic.title + index}
          topic={topic}
          index={index}
          focusedIndex={focusedIndex}
          setHoverIndex={setHoverIndex}
          setActiveIndex={setActiveIndex}
          defaultImg1Vars={defaultImg1Vars}
          defaultImg2Vars={defaultImg2Vars}
          itemRef={(el) => { itemRefs.current[index] = el; }}
        />
      ))}
    </section>
  );
}