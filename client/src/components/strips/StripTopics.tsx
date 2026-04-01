import { ShopifyProduct } from "@/lib/shopify";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { ReactNode, CSSProperties } from "react";


// ─── Props ────────────────────────────────────────────────────────────────────

interface StripTopicsProps {
  product?: ShopifyProduct;
  children?: ReactNode;
}

// CSS custom properties for image positioning and sizing
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function StripTopics({ product, children }: StripTopicsProps) {
  // Default vars used when no per-topic overrides are provided
  const defaultImg1Vars: ImgVars = {
    "--img-top": "60px",
    "--img-left": "60px",
    "--img-w": "185px",
    "--img-h": "185px",
  };
  const defaultImg2Vars: ImgVars = {
    "--img-top": "60px",
    "--img-right": "60px",
    "--img-w": "185px",
    "--img-h": "185px",
  };

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

  return (
    <>
      <section className="topics-wrapper block w-full relative">
        {topics.map((topic, index) => {
          const isFocused = index === focusedIndex;
          const img1Vars = topic.img1Vars ?? defaultImg1Vars;
          const img2Vars = topic.img2Vars ?? defaultImg2Vars;

          return (
            <motion.div
              key={topic.title}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => setActiveIndex(index)}
              className="relative text-center font-heading capitalize text-[22px] leading-[26px] sm:text-[28px] sm:leading-[32px] md:text-[40px] md:leading-[46px] xl:text-[56px] xl:leading-[64px] 2xl:text-[80px] 2xl:leading-[90px] p-5 lg:px-[50px] xl:py-[70px] xl:px-[240px] cursor-default max-xl:flex items-center justify-between gap-5"
              initial={false}
              animate={{
                backgroundColor: isFocused
                  ? "var(--product-primary-color)"
                  : "var(--product-secondary-color)",
                color: isFocused ? "#FFFFFF" : "#000000",
                filter: isFocused ? "blur(0px)" : "blur(8px)",
                scale: isFocused ? 1 : 1,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 18, mass: 1 }}
            >
              {/* Left image — absolute corner decoration, vars drive desktop position & size */}
              <motion.div
                className="xl:absolute z-[9]
                  top-1/2 max-[1799px]:xl:!-translate-y-1/2 min-[1800px]:top-[var(--img-top)]
                  left-[10px] sm:left-[20px] md:left-[30px] min-[1800px]:left-[var(--img-left)]
                  w-20 md:w-[100px] xl:w-[140px] min-[1800px]:w-[var(--img-w)]
                  h-20 md:h-[100px] xl:h-[140px] min-[1800px]:h-[var(--img-h)]"
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
              {/* Right image — absolute corner decoration, vars drive desktop position & size */}
              <motion.div
                className="xl:absolute z-[9]
                  top-1/2 max-[1799px]:xl:!-translate-y-1/2 min-[1800px]:top-[var(--img-top)]
                  right-[10px] sm:right-[20px] md:right-[30px] min-[1800px]:right-[var(--img-right)]
                  w-20 md:w-[100px] xl:w-[140px] min-[1800px]:w-[var(--img-w)]
                  h-20 md:h-[100px] xl:h-[140px] min-[1800px]:h-[var(--img-h)]"
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
        })}
      </section>
    </>
  );
}
