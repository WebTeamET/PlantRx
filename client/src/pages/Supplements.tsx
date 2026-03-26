import { useEffect } from "react";
import Lenis from "lenis";
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
        <SupplementHeroBanner />
        <SupplementWhyUse />
        <SupplementMarquee />
        <SupplementHowWorks />
        <SupplementIngredients />
        <SupplementHowToUse />
        <SupplementQualityStandards />
        <SupplementWhoAvoid />
        <SupplementFaq />
        <SupplementDescription />
      </div>
    </main>
  );
}
