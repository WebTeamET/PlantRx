"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SupplementHowToUse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section className="how-to-use-section relative overflow-hidden bg-white">

      {/* Bottle + moringa leaves — absolute, rotated 23.1°, bleeds past top & left edges */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ left: "-6.09%", top: "-13.21%", width: "80.56%" }}
        initial={{ opacity: 0, x: -80 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="rotate-[23.1deg] origin-top-left">
          <div className="relative" style={{ aspectRatio: "1066/1442" }}>
            <img
              src="/how-to-use-bottle.png"
              width={1066}
              height={1442}
              alt="Moringa Pure supplement bottle with moringa leaves"
              className="absolute h-[120.22%] max-w-none top-[-11.01%] w-[108.45%]"
              style={{ left: "-3.77%" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Text content — right side */}
      <div
        ref={sectionRef}
        className="relative z-10 flex justify-end
          px-5 md:px-10 lg:px-20 xl:px-24 2xl:px-[271px]
          py-20 md:py-28 lg:py-36 xl:py-44 2xl:py-52"
      >
        <motion.div
          className="flex flex-col gap-8 lg:gap-10 xl:gap-12
            w-full max-w-[360px] md:max-w-[480px] lg:max-w-[560px] xl:max-w-[655px]"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
        >

          <div className="title title-black">
            <h2 className="font-heading font-semibold capitalize text-[clamp(40px,6.25vw,120px)] leading-[1.11]">
              How To Use
            </h2>
          </div>

          <div className="content content-black">
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-[1.67] capitalize">
              Take two capsules once per day with water.
            </p>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-[1.67] capitalize mt-4 md:mt-5 lg:mt-6 xl:mt-8">
              For best results, it is often recommended to take capsules before a meal or as directed by a healthcare professional.
            </p>
          </div>

        </motion.div>
      </div>

    </section>
  );
}
