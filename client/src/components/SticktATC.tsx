import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

function AddToCart() {
    const [hideCTA, setHideCTA] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideCTA(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );
    return () => observer.disconnect();
  }, []);
  return (
    <motion.div
        className="fixed md:bottom-10 bottom-[50px] z-[999] flex justify-center items-center w-full product-section px-5"
        animate={{
          y: hideCTA ? 120 : 0,
          opacity: hideCTA ? 0 : 1,
          scale: hideCTA ? 0.95 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      >
        <div className="max-w-2xl w-full rounded-lg shadow-xl flex items-center justify-between md:gap-10 gap-3 bg-white md:px-5 px-3 md:py-2 py-3">
          <div className="flex items-center md:gap-5 gap-2">
            <div className="image-wrapper md:size-[100px] size-[70px] shrink-0 rounded-[6px]"> 
              <img src="/focus-strips.png" alt="prodyct-image" className="w-full h-full object-contain rounded-[6px]"></img>
            </div>
            <div className="flex items-start justify-start flex-col md:gap-2 gap-1 *:text-black">
              <h4 className="md:text-xl text-base max-[370px]:text-sm">Mushroom Focus Strip</h4>
              <div className="price">
                <p className="text-base max-[370px]:text-sm !font-semibold opacity-70">$99.99</p>
              </div>
            </div>
          </div>
          <div className="add-to-cart-btn shrink-0">
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

export default AddToCart