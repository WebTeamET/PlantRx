import React from 'react';
import ProductCard from './ProductCard2';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { slideUpVariants, containerVariants } from '@/animation/framerMotionVariants';

interface ProductGridProps {
    data: Array<any>;
}

function ProductGrid({ data }: ProductGridProps) {
    return (
        <motion.div 
        variants={containerVariants as any}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        className="collection-product-grid md:pb-[100px] pb-16 relative product-section overflow-hidden">
            <div className="container">
                <motion.h2
                    variants={slideUpVariants as any}
                    className='xl:mb-20 mb-10 text-center'
                >
                    Discover <span className='text-gold'>Strips</span>
                </motion.h2>
                <div 
                className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-20 md:gap-10 gap-x-5 gap-y-10 items-stretch">
                    {data && data.map((product, idx) => (
                        <ProductCard key={product.id || idx} product={product} />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default ProductGrid