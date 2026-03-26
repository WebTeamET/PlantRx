"use client";
import { containerVariants, itemScaleUpVariants, slideRightVariants, slideRightVariantsFast, slideUpVariants } from "@/animation/framerMotionVariants";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function SupplementHowToUse() {
  return (
    <section className="how-to-use-section relative overflow-hidden lg:pt-[110px] lg:-mt-[110px] max-lg:flex flex-col items-center">
      <div className="relative w-full pointer-events-none rotate-180 -scale-x-100 -mt-1">
        <img
          src="/supplement-wave-pattern.svg"
          width={1920}
          height={152}
          alt=""
          aria-hidden="true"
          className="w-full block"
        />
      </div>
      <div className="rotate-[23.1deg] static lg:absolute pointer-events-none -left-[17%] top-[55%] lg:-translate-y-1/2 max-w-[80%] md:max-w-[58.3%] min-[1921px]:max-w-[50%] w-full h-auto z-[2]">
        <div className="origin-top-left">
          <div className="relative">
            <motion.img
            variants={slideRightVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ willChange: "transform, opacity" }}
              src="/how-to-use-bottle.png"
              width={2000}
              height={2000}
              alt="Moringa Pure supplement bottle with moringa leaves"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
      <div className="new-container flex items-stretch lg:justify-end gap-5 relative z-[1]">
        <div
          className="relative z-10 flex justify-end max-md:pb-10 pb-10 xl:pb-[68px] lg:pt-[20%] 2xl:pt-[24%]">
          <motion.div
            className="flex flex-col 
              w-full lg:max-w-[560px] xl:max-w-[655px] gap-5 xl:gap-7 2xl:gap-[50px]"
              variants={containerVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
          >
            <div className="title title-black">
              <motion.h2 
              variants={slideUpVariants as any}
              className="supplement-pdp-heading">
                How To Use
              </motion.h2>
            </div>

            <motion.div 
            variants={slideUpVariants as any}
            className="content content-black">
              <p className="2xl:text-[30px] 2xl:leading-[50px] capitalize">
                Take two capsules once per day with water.
              </p>
              <p className="2xl:text-[30px] 2xl:leading-[50px] capitalize mt-5 xl:mt-[30px]">
                For best results, it is often recommended to take capsules before a meal or as directed by a healthcare professional.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </div>
      <div className="w-full pointer-events-none relative z-[2]">
        <img
          src="/supplement-wave-pattern.svg"
          width={2000}
          height={152}
          alt=""
          aria-hidden="true"
          className="w-full block"
        />
      </div>
    </section>
  );
}
