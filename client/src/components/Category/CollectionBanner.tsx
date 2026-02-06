import { CustomValueType, motion, MotionStyle, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile'
import { itemScaleUpVariants, slideUpVariants, containerVariants } from '@/animation/framerMotionVariants';


interface CollectionBannerProps {
    data: any;
}

const CollectionBanner: React.FC<CollectionBannerProps> = ({ data }) => {
    const isMobile = useIsMobile(1024);
    const containerRef = useRef(null);

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
    return (
        <div ref={containerRef} onMouseMove={handleMouseMove} className="collection-banner relative product-section xl:h-[160vh] h-[150vh]">
            <motion.div
                variants={containerVariants as any}
                initial="hidden"
                animate="visible"
                className=" flex items-center justify-start text-center flex-col h-full px-4 sm:px-6 lg:px-8 md:pb-[100px] pb-[55px]">
                <div className='sticky xl:top-[20%] sm:top-[40%] top-[20%] -translate-1/2 xl:h-[52vh] sm:h-[60vh] h-[50vh] w-full'>
                    {!isMobile &&
                        data.floatingElements.map(
                            (item: { id: React.Key | null | undefined; position: MotionStyle | undefined; rotate: string | number | CustomValueType | null | undefined; delay: number; blur: any; src: string | undefined; alt: string | undefined; }) => (
                                <motion.div
                                    key={item.id}
                                    style={{
                                        position: 'absolute',
                                        ...item.position,
                                        zIndex: 1
                                    }}
                                    initial={{ y: 200, opacity: 0, rotate: item.rotate ?? 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
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
                                            rotate: [
                                                item.rotate ?? 0,
                                                (typeof item.rotate === 'number' ? item.rotate + 5 : 5),
                                                item.rotate ?? 0
                                            ]
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: item.delay + 1
                                        }}
                                        className={`w-28 min-[1440px]:w-36 ${item.blur ? 'blur-[2px]' : ''}`}
                                    >
                                        <motion.img
                                            src={item.src}
                                            alt={item.alt}
                                            style={{
                                                translateX: mouseMoveX,
                                                translateY: mouseMoveY,
                                            }}
                                            className="w-full h-auto drop-shadow-xl select-none pointer-events-none"
                                        />
                                    </motion.div>
                                </motion.div>
                            ))}
                    <div
                        className="content-wrapper mx-auto xl:max-w-3xl max-w-xl ">
                        <motion.h1
                            variants={slideUpVariants as any}
                            className='h1 mb-3'
                            style={{
                                willChange: 'transform, opacity',
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            {data.tagline}
                        </motion.h1>
                    </div>
                    <div className='w-full'>
                        <motion.p
                            variants={slideUpVariants as any}
                            style={{
                                willChange: 'transform, opacity',
                                backfaceVisibility: 'hidden'
                            }}
                            className='h1 !font-recoletta text-gold'
                        >
                            {data.title}
                        </motion.p>
                    </div>
                </div>
                <div className="image-wrapper max-md:pt-16">
                    <div className="flex justify-start">
                        {data.productImages.map((image: string) => (
                            <div className="flex items-center justify-center first:-mt-52 last:-mt-60">
                                <motion.div
                                    variants={itemScaleUpVariants}
                                    style={{
                                        willChange: 'transform, opacity',
                                        backfaceVisibility: 'hidden'
                                    }}
                                    className='image xl:max-w-[60%] sm:max-w-[90%] max-w-full mx-auto'
                                >
                                    <img
                                        src={image}
                                        alt='collection-product-image'
                                        className='w-full h-full object-contain'
                                    />
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default CollectionBanner;