import { containerVariants, slideUpVariants } from '@/animation/framerMotionVariants';
import RevealText from '@/utils/RevealText';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

function SupplementBenefits() {
    const isTablet = useIsMobile(1025);
    const isMobile = useIsMobile(768);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeLeft, setActiveLeft] = useState(false);
    const [activeRight, setActiveRight] = useState(false);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

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
        offset: ["start start", "end end"]
    });

    const bottleRotate = useTransform(scrollYProgress, [0, 0.8], [20, 1]);
    const bottleScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.02]);
    const bottleY = useTransform(scrollYProgress, [0, 0.8], ["0vh", isMobile ? "27vh" : "35vh"]);
    const bottleX = useTransform(scrollYProgress, [0, 0.8], ["0%", "59%"]);

    const elementsOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const sideBottlesY = useTransform(scrollYProgress, [0.8, 0.9], ["100vh", "40vh"]);

    const floatingIngredients = [
        {
            id: 1,
            src: '/float-mushroom-new.png',
            alt: 'Cookie 1',
            position: isMobile
                ? { bottom: '0%', left: '20%' }
                : { bottom: '8%', left: '20%' },
            delay: 0.1,
            rotate: -15
        },
        {
            id: 2,
            src: '/float-mushroom-new.png',
            alt: 'Cookie 2',
            position: isMobile
                ? { bottom: '28%', left: '0' }
                : { bottom: '20%', left: '0' },
            delay: 0.3,
            rotate: 20,
            blur: true
        },
        {
            id: 3,
            src: '/float-mushroom-2.png',
            alt: 'Strawberry 1',
            position: isMobile
                ? { bottom: '25%', right: '7%' }
                : { bottom: '20%', right: '24%' },
            delay: 0.2,
            rotate: 10
        },
        {
            id: 4,
            src: '/float-mushroom-2.png',
            alt: 'Strawberry 2',
            position: isMobile
                ? { bottom: '10%', right: '7%' }
                : { bottom: '10%', right: '2%' },
            delay: 0.4,
            rotate: -10,
            blur: true
        },
    ];
    const benefitsData = [
        {
            "title": "Controls appetite"
        },
        {
            "title": "Facilitates metabolic performance"
        },
        {
            "title": "Liver health"
        },
        {
            "title": "Cardiovascular health",
        }
    ]

    return (
        <div ref={containerRef} className="benefits-section relative product-section">
            <div className="container mx-auto max-[1024px]:mt-24">
                {floatingIngredients.map((item) => (
                    <motion.div
                        key={item.id}
                        style={{
                            position: 'absolute',
                            ...item.position,
                            zIndex: 1
                        }}
                        initial={{ y: 300, opacity: 0, rotate: item.rotate }}
                        whileInView={{ y: 0, opacity: 1, transform: "translate3d(0, 0, 0)" }}
                        viewport={{ once: true, margin: "-10px" }}
                        transition={{
                            duration: 1.2,
                            delay: item.delay,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [item.rotate, item.rotate + 5, item.rotate]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: item.delay + 1
                            }}
                            className={`w-16 sm:w-20 lg:w-28 2xl:w-36 ${item.blur ? 'blur-[2px]' : ''}`}
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-auto drop-shadow-xl select-none pointer-events-none"
                            />
                        </motion.div>
                    </motion.div>
                ))}
                <div className="inline-block">
                    <div className="xl:sticky top-0 xl:h-dvh max-lg:mb-10 flex xl:items-center items-start z-20 float-left">
                        <div className="image-wrapper w-full relative max-md:overflow-hidden">
                            <motion.div
                                style={{ opacity: isTablet ? 1 : elementsOpacity }}
                                className="absolute -top-[110px] -right-[40px] z-0 size-[350px] lg:size-[400px] pointer-events-none"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            >
                                <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
                                    <defs>
                                        <path id="circlePath" d="M 150, 150 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                                    </defs>
                                    <text fill="#385127" className="text-sm uppercase font-bold tracking-[1.3px] font-recoletta">
                                        <textPath xlinkHref="#circlePath">Naturally crafted herbs to support daily vitality</textPath>
                                    </text>
                                </svg>
                            </motion.div>
                            <motion.div
                                style={{ opacity: isTablet ? 1 : elementsOpacity }}
                                className="absolute left-[30%] top-1/4 z-[12]"
                            >
                                <button onClick={handleLeftClick} className='relative size-9 group'>
                                    <div className="wt-dot">
                                        <div className="wt-dot__ringing border-[3px] border-green size-9 absolute opacity-0 rounded-full "></div>
                                        <div className="wt-dot__circle absolute top-6 left-1.5 size-6 rounded-full bg-green"></div>
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeLeft && (
                                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute 2xl:right-12 max-2xl:left-12 top-0 p-4 w-[200px] bg-green rounded-xl  *:text-white shadow-xl">
                                            <h3 className="text-lg">Gross Weight:</h3>
                                            <p className="text-base">0.2lb (90.7g)</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            <motion.div
                                style={{ opacity: isTablet ? 1 : elementsOpacity }}
                                className="absolute right-[32%] top-[70%] z-[12]"
                            >
                                <button onClick={handleRightClick} className="relative size-9">
                                    <div className="wt-dot">
                                        <div className="wt-dot__ringing border-[3px] border-green size-9 absolute opacity-0 rounded-full "></div>
                                        <div className="wt-dot__circle absolute top-6 left-1.5 size-6 rounded-full bg-green"></div>
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeRight && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="absolute left-12 top-0 p-4 w-[200px] bg-green rounded-xl shadow-xl *:text-white ">
                                            <h3 className="text-lg">Product Amount:</h3>
                                            <p className="text-base">90 capsules</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                            {!isTablet && (
                                <motion.div
                                    style={{
                                        y: sideBottlesY,
                                        x: "24%",
                                        scale: 0.85,
                                        willChange: "transform"
                                    }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                                    className="max-w-[600px] absolute inset-0 mx-auto aspect-square z-5"
                                >
                                    <img src='/supplement-front-view.png' alt='supplement-left' className='w-full h-full object-contain ' />
                                </motion.div>
                            )}
                            {!isTablet ? (
                                <motion.div
                                    style={{
                                        rotate: bottleRotate,
                                        y: bottleY,
                                        x: bottleX,
                                        scale: bottleScale,
                                        willChange: "transform"
                                    }}
                                    className="2xl:max-w-xl xl:max-w-[32rem] lg:max-w-md max-w-sm mx-auto aspect-square relative z-10"
                                >
                                    <img src='/supplement-front-view.png' alt='supplement' className='w-full h-full object-contain' />
                                </motion.div>
                            ) :
                                <motion.div
                                    style={{
                                        rotate: '20deg'
                                    }}
                                    className="xl:max-w-xl lg:max-w-md max-w-sm mx-auto aspect-square relative z-10"
                                >
                                    <img src='/supplement-front-view.png' alt='supplement' className='w-full h-full object-contain' />
                                </motion.div>
                            }
                            {!isTablet && (
                                <motion.div
                                    style={{
                                        y: sideBottlesY,
                                        x: "95%",
                                        scale: 0.85,
                                        willChange: "transform"
                                    }}

                                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                                    className="max-w-[600px] absolute inset-0 mx-auto aspect-square z-5"
                                >
                                    <img src='/supplement-front-view.png' alt='supplement-right' className='w-full h-full object-contain ' />
                                </motion.div>
                            )}
                        </div>
                    </div>
                    <div className="float-right xl:pl-16 lg:pl-5 xl:pt-[20vh]">
                        <motion.div
                            variants={containerVariants as any}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.2, once: true }}
                            className='2xl:max-w-xl xl:max-w-[40rem] lg:max-w-md md:max-w-xs *:text-black'
                        >
                            <motion.h2
                                variants={slideUpVariants as any}
                                className="xl:mb-6 mb-4"><span className='text-gold'>Fat Burner </span>with <span className='text-green'>MCT</span></motion.h2>
                            <motion.p
                                variants={slideUpVariants as any}
                                className="xl:mb-10 mb-5">
                                Fat Burner with MCT is designed to support healthy weight loss through vitamins and other active components.
                            </motion.p>

                            <div className="">
                                <motion.div
                                    variants={slideUpVariants as any}
                                    className="border-b border-green">
                                    <button
                                        onClick={() => setOpenAccordion(openAccordion === 'ingredients' ? null : 'ingredients')}
                                        className="w-full py-5 flex justify-between items-center xl:text-2xl text-xl !font-medium"
                                    >
                                        Ingredients
                                        <span className={`transition-transform duration-300 ${openAccordion === 'ingredients' ? 'rotate-45' : ''}`}>+</span>
                                    </button>
                                    <AnimatePresence>
                                        {openAccordion === 'ingredients' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1, transform: "translate3d(0, 0, 0)" }}
                                                exit={{ height: 0, opacity: 0, transform: "translate3d(0, 0, 0)" }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pb-6 text-black text-base">
                                                    Vitamin C (as acerbic acid), Vitamin B6 (as Pyridoxine HCL), Choline (as choline bitartrate), Chromium (as chromium polynicotinate), Medium Chain Triglycerides Oil, CLA (Conjugated Linoleic Acid), GLA (Gamma-Linolenic Acid), Bladderwrack Thallus Powder, Inositol, Gymnema Sylvestre Leaf (25% Extract), Garcinia Cambogia Fruit Extract (50% hydroxycitric acid)
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                <motion.div
                                    variants={slideUpVariants as any}
                                    className="border-b border-green">
                                    <button
                                        onClick={() => setOpenAccordion(openAccordion === 'usage' ? null : 'usage')}
                                        className="w-full py-5 flex justify-between items-center xl:text-2xl text-xl !font-medium"
                                    >
                                        How to Use
                                        <span className={`transition-transform duration-300 ${openAccordion === 'usage' ? 'rotate-45' : ''}`}>+</span>
                                    </button>
                                    <AnimatePresence>
                                        {openAccordion === 'usage' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1, transform: "translate3d(0, 0, 0)" }}
                                                exit={{ height: 0, opacity: 0, transform: "translate3d(0, 0, 0)" }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pb-6 text-black text-base">
                                                    Take 4 capsules daily with meals or as directed. For best results, take 2 capsules before breakfast and dinner with water, alongside a balanced diet and exercise.
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div
                        variants={containerVariants as any}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.2, once: true }}
                        className='xl:py-32 pb-20 pt-32 xl:h-dvh benefits-bottom-section relative z-[99] w-full overflow-hidden'>
                        <motion.h2
                            variants={slideUpVariants as any}
                            className='text-center'>Benefits of Fat Burner with MCT</motion.h2>
                        <div className="flex items-stretch justify-between gap-3 overflow-visible mt-10 flex-wrap max-xl:max-w-[40rem] max-xl:mx-auto max-md:flex-col">
                            {benefitsData.map((benefit, index) => (
                                <div key={index} className="bg-white custom-transition border border-green rounded-full px-[14px] py-2 flex flex-1 max-xl:flex-[calc(50%-12px)] max-md:flex-1 justify-center relative after:absolute after:inset-0 after:block after:w-full after:h-full after:bg-green after:rounded-full after:z-[1] after:transition-all after:scale-0 hover:after:scale-[1] group after:duration-300 shadow-md">
                                    <p className='text-base leading-[21px] text-center text-green group-hover:text-white !font-medium relative z-[2]'>{benefit.title}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
export default SupplementBenefits;