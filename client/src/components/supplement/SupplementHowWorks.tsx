"use client";
import { itemScaleUpVariants, slideUpVariants } from "@/animation/framerMotionVariants";
import { SplitText } from "@/utils/SplitText";
import { motion } from "framer-motion";
import { ShopifyProduct } from "@/lib/shopify";

export default function SupplementHowWorks({ product }: { product: ShopifyProduct }) {
  return (
    <section className="how-it-works-section relative overflow-hidden bg-white w-full max-lg:py-10">
      <div
        className="flex new-container 2xl:!pr-16 items-center max-lg:flex-col 2xl:gap-[55px] md:gap-10 gap-7"
      >
        <div className="flex flex-col gap-5 xl:gap-[30px] 2xl:gap-[50px] w-full lg:w-1/2 xl:max-w-[39.84vw] flex-shrink-0">
          <div className="title title-black">
            <motion.h2 
             variants={slideUpVariants as any}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
             style={{ willChange: "transform, opacity" }}
            className="capitalize! supplement-pdp-heading">
            How It Works
            </motion.h2>
          </div>
          <motion.div
            className="content content-black 2xl:space-y-[30px] space-y-5"
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ willChange: "transform, opacity" }}
          >
            <p className="xl:text-xl xl:leading-10 text-base leading-6 capitalize">
              Moringa leaves naturally contain compounds such as{" "}
              <strong>polyphenols, flavonoids, vitamins, and minerals</strong>{" "}
              that contribute to the plant's nutritional value.
            </p>
            <p className="xl:text-xl xl:leading-10 text-base leading-6 capitalize">
              These compounds are associated with antioxidant properties that
              help protect the body's cells from oxidative stress caused by
              environmental factors and everyday metabolic processes.
            </p>
            <p className="xl:text-xl xl:leading-10 text-base leading-6 capitalize">
              Because moringa leaves contain a wide variety of nutrients, they
              are often included in wellness routines to support general health
              and vitality.
            </p>
          </motion.div>
        </div>
        <div className="flex-1 flex justify-end items-center overflow-hidden max-lg:w-full max-lg:justify-center max-lg:overflow-visible">
          <div className="relative overflow-hidden w-full flex-shrink-0 max-lg:max-w-[80%] max-sm:max-w-[90%]">
            <motion.img
             variants={itemScaleUpVariants as any}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
             style={{ willChange: "transform, opacity" }}
              src="/how-works-banner.png"
              width={2000}
              height={2000}
              alt="Moringa Pure Capsules supplement bottle with leaves and capsules"
              className="block w-full h-full object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
