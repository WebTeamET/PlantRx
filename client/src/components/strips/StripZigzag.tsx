"use client";

import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";
import { ShopifyProduct, getMetaobjectsList, getMetaobjectField } from "@/lib/shopify";

interface StripZigzagProps {
  product?: ShopifyProduct;
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
  eyebrow?: string;
  children?: ReactNode;
}

const titleShadow = `
  0 10px 0 #fff,  0 -10px 0 #fff,
  10px 0 0 #fff, -10px 0 0 #fff,
  6px 6px 0 #fff, -6px 6px 0 #fff,
  6px -6px 0 #fff,-6px -6px 0 #fff
`;

const defaultParagraphs = [
  "Mushroom Focus Strips are designed to support mental clarity, focus, and daily cognitive performance as part of a balanced wellness routine. These convenient dissolvable oral strips combine functional mushroom extracts traditionally used to support brain function, energy, and overall vitality.",
  "The fast-dissolving strip format allows the ingredients to be taken easily without water, making it suitable for work, studying, travel, or daily productivity.",
];

export default function StripZigzag({
  product,
  title: initialTitle = "Smarter Daily Wellness",
  subtitle: initialSubtitle,
  paragraphs: initialParagraphs = defaultParagraphs,
  imageSrc: initialImageSrc = "/mushroom-focus-strips-product.png",
  imageAlt: initialImageAlt = "Mushroom focus strips tin",
  reverse = false,
  eyebrow: initialEyebrow,
  children,
}: StripZigzagProps) {
  const dynamicData = useMemo(() => {
    // imageWithDetails is now a mapped object from the server
    const node = product?.imageWithDetails;
    if (!node) return null;
    
    const paragraphs = node.description ? node.description.split('\n') : initialParagraphs;

    return {
      title: node.title || initialTitle,
      subtitle: node.subtitle || initialSubtitle,
      paragraphs: paragraphs,
      imageSrc: node.image || initialImageSrc,
      imageAlt: node.image_alt || initialImageAlt,
      eyebrow: node.eyebrow || initialEyebrow,
    };
  }, [product]);

  const title = dynamicData?.title || initialTitle;
  const subtitle = dynamicData?.subtitle || initialSubtitle;
  const paragraphs = dynamicData?.paragraphs || initialParagraphs;
  const imageSrc = dynamicData?.imageSrc || initialImageSrc;
  const imageAlt = dynamicData?.imageAlt || initialImageAlt;
  const eyebrow = dynamicData?.eyebrow || initialEyebrow;
  return (
    <section className="relative overflow-hidden w-full bg-gradient-to-t from-white via-[#F7EFE6] to-white py-[50px] md:py-24">
      <div className="mx-auto grid lg:grid-cols-3 gap-12 container">
        <div className={reverse ? "order-2 md:order-1" : "lg:col-span-2 lg:mb-[15vh]"}>
          {eyebrow && (
            <p className="text-sm uppercase tracking-[0.2em] text-[#7a5a5c] dark:text-[#7a5a5c] mb-4">{eyebrow}</p>
          )}
          <h2
            className="text-[clamp(42px,_6vw,_76px)] leading-[1.3] font-semibold text-black dark:text-black mb-[30px] max-w-2xl"
            style={{ textShadow: titleShadow }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {subtitle && (
            <p className="text-lg text-black dark:text-black mb-4 max-w-2xl">{subtitle}</p>
          )}
          <div className="space-y-5 text-black dark:text-black font-light max-w-4xl">
            {paragraphs.map((p: string, idx: number) => (
              <p className="text-base lg:text-lg lg:leading-9 dark:text-black" key={idx}>{p}</p>
            ))}
          </div>
          {children}
        </div>

        <div className={reverse ? "order-1 md:order-2" : "lg:absolute lg:right-0 lg:bottom-[50px] xl:translate-x-[4.5dvw] lg:max-w-[27.084dvw]"}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -11.69, y: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: -11.69, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-lg:max-w-[420px]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
