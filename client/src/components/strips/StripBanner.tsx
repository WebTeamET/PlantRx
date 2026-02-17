"use client";
import { motion } from "framer-motion";
import Parallax from "@/animation/Parallax";
import RevealText from "@/utils/RevealText";
import { getMetafieldImage } from "@/lib/shopify";
import { ShopifyProduct } from "@/lib/shopify";
import { ReactNode } from "react";

interface StripBannerProps {
  product?: ShopifyProduct;
  children?: ReactNode;
}

export default function StripBanner({ product, children }: StripBannerProps) {
  const wordVars = {
    initial: {
      opacity: 0,
      filter: "blur(10px)",
      transform: "translate3d(0, 15px, 0)"
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      transform: "translate3d(0, 0, 0)",
      transition: { duration: 0.8 }
    },
  };

  const imgFrontLoadVars = {
    initial: {
      opacity: 0,
      transform: 'translate3d(253px, 0, 0)'
    },
    animate: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      transition: {
        delay: 1,
        duration: 1.5,
        ease: [0.33, 1, 0.68, 1]
      }
    },
  };

  const activeTitle = product?.title || "Mushroom Focus";
  const activeProductType = product?.productType || "Strips";
  const activeDesc = product?.description || "Enhance focus and everyday wellness with chocolate-flavored Mushroom Focus Strips powered by functional mushrooms.";
  
  const shortDescription = activeDesc.replace(/\n+/g, ' ').trim().slice(0, 180) + (activeDesc.length > 180 ? '...' : '');
  
  const mainImage = product?.images?.[0]?.url || "/mushroom-strip_label_box.png";

  // Fix: Ensure getMetafieldImage is imported, and handle cases where it might not exist.
// / Adjust import path as needed

  const heroBannerImage = (() => {
    if (!product) return undefined;
    // Check for metafield-based image first, then fallback to reference structure.
    const metafieldImage = typeof getMetafieldImage === "function"
      ? getMetafieldImage(product, "custom", "hero_banner")
      : undefined;
    return metafieldImage || product.heroBanner?.reference?.image?.url;
  })();

  const getTitleParts = (title: string, pType?: string) => {
    const words = title.trim().split(/\s+/);
    const first = words[0] || title;
    const rest = words.slice(1).join(' ');
    return { first, rest, productType: pType };
  };

  const { first, rest, productType } = getTitleParts(activeTitle, activeProductType);

  return (
    <section className="hero-banner-section relative product-section">
      <div className="relative lg:h-[calc(100dvh-96px)] h-[calc(100dvh)] w-full overflow-hidden max-lg:pt-[55px]">
        <div className="container h-full">
          <div className="h-full w-full flex justify-center items-start lg:items-center">
            <div className="w-full relative z-10">
              {children}
              <div className="flex max-lg:flex-col md:gap-20 gap-10 items-center justify-between">
                <div className="lg:w-5/12 w-full">
                  <div className="head-wrapper">
                    <Parallax className="max-lg:!transform-none" distance={200}>
                      <motion.h1
                        variants={wordVars}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 1.1 }}
                        className="relative text-black"
                      >
                        {first}
                        {rest && (
                          <>
                            <br className="max-xl:hidden"></br>
                            <span className="green"> {rest}</span>
                            {productType && (
                              <span className="text-secondary">
                                {" "}
                                {/* {productType} */}
                              </span>
                            )}
                          </>
                        )}
                        {!rest && productType && (
                          <span className="text-secondary"> {productType}</span>
                        )}
                      </motion.h1>
                      <RevealText tag="p" className="mt-5">
                        {shortDescription}
                      </RevealText>
                    </Parallax>
                  </div>
                </div>
                <div className="lg:w-7/12 w-full relative flex justify-center items-center">
                  <div className="relative z-50">
                    <div className="relative ">
                      <div className="img-bg w-[300px] h-[300px] max-[575px]:w-[270px] xl:w-[450px] xl:h-[450px]">
                        <img
                          // src={mainImage}
                          src="/mushroom-strip_label_box.png"
                          // alt="Hero Banner"
                          width={450}
                          height={450}
                          className="drop-shadow-2xl h-full w-full object-contain"
                        />
                      </div>

                      {heroBannerImage && (
                        <motion.div
                          variants={imgFrontLoadVars as any}
                          initial="initial"
                          animate="animate"
                          className="img-front absolute xl:top-[17px] xl:-left-2 top-[11px] -left-[5px] max-[575px]:top-1.5 max-[575px]:-left-1 w-[302px] h-[302px] max-[575px]:w-[270px] max-[575px]:h-[308px] xl:w-[455px] xl:h-[450px]"
                        >
                          <img
                            src={heroBannerImage}
                            alt={
                              product?.heroBanner?.reference?.image?.altText ??
                              product?.images?.[1]?.altText ??
                              "Product Layer"
                            }
                            className="h-full w-full object-contain"
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}