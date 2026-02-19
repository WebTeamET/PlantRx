import AddToCart from "@/components/SticktATC";
import SupplementBanner from "@/components/supplements/SupplementBanner";
import SupplementBenefits from "@/components/supplements/SupplementBenefits";
import SupplementDetails from "@/components/supplements/SupplementDetails";

import { useEffect } from "react";
import Lenis from "lenis";
import SupplementFaqs from "@/components/supplements/SupplementFaqs";

export default function Supplements() {
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

  return (
    <main className="relative min-h-screen">
      <div className="relative z-10">
        <SupplementBanner />
        <SupplementDetails />
        <SupplementBenefits />
        <SupplementFaqs />
      </div>
    </main>
  );
}