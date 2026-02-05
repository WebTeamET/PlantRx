import React from 'react';
import ProductCard from './ProductCard2';
import RevealText from '@/utils/RevealText';
import { motion } from 'framer-motion';

interface ProductGridProps {
    data: Array<any>;
}

function ProductGrid({ data }: ProductGridProps) {
    return (
        <div className="collection-product-grid py-[100px] relative product-section">
            <div className="container">
                <motion.h2 
                 initial={{ y: 300, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1}}
                 viewport={{ once: true }}
                 transition={{ 
                     duration: 1.2, 
                     ease: [0.22, 1, 0.36, 1] 
                 }}
                className='mb-20 text-center'>
                    Discover Strips
                </motion.h2>
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 items-stretch">
                    {data && data.map((product, idx) => (
                        <ProductCard key={product.id || idx} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductGrid