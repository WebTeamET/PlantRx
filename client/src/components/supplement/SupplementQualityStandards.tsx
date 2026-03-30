"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { slideUpVariants } from "@/animation/framerMotionVariants";
import { ShopifyProduct } from "@/lib/shopify";

const badges = [
  { icon: "/quality-icon-gluten.png", label: "GLUTEN FREE", offsetY: 44 },
  { icon: "/quality-icon-veg.png", label: "VEGETARIAN", offsetY: 0 },
  { icon: "/quality-icon-lactose.png", label: "LACTOSE FREE", offsetY: 78 },
  { icon: "/quality-icon-allergen.png", label: "ALLERGEN FREE", offsetY: 0 },
  { icon: "/quality-icon-hormone.png", label: "HORMONE FREE", offsetY: 78 },
  { icon: "/quality-icon-natural-sup.png", label: "100% NATURAL", offsetY: 0 },
  { icon: "/quality-icon-antibiotic.png", label: "ANTIBIOTIC FREE", offsetY: 63 },
  { icon: "/quality-icon-corn.png", label: "CORN FREE", offsetY: 0 },
  { icon: "/quality-icon-vegan-sup.png", label: "VEGAN", offsetY: 73 },
];

export default function SupplementQualityStandards({ product }: { product: ShopifyProduct }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(true);

  const updateNavigationState = (swiper: SwiperType) => {
    setCanSlidePrev(!swiper.isBeginning);
    setCanSlideNext(!swiper.isEnd);
  };

  return (
    <section className="quality-standards-section relative overflow-hidden -mt-0.5">
      <div className="bg-green">
        <div
          ref={sectionRef}
          className="flex flex-col gap-10 md:gap-20 xl:gap-[150px] new-container py-10 lg:py-16 xl:py-20 2xl:py-[132px]">
          <motion.div
            className="title title-black title-stroke"
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ willChange: "transform, opacity" }}
          >
            <h2
              className="capitalize supplement-pdp-heading max-xl:text-center"
              style={{ WebkitTextStroke: "clamp(2px,0.73vw,10px) #FFFFFF" }}
            >
              Quality &amp; Standards
            </h2>
          </motion.div>
          <div className="hidden xl:flex items-start justify-between pb-24 xl:pb-28 2xl:pb-[82px] xl:gap-5 gap-3 ">
            {badges.map((badge, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-5 shrink"
                initial={{ opacity: 0, y: badge.offsetY + 30 }}
                animate={isInView ? { opacity: 1, y: badge.offsetY } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease: [0.33, 1, 0.68, 1] }}
              >
                <img
                  src={badge.icon}
                  width={100}
                  height={100}
                  alt={badge.label}
                  className="block w-16 min-[1800px]:!w-[100px] min-h-16 min-[1800px]:!min-h-[100px] flex-none"
                />
                <div className="content content-white">
                  <p className="text-sm 2xl:text-xl 2xl:leading-[100%] font-normal text-center whitespace-nowrap">
                    {badge.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="xl:hidden">
            <Swiper
              spaceBetween={24}
              slidesPerView={2}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 5,
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
