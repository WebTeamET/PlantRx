"use client";

import { motion, useAnimationControls, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode, useEffect, useState, useMemo } from "react";
import { ShopifyProduct } from "@/lib/shopify";
import BenefitDecorationLeft from "./BenefitDecorationLeft";
import BenefitDecorationRight from "./BenefitDecorationRight";
import { slideUpVariants } from "@/animation/framerMotionVariants";

interface StripBenefitsProps {
  product?: ShopifyProduct;
}

interface BenefitItem {
  title: ReactNode;
  accent: string;
  rightAccent: string;
  align: "left" | "right";
}

const SHAPE_MASK_DATA_URI = encodeURIComponent(`
<svg width="874" height="669" viewBox="0 0 874 669" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M854.104 656.374C771.692 657.813 771.761 661.737 689.387 663.175C606.971 664.613 607.012 666.977 524.64 668.415C442.268 669.852 441.753 642.812 359.38 644.25C276.966 645.688 276.879 640.724 194.464 642.163C112.049 643.601 112.053 643.838 29.6383 645.276C21.8561 645.412 10.214 646.182 9.92103 629.4C7.44213 487.384 15.4795 487.243 13.0015 345.275C10.5234 203.307 2.48519 203.4 0.00628654 61.3844C-0.28666 44.6015 11.1451 31.7756 18.9273 31.6397C101.342 30.2012 101.545 41.7837 183.917 40.3459C266.289 38.908 265.798 8.36733 348.171 6.92951C430.544 5.49169 430.851 20.6664 513.223 19.2286C595.596 17.7908 595.563 13.488 677.978 12.0494C760.395 10.6108 760.235 1.43934 842.647 0.000845231C850.427 -0.134964 863.026 29.4851 863.319 46.3152C865.798 188.331 851.897 188.574 854.375 330.542C856.853 472.51 871.311 472.305 873.789 614.274C874.082 631.057 861.928 656.191 854.147 656.327L854.104 656.327Z" fill="#643A3D"/>
</svg>`);

