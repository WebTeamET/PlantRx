import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef, useState } from 'react'

function SupplementBenefits() {
    const containerRef = useRef(null);
    const [activeLeft, setActiveLeft] = useState(false);
    const [activeRight, setActiveRight] = useState(false);

    const handleLeftClick = () => {
        setActiveLeft(prev => {
            const next = !prev;
            setActiveRight(false);
            return next;
        });
    };

    const handleRightClick = () => {
        setActiveRight(prev => {
            const next = !prev;
            setActiveLeft(false);
            return next;
        });
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const rotateZ = useTransform(
        scrollYProgress,
        [0, 1],
        [-40, 25]
    )

    const benefitsData = [
        {
            title: "Controls appetite",
            description: "MCT is known to increase satiety, thus reducing the amount that a person needs to eat.",
            image: "/benefit-sup_1.jpg"
        },
        {
            title: "Facilitates metabolic performance",
            description: "By elevating blood pressure, fat burners increase the body's overall energy expenditure, where it starts to use fat cells as an energy source.",
            image: "/benefit-sup_2.jpg"
        },
        {
            title: "Liver health",
            description: "Choline prevents the possibility of fatty liver disease.",
            image: "/benefit-sup_3.jpg"
        },
        {
            title: "Cardiovascular health",
            description: "Fat burners lower LDL cholesterol in the body.",
            image: "/benefit-sup_4.jpg"
        }
    ];

    return (
        <div ref={containerRef} className="benefits-section py-32 h-[400vh] relative">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="flex justify-between gap-20 items-start h-full">
                    <div className="container">
                        <motion.div
                            initial={{ x: -400, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{
                                once: false,
                                amount: 0.2,
                            }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="image-wrapper max-w-xl relative mt-36 z-9"
                        >
                            <div
                                className="absolute left-[30%] top-1/4 z-10 flex items-start gap-5 flex-col"
                            >
                                <motion.button
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        scale: { delay: 1.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                                    }}
                                    onClick={handleLeftClick}
                                    className='relative size-9'
                                >
                                    <div className="wt-dot">
                                        <div className="wt-dot__ringing border-[3px] border-green size-9 absolute opacity-0 rounded-full "></div>
                                        <div className="wt-dot__circle absolute top-6 left-1.5 size-6 rounded-full" tabIndex={0}></div>
                                    </div>
                                </motion.button>

                                <AnimatePresence>
                                    {activeLeft && (
                                        <motion.div
                                            key="left-content"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{
                                                duration: 0.35,
                                                ease: "easeOut",
                                            }}
                                            className="p-5 w-[250px] flex flex-col gap-1 bg-green rounded-lg"
                                        >
                                            <h3 className="font-recoletta text-white text-xl">
                                                Gross Weight:
                                            </h3>
                                            <p className="text-lg text-white">
                                                0.2lb (90.7g)
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="absolute right-[30%] top-[50%] z-10 flex items-end gap-5 flex-col">
                                <motion.button
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        scale: { delay: 1.4, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                                    }}
                                    onClick={handleRightClick}
                                    className="relative size-9"
                                >
                                    <div className="wt-dot">
                                        <div className="wt-dot__ringing border-[3px] border-green size-9 absolute opacity-0 rounded-full "></div>
                                        <div className="wt-dot__circle absolute top-6 left-1.5 size-6 rounded-full" tabIndex={0}></div>
                                    </div>
                                </motion.button>

                                <AnimatePresence>
                                    {activeRight && (
                                        <motion.div
                                            key="right-content"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{
                                                duration: 0.35,
                                                ease: "easeOut",
                                            }}
                                            className="p-5 w-[250px] flex flex-col gap-1 bg-green rounded-lg"
                                        >
                                            <h3 className="font-recoletta text-white text-xl">
                                                Product Amount:
                                            </h3>
                                            <p className="text-lg text-white">
                                                90 capsules
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>


                            <img
                                src='/supplement-water-splash.png'
                                alt='supplement-water-splash'
                                className='w-full h-full object-contain'
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="h-dvh">
                <motion.div
                    style={{
                        rotateZ,
                        willChange: 'transform',
                    }}
                    transition={{
                        rotateZ: {
                            type: "spring",
                            stiffness: 30,
                            damping: 20,
                            mass: 1,
                            restDelta: 0.001
                        }
                    }}
                    className='flex flex-col justify-center gap-20 h-full absolute top-0 right-0 w-[30%]'
                >
                    {benefitsData.map((benefit, index) => {
                        return (
                            <motion.div
                                key={index}
                                className={`supplement-benefit-card benefit-card-${index + 1} relative right-[24%]`}
                            >
                                <div className="flex items-center justify-center h-full text-left benefit-card-inner rounded-2xl aspect-[4.76/3.54] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-[1]  transition-all duration-300" />
                                    <img
                                        src={benefit.image}
                                        alt={benefit.title}
                                        className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                                    />
                                    <div className="w-full h-full flex flex-col items-start justify-end p-10 gap-3 relative z-[2]">
                                        <h3 className='font-recoletta text-white text-3xl'>{benefit.title}</h3>
                                        <p className='text-white/90 text-base leading-relaxed'>{benefit.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    )
}

export default SupplementBenefits