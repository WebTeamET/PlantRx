"use client";
import { getMetafieldImage } from "@/lib/shopify";
import { ShopifyProduct } from "@/lib/shopify";
import { motion, useAnimationControls } from "framer-motion";
import { useState } from "react";
import { ReactNode } from "react";

// ─── Shared animation variants (from variants file) ──────────────────────────

const slideUpVariants = {
  hidden: { opacity: 0, transform: "translate3d(0, 60px, 0)" },
  visible: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as number[] },
  },
};

const imgSlideInVars = {
  hidden: { opacity: 0, transform: "translate3d(80px, 30px, 0) scale(0.94)" },
  visible: {
    opacity: 1,
    transform: "translate3d(0, 0, 0) scale(1)",
    transition: { delay: 0.55, duration: 1.5, ease: [0.33, 1, 0.68, 1] as number[] },
  },
};

// ─── Dots config ─────────────────────────────────────────────────────────────

interface DotConfig {
  top: string;
  left: string;
  cls: string;
  delay: string;
  dur: string;
}

const DOTS: DotConfig[] = [
  { top: "8%",  left: "5%",  cls: "w-[23px] h-[22px]", delay: "0s",    dur: "3.4s" },
  { top: "20%", left: "82%", cls: "w-[23px] h-[22px]", delay: "0.7s",  dur: "4.1s" },
  { top: "48%", left: "6%",  cls: "w-[23px] h-[22px]", delay: "1.2s",  dur: "3.8s" },
  { top: "15%", left: "46%", cls: "w-[23px] h-[22px]", delay: "0.4s",  dur: "5.0s" },
];

// ─── Marquee items ────────────────────────────────────────────────────────────

const MARQUEE_ITEMS = [
  "Clear Mind", "Sharp Focus", "Steady Energy",
  "Clear Mind", "Sharp Focus", "Steady Energy",
  "Clear Mind", "Sharp Focus", "Steady Energy",
  "Clear Mind", "Sharp Focus", "Steady Energy",
];

// ─── CSS keyframes injected once ─────────────────────────────────────────────

const KEYFRAMES = `
  @keyframes dotDrift {
    0%   { transform: translate3d(0, 0, 0) scale(1);    opacity: 0.3; }
    35%  { transform: translate3d(7px, -11px, 0) scale(1.5); opacity: 0.65; }
    70%  { transform: translate3d(-4px, -6px, 0) scale(1.2); opacity: 0.45; }
    100% { transform: translate3d(0, 0, 0) scale(1);    opacity: 0.3; }
  }

  @keyframes mushroomFloat {
    0%   { transform: rotate(-33deg) translate3d(0, 0px, 0) scale(1); }
    30%  { transform: rotate(-31deg) translate3d(3px, -10px, 0) scale(1.03); }
    65%  { transform: rotate(-35deg) translate3d(-3px, -16px, 0) scale(1.01); }
    100% { transform: rotate(-33deg) translate3d(0, 0px, 0) scale(1); }
  }

  @keyframes marqueeScroll {
    from { transform: translate3d(0, 0, 0); }
    to   { transform: translate3d(-50%, 0, 0); }
  }
`;

// ─── Props ────────────────────────────────────────────────────────────────────

