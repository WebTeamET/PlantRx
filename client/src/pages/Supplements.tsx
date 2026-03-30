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
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";

export default function Supplements() {
  const { handle } = useParams();
  const [, setLocation] = useLocation();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="relative z-10">
        <SupplementHeroBanner product={product} />
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
      </div>
    </main>
  );
}
