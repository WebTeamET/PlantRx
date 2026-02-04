import SupplementBanner from "@/components/supplements/SupplementBanner";
import SupplementBenefits from "@/components/supplements/SupplementBenefits";
import CustomCursor from "@/utils/CustomCursor";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Supplements() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [hideCTA, setHideCTA] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // reset after animation finishes
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  };

  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideCTA(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);
  return (
    <main className="relative min-h-screen">
      <CustomCursor />
      <motion.div
        className="fixed md:bottom-10 bottom-5 z-[999] flex justify-center items-center w-full product-section px-5"
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
            <div className="image-wrapper md:size-[100px] size-[70px] shrink-0"> 
              <img src="/focus-strips.png" alt="prodyct-image" className="w-full h-full object-contain"></img>
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
            className={`button relative overflow-hidden bg-green border-0 max-md:text-xs max-md:leading-[15px] text-white md:min-w-[150px] max-md:px-3 max-md:py-1 max-md:min-w-full max-md:min-h-[34px] ${loading ? "loading" : ""}`}
            onClick={handleClick}
            disabled={loading}
            >
              <span className="text-sm leading-[26px] font-bold block relative max-md:text-xs max-md:leading-[15px] text-white">Add to cart</span>
              <div className="cart">
                <svg viewBox="0 0 36 26">
                  <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
                  <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
                </svg>
              </div>
            </button> 
          </div>
        </div>
      </motion.div>
      <div className="relative z-10">
        <SupplementBanner />
        <SupplementBenefits />
      </div>
    </main>
  );
}