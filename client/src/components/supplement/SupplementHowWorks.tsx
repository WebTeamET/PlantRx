"use client";
import { SplitText } from "@/utils/SplitText";
import { motion, useInView } from "framer-motion";

export default function SupplementHowWorks() {
  return (
    <section className="how-it-works-section relative overflow-hidden bg-white w-full">
      <div
        className="flex new-container !pr-0 items-center max-lg:flex-col max-lg:gap-10"
      >

        <div className="flex flex-col gap-[clamp(20px,2.6vw,50px)] max-w-[765px] xl:max-w-[39.84vw] flex-shrink-0">
          <div className="title title-black">
            <h2 className="font-heading font-semibold capitalize text-[clamp(32px,6.25vw,120px)] leading-[clamp(34px,7.3vw,133px)]">
            <SplitText text="How It Works" />
            </h2>
          </div>

          <motion.div
            className="content content-black"
          >
            <p className="text-[clamp(13px,1.04vw,20px)] leading-[2] capitalize">
              Moringa leaves naturally contain compounds such as{" "}
              <strong>polyphenols, flavonoids, vitamins, and minerals</strong>{" "}
              that contribute to the plant's nutritional value.
            </p>

            <p className="text-[clamp(13px,1.04vw,20px)] leading-[2] capitalize mt-[clamp(16px,2.08vw,40px)]">
              These compounds are associated with antioxidant properties that
              help protect the body's cells from oxidative stress caused by
              environmental factors and everyday metabolic processes.
            </p>

            <p className="text-[clamp(13px,1.04vw,20px)] leading-[2] capitalize mt-[clamp(16px,2.08vw,40px)]">
              Because moringa leaves contain a wide variety of nutrients, they
              are often included in wellness routines to support general health
              and vitality.
            </p>
          </motion.div>
        </div>
        <div className="flex-1 flex justify-end items-center overflow-hidden max-lg:w-full max-lg:justify-center max-lg:overflow-visible">
          <motion.div
            className="relative overflow-hidden w-full flex-shrink-0"
          >
            <img
              src="/how-it-works-bottle.png"
              width={1044}
              height={1055}
              alt="Moringa Pure Capsules supplement bottle with leaves and capsules"
              className="block w-full h-full object-contain"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
