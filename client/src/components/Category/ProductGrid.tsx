import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard2';
import { motion } from 'framer-motion';
import { slideUpVariants, containerVariants } from '@/animation/framerMotionVariants';
import { shopifyService, type ShopifyProduct } from '@/lib/shopify';
import { stripsProductData } from './CategoryData';


interface ProductGridProps {
    data?: Array<any>;
}

function ProductGrid({ data: initialData }: ProductGridProps) {
    const [products, setProducts] = useState<any[]>(initialData || []);
    const [loading, setLoading] = useState(!initialData);

    useEffect(() => {
        if (!initialData) {
            const loadProducts = async () => {
                try {
                    setLoading(true);
                    const fetchedProducts = await shopifyService.fetchProducts();
                    
                    const mappedProducts = fetchedProducts.map((p: ShopifyProduct) => {
                        // Find matching static data for ingredients and color
                        const staticMatch = stripsProductData.products.find(
                            sp => sp.title.toLowerCase() === p.title.toLowerCase()
                        );

                        return {
                            id: p.id,
                            title: p.title,
                            price: p.variants[0]?.price.amount || "0.00",
                            productLink: `/store/${p.handle}`,
                            productImage: p.images[0]?.src || '',
                            cardBgColor: '#F3F4F6', 
                            ingredients: staticMatch?.ingredients || [] 
                        };
                    });
                    
                    setProducts(mappedProducts);
                } catch (error) {
                    console.error('Error fetching Shopify products:', error);
                } finally {
                    setLoading(false);
                }
            };
            loadProducts();
        }
    }, [initialData]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
            </div>
        );
    }

    return (
        <motion.div 
        variants={containerVariants as any}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, once: true }}
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
                    {products && products.map((product, idx) => (
                        <ProductCard key={product.id || idx} product={product} />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default ProductGrid