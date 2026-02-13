import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { useIsMediaQuery } from '@/hooks/useIsMediaQuery';
import { slideUpVariants } from '@/animation/framerMotionVariants'
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string
  title: string
  price: number | string
  productLink: string
  cardBgColor: string
  productImage: string
  ingredients: Array<string>
}

interface ProductCardProps {
  product: Product
}

const ingredientPositions = [
  { top: "-10%", left: "-14%", rotate: 0, delay: 0 },
  { top: "50%", right: "-10%", rotate: 20, delay: 0.1 },
  { bottom: "50%", right: "-8%", rotate: 20, delay: 0.15 },
  { bottom: "-10%", left: "-10%", rotate: -30, delay: 0.05 }
];

function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, setCartOpen } = useCart();
  const isTablet = useIsMediaQuery(1200);
  const isMobile = useIsMediaQuery(768);

  const handleClick = async () => {
    setLoading(true);
    try {
      const success = await addToCart(product as any, product.id);
      if (success) {
        setCartOpen(true);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={slideUpVariants as any}
      style={{
        backfaceVisibility: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='card-product-wrapper h-auto relative'
    >


      <div className="card-inner flex flex-col lg:gap-5 gap-3 rounded-lg h-full">
        <div
          className="card-image-wrapper aspect-square rounded-lg relative overflow-visible"
          style={{ background: product.cardBgColor }}
        >
          <img
            src={product.productImage}
            alt='product-image'
            className='w-full h-full object-contain relative z-[9] transition-all'
          />
          <AnimatePresence>
            {!isTablet && isHovered && product.ingredients.map?.((imgSrc, index) => {
              const pos = ingredientPositions[index % ingredientPositions.length];
              return (
                imgSrc && (
                  <motion.img
                    key={index}
                    src={imgSrc}
                    alt="ingredient"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      y: 0,
                      rotate: pos.rotate
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: pos.delay
                    }}
                    className="absolute z-[40] 2xl:w-[120px] w-[100px] object-contain pointer-events-none"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      right: pos.right,
                      bottom: pos.bottom
                    }}
                  />
                )
              );
            })}
          </AnimatePresence>
        </div>

        <div className="card-content flex flex-col items-center px-5 h-full">
          <h3 className='product-title text-center grow h-full'>
            <a href={product.productLink} className='!font-recoletta parent-link-wrapper'>{product.title}</a>
          </h3>
          <div className="price-container lg:mt-5 mt-3">
            <p className='text-black'>${product.price}</p>
          </div>
        </div>
        <div className="add-to-cart-btn flex justify-center relative z-[41] ">
          <button
            className={`ctm-button btn-green  ${loading ? "loading" : ""}`}
            onClick={handleClick}
            disabled={loading}
          >
            Add to cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard