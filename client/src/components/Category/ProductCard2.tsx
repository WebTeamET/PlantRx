import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'

interface Product {
  id: string
  title: string
  price: number
  productLink: string
  cardBgColor: string
  productImage: string
  ingredients: Array<string> 
}

interface ProductCardProps {
  product: Product
}

const ingredientPositions = [
  { top: "-8%", left: "-10%", rotate: 0, delay: 0 },
  { top: "25%", right: "-12%", rotate: 20, delay: 0.1 },
  { bottom: "5%", right: "-8%", rotate: 15, delay: 0.15 },
  { bottom: "20%", left: "-15%", rotate: -30, delay: 0.05 },
];

function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false); 

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  };

  return (
    <motion.div 
      initial={{ y: 300, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1}}
      viewport={{ once: true }}
      transition={{ 
          duration: 1.2, 
          delay:0.2,
          ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='card-product-wrapper h-auto relative' 
    >
      {/* <AnimatePresence>
        {isHovered && product.ingredients.map((imgSrc, index) => {
          const pos = ingredientPositions[index % ingredientPositions.length];
          return (
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
              className="absolute z-10 w-[120px] object-contain pointer-events-none"
              style={{
                top: pos.top,
                left: pos.left,
                right: pos.right,
                bottom: pos.bottom
              }}
            />
          );
        })}
      </AnimatePresence> */}

      <div className="card-inner flex flex-col gap-5 rounded-lg h-full">
        <div 
          className="card-image-wrapper p-10 aspect-square rounded-lg relative overflow-visible"
          // style={{background: product.cardBgColor}}
        >
          <img 
            src={product.productImage} 
            alt='product-image' 
            className='w-full h-full object-contain relative z-[9] transition-all' 
            // style={isHovered ? { rotate: '15deg' } : undefined}
          />
        </div>

        <div className="card-content flex flex-col items-center px-5 h-full">
          <h3 className='product-title text-center grow h-full'>
            <a href={product.productLink} className='!font-recoletta parent-link-wrapper'>{product.title}</a>
          </h3>
          <div className="price-container mt-5">
            <p className='text-black'>${product.price}</p>
          </div>
          <div className="add-to-cart-btn mt-5">
            <button
              className={`button relative overflow-hidden bg-green border-0 max-md:text-xs max-md:leading-[15px] text-white md:min-w-[180px] max-md:px-3 max-md:py-1 max-md:min-w-full max-md:min-h-[34px] ${loading ? "loading" : ""}`}
              onClick={handleClick}
              disabled={loading}
            >
              <span className="text-base leading-[26px] font-semibold block relative max-md:text-xs max-md:leading-[15px] text-white tracking-[0.3px]">Add to cart</span>
              <div className="cart">
                <svg viewBox="0 0 36 26">
                  <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
                  <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard