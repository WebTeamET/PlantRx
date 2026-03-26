"use client";
import { slideUpVariants, slideUpVariantsFast } from "@/animation/framerMotionVariants";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const productMeta = [
  { icon: "/quantity_icon.svg", label: "Quantity: 60 Capsules" },
  { icon: "/manufactured_icon.svg", label: "Manufacturer Country: USA" },
  { icon: "/weight_icon.svg", label: "Gross Weight: 0.25 lb (113 g)" },
];

const avoidCards = [
  {
    icon: "/pregnant_icon.svg",
    label: "Pregnant or nursing individuals",
  },
  {
    icon: "/child_icon.svg",
    label: "Children under 18 years of age",
  },
];

const safetyNotes = [
  "Keep out of reach of children",
  "Do not use if the safety seal is damaged or missing",
  "Store in a cool, dry place",
];

export default function SupplementWhoAvoid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section className="who-avoid-section relative overflow-hidden -mt-1">
      <div className="bg-green">
        <div className="new-container py-10 lg:py-16 xl:py-20 2xl:py-[110px]">
          <div ref={sectionRef} className="max-w-[1185px] mx-auto">
            <motion.div
              className="title title-black title-stroke flex justify-center mb-5 xl:mb-[30px]"
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{ willChange: "transform, opacity" }}
            >
              <h2
                className="supplement-pdp-heading text-center"
                style={{ WebkitTextStroke: "clamp(2px,0.73vw,12px) #FFFFFF" }}
              >
                Who Should Avoid It
              </h2>
            </motion.div>

            <motion.div
              className="content content-white flex justify-center mb-7 xl:mb-[60px]"
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{ willChange: "transform, opacity" }}
            >
              <p className="text-center 2xl:text-3xl 2xl:leading-[50px] capitalize font-normal max-w-[1110px] mx-auto">
                Do not exceed the recommended daily intake. Food supplements should
                not be used as a substitute for a varied diet and healthy lifestyle.
              </p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-5 mb-10 xl:mb-[90px] 2xl:py-[30px] md:py-5 py-3 border-y border-white 2xl:mx-2.5"
              variants={slideUpVariantsFast as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {productMeta.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2"
                    variants={slideUpVariantsFast as any}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <img
                      src={item.icon}
                      width={25}
                      height={25}
                      alt={item.label}
                      className="flex-none"
                    />
                    <div className="content content-white">
                      <p className="text-sm lg:text-base xl:text-xl leading-[1.5] capitalize whitespace-nowrap">
                        {item.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 grid-cols-1 justify-center gap-5 xl:gap-[29px] mb-10 xl:mb-[71px]">
              {avoidCards.map((card, i) => (
                <motion.div
                  key={i}
                  className="flex items-center max-2xl:gap-1 bg-[#c2a058] border-2 md:border-4 border-black rounded-[10px] md:p-4 p-3 w-full md:w-auto"
                  variants={slideUpVariantsFast as any}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <img
                    src={card.icon}
                    width={400}
                    height={400}
                    alt={card.label}
                    className="flex-none size-14 lg:size-20 2xl:size-[122px]"
                  />
                  <div className="content content-white">
                    <p className="text-base lg:text-lg xl:text-xl 2xl:text-[27px] 2xl:leading-[41px] font-semibold">
                      {card.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 max-md:flex-col max-md:items-start"
            variants={slideUpVariantsFast as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ willChange: "transform, opacity" }}
          >
            {safetyNotes.map((note, i) => (
              <div key={i} className="flex items-center gap-1">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M5 16.125L8.92875 20.625L18.75 9.375M25 9.45375L14.285 20.7037L13.75 20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <div className="content content-white">
                  <p className="text-sm lg:text-base xl:text-xl leading-[1.5] capitalize">
                    {note}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="w-full pointer-events-none rotate-180 -scale-x-100 -mt-1">
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
