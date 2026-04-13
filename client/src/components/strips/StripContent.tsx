import { slideUpVariants } from "@/animation/framerMotionVariants";
import { ShopifyProduct } from "@/lib/shopify";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { ReactNode } from "react";


import { useIsMobile } from "@/hooks/use-mobile";


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
    const opacity = useTransform(scrollProgress, [start, end], [0.3, 1]);

    return (
        <motion.span
            style={{ opacity, color: "var(--product-primary-color)" }}
            className="inline"
        >
            {word}{" "}
        </motion.span>
    );
}

export default function StripContent({ product, children }: StripContentProps) {
    const metaTitle = product?.productDetails?.title || product?.heroSection?.product_name || null;
    const metaDesc = product?.productDetails?.description || null;

    const description = metaDesc || "are fast-dissolving oral strips formulated with functional mushroom extracts traditionally used to support cognitive function, focus, and daily mental performance — in a convenient, water-free format.";
    const isMobile = useIsMobile();
    const sectionRef = useRef<HTMLElement>(null);
    const sectionInView = useInView(sectionRef, {
        margin: isMobile ? "0px" : "0px 0px -10% 0px",
        amount: 0,
        once: false,
    });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 70%", "end 55%"],
    });

    const words = description.split(" ");
    const totalWords = words.length;

    return (
        <>
            <motion.section
                ref={sectionRef}
                className="block w-full relative bg-[linear-gradient(180deg,transparent_0%,var(--product-background-color)_51.44%,transparent_100%)] lg:-mt-[70px]"
                variants={sentenceVariants}
                initial="hidden"
                animate={sectionInView ? "visible" : "hidden"}
            >
                <div className="absolute -top-[30px] lg:-top-[140px] right-0 w-[12vw] h-auto">
                    <img src={product?.productDetails?.right_ingredient || "/mushroom-group.png"} alt="mushroom-group" />
                </div>
                <div className="absolute bottom-0 left-0 w-[6vw] h-auto">
                    <img src={product?.productDetails?.left_ingredient || "/mushroom-group-2.png"} alt="mushroom-group" />
                </div>
                <div
                    className="new-container py-[50px] lg:pt-0 lg:pb-[100px] 2xl:pb-[245px]">
                    <div className="title title-anim-typewriter">
                        <h2
                            className="pdp-title-style text-black dark:text-black font-semibold text-center mb-5"
                        >{metaTitle}</h2>
                    </div>
                    <div className="content text-center">
                        <p className="font-bold text-center capitalize text-xl leading-8 md:text-2xl md:leading-10 lg:text-4xl lg:leading-[80px] 2xl:text-[40px] 2xl:leading-[100px] 2xl:max-w-[1346px] md:max-w-[90%] mx-auto">
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
            </motion.section>
        </>
    );
}
