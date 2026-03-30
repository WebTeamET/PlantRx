"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { ShopifyProduct, getMetaobjectsList, getMetaobjectField } from "@/lib/shopify";

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
  const DEFAULT_FEATURES: Feature[] = [
    {
      title: "Capsules Are Outdated",
      leftImage: "/mushroom-focus-strips-product.png",
      leftAlt: "Capsule tin",
      rightImage: "/mushroom-focus-strips-product.png",
      rightAlt: "Focus strips tin",
    },
    {
      title: "Mushroom Focus In Seconds",
      leftImage: "/mushroom-focus-strips-product.png",
      leftAlt: "Focus strips tin",
      rightImage: "/mushroom-focus-strips-product.png",
      rightAlt: "Capsule tin",
    },
    {
      title: "Modern Nootropic Format",
      leftImage: "/mushroom-focus-strips-product.png",
      leftAlt: "Capsule tin",
      rightImage: "/mushroom-focus-strips-product.png",
      rightAlt: "Focus strips tin",
    },
    {
      title: "Chocolate-Flavored Clarity",
      leftImage: "/mushroom-focus-strips-product.png",
      leftAlt: "Focus strips tin",
      rightImage: "/mushroom-focus-strips-product.png",
      rightAlt: "Capsule tin",
    },
    {
      title: "No Water Needed.",
      leftImage: "/mushroom-focus-strips-product.png",
      leftAlt: "Capsule tin",
      rightImage: "/mushroom-focus-strips-product.png",
      rightAlt: "Focus strips tin",
    },
    {
      title: "Cognitive Support Anywhere",
      leftImage: "/mushroom-focus-strips-product.png",
      leftAlt: "Focus strips tin",
      rightImage: "/mushroom-focus-strips-product.png",
      rightAlt: "Capsule tin",
    },
    {
      title: "Focus In Your Pocket",
      leftImage: "/mushroom-focus-strips-product.png",
      leftAlt: "Capsule tin",
      rightImage: "/mushroom-focus-strips-product.png",
      rightAlt: "Focus strips tin",
    },
  ];

  const features = useMemo(() => {
    // featuresMeta is now a mapped object from the server
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

  const slides = features; // Alias for consistency with other components if needed
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeFeature = features[active] ?? features[0];
  const isOdd = ((active + 1) % 2) === 1; // 1-based odd

  return (
    //bg-gradient-to-b from-[#F7EFE6] from-[-3%] via-white via-50% to-[120%] to-[#F7EFE6]
    <section className="feature-wrapper relative overflow-hidden py-[100px] lg:py-28"> 
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={`feature-${active}-left`}
            src={activeFeature.leftImage}
            alt={activeFeature.leftAlt}
            className={`block absolute w-[100px] md:w-[120px] lg:w-[230px] ${isOdd ? "max-lg:!top-0 max-lg:!bottom-auto" : "max-lg:!top-auto max-lg:!bottom-2.5"}`}
            style={{
              left: isOdd ? "30px" : "30px",
              top: isOdd ? "40px" : "auto",
              bottom: isOdd ? "auto" : "40px",
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: isOdd ? -8 : -10, x: isOdd ? -4 : -10, y: isOdd ? 4 : 10 }}
            animate={{
              opacity: isMobile ? 0.95 : 1,
              scale: 1,
              rotate: isOdd ? -8 : -10,
              x: isOdd ? -4 : -10,
              y: isOdd ? 4 : 10,
            }}
            exit={{ opacity: 0, scale: 0.5, rotate: isOdd ? -8 : -10, x: isOdd ? -4 : -10, y: isOdd ? 4 : 10 }}
            transition={{ type: "spring", stiffness: 700, damping: 35, mass: 0.3 }}
          />
          <motion.img
            key={`feature-${active}-right`}
            src={activeFeature.rightImage}
            alt={activeFeature.rightAlt}
            className={`block absolute w-[100px] md:w-[120px] lg:w-[230px] ${isOdd ? "max-lg:!top-auto max-lg:!bottom-0" : "max-lg:!top-2.5 max-lg:!bottom-auto"}`}
            style={{
              right: "30px",
              top: isOdd ? "auto" : "40px",
              bottom: isOdd ? "40px" : "auto",
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: isOdd ? 10 : 12, x: isOdd ? 8 : 12, y: isOdd ? -6 : -10 }}
            animate={{
              opacity: isMobile ? 0.95 : 1,
              scale: 1,
              rotate: isOdd ? 10 : 12,
              x: isOdd ? 8 : 12,
              y: isOdd ? -6 : -10,
            }}
            exit={{ opacity: 0, scale: 0.5, rotate: isOdd ? 10 : 12, x: isOdd ? 8 : 12, y: isOdd ? -6 : -10 }}
            transition={{ type: "spring", stiffness: 700, damping: 35, mass: 0.3 }}
          />
        </AnimatePresence>
      </div>
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        {/* floating tins */}

        <div className="relative z-10 text-center space-y-4">
          {features.map((item: Feature, idx: number) => {
            const isActive = active === idx;
            return (
              <motion.button
                key={item.title}
                type="button"
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                className="w-full min-h-fit"
                initial={false}
                animate={{ scale: isActive ? 1 : 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 16, mass: 0.8 }}
                aria-pressed={isActive}
              >
                <motion.p
                  className={`block text-[clamp(20px,_6vw,_54px)] leading-[1.1] font-heading ${
                    isActive ? "font-black" : "font-semibold"
                  }`}
                  animate={{
                    color: isActive ? "#63383D" : "#000",
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
