"use client";
import { motion } from "framer-motion";
import Parallax from "@/animation/Parallax";
import RevealText from "@/utils/RevealText";

export default function StripBanner() {
    const wordVars = {
        initial: { opacity: 0, filter: "blur(10px)", y: 15 },
        animate: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8 } },
    };

    const imgFrontLoadVars = {
        initial: { opacity: 0, x: 253 },
        animate: { opacity: 1, x: 0, transition: { delay: 1, duration: 1.5, ease: [0.33, 1, 0.68, 1] } },
    };


    return (
        <section className="hero-banner-section relative product-section">
            <div className="relative lg:h-[calc(100dvh-96px)] h-[calc(100dvh)] w-full overflow-hidden max-lg:pt-20">
                <div className="container h-full">
                    <div className="h-full w-full flex justify-center items-start lg:items-center">
                        <div className="w-full relative z-10">
                            <div className="flex max-lg:flex-col md:gap-20 gap-10 items-center justify-between">
                                <div className="lg:w-5/12 w-full">
                                    <div className="head-wrapper">
                                        <Parallax className="max-lg:!transform-none" distance={200}>
                                            <motion.h1
                                                variants={wordVars}
                                                initial="initial"
                                                animate="animate"
                                                transition={{ duration: 1.1 }}
                                                className='relative text-black'>
                                                Mushroom <br className="max-xl:hidden"></br><span className="green">focus</span> <span className="text-secondary">Strips</span>
                                            </motion.h1>
                                            <RevealText tag="p" className="mt-5">
                                                Enhance focus and everyday wellness with chocolate-flavored Mushroom Focus Strips powered by functional mushrooms.
                                            </RevealText>
                                        </Parallax>
                                    </div>
                                </div>
                                <div className="lg:w-7/12 w-full relative flex justify-center items-center">
                                    <div className="relative z-50">
                                        <div className="relative ">
                                            <div className="img-bg w-[300px] h-[300px] max-[575px]:w-[270px] xl:w-[450px] xl:h-[450px]">
                                                <img
                                                    src="/mushroom-strip_label_box.png"
                                                    alt="Box"
                                                    width={450}
                                                    height={450}
                                                    className="drop-shadow-2xl h-full w-full object-contain"
                                                />
                                            </div>
                                            <motion.div
                                                variants={imgFrontLoadVars as any}
                                                initial="initial"
                                                animate="animate"
                                                className="img-front absolute xl:top-[17px] xl:-left-2 top-[11px] -left-[5px] max-[575px]:top-1.5 max-[575px]:-left-1 w-[302px] h-[302px] max-[575px]:w-[270px] max-[575px]:h-[308px] xl:w-[455px] xl:h-[450px]"
                                            >
                                                <img src="/mushroom-strip_label_layer-new.png" alt="Label" className="h-full w-full object-contain" />
                                            </motion.div>
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