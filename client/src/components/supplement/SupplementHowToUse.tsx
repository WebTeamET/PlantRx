"use client";
import { containerVariants, itemScaleUpVariants, slideRightVariants, slideRightVariantsFast, slideUpVariants } from "@/animation/framerMotionVariants";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ShopifyProduct } from "@/lib/shopify";

export default function SupplementHowToUse({ product }: { product: ShopifyProduct }) {
  const title = product.howToUse?.title || "How To Use";
  const rawDescription = product.howToUse?.description;
  const descriptionParagraphs = rawDescription 
    ? rawDescription.split('\n').filter((p: string) => p.trim() !== '')
    : [
        "Take two capsules once per day with water.",
        "For best results, it is often recommended to take capsules before a meal or as directed by a healthcare professional."
      ];

  return (
    <section className="how-to-use-section relative overflow-hidden lg:pt-[110px] lg:-mt-[110px] max-lg:flex flex-col items-center -mt-0.5">
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
      <div className="rotate-[23.1deg] static lg:absolute pointer-events-none -left-[13%] top-[53%] lg:-translate-y-1/2 max-w-[80%] md:max-w-[45%] xl:max-w-[49%] min-[1921px]:max-w-[50%] w-full h-auto z-[2]">
        <div className="origin-top-left">
          <div className="relative">
            <motion.img
            variants={slideRightVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ willChange: "transform, opacity" }}
              src={product.howToUse?.image || "/how-to-use-bottle.png"}
              width={2000}
              height={2000}
              alt={`${title} decoration`}
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
                {title}
              </motion.h2>
            </div>

            <motion.div 
            variants={slideUpVariants as any}
            className="content content-black">
              {descriptionParagraphs.map((para: string, idx: number) => (
                <p key={idx} className={`2xl:text-[30px] 2xl:leading-[50px] capitalize ${idx > 0 ? "mt-5 xl:mt-[30px]" : ""}`}>
                  {para}
                </p>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>
      <div className="w-full pointer-events-none relative z-[2] -mb-1">
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
