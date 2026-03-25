"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const badges = [
  { icon: "/quality-icon-gluten.png",     label: "GLUTEN FREE",     offsetY: 44 },
  { icon: "/quality-icon-veg.png",       label: "VEGETARIAN",      offsetY: 4  }, 
  { icon: "/quality-icon-lactose.png",     label: "LACTOSE FREE",    offsetY: 78 },
  { icon: "/quality-icon-allergen.png",    label: "ALLERGEN FREE",   offsetY: 0  },
  { icon: "/quality-icon-hormone.png",     label: "HORMONE FREE",    offsetY: 78 },
  { icon: "/quality-icon-natural-sup.png",          label: "100% NATURAL",    offsetY: 4  },
  { icon: "/quality-icon-antibiotic.png",  label: "ANTIBIOTIC FREE", offsetY: 63 },
  { icon: "/quality-icon-corn.png",        label: "CORN FREE",       offsetY: 4  },
  { icon: "/quality-icon-vegan-sup.png",            label: "VEGAN",           offsetY: 73 },
]; 

export default function SupplementQualityStandards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(true);

  const updateNavigationState = (swiper: SwiperType) => {
    setCanSlidePrev(!swiper.isBeginning);
    setCanSlideNext(!swiper.isEnd);
  };

  return (
    <section className="quality-standards-section relative overflow-hidden">
      <div className="w-full pointer-events-none">
        <img
          src="/supplement-wave-pattern.svg"
          width={2000} 
          height={152}
          alt=""
          aria-hidden="true"
          className="w-full block"
        />
      </div>
      <div className="bg-green">
        <div
          ref={sectionRef}
          className="flex flex-col gap-10 md:gap-20 xl:gap-[150px] new-container py-10 lg:py-16 xl:py-20 2xl:py-[132px]">
          <motion.div
            className="title title-black title-stroke"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2
              className="font-heading font-medium capitalize text-[clamp(36px,6.25vw,120px)] leading-[1.11] max-lg:text-center"
              style={{ WebkitTextStroke: "clamp(2px,0.73vw,14px) #FFFFFF" }}
            >
              Quality &amp; Standards
            </h2>
          </motion.div>

          <div className="hidden lg:flex items-start justify-between pb-24 xl:pb-28 2xl:pb-32">
            {badges.map((badge, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-5"
                initial={{ opacity: 0, y: badge.offsetY + 30 }}
                animate={isInView ? { opacity: 1, y: badge.offsetY } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease: [0.33, 1, 0.68, 1] }}
              >
                <img
                  src={badge.icon}
                  width={100}
                  height={100}
                  alt={badge.label}
                  className="block w-16 xl:w-20 2xl:w-[100px] flex-none"
                />
                <div className="content content-white">
                  <p className="text-xs xl:text-sm 2xl:text-xl font-normal text-center whitespace-nowrap">
                    {badge.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:hidden">
            <Swiper
              spaceBetween={24}
              slidesPerView={2}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                },
              }}
              onSwiper={(swiper) => {
                setSwiperInstance(swiper);
                updateNavigationState(swiper);
              }}
              onSlideChange={updateNavigationState}
              onResize={updateNavigationState}
            >
              {badges.map((badge, i) => (
                <SwiperSlide key={badge.label}>
                  <motion.div
                    className="flex flex-col items-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: "easeOut" }}
                  >
                    <img
                      src={badge.icon}
                      width={100}
                      height={100}
                      alt={badge.label}
                      className="block w-14 md:w-16 flex-none"
                    />
                    <div className="content content-white">
                      <p className="text-xs md:text-sm font-normal text-center">
                        {badge.label}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="quality-standards-nav md:mt-16 mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous quality standard"
                onClick={() => swiperInstance?.slidePrev()}
                disabled={!canSlidePrev}
                className="flex size-8 md:size-10 !min-h-fit !min-w-fit items-center justify-center rounded-full bg-white text-[#385127] transition-opacity disabled:pointer-events-none disabled:opacity-45"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next quality standard"
                onClick={() => swiperInstance?.slideNext()}
                disabled={!canSlideNext}
                className="flex size-8 md:size-10 !min-h-fit !min-w-fit items-center justify-center rounded-full bg-white text-[#385127] transition-opacity disabled:pointer-events-none disabled:opacity-45"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
