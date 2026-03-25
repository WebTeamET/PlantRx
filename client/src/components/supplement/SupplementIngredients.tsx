"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/*
  Left labels:  [text] → [line -scale-x-100]  — dot flipped to RIGHT (near circle), rows LEFT-aligned
  Right labels: [line] → [text]                — dot at LEFT (near circle), rows RIGHT-aligned

  Line width: flex-1 + max-w-[323px] (long) / max-w-[171px] (short)
  → at full desktop width matches Figma exactly; shrinks gracefully on smaller viewports
*/

const leftLabels = [
  { text: "800mg Per Serving",   svg: "/pointed-long-line.svg",  lineClass: "max-w-[323px]" },
  { text: "Plant-Based Formula", svg: "/pointed-short-line.svg", lineClass: "max-w-[171px]" },
  { text: "Easy Daily Use",      svg: "/pointed-short-line.svg", lineClass: "max-w-[171px]" },
];

const rightLabels = [
  { text: "Nutrient-Dense Botanical", svg: "/pointed-long-line.svg",  lineClass: "max-w-[323px]" },
  { text: "Traditional Herbal Use",   svg: "/pointed-short-line.svg", lineClass: "max-w-[171px]" },
  { text: "Supports Daily Wellness",  svg: "/pointed-short-line.svg", lineClass: "max-w-[171px]" },
];

export default function SupplementIngredients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section className="key-ingredients-section relative overflow-hidden ">
      <div className="bg-green">
      <div
        ref={sectionRef}
        className="relative z-10 flex flex-col items-center
          py-10 md:py-16 lg:py-20 xl:py-24 2xl:py-28
          gap-10 md:gap-14 xl:gap-20"
      >

        {/* ── Title ── */}
        <div className="title title-black title-stroke text-center">
          <h2
            className="font-heading font-semibold capitalize text-center leading-[1.11] text-[clamp(36px,6.25vw,120px)]"
            style={{ WebkitTextStroke: "clamp(2px,0.73vw,14px) #FFFFFF" }}
          >
            Key Ingredients
          </h2>
        </div>

        {/* ── Main row: left labels | circle+bottle | right labels ── */}
        <div className="relative flex items-center w-full
          px-5 md:px-10 lg:px-16 xl:px-20 2xl:px-[271px]
          max-lg:flex-col max-lg:gap-12">

          {/* ── Left labels — desktop only ── */}
          <div className="flex-none flex-col gap-10 xl:gap-20 items-start
            hidden lg:flex
            w-[38.6%] max-w-[532px]">
            {leftLabels.map((label, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: "easeOut" }}
              >
                {/* Text — fixed size, no shrink */}
                <div className="content content-white flex-none">
                  <p className="font-semibold text-[clamp(14px,1.3vw,25px)] leading-normal">{label.text}</p>
                </div>
                {/* Line — capped at Figma width; dot flipped to right (near circle) */}
                <div className={`flex-1 min-w-0 overflow-hidden ${label.lineClass}`}>
                  <img
                    src={label.svg}
                    height={12}
                    alt=""
                    aria-hidden="true"
                    className="w-full block -scale-x-100"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Center: green circle bg + bottle ── */}
          <div className="flex-none w-full lg:w-[22.7%] flex justify-center">
            <motion.div
              className="relative w-full max-w-[420px] lg:max-w-none lg:w-[670px]"
              style={{ aspectRatio: "1" }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            >
              {/* Single SVG: radial gradient fill + 4 concentric ring strokes */}
              <img
                src="/bottle-green-bg.svg"
                width={670}
                height={670}
                alt="Key ingredients circular diagram"
                className="absolute inset-0 w-full h-full"
              />

              {/* Bottle — Figma: 313×538px at left:194px top:94px within 670px circle */}
              <motion.div
                className="absolute overflow-hidden"
                style={{ left: "28.96%", top: "14.03%", width: "46.72%", height: "80.3%" }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
              >
                <img
                  src="/ingr-bottle.png"
                  width={432}
                  height={647}
                  alt="Moringa Pure Capsules supplement bottle"
                  className="absolute h-[120.22%] max-w-none top-[-11.01%] w-[137.89%]"
                  style={{ left: "-24.84%" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right labels — desktop only ── */}
          <div className="flex-none flex-col gap-10 xl:gap-20 items-end
            hidden lg:flex
            w-[38.6%] max-w-[532px]">
            {rightLabels.map((label, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: "easeOut" }}
              >
                {/* Line — original orientation, dot at LEFT (near circle) */}
                <div className={`flex-1 min-w-0 overflow-hidden ${label.lineClass}`}>
                  <img
                    src={label.svg}
                    height={12}
                    alt=""
                    aria-hidden="true"
                    className="w-full block"
                  />
                </div>
                {/* Text — fixed size, no shrink */}
                <div className="content content-white flex-none">
                  <p className="font-semibold text-[clamp(14px,1.3vw,25px)] leading-normal">{label.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Mobile labels (below lg) ── */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 w-full lg:hidden">
            {[...leftLabels, ...rightLabels].map((label, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: "easeOut" }}
              >
                <div className="flex-none w-8 overflow-hidden">
                  <img
                    src="/pointed-short-line.svg"
                    height={12}
                    alt=""
                    aria-hidden="true"
                    className="w-full block"
                  />
                </div>
                <div className="content content-white">
                  <p className="font-semibold text-sm leading-normal">{label.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      </div>
      <div className="relative -mt-0.5 w-full pointer-events-none z-20 rotate-180">
        <img
          src="/supplement-wave-pattern.svg"
          width={1920}
          height={152}
          alt=""
          aria-hidden="true"
          className="w-full block"
        />
      </div>
    </section>
  );
}
