"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ShopifyProduct } from "@/lib/shopify";

function WordReveal({
  word,
  scrollProgress,
  start,
  end,
}: {
  word: string;
  scrollProgress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const color = useTransform(
    scrollProgress,
    [start, end],
    ["rgba(56, 81, 39, 0.3)", "rgba(56, 81, 39, 1)"]
  );

  return (
    <motion.span
      style={{ color }}
      className="inline"
    >
      {word}{" "}
    </motion.span>
  );
}

export default function SupplementDescription({ product }: { product: ShopifyProduct }) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 40%"],
  });

  const descriptionText = product.productDetails?.description;

  const words = descriptionText.split(" ");
  const totalWords = words.length;

  return (
    <section
      ref={sectionRef}
      className="pb-10 md:pb-16 xl:pb-20 2xl:pb-[150px] bg-white"
    >
      <div className="new-container">
        <div className="content content-green">
          <p className="font-bold text-center capitalize font-body text-[clamp(18px,2.08vw,40px)] leading-[clamp(32px,5.2vw,100px)]">
            {words.map((word: string, i: number) => {
              const wordStart = (i / totalWords) * 0.9;
              const wordEnd = ((i + 1) / totalWords) * 0.9;

              return (
                <WordReveal
                  key={i}
                  word={word}
                  scrollProgress={scrollYProgress}
                  start={wordStart}
                  end={wordEnd}
                />
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
