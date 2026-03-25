"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const productMeta = [
  { icon: "/icon-quantity.svg", label: "Quantity: 60 Capsules" },
  { icon: "/icon-manufacturer.svg", label: "Manufacturer Country: USA" },
  { icon: "/icon-weight.svg", label: "Gross Weight: 0.25 lb (113 g)" },
];

const avoidCards = [
  {
    icon: "/icon-pregnant.svg",
    label: "Pregnant or nursing individuals",
  },
  {
    icon: "/icon-child.svg",
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
    <section className="who-avoid-section relative overflow-hidden">
      <div className="bg-green">
        <div ref={sectionRef} className="new-container py-16 lg:py-20 xl:py-24 2xl:py-[110px]">
          <motion.div
            className="title title-black title-stroke flex justify-center mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2
              className="font-heading font-semibold capitalize text-[clamp(40px,6.25vw,120px)] leading-[1.11] text-center"
              style={{ WebkitTextStroke: "clamp(2px,0.73vw,14px) #FFFFFF" }}
            >
              Who Should Avoid It
            </h2>
          </motion.div>

          <motion.div
            className="content content-white flex justify-center mb-8 lg:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <p className="text-center text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-[1.67] capitalize max-w-4xl">
              Do not exceed the recommended daily intake. Food supplements should
              not be used as a substitute for a varied diet and healthy lifestyle.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-5 mb-10 lg:mb-14"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="who-avoid-divider" />

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {productMeta.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: "easeOut" }}
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
            <div className="who-avoid-divider" />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-5 lg:gap-8 mb-10 lg:mb-14">
            {avoidCards.map((card, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-5 bg-[#c2a058] border-4 border-black rounded-xl p-5
    max-w-full md:max-w-[540px] w-full md:w-auto"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.15, ease: [0.33, 1, 0.68, 1] }}
              >
                <img
                  src={card.icon}
                  width={80}
                  height={80}
                  alt={card.label}
                  className="flex-none"
                />
                <div className="content content-white">
                  <p className="text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold leading-[1.5] capitalize">
                    {card.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            {safetyNotes.map((note, i) => (
              <div key={i} className="flex items-center gap-2">
                <img
                  src="/icon-check-read.svg"
                  width={22}
                  height={22}
                  alt="check"
                  className="flex-none"
                />
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
      <div className="w-full pointer-events-none rotate-180">
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
