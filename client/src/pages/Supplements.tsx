import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import Lenis from "lenis";
import { shopifyService, type ShopifyProduct } from "@/lib/shopify";
import SupplementHeroBanner from "@/components/supplement/SupplementHeroBanner";
import SupplementWhyUse from "@/components/supplement/SupplementWhyUse";
import SupplementMarquee from "@/components/supplement/SupplementMarquee";
import SupplementHowWorks from "@/components/supplement/SupplementHowWorks";
import SupplementIngredients from "@/components/supplement/SupplementIngredients";
import SupplementHowToUse from "@/components/supplement/SupplementHowToUse";
import SupplementQualityStandards from "@/components/supplement/SupplementQualityStandards";
import SupplementFaq from "@/components/supplement/SupplementFaq";
import SupplementWhoAvoid from "@/components/supplement/SupplementWhoAvoid";
import SupplementDescription from "@/components/supplement/SupplementDescription";
import { Loader2, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Supplements() {
  const { handle } = useParams();
  const [, setLocation] = useLocation();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart, setCartOpen } = useCart();
  const footerRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const hideCTA = footerVisible || bannerVisible;

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      try {
        setLoading(true);
        const fetchedProduct = await shopifyService.fetchProductByHandle(handle);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error loading supplement product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [handle]);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    if (!bannerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setBannerVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
    });

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf); 

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleAddToCart = async () => {
    if (!product) return;
    setAddingToCart(true);
    try {
      await addToCart(product, product.variants[0]?.id);
      setCartOpen(true);
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-green" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-4">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <Button onClick={() => setLocation("/supplements")} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Supplements
        </Button>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen">
      <SEOHead
        title={`${product.title} | PlantRx`}
        description={product.description?.substring(0, 160)}
        ogImage={product.images?.[0]?.url}
      />

      <motion.div
        className="fixed md:bottom-10 bottom-[50px] z-[999] flex justify-center items-center w-full product-section px-5"
        initial={{ y: 120, opacity: 0, scale: 0.95 }}
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
        <div className="max-w-2xl w-full rounded-lg shadow-xl flex items-center justify-between md:gap-10 gap-3 bg-white md:px-5 px-3 md:py-2 py-3 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center md:gap-5 gap-2">
            <div className="image-wrapper md:size-[100px] size-[70px] shrink-0 rounded-[6px]">
              <img
                src={product.images?.[0]?.url || "/mushroom-strip_label_box.png"}
                alt={product.title}
                className="w-full h-full object-contain rounded-[6px]"
              />
            </div>
            <div className="flex items-start justify-start flex-col md:gap-2 gap-1 *:text-black dark:*:text-black">
              <h4 className="md:text-xl text-base max-[370px]:text-sm font-recoletta">{product.title}</h4>
              <div className="price flex items-center gap-2">
                <p className="text-base max-[370px]:text-sm font-semibold opacity-70 dark:text-black">
                  ${product.variants[0]?.price.amount}
                </p>
                <div className="flex items-center text-yellow-500 dark:text-yellow-500 scale-75 origin-left">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-black ml-1 font-medium">4.9</span>
                </div>
              </div>
            </div>
          </div>
          <div className="add-to-cart-btn shrink-0">
            <button
              className={`button relative overflow-hidden ctm-button btn-green max-md:text-xs max-md:leading-[15px] text-white md:min-w-[180px] max-md:px-4 max-md:py-2 max-md:min-w-full max-md:min-h-[34px] ${
                addingToCart ? "loading" : ""
              }`}
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              <span className="text-base leading-[26px] font-semibold block relative max-md:text-xs max-md:leading-[15px] text-white tracking-[0.3px]">
                {addingToCart ? "Adding..." : "Add to cart"}
              </span>
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
        <div ref={bannerRef}>
          <SupplementHeroBanner product={product} />
        </div>
        <SupplementWhyUse product={product} />
        <SupplementMarquee product={product} marginTop={90} />
        <SupplementHowWorks product={product} />
        <SupplementMarquee product={product} marginBottom={90} />
        <SupplementIngredients product={product} />
        <SupplementHowToUse product={product} />
        <SupplementQualityStandards product={product} />
        <SupplementWhoAvoid product={product} />
        <SupplementFaq product={product} />
        <SupplementDescription product={product} />
        <div ref={footerRef} className="h-0" />
      </div>
    </main>
  );
}
