import RevealText from '@/utils/RevealText';
import { CustomValueType, motion, MotionStyle } from 'framer-motion';
import React from 'react';  

interface CollectionBannerProps {
  data: any;
}

const CollectionBanner: React.FC<CollectionBannerProps> = ({ data }) => {
  return (
    <div className="collection-banner relative product-section">
        {data.floatingElements.map((item: { id: React.Key | null | undefined; position: MotionStyle | undefined; rotate: string | number | CustomValueType | null | undefined; delay: number; blur: any; src: string | undefined; alt: string | undefined; }) => (
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
                                        className={`w-28 md:w-36 ${item.blur ? 'blur-[2px]' : ''}`}
                                    >
                                        <img 
                                            src={item.src} 
                                            alt={item.alt} 
                                            className="w-full h-auto drop-shadow-xl select-none pointer-events-none" 
                                        />
                                    </motion.div>
                                </motion.div>
            ))}
        <div className="container flex items-center justify-between text-center pt-16 flex-col">
            <div className="content-wrapper mx-auto max-w-3xl">
                <motion.h1
                initial={{ y: 300, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1}}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ 
                    duration: 1.2, 
                    ease: [0.22, 1, 0.36, 1] 
                }}
                >{data.tagline}</motion.h1>
                <motion.p 
                initial={{ y: 300, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ 
                    duration: 1.2, 
                    ease: [0.22, 1, 0.36, 1] 
                }}
                className='h1 !font-recoletta text-gold'>{data.title}</motion.p>
            </div>
            <div className="image-wrapper">
                <div className="flex items-center justify-center -mt-5">
                        <motion.div 
                        initial={{ y: 100, scale:0, opacity: 0 }}
                        whileInView={{ y: 0, scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                            duration: 1.2, 
                            ease: [0.22, 1, 0.36, 1] 
                        }}
                        className='image max-w-6xl mx-auto'>
                            <img src={data.productImage} alt='collection-product-image' className='w-full h-full object-contain'></img>
                        </motion.div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CollectionBanner;