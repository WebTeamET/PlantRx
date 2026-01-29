import LiquidMorphSection from "@/components/essentialOil/LiquidMorphSection";
import OilBanner from "@/components/essentialOil/OilBanner";

export default function EssentialOils() {
  return (
    <main className="relative min-h-screen">
        <div className="w-full flex flex-col">
          <OilBanner />
          <LiquidMorphSection />
        </div>
    </main>
  );
}