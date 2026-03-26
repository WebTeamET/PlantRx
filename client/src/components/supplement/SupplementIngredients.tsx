"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";


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

export default function SupplementIngredients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section className="key-ingredients-section relative overflow-hidden -mb-1">
      <div className="bg-green">
        <div
          ref={sectionRef}
          className="relative z-10 flex flex-col items-center pt-10 md:pt-16 xl:pt-20 2xl:pt-[97px] pb-9 gap-10 md:gap-14 xl:gap-20 new-container">
          <div className="title title-black title-stroke text-center">
            <h2
              className="font-heading font-semibold capitalize text-center leading-[clamp(34px,6.3vw,133px)] text-[clamp(32px,5vw,120px)]"
              style={{ WebkitTextStroke: "clamp(2px,0.73vw,14px) #FFFFFF" }}
            >
              Key Ingredients
            </h2>
          </div>

          <div className="relative z-[2] flex items-center justify-center w-full max-xl:flex-col max-lg:gap-12 ingredient-details-section after:absolute after:top-1/2 after:-translate-y-1/2 after:aspect-square after:max-w-[39.9%] after:w-full after:bg-contain after:bg-[url(/supplement-bottle-green-bg.svg)] after:bg-center after:bg-no-repeat after:z-[1] after:left-1/2 after:-translate-x-1/2 max-xl:after:hidden">
            <div className=" flex-col gap-10 xl:gap-20 items-start
            hidden xl:flex relative z-[2] max-w-[31.9%]">
              {leftLabels.map((label, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 xl:gap-5"
                >
                  <div className="content content-white ">
                    <p className="font-semibold text-base xl:text-sm 2xl:text-[25px] 2xl:leading-[100%]" dangerouslySetInnerHTML={{ __html: label.text }}></p>
                  </div>
                  <div className={`min-w-0 overflow-hidden shrink-0`}>
                    <img
                      src={label.svg}
                      height={12}
                      alt=""
                      aria-hidden="true"
                      className="w-full block max-2xl:w-[172px]"
                    />
                  </div>
                </div>
              ))}
            </div> 

            <div className="xl:w-[18.7%] w-full flex justify-center relative z-[2] xl:ml-[30px] xl:pt-[55px]">
              <div className="relative w-full after:absolute after:top-1/2 after:-translate-y-1/2 after:w-full after:h-full after:bg-contain after:bg-[url(/supplement-bottle-green-bg.svg)] after:bg-center after:bg-no-repeat xl:after:hidden">
              <div className="max-xl:ml-[30px] max-md:ml-3">
                <img
                  src="/moringa-pure-bottle.png"
                  width={2000}
                  height={2000}
                  alt="Moringa Pure Capsules supplement bottle"
                  className="object-contain w-full h-full max-xl:max-w-[40%] mx-auto relative z-[3]"
                />
              </div>
              </div>
            </div>

            <div className="flex-col gap-10 xl:gap-20 items-end
            hidden xl:flex relative z-[2] max-w-[31.9%]">
              {rightLabels.map((label, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 xl:gap-5"
                >
                  <div className={`min-w-0 overflow-hidden shrink-0`}>
                    <img
                      src={label.svg}
                      height={12} 
                      alt=""
                      aria-hidden="true"
                      className="w-full block max-2xl:w-[172px]  -scale-x-100"
                    />
                  </div>
                  <div className="content content-white ">
                    <p className="font-semibold text-base xl:text-sm 2xl:text-[25px] 2xl:leading-[100%]" dangerouslySetInnerHTML={{ __html: label.text }}></p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 w-full xl:hidden md:mt-10 mt-7">
              {[...leftLabels, ...rightLabels].map((label, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                >
                  <div className="content content-white">
                  <p className="font-semibold text-base xl:text-sm 2xl:text-[25px] 2xl:leading-[100%] text-center [&_br]:hidden" dangerouslySetInnerHTML={{ __html: label.text }}></p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
