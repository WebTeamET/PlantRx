import Header from "@/components/Header";
import { BackButton } from "@/components/BackButton";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Package, Clock, CheckCircle, XCircle, Mail, Shield,
  FileText, MessageCircle, Camera, AlertCircle, RefreshCcw
} from "lucide-react";
import { containerVariants, slideUpVariants } from "@/animation/framerMotionVariants";
import { SplitText } from "@/utils/SplitText";

const fadeInUp = {
  initial: { opacity: 0.92, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.35, ease: "easeOut" }
};

export default function Refunds() {
  const handleEmailRefund = () => {
    window.location.href = "mailto:billing@plantrxapp.com";
  };

  return (
    <div className="min-h-screen bg-gold/5 dark:bg-gray-950">
      <SEOHead
        title="Refund Policy | PlantRx"
        description="PlantRx refund and return policy. Returns accepted for damaged or incorrect items within 7 days. Learn how to request a refund."
        keywords="refund policy, returns, money back, PlantRx refunds, damaged items"
        canonical="https://plantrxapp.com/refunds"
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
                <Shield className="w-4 h-4" />
                Refund Policy
              </div>
            </motion.div>


            <h1 className="text-4xl md:text-5xl dark:text-white font-bold text-white mb-2 sm:mb-3 lg:mb-4">
              <SplitText text="Returns & Refunds" />
            </h1>

            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-sm sm:text-base lg:text-lg text-white max-w-2xl mx-auto">
                We want you to be satisfied, but due to the nature of our products, please review our policy below.
              </p>
            </motion.div>

            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-xs sm:text-sm text-white mt-2 sm:mt-3 lg:mt-4">
                Last updated: December 2025
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-16 bg-gold/5 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Quick Summary Cards */}
          <motion.div
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-10"
          >
            {/* Card 1 */}
            <motion.div variants={slideUpVariants as any}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-lg border border-gold/20 dark:border-gold/10 text-center h-full transition-all duration-300 hover:shadow-xl">

                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green/10 dark:bg-green/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-green" />
                </div>

                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
                  7 Days
                </p>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Return Window
                </p>

              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={slideUpVariants as any}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-lg border border-gold/20 dark:border-gold/10 text-center h-full transition-all duration-300 hover:shadow-xl">

                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green/10 dark:bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <RefreshCcw className="w-6 h-6 sm:w-8 sm:h-8 text-green dark:text-gold" />
                </div>

                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
                  5–10 Days
                </p>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Refund Processing
                </p>

              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={slideUpVariants as any}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-lg border border-gold/20 dark:border-gold/10 text-center h-full transition-all duration-300 hover:shadow-xl">

                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green/10 dark:bg-green/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-green" />
                </div>

                <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white leading-snug mb-1 break-words">
                  billing@plantrxapp.com
                </p>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Contact for Refunds
                </p>

              </div>
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Left Column */}
            <div className="space-y-6">

              {/* Returns Policy */}
              <motion.div {...fadeInUp}>
                <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                  <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                    <div className="w-12 h-12 bg-green/10 dark:bg-green/20 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-green dark:text-green" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Returns Policy</h2>
                  </div>
                  <CardContent className="!p-4 sm:!p-6">
                    <p className="sm:text-lg text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                      We want you to be completely satisfied with your purchase. If something isn't right, we're here to help.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-green/10 dark:bg-green/5 rounded-xl border border-green/20 dark:border-green/10">
                        <CheckCircle className="w-5 h-5 text-green dark:text-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white">Damaged Items</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Products that arrived broken or damaged</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-green/10 dark:bg-green/5 rounded-xl border border-green/20 dark:border-green/10">
                        <CheckCircle className="w-5 h-5 text-green dark:text-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white">Incorrect Items</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Products that don't match your order</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Non-Returnable */}
              <motion.div {...fadeInUp}>
                <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                  <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                    <div className="w-12 h-12 bg-green/10 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-green dark:text-red-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Non-Returnable Items</h2>
                  </div>
                  <CardContent className="!p-4 sm:!p-6">
                    <div className="bg-green/10 dark:bg-red-900/30 rounded-xl p-5 border border-green/20 dark:border-red-800">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-green dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white mb-2">Opened Products</p>
                          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
                            For hygiene and safety reasons, we cannot accept returns on supplements or remedies that have been opened or used.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

            </div>

            {/* Right Column */}
            <div className="space-y-6">

              {/* Refund Process */}
              <motion.div {...fadeInUp}>
                <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                  <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                    <div className="w-12 h-12 bg-gold/20 dark:bg-gold/10 rounded-xl flex items-center justify-center">
                      <RefreshCcw className="w-6 h-6 text-gold dark:text-gold" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Refund Process</h2>
                  </div>
                  <CardContent className="!p-4 sm:!p-6">
                    <div className="space-y-4">
                      {[
                        { step: "1", title: "Submit Request", desc: "Email us with your order details" },
                        { step: "2", title: "Review", desc: "We'll review your request within 48 hours" },
                        { step: "3", title: "Approval", desc: "If approved, we'll confirm next steps" },
                        { step: "4", title: "Refund", desc: "Processed within 5–10 business days" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-gold/20 dark:bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-gold dark:text-gold">{item.step}</span>
                          </div>
                          <div>
                            <p className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white">{item.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* How to Request */}
              <motion.div {...fadeInUp}>
                <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                  <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                    <div className="w-12 h-12 bg-green/10 dark:bg-green/20 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-green dark:text-green" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Request a Refund</h2>
                  </div>
                  <CardContent className="!p-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                      Please include the following in your email:
                    </p>
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-gold/5 dark:bg-gold/5 rounded-lg border border-gold/20 dark:border-gold/10">
                        <CheckCircle className="w-5 h-5 text-green flex-shrink-0" />
                        <span className="text-gray-900 dark:text-white">Order number</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gold/5 dark:bg-gold/5 rounded-lg border border-gold/20 dark:border-gold/10">
                        <CheckCircle className="w-5 h-5 text-green flex-shrink-0" />
                        <span className="text-gray-900 dark:text-white">Reason for return</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gold/5 dark:bg-gold/5 rounded-lg border border-gold/20 dark:border-gold/10">
                        <Camera className="w-5 h-5 text-green flex-shrink-0" />
                        <span className="text-gray-900 dark:text-white">Photos of damage (if applicable)</span>
                      </div>
                    </div>
                    <Button
                      onClick={handleEmailRefund}
                      className="w-full bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] text-white py-4 text-lg font-medium rounded-xl hover:shadow-lg transition-all duration-300"
                      data-testid="button-request-refund"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Email billing@plantrxapp.com
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

            </div>
          </div>

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