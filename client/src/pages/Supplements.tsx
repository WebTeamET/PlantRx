import AddToCart from "@/components/SticktATC";
import SupplementBanner from "@/components/supplements/SupplementBanner";
import SupplementBenefits from "@/components/supplements/SupplementBenefits";
  
export default function Supplements() {
  return (
    <main className="relative min-h-screen">
      {/* <AddToCart /> */}
      <div className="relative z-10">
        <SupplementBanner />
        <SupplementBenefits />
      </div>
    </main>
  );
}