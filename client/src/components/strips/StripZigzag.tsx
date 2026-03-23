"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StripZigzagProps {
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
  eyebrow?: string;
  children?: ReactNode;
}

const titleShadow = `
  0 10px 0 #fff,  0 -10px 0 #fff,
  10px 0 0 #fff, -10px 0 0 #fff,
  6px 6px 0 #fff, -6px 6px 0 #fff,
  6px -6px 0 #fff,-6px -6px 0 #fff
`;

const defaultParagraphs = [
  "Mushroom Focus Strips are designed to support mental clarity, focus, and daily cognitive performance as part of a balanced wellness routine. These convenient dissolvable oral strips combine functional mushroom extracts traditionally used to support brain function, energy, and overall vitality.",
  "The fast-dissolving strip format allows the ingredients to be taken easily without water, making it suitable for work, studying, travel, or daily productivity.",
];

export default function StripZigzag({
  title = "Smarter Daily Wellness",
  subtitle,
  paragraphs = defaultParagraphs,
  imageSrc = "/mushroom-focus-strips-product.png",
  imageAlt = "Mushroom focus strips tin",
  reverse = false,
  eyebrow,
  children,
}: StripZigzagProps) {
  return (
    <section className="relative overflow-hidden w-full bg-gradient-to-t from-white via-[#F7EFE6] to-white py-16 md:py-24">
      <div className="relative mx-auto px-6 lg:px-[120px] grid md:grid-cols-3 gap-12">
        <div className={reverse ? "order-2 md:order-1" : "lg:col-span-2 order-1 lg:mb-[30vh]"}>
          {eyebrow && (
            <p className="text-sm uppercase tracking-[0.2em] text-[#7a5a5c] mb-4">{eyebrow}</p>
          )}
          <h2
            className="text-[clamp(42px,_6vw,_76px)] leading-[1.3] font-semibold text-black mb-[30px] max-w-2xl"
            style={{ textShadow: titleShadow }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-black mb-4 max-w-2xl">{subtitle}</p>
          )}
          <div className="space-y-5 text-black font-light max-w-4xl">
            {paragraphs.map((p, idx) => (
              <p className="text-base lg:text-lg lg:leading-9" key={idx}>{p}</p>
            ))}
          </div>
          {children}
        </div>

        <div className={reverse ? "order-1 md:order-2" : "lg:absolute lg:right-0 lg:bottom-0 lg:translate-x-[4.5vw]"}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -11.69, y: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: -11.69, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="w-full flex justify-center md:justify-end"
          >
            <div className="relative max-w-[420px] md:max-w-[520px]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto"
              />
              <span className="absolute inset-0 rounded-[32px] border border-white/40 pointer-events-none" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
