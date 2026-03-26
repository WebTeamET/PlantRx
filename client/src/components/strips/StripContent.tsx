"use client";
import { getMetafieldImage } from "@/lib/shopify";
import { ShopifyProduct } from "@/lib/shopify";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ReactNode } from "react";


// ─── Props ────────────────────────────────────────────────────────────────────

interface StripContentProps {
  product?: ShopifyProduct;
  children?: ReactNode;
}

export const sentenceVariants = {
  hidden: {},
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { opacity: { duration: 0 } } }
};
// ─── Component ────────────────────────────────────────────────────────────────

export default function StripContent({ product, children }: StripContentProps) {
  const sentence = "PlantRx Mushroom Focus Strips";
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, {
    margin: "0px 0px -40% 0px",
    amount: 0,
    once: false,
  });

  return (
    <>
        <motion.section
            ref={sectionRef}
            className="block w-full relative bg-gradient-to-t from-transparent via-[#F7EFE6] via-25% to-transparent lg:-mt-[70px]"
            variants={sentenceVariants}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
        >
            <div className="absolute -top-[30px] lg:-top-[70px] right-0 w-[12vw] h-auto">
                <img src="/mushroom-group.png" alt="mushroom-group" />
            </div>
            <div className="absolute bottom-0 left-0 w-[6vw] h-auto">
                <img src="/mushroom-group-2.png" alt="mushroom-group" />
            </div>
            <div className="container py-[50px] lg:pt-0 lg:pb-[100px]">
                <div className="title title-anim-typewriter">
                    <motion.h2
                        className="text-[clamp(28px,_4.5vw,_100px)] leading-[1] text-black font-semibold text-center mb-5"                        
                    >
                        {sentence.split("").map((letter, i) => (
                            <motion.span
                                key={`${letter}-${i}`}
                                variants={letterVariants}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </motion.h2>
                </div>
                <div className="content text-center">
                    <p className=" text-[#818181] lg:leading-[50px] lg:max-w-[80%] mx-auto capitalize">
                        are fast-dissolving oral strips formulated with functional mushroom extracts traditionally used to support cognitive function, focus, and daily mental performance — in a convenient, water-free format.      
                    </p>
                </div>
            </div>
        </motion.section>
    </>
  );    
}
