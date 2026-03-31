import { slideUpVariants } from "@/animation/framerMotionVariants";
import { ShopifyProduct, getMetaobjectField } from "@/lib/shopify";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ReactNode } from "react";


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

export default function StripContent({ product, children }: StripContentProps) {
    const metaTitle = product?.productDetails?.title || product?.heroSection?.product_name || null;
    const metaDesc = product?.productDetails?.description || null;

    const description = metaDesc || "are fast-dissolving oral strips formulated with functional mushroom extracts traditionally used to support cognitive function, focus, and daily mental performance — in a convenient, water-free format.";

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
                <motion.div
                    variants={slideUpVariants as any}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    style={{ willChange: "transform, opacity" }}
                    className="new-container py-[50px] lg:pt-0 lg:pb-[100px] 2xl:pb-[245px]">
                    <div className="title title-anim-typewriter">
                        <motion.h2
                            className="pdp-title-style text-black dark:text-black font-semibold text-center mb-5"
                        >{metaTitle}</motion.h2>
                    </div>
                    <div className="content text-center">
                        <p className=" text-[#818181] dark:text-[#818181] text-xl leading-8 md:text-2xl md:leading-10 lg:text-4xl lg:leading-[80px] 2xl:text-[40px] 2xl:leading-[100px] 2xl:max-w-[1346px] md:max-w-[90%] mx-auto capitalize">
                            {description}
                        </p>
                    </div>
                </motion.div>
            </motion.section>
        </>
    );
}
