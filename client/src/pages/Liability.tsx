import Header from "@/components/Header";
import { BackButton } from "@/components/BackButton";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Scale, AlertTriangle, ShieldX, CheckCircle, FileWarning, Gavel, Mail, Shield,
  FileText, MessageCircle, XCircle
} from "lucide-react";
import { containerVariants, slideUpVariants } from "@/animation/framerMotionVariants";
import { SplitText } from "@/utils/SplitText";

const fadeInUp = {
  initial: { opacity: 0.92, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.35, ease: "easeOut" }
};

export default function Liability() {
  return (
    <div className="min-h-screen bg-gold/5 dark:bg-gray-950">
      <SEOHead 
        title="Liability Waiver - Terms of Use | PlantRx"
        description="Liability waiver and terms for using PlantRx. Understand your responsibilities and our limitations when using our natural health information platform."
        keywords="liability waiver, terms of use, disclaimer, risk assumption, PlantRx liability"
        canonical="https://plantrxapp.com/liability"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)]  dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <BackButton className="!text-white" />

          <div className="text-center mt-4 sm:mt-6 lg:mt-8">
            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 bg-white dark:bg-green/20 text-green dark:text-green px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green">
                <Scale className="w-4 h-4" />
                Legal Information
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl dark:text-white font-bold text-white mb-2 sm:mb-3 lg:mb-4">
              <SplitText text="Liability Waiver" />
            </h1>
            
            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-sm sm:text-base lg:text-lg text-white max-w-2xl mx-auto">
                Understanding your responsibilities and our limitations when using PlantRx.
              </p>
              <p className="text-sm text-white dark:text-gray-400 mt-6">
                Last updated: November 2025
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Important Notice Banner */}
      <section className="py-8 bg-gold/10 dark:bg-gray-900 border-y border-gold/30 dark:border-gold/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
            {...fadeInUp}
          >
            <div className="w-16 h-16 bg-green rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Important Legal Notice</h2>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
                By using PlantRx, you acknowledge that you have read, understood, and agree to this liability waiver. If you do not agree to these terms, please do not use our platform.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gold/5 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row - Two Cards */}
          <motion.div
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid lg:grid-cols-2 gap-6 mb-6"
          >
            {/* Assumption of Risk */}
            <motion.div variants={slideUpVariants as any}>
              <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                  <div className="w-12 h-12 bg-gold/20 dark:bg-gold/10 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-gold dark:text-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Assumption of Risk</h2>
                </div>
                <CardContent className="!p-4 sm:!p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                    By accessing PlantRx, you expressly acknowledge and agree that:
                  </p>
                  <div className="space-y-3">
                    {[
                      "All content is for educational purposes only",
                      "Information may not be suitable for everyone",
                      "Individual results may vary",
                      "You use information at your own risk",
                      "You are responsible for your health decisions"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-gold/10 dark:bg-gray-800 rounded-lg border border-gold/20 dark:border-gold/10">
                        <span className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i+1}</span>
                        <span className="text-gray-900 dark:text-white text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Release of Claims */}
            <motion.div variants={slideUpVariants as any}>
              <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                  <div className="w-12 h-12 bg-gold/20 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <ShieldX className="w-6 h-6 text-gold dark:text-red-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Release of Claims</h2>
                </div>
                <CardContent className="!p-4 sm:!p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                    You hereby release, waive, and forever discharge:
                  </p>
                  <div className="space-y-3">
                    {[
                      "PlantRx Ltd and its subsidiaries",
                      "Officers, directors, and employees",
                      "Content contributors and advisors",
                      "Third-party service providers"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gold/20 dark:bg-gray-800 rounded-lg border border-gold/20 dark:border-red-700">
                        <XCircle className="w-5 h-5 text-gold dark:text-red-400 flex-shrink-0" />
                        <span className="text-gray-900 dark:text-white text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
                    From any claims arising from your use of PlantRx or any products purchased through our platform.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Limitation of Liability - Full Width */}
          <motion.div className="mb-6" {...fadeInUp}>
            <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden">
              <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                <div className="w-12 h-12 bg-gold/20 dark:bg-gold/10 rounded-xl flex items-center justify-center">
                  <Scale className="w-6 h-6 text-gold dark:text-gold" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. Limitation of Liability</h2>
              </div>
              <CardContent className="!p-4 sm:!p-6">
                <div className="bg-gold/10 dark:bg-gray-800 border-l-4 border-gold p-4 rounded-r-lg mb-6">
                  <p className="text-gray-900 dark:text-white font-medium">
                    To the maximum extent permitted by law, PlantRx Ltd shall not be liable for any damages whatsoever arising from your use of our platform.
                  </p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">This includes but is not limited to:</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Direct or indirect damages",
                    "Consequential damages",
                    "Incidental damages",
                    "Loss of profits or data",
                    "Personal injury or health issues",
                    "Property or financial losses"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gold/5 dark:bg-gray-800 rounded-lg border border-gold/20 dark:border-gold/10">
                      <span className="text-gold text-lg">⊘</span>
                      <span className="text-gray-900 dark:text-white text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Second Row */}
          <motion.div
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid lg:grid-cols-2 gap-6 mb-6"
          >
            {/* Your Responsibilities */}
            <motion.div variants={slideUpVariants as any}>
              <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                  <div className="w-12 h-12 bg-green/10 dark:bg-green/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green dark:text-green" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. Your Responsibilities</h2>
                </div>
                <CardContent className="!p-4 sm:!p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                    By using PlantRx, you agree to:
                  </p>
                  <div className="space-y-3">
                    {[
                      "Consult healthcare professionals before acting",
                      "Disclose natural remedy use to your doctors",
                      "Verify information with medical sources",
                      "Monitor your health for adverse effects",
                      "Follow all safety guidelines"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-green/10 dark:bg-gray-800 rounded-lg border border-green/20 dark:border-green/10">
                        <CheckCircle className="w-5 h-5 text-green dark:text-green flex-shrink-0" />
                        <span className="text-gray-900 dark:text-white text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* No Warranties */}
            <motion.div variants={slideUpVariants as any}>
              <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                  <div className="w-12 h-12 bg-gold/20 dark:bg-gold/10 rounded-xl flex items-center justify-center">
                    <FileWarning className="w-6 h-6 text-gold dark:text-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">5. No Warranties</h2>
                </div>
                <CardContent className="!p-4 sm:!p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                    PlantRx is provided "as is" without warranties including:
                  </p>
                  <div className="space-y-3">
                    {[
                      "Merchantability or fitness for purpose",
                      "Accuracy or completeness of content",
                      "Reliability of information provided",
                      "Uninterrupted or error-free operation",
                      "Results from using our platform"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gold/5 dark:bg-gray-800 rounded-lg border border-gold/20 dark:border-gold/10">
                        <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                        <span className="text-gray-900 dark:text-white text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Bottom Row */}
          <motion.div
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Indemnification */}
            <motion.div variants={slideUpVariants as any}>
              <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                  <div className="w-12 h-12 bg-green/10 dark:bg-green/20 rounded-xl flex items-center justify-center">
                    <Gavel className="w-6 h-6 text-green dark:text-green" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">6. Indemnification</h2>
                </div>
                <CardContent className="!p-4 sm:!p-6">
                  <div className="bg-green/10 dark:bg-gray-800 rounded-xl p-5 border border-green/20 dark:border-green/10">
                    <p className="text-base sm:text-lg text-gray-900 dark:text-white leading-relaxed">
                      You agree to indemnify, defend, and hold harmless PlantRx Ltd and its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, costs, and expenses (including legal fees) arising from your use of the platform or violation of these terms.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Acknowledgment */}
            <motion.div variants={slideUpVariants as any}>
              <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                  <div className="w-12 h-12 bg-gold/20 dark:bg-gold/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-gold dark:text-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">7. Acknowledgment</h2>
                </div>
                <CardContent className="!p-4 sm:!p-6">
                  <div className="bg-gold/10 dark:bg-gray-800 rounded-xl p-5 border border-gold/20 dark:border-gold/10">
                    <p className="text-base sm:text-lg text-gray-900 dark:text-white leading-relaxed">
                      By using PlantRx, you acknowledge that you have carefully read this liability waiver, understand its contents, and agree to be bound by its terms. You confirm that you are voluntarily using our platform with full knowledge of the associated risks.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white dark:bg-gray-900 border-t border-gold/20 dark:border-gold/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/terms" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green dark:hover:text-green transition-colors">
              <FileText className="w-4 h-4" />
              Terms & Conditions
            </Link>
            <Link href="/disclaimer" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green dark:hover:text-green transition-colors">
              <Shield className="w-4 h-4" />
              Medical Disclaimer
            </Link>
            <Link href="/privacy-policy" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green dark:hover:text-green transition-colors">
              <Shield className="w-4 h-4" />
              Privacy Policy
            </Link>
            <Link href="/contact" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green dark:hover:text-green transition-colors">
              <MessageCircle className="w-4 h-4" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}