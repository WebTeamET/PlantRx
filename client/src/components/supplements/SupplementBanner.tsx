import RevealText from '@/utils/RevealText';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import React, { useRef } from 'react'
import { useIsMediaQuery } from '@/hooks/useIsMediaQuery';
import { containerVariants, slideUpVariants } from '@/animation/framerMotionVariants';

function SupplementBanner() {
    const containerRef = useRef(null);
    const isMobile = useIsMediaQuery(768);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const mouseMoveX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
    const mouseMoveY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { clientX, clientY } = e;
        const xPct = (clientX / window.innerWidth) - 0.5;
        const yPct = (clientY / window.innerHeight) - 0.5;
        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yLid = useTransform(scrollYProgress, [0.1, 0.4, 0.8], [-174, -200, -300]);
    const xLid = useTransform(scrollYProgress, [0.1, 0.3, 0.8], ["0%", "5%", "75%"]);
    const rotateZ = useTransform(scrollYProgress, [0.1, 0.8], [-360, -663.44]);
    const rotateX = useTransform(scrollYProgress, [0.1, 0.8], [0, 40]);

    const supplements = isMobile ? [
        { x: "-55vw", y: "-30vh", scale: 0.5, blur: "3px", delay: 0.42 },
        { x: "-55vw", y: "-8vh", scale: 0.9, blur: "0px", delay: 0.48 },
        { x: "-48vw", y: "12vh", scale: 0.7, blur: "2px", delay: 0.55 },
        { x: "-12vw", y: "30vh", scale: 1.0, blur: "5px", delay: 0.62 },
        { x: "-12vw", y: "-46vh", scale: 0.45, blur: "1px", delay: 0.45 },
        { x: "-28vw", y: "-15vh", scale: 0.6, blur: "3px", delay: 0.68 },
        { x: "-22vw", y: "0vh", scale: 0.75, blur: "0px", delay: 0.52 },
        { x: "-30vw", y: "36vh", scale: 0.85, blur: "1px", delay: 0.72 },
        { x: "35vw", y: "-25vh", scale: 1.0, blur: "4px", delay: 0.44 },
        { x: "22vw", y: "-12vh", scale: 0.7, blur: "0px", delay: 0.50 },
        { x: "38vw", y: "4vh", scale: 0.6, blur: "3px", delay: 0.58 },
        { x: "20vw", y: "37vh", scale: 0.8, blur: "5px", delay: 0.65 },
        { x: "15vw", y: "-28vh", scale: 0.6, blur: "1px", delay: 0.47 },
        { x: "28vw", y: "12vh", scale: 0.55, blur: "2px", delay: 0.53 },
        { x: "12vw", y: "24vh", scale: 0.9, blur: "4px", delay: 0.69 },
        { x: "40vw", y: "-4vh", scale: 0.5, blur: "0px", delay: 0.75 },
    ] : [
        { x: "-40vw", y: "-35vh", scale: 0.7, blur: "5px", delay: 0.42 },
        { x: "-45vw", y: "-10vh", scale: 1.2, blur: "0px", delay: 0.48 },
        { x: "-42vw", y: "15vh", scale: 0.9, blur: "3px", delay: 0.55 },
        { x: "-20vw", y: "30vh", scale: 1.4, blur: "8px", delay: 0.62 },
        { x: "-15vw", y: "-50vh", scale: 0.6, blur: "2px", delay: 0.45 },
        { x: "-10vw", y: "-20vh", scale: 0.8, blur: "4px", delay: 0.68 },
        { x: "-25vw", y: "0vh", scale: 1.0, blur: "0px", delay: 0.52 },
        { x: "-35vw", y: "35vh", scale: 1.1, blur: "1px", delay: 0.72 },
        { x: "38vw", y: "-30vh", scale: 1.3, blur: "6px", delay: 0.44 },
        { x: "25vw", y: "-15vh", scale: 0.9, blur: "0px", delay: 0.50 },
        { x: "40vw", y: "5vh", scale: 0.8, blur: "4px", delay: 0.58 },
        { x: "20vw", y: "10vh", scale: 1.5, blur: "7px", delay: 0.65 },
        { x: "17vw", y: "-35vh", scale: 0.8, blur: "1px", delay: 0.47 },
        { x: "32vw", y: "15vh", scale: 0.7, blur: "2px", delay: 0.53 },
        { x: "15vw", y: "30vh", scale: 1.2, blur: "5px", delay: 0.69 },
        { x: "45vw", y: "-5vh", scale: 0.6, blur: "0px", delay: 0.75 },
    ];

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative md:h-[310vh] product-section"
        >
            <div className="absolute w-full h-full z-9 block" style={{ background: "radial-gradient(circle, rgba(194, 160, 88, 0.35) 0%, transparent 70%)" }} />
            <div className="sticky top-[12%] flex items-center xl:justify-start justify-center md:gap-[100px] gap-5 flex-col md:h-[110dvh] sm:h-[calc(100dvh-64px)] h-[calc(100dvh-56px)] overflow-hidden md:pb-20">
                <motion.div 
                variants={containerVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2, once: true }}
                className="content-wrapper relative z-40 xl:pt-20 md:pt-0 flex flex-col items-center text-center container">
                    <motion.h1 
                    variants={slideUpVariants as any}
                    className='text-green xl:leading-[100px] md:mb-5 mb-3'>
                        <span className='text-gold'>Dietary </span>
                        <span>Supplement</span>
                    </motion.h1>
                    <motion.p
                    className='!font-medium'
                    variants={slideUpVariants as any}
                    >Mushroom Complex 10 X</motion.p>
                </motion.div>
                <motion.div
                    initial={{ y: 800, opacity: 0 }}
                    animate={{ y: 0, opacity: 1,transform: "translate3d(0, 0, 0)" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative perspective-[1200px] transform-style-3d">
                    <motion.img
                        src="/sup-bottle-lid.png"
                        style={{
                            y: yLid, x: xLid, rotate: rotateZ, rotateX: rotateX
                        }}
                        className="absolute md:top-[31%] md:left-[44%] md:w-[215px] w-[160px] top-[43%] left-[43%] h-auto object-contain z-50 pointer-events-none max-md:!-translate-y-[174px] max-md:!-rotate-[360deg]"
                    />
                    <motion.img
                        src="/mushroom-complex-x-sup-open.png"
                        className="object-contain drop-shadow-2xl md:max-w-[420px] max-w-[300px] block h-auto mx-auto relative z-40"
                    />
                </motion.div>
                <div className="flex justify-center items-center">
                    {supplements.map((sup, index) => {
                        const imageNumber = (index % 8) + 1;
                        const popRange = [sup.delay, sup.delay + 0.08];
                        const scale = useTransform(scrollYProgress, popRange, [isMobile ? sup.scale : 0, sup.scale]);
                        const opacity = useTransform(scrollYProgress, popRange, [0, 1]);
                        const drift = useTransform(scrollYProgress, [sup.delay, 1], [0, -60]);
                        return (
                            <motion.img
                                key={index}
                                src={`/sup_${imageNumber}.png`}
                                style={{
                                    x: sup.x,
                                    y: sup.y,
                                    translateX: mouseMoveX,
                                    translateY: mouseMoveY,
                                    translateZ: drift,
                                    scale: scale,
                                    opacity: opacity,
                                    filter: `blur(${sup.blur})`,
                                    left: '50%',
                                    top: '50%',
                                }}
                                className="absolute xl:w-24 w-14 h-auto object-contain z-30 pointer-events-none max-md:!opacity-100"
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default SupplementBanner