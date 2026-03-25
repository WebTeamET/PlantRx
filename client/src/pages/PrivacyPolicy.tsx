import Header from "@/components/Header";
import { BackButton } from "@/components/BackButton";
import { SEOHead } from "@/components/SEOHead";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Shield, User, Database, Cookie, Eye, Lock, Globe, Baby, Heart, FileCheck, Bell, Mail, ExternalLink, Type, MapPin, Ban, Scale, AlertTriangle, CheckCircle2, Send } from "lucide-react";
import { useTextSize } from "@/contexts/TextSizeContext";
import { slideUpVariants } from "@/animation/framerMotionVariants";
import { motion } from "framer-motion";
import { SplitText } from "@/utils/SplitText";

export default function PrivacyPolicy() {
  const { textSize, setTextSize } = useTextSize();

  const textSizeOptions = [
    { id: "small" as const, label: "Small" },
    { id: "medium" as const, label: "Medium" },
    { id: "large" as const, label: "Large" },
    { id: "xl" as const, label: "Extra Large" },
  ];

  return (
    <div className="min-h-screen bg-gold/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEOHead
        title="Privacy Policy - Data Protection & GDPR Compliance | PlantRx"
        description="PlantRx Privacy Policy: Learn how we protect your personal data, health information, and comply with GDPR regulations. Your privacy and security are our top priorities."
        keywords="privacy policy, data protection, GDPR compliance, personal data, health information privacy, PlantRx security, UK data protection"
        canonical="https://plantrxapp.com/privacy-policy"
      />
      <Header />

      {/* Hero Section */}
      <ScrollReveal variant="fadeUp">
        <div className="relative bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] dark:from-green/80 dark:via-gold/60 dark:to-green/80 py-6 sm:py-10 lg:py-16 mb-6 sm:mb-8 lg:mb-12">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <BackButton className="!text-white" />
            <div className="text-center mt-4 sm:mt-6 lg:mt-8">

              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white/20 backdrop-blur-sm mb-3 sm:mb-4 lg:mb-6">
                  <Shield className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                </div>
              </motion.div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
                <SplitText text="Privacy Policy" />
              </h1>

              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <p className="text-sm sm:text-base lg:text-lg text-white/90 dark:text-white/90 max-w-2xl mx-auto">
                  Your privacy matters to us. Learn how we protect and handle your personal information.
                </p>
              </motion.div>

              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <p className="text-xs sm:text-sm text-white/70 dark:text-white/90 mt-2 sm:mt-3 lg:mt-4">
                  Last updated: October 10, 2025
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10 lg:pb-20">

        {/* Quick Summary Card */}
        <div className="bg-gold/10 dark:from-gold/10 dark:to-gold/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-12 border border-gold/30 dark:border-gold/10">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-green flex items-center justify-center">
                <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-900 mb-1 sm:mb-2">In Summary</h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-700 leading-relaxed">
                PlantRx Ltd ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website plantrxapp.com and use our services.
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-10">

            {/* Section 1: Who We Are */}
            <section id="section-1" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green/10 dark:bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-green dark:text-gold/80" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">1. Who We Are</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4">
                PlantRx Ltd is a company registered in England and Wales, with our registered office located in London, United Kingdom. We operate plantrxapp.com, a natural health and wellness platform providing educational information about plant-based remedies.
              </p>
              <div className="bg-gold/5 dark:bg-gold/5 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 mt-4 sm:mt-6 border border-gold/20 dark:border-gold/40">
                <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Data Controller:</span>
                    <p className="text-gray-600 text-base">PlantRx Ltd</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Location:</span>
                    <p className="text-gray-600 text-base">London, United Kingdom</p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="font-semibold text-gray-900 dark:text-white">Contact Email:</span>
                    <p className="text-gray-600 text-base">support@plantrxapp.com</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Information We Collect */}
            <section id="section-2" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold/20 dark:bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 text-gold dark:text-gold/80" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">2. Information We Collect</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                We collect information in the following ways:
              </p>
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gold/5 dark:bg-gold/5 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 mt-4 sm:mt-6 border border-gold/20 dark:border-gold/40">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Information You Provide Directly</h3>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                      <span className="font-semibold text-gold min-w-fit">Account Info:</span>
                      <span>Name, email address, and profile photo via Firebase Authentication</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                      <span className="font-semibold text-gold min-w-fit">Health Data:</span>
                      <span>Symptoms, health concerns, and remedy preferences you voluntarily submit</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                      <span className="font-semibold text-gold min-w-fit">Messages:</span>
                      <span>Communications through our platform, including Remy AI chat interactions</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                      <span className="font-semibold text-gold min-w-fit">Purchases:</span>
                      <span>Billing/shipping addresses, payment info (via Stripe), and order history</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gold/5 dark:bg-gold/5 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 mt-4 sm:mt-6 border border-gold/20 dark:border-gold/40">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Information Collected Automatically</h3>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                      <span className="font-semibold text-green dark:text-gold min-w-fit">Usage:</span>
                      <span>Pages visited, features used, time spent on site, interaction patterns</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                      <span className="font-semibold text-green dark:text-gold min-w-fit">Device:</span>
                      <span>IP address, browser type, operating system, device identifiers</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                      <span className="font-semibold text-green dark:text-gold min-w-fit">Location:</span>
                      <span>Approximate geographic location based on IP address</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                      <span className="font-semibold text-green dark:text-gold min-w-fit">Cookies:</span>
                      <span>As described in our Cookie section below</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: How We Use Your Information */}
            <section id="section-3" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green/10 dark:bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-green dark:text-gold/80" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">3. How We Use Your Information</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                We use collected information for the following purposes:
              </p>
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {[
                  { title: "Provide Services", desc: "Operate and improve our natural health platform" },
                  { title: "Personalization", desc: "Customize your experience with relevant recommendations" },
                  { title: "Process Transactions", desc: "Handle purchases via Stripe and Shopify" },
                  { title: "Communication", desc: "Send notifications and provide customer support" },
                  { title: "Subscriptions", desc: "Manage your tier (Bronze, Silver, Gold)" },
                  { title: "Analytics", desc: "Analyze usage patterns via Google Analytics" },
                  { title: "Advertising", desc: "Display relevant ads through Google AdSense" },
                  { title: "Legal Compliance", desc: "Comply with applicable laws and regulations" }
                ].map((item, i) => (
                  <div key={i} className="bg-gold/5 dark:bg-gold/5 rounded-lg p-3 sm:p-4 border border-gold/15 dark:border-gold/30">
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Legal Basis */}
            <section id="section-4" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold/20 dark:bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-gold dark:text-gold" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">4. Legal Basis for Processing (GDPR)</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                Under UK GDPR, we process your personal data based on:
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { title: "Consent", desc: "Where you have given clear consent for specific purposes, including marketing and advertising cookies", border: "border-green" },
                  { title: "Contract", desc: "Where processing is necessary for the performance of a contract (e.g., subscriptions, orders)", border: "border-gold" },
                  { title: "Legitimate Interests", desc: "Where processing is necessary for our legitimate interests and does not override your rights", border: "border-green" },
                  { title: "Legal Obligation", desc: "Where processing is necessary to comply with legal obligations", border: "border-gold" }
                ].map((item, i) => (
                  <div key={i} className={`bg-gold/5 dark:bg-gold/5 border-l-4 ${item.border} p-3 sm:p-4 rounded-r-lg`}>
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Cookies */}
            <section id="section-5" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold/20 dark:bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-gold dark:text-gold" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">5. Cookies and Similar Technologies</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                We use cookies and similar tracking technologies to collect and track information about your activity on our website. You can control cookies through your browser settings.
              </p>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Types of Cookies We Use</h3>
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {[
                  { title: "Essential Cookies", desc: "Required for the website to function. Cannot be disabled.", icon: "🔐" },
                  { title: "Authentication (Firebase)", desc: "Keep you logged in securely and manage your session.", icon: "🔑" },
                  { title: "Analytics (GA4)", desc: "Understand how visitors interact with our website.", icon: "📊" },
                  { title: "Advertising (AdSense)", desc: "Deliver personalized ads based on your interests.", icon: "📢" },
                  { title: "Preference Cookies", desc: "Remember your settings like theme and language.", icon: "⚙️" }
                ].map((cookie, i) => (
                  <div key={i} className="bg-gold/10 dark:bg-gold/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gold/20 dark:border-gold/30">
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <span className="text-base sm:text-lg lg:text-xl">{cookie.icon}</span>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{cookie.title}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{cookie.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-4 sm:mt-6">
                For detailed information, see our <a href="/cookie-policy" className="text-green hover:text-green/70 dark:text-gold dark:hover:text-gold/70 font-medium underline min-h-[44px] inline-flex items-center">Cookie Policy</a>.
              </p>
            </section>

            {/* Section 6: Google AdSense */}
            <section id="section-6" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold/20 dark:bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gold dark:text-gold" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">6. Third-Party Advertising (Google AdSense)</h2>
              </div>
              <div className="bg-gold/10 dark:bg-gold/5 border-l-4 border-gold p-3 sm:p-4 rounded-r-lg mb-4 sm:mb-6">
                <p className="text-sm sm:text-base text-gold font-medium">Important Notice About Advertising</p>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                We use Google AdSense to display advertisements on our website. Google AdSense uses cookies and similar technologies to serve ads based on your prior visits to our website and other websites on the Internet.
              </p>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">How Google Uses Your Information</h3>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300">
                    {[
                      "Google uses cookies (including DoubleClick) to serve ads based on your browsing activity",
                      "Third-party vendors use cookies to serve ads based on prior visits",
                      "Google may collect and use data for ad personalization"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-gold mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Your Advertising Choices</h3>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">Opt out of personalized advertising:</p>
                  <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                    {[
                      { name: "Google Ad Settings", url: "https://www.google.com/settings/ads" },
                      { name: "Digital Advertising Alliance", url: "https://www.aboutads.info/choices/" },
                      { name: "Network Advertising Initiative", url: "https://www.networkadvertising.org/choices/" },
                      { name: "Your Online Choices (EU)", url: "https://www.youronlinechoices.eu/" }
                    ].map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gold/5 dark:bg-gold/5 rounded-lg p-2 sm:p-3 text-green dark:text-gold/80 hover:bg-gold/10 dark:hover:bg-gold/10 transition-colors min-h-[44px] border border-gold/15 dark:border-gold/30">
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-medium">{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Third-Party Services */}
            <section id="section-7" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green/10 dark:bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-green dark:text-gold/80" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">7. Third-Party Services and Data Sharing</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                We share information with the following third-party service providers:
              </p>
              <div className="grid gap-2 sm:gap-3 lg:gap-4">
                {[
                  { name: "Firebase (Google)", desc: "User authentication and data storage", url: "https://firebase.google.com/support/privacy" },
                  { name: "Stripe", desc: "Payment processing for subscriptions and store purchases", url: "https://stripe.com/privacy" },
                  { name: "Shopify", desc: "E-commerce platform for our store", url: "https://www.shopify.com/legal/privacy" },
                  { name: "Google Analytics", desc: "Website analytics and traffic analysis", url: "https://policies.google.com/privacy" },
                  { name: "Google AdSense", desc: "Advertising services (see Section 6)", url: null },
                  { name: "OpenAI/Google Gemini", desc: "AI-powered health information assistance (Remy)", url: null }
                ].map((service, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gold/5 dark:bg-gold/5 rounded-lg p-3 sm:p-4 gap-2 sm:gap-0 border border-gold/15 dark:border-gold/30">
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{service.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{service.desc}</p>
                    </div>
                    {service.url && (
                      <a href={service.url} target="_blank" rel="noopener noreferrer"
                        className="text-green dark:text-gold/80 hover:underline text-xs sm:text-sm flex items-center gap-1 min-h-[44px] sm:min-h-0">
                        Privacy <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-green/10 dark:bg-gold/10 rounded-lg sm:rounded-xl p-3 sm:p-4 mt-4 sm:mt-6 border border-green/20 dark:border-gold/20">
                <p className="text-sm sm:text-base text-green dark:text-gold/80 font-medium">
                  We do not sell your personal data to third parties. We only share data as necessary to provide our services or as required by law.
                </p>
              </div>
            </section>

            {/* Section 8: Your Rights */}
            <section id="section-8" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green/10 dark:bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green dark:text-gold/80" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">8. Your Rights Under UK GDPR</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                Under UK data protection laws, you have the following rights:
              </p>
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {[
                  { title: "Right of Access", desc: "Request a copy of your personal data" },
                  { title: "Right to Rectification", desc: "Request correction of inaccurate data" },
                  { title: "Right to Erasure", desc: "Request deletion of your data" },
                  { title: "Right to Restrict", desc: "Limit how we use your data" },
                  { title: "Right to Portability", desc: "Get your data in machine-readable format" },
                  { title: "Right to Object", desc: "Object to processing for marketing" },
                  { title: "Withdraw Consent", desc: "Withdraw consent at any time" },
                  { title: "Lodge a Complaint", desc: "Complain to the ICO if violated" }
                ].map((right, i) => (
                  <div key={i} className="bg-green/5 dark:bg-gold/5 rounded-lg p-3 sm:p-4 border border-green/15 dark:border-gold/30">
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{right.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{right.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-4 sm:mt-6">
                To exercise these rights, contact us at <strong className="text-gray-900 dark:text-white">support@plantrxapp.com</strong>. We will respond within 30 days.
              </p>
            </section>

            {/* Section 9: Data Retention */}
            <section id="section-9" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold/20 dark:bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 text-gold dark:text-gold" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">9. Data Retention</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                We retain your personal data only for as long as necessary:
              </p>
              <div className="overflow-x-auto rounded-lg sm:rounded-xl border border-gold/20 dark:border-gold/30">
                <table className="w-full min-w-[300px]">
                  <thead className="bg-gold/10 dark:bg-gold/20">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Data Type</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/10 dark:divide-gold/5">
                    {[
                      { type: "Account Data", period: "While active + 3 years after deletion" },
                      { type: "Transaction Data", period: "7 years (tax/legal compliance)" },
                      { type: "Analytics Data", period: "Aggregated indefinitely" },
                      { type: "Chat History", period: "2 years or until you delete" },
                      { type: "Marketing Preferences", period: "Until you unsubscribe" }
                    ].map((row, i) => (
                      <tr key={i} className="bg-white dark:bg-gray-800">
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900 dark:text-white font-medium">{row.type}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">{row.period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 10: Data Security */}
            <section id="section-10" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green/10 dark:bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-green dark:text-gold/80" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">10. Data Security</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                We implement appropriate technical and organizational measures to protect your personal data:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
                {[
                  { icon: "🔒", title: "HTTPS/TLS", desc: "Encryption in transit" },
                  { icon: "🔐", title: "Firebase Auth", desc: "Secure authentication" },
                  { icon: "🛡️", title: "Security Reviews", desc: "Regular assessments" },
                  { icon: "👥", title: "Access Controls", desc: "Employee training" },
                  { icon: "💳", title: "PCI-DSS", desc: "Stripe compliance" }
                ].map((item, i) => (
                  <div key={i} className="bg-green/5 dark:bg-gold/5 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center border border-green/15 dark:border-gold/30">
                    <span className="text-lg sm:text-xl lg:text-2xl">{item.icon}</span>
                    <h4 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white mt-1 sm:mt-2">{item.title}</h4>
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6 italic">
                While we strive to protect your personal information, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            {/* Section 11: International Transfers */}
            <section id="section-11" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold/20 dark:bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gold dark:text-gold" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">11. International Data Transfers</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                Some of our third-party service providers are based outside the UK and European Economic Area. When we transfer your data internationally, we ensure appropriate safeguards are in place:
              </p>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300">
                {[
                  "Standard Contractual Clauses approved by the UK ICO",
                  "Transfers to countries with adequacy decisions",
                  "Binding Corporate Rules where applicable"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gold/10 dark:bg-gold/10 flex items-center justify-center text-gold text-xs sm:text-sm font-bold flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 12: Health Disclaimer */}
            <section id="section-12" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green/10 dark:bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-green dark:text-gold/80" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">12. Health Information Disclaimer</h2>
              </div>
              <div className="bg-green/5 dark:bg-gold/5 border-l-4 border-green dark:border-gold p-3 sm:p-4 lg:p-6 rounded-r-lg">
                <p className="text-sm sm:text-base lg:text-lg text-green dark:text-gold/80 leading-relaxed">
                  <strong>Important:</strong> PlantRx provides educational information about natural remedies and is NOT a substitute for professional medical advice, diagnosis, or treatment. The health-related information you provide is used solely to personalize your experience on our platform. We do not provide medical advice or diagnosis. Always consult a qualified healthcare provider for medical concerns.
                </p>
              </div>
            </section>

            {/* Section 13: CalOPPA */}
            <section id="section-13" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold/20 dark:bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold dark:text-gold" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">13. California Online Privacy Protection Act (CalOPPA)</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law's reach extends beyond California to require any person or company that operates websites collecting personally identifiable information from California consumers to post a conspicuous privacy policy.
              </p>
              <div className="bg-gold/10 dark:bg-gold/5 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gold/20">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">According to CalOPPA, we agree to the following:</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300">
                  {[
                    "Users can visit our site anonymously",
                    "Our Privacy Policy link includes the word 'Privacy' and can be easily found on the homepage",
                    "Users will be notified of any privacy policy changes on our Privacy Policy page",
                    "Users can change their personal information by emailing us"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 14: Do Not Track */}
            <section id="section-14" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold/20 dark:bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Ban className="w-4 h-4 sm:w-5 sm:h-5 text-gold dark:text-gold" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">14. Do Not Track Signals</h2>
              </div>
              <div className="bg-gold/10 dark:bg-gold/5 border-l-4 border-gold p-4 sm:p-6 rounded-r-lg">
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  We honor Do Not Track signals. When a Do Not Track (DNT) browser mechanism is in place, we do not track, plant cookies, or use advertising for that user.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 bg-gold/5 dark:bg-gold/5 rounded-lg p-4 border border-gold/15">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2">Third-Party Behavioral Tracking</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  It's important to note that we do allow third-party behavioral tracking for analytics and advertising purposes. You can opt out of these through your browser settings or the advertising opt-out links provided in Section 6.
                </p>
              </div>
            </section>

            {/* Section 15: COPPA */}
            <section id="section-15" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green/10 dark:bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Baby className="w-4 h-4 sm:w-5 sm:h-5 text-green dark:text-gold/80" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">15. COPPA (Children's Online Privacy Protection Act)</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                When it comes to the collection of personal information from children under 13, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children's privacy and safety online.
              </p>
              <div className="bg-green/5 dark:bg-gold/5 border-l-4 border-green dark:border-gold p-4 sm:p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-green dark:text-gold/80 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-green dark:text-gold/80 mb-2">
                      We do not specifically market to children under 13.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      PlantRx is designed for adults seeking natural health information. If we become aware that we have collected personal information from a child under 13, we will delete that information immediately.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 16: Fair Information Practices */}
            <section id="section-16" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold/20 dark:bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-gold dark:text-gold" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">16. Fair Information Practices</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe.
              </p>
              <div className="bg-gold/10 dark:bg-gold/5 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gold/20">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-gold" />
                  Data Breach Response
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                  In order to be in line with Fair Information Practices, should a data breach occur:
                </p>
                <div className="space-y-3">
                  {[
                    { num: "1", text: "We will notify users via email within 7 business days", sub: null },
                    { num: "2", text: "Individual Redress Principle", sub: "We agree to the individual redress principle, which requires that individuals have a right to pursue legally enforceable rights against data collectors and processors who fail to adhere to the law." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gold/10">
                      <div className="w-8 h-8 rounded-full bg-green dark:bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">{item.num}</div>
                      <div>
                        <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">{item.text}</p>
                        {item.sub && <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{item.sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 17: CAN-SPAM Act */}
            <section id="section-17" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold/20 dark:bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 text-gold dark:text-gold" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">17. CAN-SPAM Act Compliance</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                The CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial messages, gives recipients the right to have emails stopped, and spells out tough penalties for violations.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="bg-gold/10 dark:bg-gold/5 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-gold/20">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3">We collect your email to:</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {[
                      "Send information and respond to inquiries",
                      "Process orders and send updates",
                      "Send product/service related information",
                      "Market to our mailing list after transactions"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-gold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green/5 dark:bg-green/5 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-green/15">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3">We agree to:</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {[
                      "NOT use false or misleading subjects/addresses",
                      "Identify messages as advertisements reasonably",
                      "Include our business address",
                      "Honor opt-out/unsubscribe requests quickly"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green dark:text-gold flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gold/10 dark:bg-gold/5 border-l-4 border-gold p-4 rounded-r-lg">
                <p className="text-sm sm:text-base text-gold dark:text-gold">
                  <strong>Unsubscribe:</strong> If you would like to unsubscribe from receiving future emails, follow the instructions at the bottom of each email or contact us at support@plantrxapp.com. We will promptly remove you from ALL correspondence.
                </p>
              </div>
            </section>

            {/* Section 18: Your Consent */}
            <section id="section-18" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green/10 dark:bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green dark:text-gold/80" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">18. Agreeing to Terms</h2>
              </div>
              <div className="bg-green/5 dark:bg-gold/5 border-l-4 border-green dark:border-gold p-4 sm:p-6 rounded-r-lg mb-4 sm:mb-6">
                <p className="text-sm sm:text-base lg:text-lg text-green dark:text-gold/80 font-medium">
                  If you do not agree to PlantRx's privacy policy as posted here on this website, please do not consent to the setting of cookies and the collection and storage of your personally identifiable information.
                </p>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4">
                Your explicit consent indicates acceptance of this privacy policy in its entirety. When you accept our cookie consent banner, you specifically consent to:
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                {[
                  "The use of cookies for analytics, advertising, and personalization",
                  "The processing of your data by Google AdSense for personalized advertising",
                  "The sharing of data with our third-party service providers"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green dark:text-gold mt-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                You can withdraw your consent at any time by adjusting your cookie settings, contacting us, or deleting your account.
              </p>
            </section>

            {/* Section 19: Changes */}
            <section id="section-19" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold/20 dark:bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gold dark:text-gold" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">19. Changes to This Privacy Policy</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4 sm:space-y-6">

              {/* Text Size Selector */}
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gold/20 dark:border-gold/10">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Type className="w-4 h-4 sm:w-5 sm:h-5 text-green dark:text-gold/80" />
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">Text Size</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {textSizeOptions.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setTextSize(size.id)}
                      className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 min-h-[44px] ${textSize === size.id
                          ? 'bg-green dark:bg-gold text-white shadow-md'
                          : 'bg-gold/10 dark:bg-gold/5 text-gray-700 dark:text-gray-300 hover:bg-green/10 dark:hover:bg-gold/10'
                        }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gold/20 dark:border-gold/10">
                <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white mb-3 sm:mb-4">Quick Navigation</h3>
                <nav className="space-y-1 hidden lg:block max-h-[400px] overflow-y-auto pr-2">
                  {[
                    "Who We Are", "Information We Collect", "How We Use Your Info",
                    "Legal Basis (GDPR)", "Cookies", "Google AdSense",
                    "Third-Party Services", "Your Rights", "Data Retention",
                    "Data Security", "International Transfers", "Health Disclaimer",
                    "CalOPPA", "Do Not Track", "COPPA",
                    "Fair Information", "CAN-SPAM Act", "Agreeing to Terms", "Changes"
                  ].map((item, i) => (
                    <a key={i} href={`#section-${i + 1}`}
                      className="block text-xs text-gray-600 dark:text-gray-400 hover:text-green dark:hover:text-green/80 transition-colors py-1.5">
                      {i + 1}. {item}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Contact Card */}
              <div className="bg-green/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <h3 className="font-bold text-base sm:text-lg !text-white">20. Contact Us</h3>
                </div>
                <p className="text-white/90 dark:text-white/90 text-xs sm:text-sm mb-3 sm:mb-4">
                  Questions about your data or privacy rights?
                </p>
                <div className="space-y-1.5 sm:space-y-2 [&_p]:text-xs [&_p]:sm:text-base ">
                  <p className="text-white dark:!text-white/90"><strong>Email:</strong> support@plantrxapp.com</p>
                  <p className="text-white dark:!text-white/90"><strong>Address:</strong> PlantRx Ltd, London, UK</p>
                  <p className="text-white dark:!text-white/90"><strong>Response:</strong> Within 24-48 hours</p>
                </div>
                <a href="mailto:support@plantrxapp.com"
                  className="mt-3 btn-white sm:mt-4 w-full rounded-lg py-2 sm:py-3 px-4 text-center font-semibold transition-colors min-h-[44px] flex items-center justify-center text-sm sm:text-base">
                  Contact Us
                </a>
              </div>

              {/* ICO Link */}
              <div className="bg-gold/5 dark:bg-gold/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gold/20 dark:border-gold/10">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-600 mb-2 sm:mb-3">
                  Not satisfied with our response? Lodge a complaint with the ICO:
                </p>
                <a href="https://ico.org.uk/make-a-complaint/"
                  onClick={(e) => { e.preventDefault(); window.open('https://ico.org.uk/make-a-complaint/', '_blank', 'noopener,noreferrer'); }}
                  className="flex items-center gap-2 text-green dark:text-green/80 hover:underline text-xs sm:text-sm font-medium min-h-[44px] cursor-pointer">
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  ico.org.uk
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