export default function StripBenefits({ product }: StripBenefitsProps) {
  const hardcodedBenefits: BenefitItem[] = [
    {
      title: (<>Focus And<br />Clarity Support</>),
      accent: "/float-mushroom-new.png",
      rightAccent: "/float-mushroom-new.png",
      align: "left",
    },
    {
      title: "Cognitive Performance",
      accent: "/float-mushroom-2.png",
      rightAccent: "/float-mushroom-2.png",
      align: "right",
    },
    {
      title: "Steady Mental Energy",
      accent: "/float-mushroom-new.png",
      rightAccent: "/float-mushroom-new.png",
      align: "left",
    },
  ];

  const benefits = useMemo(() => {
    const list = product?.benefitsMeta?.benefits_list;
    if (!list || !Array.isArray(list) || list.length === 0) return hardcodedBenefits;

    return list.map((node: any, i: number) => {
      const fallback = hardcodedBenefits[i % hardcodedBenefits.length];
      const titleText = node.benefit_text || node.title || "";
      const iconUrl = node.left_image || node.right_image || node.icon || node.image || fallback.accent;

      return {
        title: titleText ? <span dangerouslySetInnerHTML={{ __html: titleText.replace(/\n/g, '<br />') }} /> : fallback.title,
        accent: node.left_image || iconUrl,
        rightAccent: node.right_image || iconUrl,
        align: (i % 2 === 0) ? "left" : "right",
      } as BenefitItem;
    });
  }, [product]);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const { scrollYProgress: runnerProgress } = useScroll({
    target: cardsRef,
    offset: ["start 20%", "end end"], 
  });

  const PATH_DEF = useMemo(() => {
    if (benefits.length <= 1) return "M 840 370";
    let path = "M 840 370";
    let currentY = 370;
    for (let i = 1; i < benefits.length; i++) {
      const x = i % 2 === 1 ? 140 : 840;
      const yStep = i === benefits.length - 1 ? 860 : 650;
      currentY += yStep;
      path += ` L ${x} ${currentY}`;
    }
    return path;
  }, [benefits.length]);

  const rawProgress = useTransform(runnerProgress, [0, 1], [0, 100]);
  const smoothProgress = useSpring(rawProgress, { stiffness: 80, damping: 25, mass: 0.1 });
  const pathProgress = useTransform(smoothProgress, (v) => `${v}%`);
  const stripRotate = useTransform(smoothProgress, [0, 50, 100], [1.63, 10.04, 1.63]);

  const [mobileContainerHeight, setMobileContainerHeight] = useState(800);
  const [mobileStartPos, setMobileStartPos] = useState(250);

  useEffect(() => {
    const update = () => {
      if (cardsRef.current) setMobileContainerHeight(cardsRef.current.offsetHeight);
      if (firstCardRef.current) {
        const cardHeight = firstCardRef.current.offsetHeight;
        setMobileStartPos(cardHeight - 30);
      }
    };
    const timer = setTimeout(update, 100);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(timer);
    };
  }, [benefits]);

  const mobileYRaw = useTransform(runnerProgress, [0, 1], [mobileStartPos, mobileContainerHeight]);
  const mobileYSpring = useSpring(mobileYRaw, { stiffness: 100, damping: 30, mass: 0.1 });
  const mobileStripRotate = useTransform(runnerProgress, [0, 0.5, 1], [1.63, 10.04, 1.63]);
  const mushroomControls = useAnimationControls();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    mushroomControls.start("popIn");
  }, [mushroomControls]);

  return (
    <section
      ref={sectionRef}
      className="strip-benefits-section relative overflow-hidden pt-[50px] pb-[100px] lg:pt-[120px] md:pb-[150px]"
    >
      <style>{`
        @keyframes floatSway {
          0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
          40%  { transform: translate3d(0px, -8px, 0) rotate(-2deg); }
          70%  { transform: translate3d(0px, 6px, 0) rotate(2deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-md:mb-5 mb-[120px]">
          <motion.h2
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="pdp-title-style text-black dark:text-black font-semibold"
            style={{
              textShadow: `0 0.5vw 0 #fff, 0 -0.5vw 0 #fff, 0.5vw 0 0 #fff, -0.5vw 0 0 #fff, 0.38vw 0.38vw 0 #fff, -0.38vw 0.38vw 0 #fff, 0.38vw -0.38vw 0 #fff, -0.38vw -0.38vw 0 #fff`,
            }}
          >
            {product?.benefitsMeta?.title || "Benefits"}
          </motion.h2>
        </div>

        <div
          ref={cardsRef}
          className="space-y-10 lg:space-y-24 relative"
          style={isDesktop ? { minHeight: `${1400 + (Math.max(0, benefits.length - 3) * 650)}px` } : undefined}
        >
          <motion.img
            src={product?.benefitsMeta?.scroll_image || "/strip-benefit-product-image.png"}
            alt="strips path runner"
            className="max-lg:hidden stripImg pointer-events-none absolute -left-[2%] top-[0] z-[5] w-[180px] md:w-[315px] xl:w-[355px]"
            style={{
              offsetPath: `path('${PATH_DEF}')`,
              WebkitOffsetPath: `path('${PATH_DEF}')`,
              offsetDistance: pathProgress,
              WebkitOffsetDistance: pathProgress,
              offsetRotate: "0deg",
              WebkitOffsetRotate: "0deg",
              rotate: stripRotate,
              willChange: "transform",
            } as any}
          />
          <motion.img
            src={product?.benefitsMeta?.scroll_image || "/strip-benefit-product-image.png"}
            alt="strips path runner"
            className="lg:hidden stripImg pointer-events-none absolute left-1/2 top-0 z-[15] max-sm:w-[130px] w-[250px] drop-shadow-lg !mt-0"
            style={{
              x: "-50%",
              y: mobileYSpring,
              translateY: "-50%",
              rotate: mobileStripRotate,
              willChange: "transform",
            }}
          />
          {benefits.map((benefit: BenefitItem, idx: number) => (
            <div
              key={idx}
              className={`img-block relative flex flex-col lg:flex-row ${benefit.align === "left" ? "lg:items-end lg:justify-start" : "lg:items-start lg:justify-end"} gap-8`}
            >
              <motion.div
                ref={idx === 0 ? firstCardRef : null}
                className="relative w-full lg:w-[68%]"
                initial={{ opacity: 0, y: 40, rotate: benefit.align === "left" ? -1.5 : 1.5 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: benefit.align === "left"
                    ? (isDesktop ? -7.01 : -1.5)
                    : (isDesktop ? 11.14 : 1.5),
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 * idx }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <motion.div
                  animate={mushroomControls}
                  initial="hidden"
                  variants={{
                    hidden: { opacity: 0, scale: 0, rotate: 0 },
                    popIn: {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] },
                    },
                  }}
                  className={`absolute max-w-[clamp(100px,18.75vw,270px)] max-h-[clamp(80px,16.67vw,240px)] z-[1] ${benefit.align === "left" ? "lg:-top-[12%] -right-[14%]" : "-top-[12%] right-0 lg:-right-[14%]"}`}>
                  <img src={benefit.rightAccent} width={270} height={240} alt="mushroom" />
                </motion.div>
                <div
                  className={`absolute max-w-[clamp(40px,6.25vw,90px)] max-h-[clamp(80px,13.06vw,188px)] z-[1] ${benefit.align === "left" ? "bottom-[30px] lg:bottom-[24px] left-[5px]" : "bottom-[24px] left-[5px]"}`}>
                  <img src={benefit.accent} width={90} height={187} alt="mushroom" />
                </div>
                <div
                  style={{
                    backgroundColor: `${(idx + 1) % 2 === 0 ? 'var(--product-secondary-color)' : 'var(--product-primary-color)'}`,
                    WebkitMaskImage: `url("data:image/svg+xml,${SHAPE_MASK_DATA_URI}")`,
                    maskImage: `url("data:image/svg+xml,${SHAPE_MASK_DATA_URI}")`,
                    WebkitMaskSize: "100%",
                    maskSize: "100%",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    aspectRatio: "1.05 / 1",
                    maxHeight: "576px",
                  }}
                  className="relative h-full w-full flex flex-col items-center justify-center px-8 lg:px-10 overflow-hidden title-stroke"
                >
                  <motion.h3
                    className="relative text-center font-semibold text-black dark:text-black max-[370px]:text-xl max-[370px]:leading-6 text-[26px] leading-[30px] md:text-[40px] md:leading-[50px] xl:text-[56px] xl:leading-[72px] 2xl:text-[93px] 2xl:leading-[123px] w-full benefit-title"
                    style={{ WebkitTextStroke: "8px #FFFFFF", color: "#000", willChange: "transform, opacity" }}
                  >
                    {benefit.title}
                    {
                      benefit.align === "left" ? (
                        <div className="absolute left-1/2 -translate-x-1/2 lg:-translate-y-[30px] -z-[1] w-full text-StripSecondary dark:text-StripSecondary">
                          <BenefitDecorationLeft />
                        </div>
                      ) : (
                        <div className="absolute left-1/2 -translate-x-1/2 lg:-translate-y-[35px] -z-[1] w-full text-StripPrimary dark:text-StripPrimary">
                          <BenefitDecorationRight />
                        </div>
                      )
                    }
                  </motion.h3>
                </div>
              </motion.div> 
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}