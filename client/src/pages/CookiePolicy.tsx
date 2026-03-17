import Header from "@/components/Header";
import { BackButton } from "@/components/BackButton";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Cookie, Settings, BarChart3, Megaphone, Shield, Lock, ExternalLink, Mail, CheckCircle,
  FileText, MessageCircle
} from "lucide-react";
import { containerVariants, slideUpVariants } from "@/animation/framerMotionVariants";
import { SplitText } from "@/utils/SplitText";

const fadeInUp = {
  initial: { opacity: 0.92, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.35, ease: "easeOut" }
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gold/5 dark:bg-gray-950">
      <SEOHead
        title="Cookie Policy - How We Use Cookies | PlantRx"
        description="Learn how PlantRx uses cookies and similar technologies to improve your experience, provide analytics, and deliver personalized content."
        keywords="cookie policy, cookies, tracking technologies, privacy, GDPR, PlantRx cookies"
        canonical="https://plantrxapp.com/cookie-policy"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)]  dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <BackButton className="!text-white" />

          <motion.div className="text-center mt-8" {...fadeInUp}>
            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 bg-white dark:bg-gold/10 text-gold dark:text-gold px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gold/30">
                <Cookie className="w-4 h-4" />
                Privacy & Cookies
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
              <SplitText text="Cookie Policy" />
            </h1>

            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-xl text-white dark:text-gray-300 max-w-2xl mx-auto">
                Understanding how we use cookies to improve your experience on PlantRx.
              </p>
              <p className="text-sm text-white dark:text-gray-400 mt-6">
                Last updated: November 2025
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What Are Cookies Banner */}
      <section className="py-8 bg-gold/10 dark:bg-gray-900 border-y border-gold/30 dark:border-gold/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="w-16 h-16 bg-green rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">What Are Cookies?</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Cookies are small text files stored on your device when you visit websites. They help us remember your preferences, understand how you use our site, and deliver relevant content.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gold/5 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Cookie Types Grid */}
          <motion.div
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center"><SplitText text="Types of Cookies We Use"></SplitText> </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

              {/* Essential */}
              <motion.div variants={slideUpVariants as any}>
                <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                  <div className="h-2 bg-green" />
                  <CardContent className="!p-4 sm:!p-6">
                    <div className="w-12 h-12 bg-green/10 dark:bg-green/20 rounded-xl flex items-center justify-center mb-4">
                      <Lock className="w-6 h-6 text-green dark:text-green" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Essential Cookies</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Required for the website to function. These enable core functionality like security, network management, and accessibility.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-green/10 dark:bg-green/20 text-green dark:text-green px-3 py-1 rounded-full text-xs font-medium border border-green/20">
                      <CheckCircle className="w-3 h-3" />
                      Always Active
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Authentication */}
              <motion.div variants={slideUpVariants as any}>
                <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                  <div className="h-2 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)]" />
                  <CardContent className="!p-4 sm:!p-6">
                    <div className="w-12 h-12 bg-gold/20 dark:bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-gold dark:text-gold" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Authentication</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Used to keep you logged in securely and manage your session. Essential for accessing your account and personalized features.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-gold/10 dark:bg-gold/5 text-gold dark:text-gold px-3 py-1 rounded-full text-xs font-medium border border-gold/20">
                      Firebase
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Analytics */}
              <motion.div variants={slideUpVariants as any}>
                <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                  <div className="h-2 bg-green" />
                  <CardContent className="!p-4 sm:!p-6">
                    <div className="w-12 h-12 bg-green/10 dark:bg-green/20 rounded-xl flex items-center justify-center mb-4">
                      <BarChart3 className="w-6 h-6 text-green dark:text-green" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Analytics</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Help us understand how visitors interact with our website by collecting anonymous statistics about page visits and traffic.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-green/10 dark:bg-green/20 text-green dark:text-green px-3 py-1 rounded-full text-xs font-medium border border-green/20">
                      Google Analytics 4
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Advertising */}
              <motion.div variants={slideUpVariants as any}>
                <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                  <div className="h-2 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)]" />
                  <CardContent className="!p-4 sm:!p-6">
                    <div className="w-12 h-12 bg-gold/20 dark:bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                      <Megaphone className="w-6 h-6 text-gold dark:text-gold" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Advertising</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Used to deliver personalized advertisements based on your browsing history and interests across websites.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-gold/10 dark:bg-gold/5 text-gold dark:text-gold px-3 py-1 rounded-full text-xs font-medium border border-gold/20">
                      Google AdSense
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Preferences */}
              <motion.div variants={slideUpVariants as any}>
                <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                  <div className="h-2 bg-green" />
                  <CardContent className="!p-4 sm:!p-6">
                    <div className="w-12 h-12 bg-green/10 dark:bg-green/20 rounded-xl flex items-center justify-center mb-4">
                      <Settings className="w-6 h-6 text-green dark:text-green" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Preferences</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Remember your settings like theme (light/dark mode), language preferences, and other customizations.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-green/10 dark:bg-green/20 text-green dark:text-green px-3 py-1 rounded-full text-xs font-medium border border-green/20">
                      Local Storage
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Payment Security */}
              <motion.div variants={slideUpVariants as any}>
                <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                  <div className="h-2 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)]" />
                  <CardContent className="!p-4 sm:!p-6">
                    <div className="w-12 h-12 bg-gold/20 dark:bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-gold dark:text-gold" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Payment Security</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Stripe uses cookies to process payments securely and prevent fraud on transactions.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-gold/10 dark:bg-gold/5 text-gold dark:text-gold px-3 py-1 rounded-full text-xs font-medium border border-gold/20">
                      Stripe
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

            </div>
          </motion.div>

          {/* Two Column Layout */}
          <motion.div
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid lg:grid-cols-2 gap-6 mb-6"
          >
            {/* Managing Cookies */}
            <motion.div variants={slideUpVariants as any}>
              <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                  <div className="w-12 h-12 bg-gold/20 dark:bg-gold/10 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-gold dark:text-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Managing Cookies</h2>
                </div>
                <CardContent className="!p-4 sm:!p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                    You can control and manage cookies in several ways:
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 bg-gold/5 dark:bg-gray-800 rounded-lg border border-gold/20 dark:border-gold/10">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Browser Settings</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Most browsers allow you to block or delete cookies through their settings.</p>
                    </div>
                    <div className="p-4 bg-gold/5 dark:bg-gray-800 rounded-lg border border-gold/20 dark:border-gold/10">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Opt-Out Tools</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Use Google Ad Settings or DAA opt-out tools to manage advertising cookies.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* GDPR Compliance */}
            <motion.div variants={slideUpVariants as any}>
              <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden h-full">
                <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                  <div className="w-12 h-12 bg-green/10 dark:bg-green/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green dark:text-green" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">GDPR Compliance</h2>
                </div>
                <CardContent className="!p-4 sm:!p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                    Under UK GDPR and ePrivacy regulations:
                  </p>
                  <div className="space-y-3">
                    {[
                      "We display a cookie consent banner on first visit",
                      "You can accept or reject non-essential cookies",
                      "You can change your preferences at any time",
                      "We respect 'Do Not Track' browser signals"
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
          </motion.div>

          {/* Third-Party Services - Full Width */}
          <motion.div className="mb-6" variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}>
            <Card className="bg-white dark:bg-gray-900 border border-gold/20 dark:border-gold/10 shadow-lg overflow-hidden">
              <div className="flex items-center gap-4 p-6 border-b border-gold/10 dark:border-gold/5">
                <div className="w-12 h-12 bg-green/10 dark:bg-green/20 rounded-xl flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-green dark:text-green" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Third-Party Services</h2>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                  We use services from third parties that may place cookies on your device. Click to view their privacy policies:
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: "Google Analytics", desc: "Traffic analysis", url: "https://policies.google.com/privacy" },
                    { name: "Google AdSense", desc: "Advertising", url: "https://policies.google.com/technologies/ads" },
                    { name: "Firebase", desc: "Authentication", url: "https://firebase.google.com/support/privacy" },
                    { name: "Stripe", desc: "Payments", url: "https://stripe.com/privacy" }
                  ].map((service, i) => (
                    <a key={i} href={service.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gold/5 dark:bg-gray-800 rounded-xl border border-gold/20 dark:border-gold/10 hover:border-gold dark:hover:border-gold/50 transition-colors group">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{service.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{service.desc}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green transition-colors" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}>
            <Card className="bg-green border-0 shadow-lg overflow-hidden">
              <CardContent className="p-4 sm:!p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 text-white">
                    <Mail className="w-10 h-10" />
                    <div>
                      <h3 className="text-xl text-white font-bold">Questions About Cookies?</h3>
                      <p className="text-white/90">Contact us at support@plantrxapp.com</p>
                    </div>
                  </div>

                  <a
                    href="mailto:support@plantrxapp.com"
                    className="bg-white text-green px-8 py-3 rounded-xl font-semibold hover:bg-gold/10 transition-colors"
                  >
                    Contact Support
                  </a>
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
            <Link href="/privacy-policy" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green dark:hover:text-green transition-colors">
              <Shield className="w-4 h-4" />
              Privacy Policy
            </Link>
            <Link href="/terms" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green dark:hover:text-green transition-colors">
              <FileText className="w-4 h-4" />
              Terms & Conditions
            </Link>
            <Link href="/disclaimer" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green dark:hover:text-green transition-colors">
              <Shield className="w-4 h-4" />
              Medical Disclaimer
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