interface StripBannerProps {
  product?: ShopifyProduct;
  children?: ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StripBanner({ product, children }: StripBannerProps) {
  const activeTitle = product?.title || "Mushroom Focus Strips";
  const mainImage   = product?.images?.[0]?.url || "/strip-2.png";

  const heroBannerImage = (() => {
    if (!product) return undefined;
    const metafieldImage =
      typeof getMetafieldImage === "function"
        ? getMetafieldImage(product, "custom", "hero_banner")
        : undefined;
    return metafieldImage || (product as any).heroBanner?.reference?.image?.url;
  })();

  // Sequence: SVG done → mushroom pop-in → keyframe float
  const mushroomControls = useAnimationControls();
  const [floatActive, setFloatActive] = useState(false);

  const handleSvgComplete = async (definition: string) => {
    if (definition !== "visible") return;
    await mushroomControls.start("popIn");
    setFloatActive(true);
  };


  return (
    <>
      <style>{KEYFRAMES}</style>

      <section className="hero-product-banner product-section relative overflow-hidden min-h-svh flex flex-col bg-[#F7EFE6] font-sans">

        {/* ── Animated decorative dots ── */}
        {DOTS.map((d, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`absolute ${d.cls} bg-[#643A3D]/30 rounded-full pointer-events-none z-0`}
            style={{
              top: d.top,
              left: d.left,
              animation: `dotDrift ${d.dur} ${d.delay} ease-in-out infinite`,
            }}
          />
        ))}

        <div className="px-[136px]">
          <div className="banner-inner pt-[100px]">
            <div className="title-wrapper relative">

              {/* ── SVG asterisk — each petal animates in one by one ── */}
              <motion.div
                className="absolute left-[-55px] top-[-50px]"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
                }}
                initial="hidden"
                animate="visible"
                onAnimationComplete={handleSvgComplete}
              >
                <svg width="125" height="107" viewBox="0 0 125 107" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Petal 1 — bottom-left */}
                  <motion.path
                    d="M26.935 104.155C31.9285 107.339 38.5449 105.933 41.7907 100.97C41.9988 100.64 42.2068 100.309 42.3733 99.9779C42.4565 99.854 42.4981 99.6886 42.5813 99.5231L43.2471 97.5382L53.2341 66.2758C53.6919 64.7871 51.9026 63.6705 50.7791 64.7044L26.2692 86.7039L24.7296 88.1098C24.7296 88.1098 24.5214 88.358 24.3966 88.482C24.1469 88.7715 23.9388 89.061 23.7308 89.3918C20.5266 94.3541 21.9414 100.929 26.935 104.155Z"
                    fill="#643A3D"
                    variants={{
                      hidden: { opacity: 0, scale: 0.2 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
                    }}
                    style={{ originX: "38px", originY: "86px" }}
                  />
                  {/* Petal 2 — left */}
                  <motion.path
                    d="M0.0530088 60.6111C0.635585 66.4831 5.9204 70.7424 11.8294 70.1635C12.2039 70.1635 12.5785 70.0807 12.953 69.9981C13.1194 69.9981 13.2859 69.9153 13.4106 69.874L15.3665 69.171L46.2015 57.4683C47.6579 56.9307 47.4498 54.8217 45.9101 54.5736L13.3275 49.2391L11.2468 48.9497C11.2468 48.9497 10.9139 48.9497 10.7475 48.9497C10.3729 48.9497 9.99843 48.9497 9.62391 48.991C3.75653 49.4873 -0.529568 54.739 0.0530088 60.6111Z"
                    fill="#643A3D"
                    variants={{
                      hidden: { opacity: 0, scale: 0.2 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
                    }}
                    style={{ originX: "23px", originY: "59px" }}
                  />
                  {/* Petal 3 — top-left */}
                  <motion.path
                    d="M41.2082 1.06253C35.8818 3.62638 33.6347 9.99466 36.173 15.2878C36.3395 15.6185 36.5477 15.9494 36.714 16.2802C36.7973 16.4043 36.8805 16.5284 36.9638 16.6937L38.2953 18.3064L59.8924 43.118C60.891 44.2758 62.8468 43.3661 62.5555 41.836L56.4801 9.58113L56.0639 7.55487C56.0639 7.55487 55.9807 7.22404 55.8976 7.09998C55.7727 6.76917 55.6062 6.39699 55.4398 6.06618C52.8598 0.773062 46.4514 -1.45997 41.125 1.06253H41.2082Z"
                    fill="#643A3D"
                    variants={{
                      hidden: { opacity: 0, scale: 0.2 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
                    }}
                    style={{ originX: "49px", originY: "22px" }}
                  />
                  {/* Petal 4 — top-right */}
                  <motion.path
                    d="M92.6399 1.06265C87.3136 -1.50121 80.8636 0.731829 78.3252 6.0663C78.1588 6.39711 77.9923 6.76929 77.8674 7.1001C77.8258 7.26551 77.7843 7.38957 77.701 7.55498L77.2849 9.6226L71.2095 41.8775C70.9182 43.4076 72.8324 44.3173 73.8726 43.1594L95.4697 18.3479L96.8012 16.7352C96.8012 16.7352 96.9677 16.4458 97.0508 16.3217C97.259 15.9908 97.4255 15.66 97.5919 15.3293C100.172 10.0361 97.9247 3.6265 92.5568 1.104L92.6399 1.06265Z"
                    fill="#643A3D"
                    variants={{
                      hidden: { opacity: 0, scale: 0.2 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
                    }}
                    style={{ originX: "83px", originY: "22px" }}
                  />
                  {/* Petal 5 — right */}
                  <motion.path
                    d="M124.723 41.0097C123.392 35.2617 117.649 31.6641 111.865 32.9874C111.491 33.0701 111.116 33.1942 110.783 33.3182C110.617 33.3596 110.492 33.4422 110.326 33.4836L108.453 34.4348L79.3242 49.8178C77.9511 50.5621 78.4088 52.5885 79.9901 52.6711L112.947 53.953H115.028V53.9945C115.194 53.9945 115.361 53.9945 115.527 53.953C115.902 53.9117 116.276 53.8291 116.651 53.7463C122.435 52.4231 126.055 46.7164 124.723 40.9684V41.0097Z"
                    fill="#643A3D"
                    variants={{
                      hidden: { opacity: 0, scale: 0.2 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
                    }}
                    style={{ originX: "97px", originY: "43px" }}
                  />
                </svg>
              </motion.div>

              {/* ── Title: fade-up on load ── */}
              <motion.h2
                className="text-[150px] leading-[100%] text-black relative z-[99]"
                style={{
                  textShadow: `
                    0 12px 0 #fff,  0 -12px 0 #fff,
                    12px 0 0 #fff,  -12px 0 0 #fff,
                    8px 8px 0 #fff, -8px 8px 0 #fff,
                    8px -8px 0 #fff,-8px -8px 0 #fff,
                    10px 4px 0 #fff,-10px 4px 0 #fff,
                    10px -4px 0 #fff,-10px -4px 0 #fff,
                    4px 10px 0 #fff,-4px 10px 0 #fff,
                    4px -10px 0 #fff,-4px -10px 0 #fff
                  `,
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeTitle}
              </motion.h2>

              {/* ── Small mushroom image — pops in after SVG, then floats ── */}
              <motion.div
                className="absolute right-0 bottom-[-240px] max-w-[270px] z-[0]"
                animate={mushroomControls}
                initial="hidden"
                variants={{
                  hidden: { opacity: 0, scale: 0, rotate: -33 },
                  popIn: {
                    opacity: 1,
                    scale: 1,
                    rotate: -33,
                    transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] },
                  },
                }}
                style={floatActive ? { animation: "mushroomFloat 5s ease-in-out infinite" } : undefined}
              >
                <img src="/masroom-baner-small.png" alt="" />
              </motion.div>
            </div>

            {/* ── Product box image — slides in on load ── */}
            <motion.div
              className="pdp-banner-img max-w-[664px] !rotate-[-6deg] mx-auto mt-[-60px] relative z-[99]" 
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.img
                src={mainImage}
                alt={activeTitle}
                variants={imgSlideInVars}
                initial="hidden"
                animate="visible"
              />
            </motion.div>
          </div>
        </div>

        {/* ── Marquee strip ── */}
        <div className="relative w-full overflow-hidden mt-auto z-[3]">

          {/* Background SVG arc */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 1440 442"
            width="100%"
            className="overflow-visible block text-[#4a2218]"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeWidth="160"
              d="M-71 371.6C126.3 260 593.5 65.8 934.5 80.8c313 13.8 497 136 572 200"
            />
          </svg>

          {/* Scrolling text — double-track for seamless infinite loop */}
          <div className="absolute inset-0 flex items-center overflow-hidden">
            <div
              className="flex whitespace-nowrap"
              style={{ animation: "marqueeScroll 18s linear infinite" }}
            >
              {[0, 1].map((copy) => (
                <span key={copy} className="inline-flex items-center">
                  {MARQUEE_ITEMS.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-x-4 text-[clamp(0.9rem,2vw,1.4rem)] font-extrabold tracking-[0.15em] uppercase text-[#F7EFE6] pr-8"
                    >
                      {item}
                      <span
                        aria-hidden="true"
                        className="inline-block w-1.5 h-1.5 rounded-full bg-[#F7EFE6] shrink-0 ml-2"
                      />
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          {/* Edge fade */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #F7EFE6 0%, transparent 6%, transparent 94%, #F7EFE6 100%)",
            }}
          />
        </div>

        {children}
      </section>
    </>
  );
}