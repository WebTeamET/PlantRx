"use client";
import { containerVariants, itemScaleUpVariants, slideLeftVariantsFast, slideRightVariantsFast, slideUpVariants } from "@/animation/framerMotionVariants";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShopifyProduct } from "@/lib/shopify";

const leftLabels = [
  { text: "800mg Per <br/> Serving", svg: "/pointed-long-line.svg" },
  { text: "Plant-Based <br/> Formula", svg: "/pointed-short-line.svg" },
  { text: "Easy Daily <br/> Use", svg: "/pointed-short-line.svg" },
];

const rightLabels = [
  { text: "Nutrient-Dense <br/> Botanical", svg: "/pointed-long-line.svg" },
  { text: "Traditional <br/> Herbal Use", svg: "/pointed-short-line.svg" },
  { text: "Supports Daily <br/> Wellness", svg: "/pointed-short-line.svg" },
];

export default function SupplementIngredients({ product }: { product: ShopifyProduct }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const title = product.supplementKeyIngredients?.title || "Key Ingredients";
  const points = product.supplementKeyIngredients?.points || [
    "800mg Per <br/> Serving",
    "Plant-Based <br/> Formula",
    "Easy Daily <br/> Use",
    "Nutrient-Dense <br/> Botanical",
    "Traditional <br/> Herbal Use",
    "Supports Daily <br/> Wellness"
  ];

  const midPoint = Math.ceil(points.length / 2);
  const leftPoints = points.slice(0, midPoint).map((text: string, i: number) => ({
    text,
    svg: i === 0 ? "/pointed-long-line.svg" : "/pointed-short-line.svg"
  }));
  const rightPoints = points.slice(midPoint).map((text: string, i: number) => ({
    text,
    svg: i === 0 ? "/pointed-long-line.svg" : "/pointed-short-line.svg"
  }));

  return (
    <section className="key-ingredients-section relative overflow-hidden -mb-1">
      <div className="bg-green">
        <div
          ref={sectionRef}
          className="relative z-10 flex flex-col items-center pt-24 md:pt-32 2xl:pt-[189px] pb-9 gap-10 md:gap-14 xl:gap-20 new-container">
          <div className="title title-black title-stroke text-center">
            <motion.h2
              className="capitalize text-center supplement-pdp-heading"
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{ WebkitTextStroke: "clamp(2px, 0.7vw, 14px) #FFFFFF", color: "#000", willChange: "transform, opacity" }}
            >
              {title}
            </motion.h2>
          </div>

          <div className="relative z-[2] flex items-center justify-center w-full max-xl:flex-col max-xl:gap-12 ingredient-details-section xl:min-h-[670px]">
            <div className="absolute flex items-center w-full justify-between 2xl:max-w-[1377px] max-w-[1100px] z-[3]">
              <motion.div 
               variants={containerVariants as any}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.2 }}
              className="flex-col gap-10 xl:gap-20 items-start hidden xl:flex max-w-[534px] flex-1">
                {leftPoints.map((label: any, i: number) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 xl:gap-5"
                    variants={slideRightVariantsFast as any}
                  >
                    <div className="content content-white ">
                      <p className="font-semibold text-base xl:text-sm 2xl:text-[25px] 2xl:leading-8" dangerouslySetInnerHTML={{ __html: label.text }}></p>
                    </div>
                    <div className={`min-w-0 overflow-hidden shrink-0`}>
                      <img
                        src={label.svg}
                        height={12}
                        alt=""
                        aria-hidden="true"
                        className="w-full block"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div> 
              <motion.div 
               variants={containerVariants as any}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.2 }}
              className="flex-col gap-10 xl:gap-20 items-end hidden xl:flex max-w-[534px] flex-1">
                {rightPoints.map((label: any, i: number) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 xl:gap-5"
                    variants={slideLeftVariantsFast as any}
                  >
                    <div className={`min-w-0 overflow-hidden shrink-0`}>
                      <img
                        src={label.svg}
                        height={12} 
                        alt=""
                        aria-hidden="true"
                        className="w-full block -scale-x-100"
                      />
                    </div>
                    <div className="content content-white ">
                      <p className="font-semibold text-base xl:text-sm 2xl:text-[25px] 2xl:leading-8" dangerouslySetInnerHTML={{ __html: label.text }}></p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div className="w-full md:max-w-[39.9%] max-w-[80%] mx-auto aspect-square flex justify-center relative z-[2]">
              <div className="flex 2xl:pt-[94px] pt-12 relative w-full after:absolute after:top-1/2 after:-translate-y-1/2 after:w-full after:h-full after:bg-contain after:bg-[url(/supplement-bottle-green-bg.svg)] after:bg-center after:bg-no-repeat">
              <div className=" max-w-[49%] pl-[18px] mx-auto">
                <motion.img
                variants={itemScaleUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                style={{ willChange: "transform, opacity" }}
                  src={product.supplementKeyIngredients?.image || "/moringa-pure-bottle.png"}
                  width={2000}
                  height={2000}
                  alt={title}
                  className="object-contain w-full h-full relative z-[3]"
                />
              </div>
              </div>
            </div>

            <motion.div 
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 w-full xl:hidden">
              {[...leftPoints, ...rightPoints].map((label: any, i: number) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 justify-center"
                  variants={slideRightVariantsFast as any}
                >
                  <div className="content content-white">
                  <p className="font-semibold text-base xl:text-sm 2xl:text-[25px] 2xl:leading-8 text-center [&_br]:hidden" dangerouslySetInnerHTML={{ __html: label.text }}></p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
