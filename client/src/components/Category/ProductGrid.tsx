import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard2';
import { motion } from 'framer-motion';
import { slideUpVariants, containerVariants } from '@/animation/framerMotionVariants';
import { shopifyService, type ShopifyProduct, getProductIngredients } from '@/lib/shopify';
import { stripsProductData } from './CategoryData';


interface ProductGridProps {
    data?: Array<any>;
    collectionName?: string;
    title?: React.ReactNode;
}

// function ProductGrid({ data: initialData }: ProductGridProps) {
function ProductGrid({ data: initialData, collectionName, title }: ProductGridProps) {
    const [products, setProducts] = useState<any[]>(initialData || []);
    const [loading, setLoading] = useState(!initialData);

    useEffect(() => {
        if (!initialData) {
            const loadProducts = async () => {
                try {
                    setLoading(true);
                    const fetchedProducts = await shopifyService.fetchProducts();

                    // const mappedProducts = fetchedProducts.map((p: ShopifyProduct) => {
                    let filteredProducts = fetchedProducts;
                    if (collectionName) {
                        const targetLower = collectionName.toLowerCase();
                        filteredProducts = fetchedProducts.filter((p: ShopifyProduct) => {
                            // Helper to check if a product is a Strip
                            const isStrip =
                                p.productType?.toLowerCase().includes('strip') ||
                                p.title.toLowerCase().includes('strip') ||
                                p.tags?.some(t => t.toLowerCase().includes('strip'));

                            // For "Strips" collection
                            if (targetLower.includes('strip')) {
                                return isStrip;
                            }

                            // For "Herbal Capsules" or "Supplements" collection
                            if (targetLower.includes('capsule') || targetLower.includes('supplement')) {
                                // If there are only 2 collections, everything that is NOT a strip goes here
                                return !isStrip;
                            }

                            // Generic fallback
                            if (p.productType && p.productType.toLowerCase().includes(targetLower)) return true;
                            if (p.tags && p.tags.some(t => t.toLowerCase().includes(targetLower))) return true;

                            return false;
                        });
                    }

                    const mappedProducts = filteredProducts.map((p: ShopifyProduct) => {
                        const staticMatch = stripsProductData.products.find(
                            sp => sp.title.toLowerCase() === p.title.toLowerCase()
                        );
                        const metafieldIngredients = getProductIngredients(p);
                        const finalIngredients = metafieldIngredients.length > 0
                            ? metafieldIngredients
                            : (staticMatch?.ingredients || []);
                        return {
                            id: p.id,
                            title: p.title,
                            variantId: p.variants[0]?.id || "",
                            price: p.variants[0]?.price.amount || "0.00",
                            // productLink: `/strips/${p.handle}`,
                            productLink: (collectionName && collectionName.toLowerCase().includes('capsule')) ? `/supplements/${p.handle}` : `/strips/${p.handle}`,

                            productImage: p.images[0]?.url || '',
                            cardBgColor: '#F3F4F6',
                            ingredients: finalIngredients

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
            viewport={{ margin: "-80px", once: true }}
            className="collection-product-grid md:pb-[100px] pb-16 relative product-section overflow-hidden">
            <div className="container">
                <motion.h2
                    variants={slideUpVariants as any}
                    className='xl:mb-20 mb-10 text-center dark:text-white'
                >
                    {/* Discover <span className='text-gold dark:text-gold'>Strips</span> */}
                    {title || <>Discover <span className='text-gold'>Strips</span></>}
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