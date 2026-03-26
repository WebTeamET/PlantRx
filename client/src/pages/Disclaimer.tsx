import Header from "@/components/Header";
import { BackButton } from "@/components/BackButton";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  AlertTriangle, Heart, Pill, Stethoscope, Phone, Sparkles, Shield, FileText,
  MessageCircle, XCircle, CheckCircle
} from "lucide-react";
import { containerVariants, slideRightVariants, slideUpVariants } from "@/animation/framerMotionVariants";
import { SplitText } from "@/utils/SplitText";

const fadeInUp = {
  initial: { opacity: 0.92, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.35, ease: "easeOut" }
};

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gold/5 dark:bg-gray-950">
      <SEOHead 
        title="Medical Disclaimer - Important Health Information | PlantRx"
        description="Important medical disclaimer for PlantRx. Our natural remedy information is for educational purposes only and is not a substitute for professional medical advice."
        keywords="medical disclaimer, health disclaimer, natural remedies disclaimer, educational information, PlantRx disclaimer"
        canonical="https://plantrxapp.com/disclaimer"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <BackButton className="!text-white" />
          
          <motion.div className="text-center mt-8" {...fadeInUp}>
            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 bg-white dark:bg-green/20 text-green dark:text-green px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green">
                <AlertTriangle className="w-4 h-4" />
                Important Notice
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
              <SplitText text="Medical Disclaimer" />
            </h1>
            
            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-xl text-white dark:text-gray-300 max-w-2xl mx-auto">
                Important information about the nature of our content and your health decisions.
              </p>
              <p className="text-sm text-white dark:text-gray-300 mt-6">
                Last updated: December 2025
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Critical Warning Banner */}
      <section className="py-6 bg-green/10 border border-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-center gap-3 text-green text-center"
            {...fadeInUp}
          >
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <p className="font-medium text-green">
              PlantRx is for <strong>EDUCATIONAL PURPOSES ONLY</strong> — Not a substitute for professional medical advice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gold/5 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row */}
          <motion.div
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-6"
          >
            {/* Not Medical Advice */}
            <motion.div variants={slideUpVariants as any}>
              <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                  <div className="w-12 h-12 bg-gold/20 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-gold dark:text-red-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Not Medical Advice</h2>
                </div>
                <CardContent className="!p-4 sm:!p-6">
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                    The content on PlantRx is for general informational and educational purposes only.
                  </p>
                  <div className="space-y-3">
                    {[
                      "NOT medical advice",
                      "NOT for self-diagnosis",
                      "NOT for self-treatment",
                      "NOT a replacement for healthcare"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gold/20 dark:bg-gray-800 rounded-lg border border-gold/20 dark:border-red-700">
                        <XCircle className="w-5 h-5 text-gold dark:text-red-400 flex-shrink-0" />
                        <span className="text-gray-900 dark:text-white font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Natural Remedies Warning */}
            <motion.div variants={slideUpVariants as any}>
              <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                  <div className="w-12 h-12 bg-gold/20 dark:bg-gold/10 rounded-xl flex items-center justify-center">
                    <Pill className="w-6 h-6 text-gold dark:text-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Natural ≠ Risk-Free</h2>
                </div>
                <CardContent className="!p-4 sm:!p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                    "Natural" does not mean safe for everyone or free of side effects.
                  </p>
                  <div className="bg-gold/10 dark:bg-gray-800 rounded-xl p-5 border border-gold/20 dark:border-gold/10">
                    <p className="font-semibold text-gold dark:text-gold mb-3">Natural remedies can:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        "Interact with medications",
                        "Cause allergic reactions",
                        "Be unsafe during pregnancy",
                        "Harm children or elderly"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-gold dark:text-gold flex-shrink-0" />
                          <span className="text-gray-900 dark:text-white">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Second Row - Consult Professional (Full Width) */}
          <motion.div className="mb-6" {...fadeInUp}>
            <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden">
              <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                <div className="w-12 h-12 bg-green/10 dark:bg-green/20 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-green dark:text-green" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Always Consult a Healthcare Professional</h2>
              </div>
              <CardContent className="!p-4 sm:!p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                  Before starting any new health regimen, herbal supplement, or natural remedy:
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Consult with your doctor",
                    "Discuss medication interactions",
                    "Get proper diagnosis",
                    "Consider your medical history",
                    "Account for allergies",
                    "Seek advice if pregnant"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-green/10 dark:bg-green/5 rounded-lg border border-green/20 dark:border-green/10">
                      <CheckCircle className="w-5 h-5 text-green dark:text-green flex-shrink-0" />
                      <span className="text-gray-900 dark:text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Third Row */}
          <motion.div
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-6"
          >
            {/* Emergency Situations */}
            <motion.div variants={slideUpVariants as any}>
              <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                  <div className="w-12 h-12 bg-green/10 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green dark:text-red-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Medical Emergencies</h2>
                </div>
                <CardContent className="!p-4 sm:!p-6">
                  <div className="bg-gold/10 dark:bg-gray-800 rounded-xl p-5 text-center mb-5 border border-gold/20 dark:border-red-600">
                    <p className="text-green dark:text-red-300 font-bold text-lg mb-2">
                      DO NOT use PlantRx for emergencies
                    </p>
                    <p className="text-green dark:text-red-400">
                      Call emergency services immediately
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { number: "999", country: "UK" },
                      { number: "911", country: "US" },
                      { number: "112", country: "EU" }
                    ].map((item, i) => (
                      <div key={i} className="text-center p-4 bg-gold/5 dark:bg-gray-800 rounded-xl border border-gold/20 dark:border-gold/10">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{item.number}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.country}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Content Disclaimer */}
            <motion.div variants={slideRightVariants as any}>
              <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                  <div className="w-12 h-12 bg-green/10 dark:bg-green/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-green dark:text-green" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Content (Remy)</h2>
                </div>
                <CardContent className="!p-4 sm:!p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                    PlantRx features "Remy," an AI-powered assistant. Please be aware:
                  </p>
                  <div className="space-y-3">
                    {[
                      "AI responses may contain inaccuracies",
                      "NOT reviewed by medical professionals",
                      "Always verify with healthcare providers",
                      "We are not liable for AI-based actions"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gold/10 dark:bg-gray-800 rounded-lg border border-gold/20 dark:border-gold/10">
                        <AlertTriangle className="w-4 h-4 text-gold dark:text-gold flex-shrink-0" />
                        <span className="text-gray-900 dark:text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Bottom Row - Assumption of Risk (Full Width) */}
          <motion.div {...fadeInUp}>
            <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden">
              <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                <div className="w-12 h-12 bg-gold/20 dark:bg-gold/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-gold dark:text-gold" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Assumption of Risk</h2>
              </div>
              <CardContent className="!p-4 sm:!p-6">
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                  By using PlantRx, you acknowledge and agree that:
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: AlertTriangle, text: "You use all information at your own risk" },
                    { icon: Heart, text: "You are solely responsible for your health decisions" },
                    { icon: Shield, text: "PlantRx Ltd is not liable for any adverse effects" },
                    { icon: Stethoscope, text: "You will seek professional medical advice when needed" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-5 bg-gold/5 dark:bg-gold/5 rounded-xl border border-gold/20 dark:border-gold/10">
                      <item.icon className="w-8 h-8 text-gold dark:text-gold mb-3" />
                      <span className="text-gray-900 dark:text-white text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
            <Link href="/privacy-policy" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green dark:hover:text-green transition-colors">
              <Shield className="w-4 h-4" />
              Privacy Policy
            </Link>
            <Link href="/liability" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green dark:hover:text-green transition-colors">
              <AlertTriangle className="w-4 h-4" />
              Liability Waiver
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