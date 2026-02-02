import SupplementBanner from "@/components/supplements/SupplementBanner";
import SupplementBenefits from "@/components/supplements/SupplementBenefits";

export default function Supplements() {
  return (
    <main className="relative min-h-screen">
        <SupplementBanner />
        <SupplementBenefits />
    </main>
  );
}