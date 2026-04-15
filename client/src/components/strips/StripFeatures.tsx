"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, useMemo, useRef } from "react";
import { ShopifyProduct } from "@/lib/shopify";

interface StripFeaturesProps {
  product?: ShopifyProduct;
}

type Feature = {
  title: string;
  leftImage: string;
  leftAlt: string;
  rightImage: string;
  rightAlt: string;
};

export default function StripFeatures({ product }: StripFeaturesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const DEFAULT_FEATURES: Feature[] = [
    { title: "Capsules Are Outdated", leftImage: "/mushroom-focus-strips-product.png", leftAlt: "Capsule tin", rightImage: "/mushroom-focus-strips-product.png", rightAlt: "Focus strips tin" },
    { title: "Mushroom Focus In Seconds", leftImage: "/mushroom-focus-strips-product.png", leftAlt: "Focus strips tin", rightImage: "/mushroom-focus-strips-product.png", rightAlt: "Capsule tin" },
    { title: "Modern Nootropic Format", leftImage: "/mushroom-focus-strips-product.png", leftAlt: "Capsule tin", rightImage: "/mushroom-focus-strips-product.png", rightAlt: "Focus strips tin" },
    { title: "Chocolate-Flavored Clarity", leftImage: "/mushroom-focus-strips-product.png", leftAlt: "Focus strips tin", rightImage: "/mushroom-focus-strips-product.png", rightAlt: "Capsule tin" },
    { title: "No Water Needed.", leftImage: "/mushroom-focus-strips-product.png", leftAlt: "Capsule tin", rightImage: "/mushroom-focus-strips-product.png", rightAlt: "Focus strips tin" },
    { title: "Cognitive Support Anywhere", leftImage: "/mushroom-focus-strips-product.png", leftAlt: "Focus strips tin", rightImage: "/mushroom-focus-strips-product.png", rightAlt: "Capsule tin" },
    { title: "Focus In Your Pocket", leftImage: "/mushroom-focus-strips-product.png", leftAlt: "Capsule tin", rightImage: "/mushroom-focus-strips-product.png", rightAlt: "Focus strips tin" },
  ];

  const features = useMemo(() => {
    const node = product?.featuresMeta;
    const textList = node?.text_list || node?.features_list || node?.list;
    if (!node || !textList) return DEFAULT_FEATURES;

    return (textList as string[]).map((text: string) => ({
      title: text,
      leftImage: node.image_one || node.left_image || "/mushroom-focus-strips-product.png",
      leftAlt: "feature left",
      rightImage: node.image_two || node.right_image || "/mushroom-focus-strips-product.png",
      rightAlt: "feature right",
    }));
  }, [product]);

  // ─── Scroll Animation Solution ──────────────────────────────────────────

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Offset targets the center of the viewport for a "focus" effect
    offset: ["start center", "end center"],
  });

  // Map 0-1 scroll progress to 0-(length-1) index
  const scrollIndex = useTransform(scrollYProgress, [0, 1], [0, features.length - 1]);

  useMotionValueEvent(scrollIndex, "change", (latest) => {
    // Only apply scroll-based activation on max-lg (tablet/mobile)
    if (!isDesktop) {
      const rounded = Math.round(latest);
      if (rounded !== active) {
        setActive(rounded);
      }
    }
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsDesktop(window.innerWidth > 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeFeature = features[active] ?? features[0];
  const isOdd = ((active + 1) % 2) === 1; 

  return (
    <section ref={containerRef} className="feature-wrapper relative overflow-hidden py-[100px] lg:py-28"> 
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={`feature-${active}-left`}
            src={activeFeature.leftImage}
            alt={activeFeature.leftAlt}
            className={`block absolute w-[80px] md:w-[120px] lg:w-[230px] ${isOdd ? "max-lg:!top-0 max-lg:!bottom-auto" : "max-lg:!top-auto max-lg:!bottom-2.5"}`}
            style={{
              left: "30px",
              top: isOdd ? "40px" : "auto",
              bottom: isOdd ? "auto" : "40px",
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: isOdd ? -8 : -7, x: isOdd ? -4 : -10, y: isOdd ? 4 : 7 }}
            animate={{
              opacity: isMobile ? 0.95 : 1,
              scale: 1,
              rotate: isOdd ? -8 : -7,
              x: isOdd ? -4 : -10,
              y: isOdd ? 4 : 7,
            }}
            exit={{ opacity: 0, scale: 0.5, rotate: isOdd ? -8 : -7 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          <motion.img
            key={`feature-${active}-right`}
            src={activeFeature.rightImage}
            alt={activeFeature.rightAlt}
            className={`block absolute w-[80px] md:w-[120px] lg:w-[230px] ${isOdd ? "max-lg:!top-auto max-lg:!bottom-0" : "max-lg:!top-2.5 max-lg:!bottom-auto"}`}
            style={{
              right: "30px",
              top: isOdd ? "auto" : "40px",
              bottom: isOdd ? "40px" : "auto",
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: isOdd ? 10 : 12, x: isOdd ? 8 : 12, y: isOdd ? -6 : -7 }}
            animate={{
              opacity: isMobile ? 0.95 : 1,
              scale: 1,
              rotate: isOdd ? 10 : 12,
              x: isOdd ? 8 : 12,
              y: isOdd ? -6 : -7,
            }}
            exit={{ opacity: 0, scale: 0.5, rotate: isOdd ? 10 : 12 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </AnimatePresence>
      </div>
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="relative z-10 text-center space-y-4">
          {features.map((item: Feature, idx: number) => {
             const isActive = active === idx;
             return (
               <motion.button
                 key={item.title + idx}
                 type="button"
                 onMouseEnter={() => { if(isDesktop) setActive(idx); }}
                 onFocus={() => { if(isDesktop) setActive(idx); }}
                 className="w-full min-h-fit"
                 initial={false}
                 animate={{ scale: isActive ? 1 : 1 }}
                 transition={{ type: "spring", stiffness: 220, damping: 16, mass: 0.8 }}
                 aria-pressed={isActive}
               >
                 <motion.p
                   className={`block text-[clamp(20px,_6vw,_54px)] leading-[1.1] font-heading font-semibold`}
                   animate={{
                     color: isActive ? "var(--product-primary-color)" : "#000",
                   }}
                   transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                 >
                   {item.title}
                 </motion.p>
               </motion.button>
             );
          })}
        </div>
      </div>
    </section>
  );
}