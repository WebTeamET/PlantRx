import Header from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { BackButton } from "@/components/BackButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FileText, Building2, CheckCircle, AlertTriangle, Heart, User, CreditCard, ShoppingBag, RotateCcw, Ban, Copyright, Sparkles, Scale, Gavel, Split, FileCheck, Bell, Mail, ExternalLink, Type, Cookie, Link2, Globe, Shield, MessageSquare, Frame, Trash2, BookOpen, AlertCircle } from "lucide-react";
import { useTextSize } from "@/contexts/TextSizeContext";
import { slideUpVariants } from "@/animation/framerMotionVariants";
import { motion } from "framer-motion";
import { SplitText } from "@/utils/SplitText";

export default function Terms() {
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
        title="Terms & Conditions - PlantRx Natural Health Platform"
        description="Read PlantRx's terms and conditions, including subscription tiers, store policies, health disclaimers, and user responsibilities for our natural health platform."
        keywords="PlantRx terms, conditions, legal information, user agreement, natural health platform, subscription terms, health disclaimer"
        canonical="https://plantrxapp.com/terms"
      />
      <Header />
      
      {/* Hero Section */}
      <ScrollReveal variant="fadeUp">
        <div className="relative bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] py-8 sm:py-12 lg:py-20 mb-4 sm:mb-6 lg:mb-16">
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
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm mb-3 sm:mb-4 lg:mb-6">
                  <FileText className="w-4 h-4 sm:size-5 text-white" />
                </div>
              </motion.div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
                <SplitText text="Terms & Conditions" />
              </h1>
              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <p className="text-sm sm:text-base lg:text-lg text-white/90 dark:text-white/90 max-w-2xl mx-auto">
                  Welcome to plantrxapp.com! These terms and conditions outline the rules and regulations for the use of PlantRx Website.
                </p>
              </motion.div>
              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <p className="text-xs sm:text-sm text-white/70 dark:text-white/90 mt-2 sm:mt-3 lg:mt-4">Last updated: December 19, 2025</p>
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
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-900 mb-1 sm:mb-2">Agreement Overview</h2>
              <p className="ttext-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-700 leading-relaxed mb-6">
                By accessing this website we assume you accept these terms and conditions. Do not continue to use plantrxapp.com if you do not agree to take all of the terms and conditions stated on this page. PlantRx is an educational platform about natural remedies — we are NOT a medical service and do NOT provide medical advice.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-700 leading-relaxed">
                <strong className="text-gray-900 dark:text-green">Terminology:</strong> "Client", "You" and "Your" refers to you, the person accessing this website. "The Company", "Ourselves", "We", "Our" and "Us" refers to PlantRx Ltd. "Party", "Parties", or "Us" refers to both the Client and ourselves.
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-10">
            
            {/* Section 1: About PlantRx */}
            <section id="section-1" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green/10 dark:bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-green dark:text-gold/80" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">1. About PlantRx</h2>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4">
                PlantRx ("the Service", "we", "our", "us") is a natural health and wellness platform operated by PlantRx Ltd, a company registered in England and Wales with its registered office in London, United Kingdom.
              </p>
              <div className="grid md:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mt-8 sm:mt-10">
                <div className="bg-green/10 dark:bg-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-green/20 dark:border-white/20">
                  <h4 className="font-bold text-green dark:text-white mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl">Our Purpose</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    Educational content about natural remedies, plant-based wellness, traditional herbal medicine, 130+ verified remedies, AI-powered assistance (Remy), and an integrated wellness store.
                  </p>
                </div>
                <div className="bg-gold/20 dark:bg-gold/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gold/20">
                  <h4 className="font-bold text-gold mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl">What We Are NOT</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    NOT a medical service. Does NOT provide medical advice, diagnosis, or treatment. Does NOT replace professional healthcare.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Acceptance of Terms */}
            <section id="section-2" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">2. Acceptance of Terms</h2>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8">
                By accessing or using PlantRx, creating an account, making a purchase, or subscribing to our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
              </p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                These terms constitute a legally binding agreement between you and PlantRx Ltd. We may update these terms at any time, and continued use of the Service after changes constitutes acceptance of the updated terms. This Agreement shall begin on the date hereof.
              </p>
            </section>

            {/* Section 3: Cookies */}
            <section id="section-3" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Cookie className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">3. Cookies</h2>
              </div>
              <div className="bg-gold/10 dark:bg-gold/10 border-l-4 border-gold p-4 sm:p-6 rounded-r-xl mb-4 sm:mb-6">
                <p className="text-gold dark:text-gold font-semibold text-sm sm:text-base">
                  We employ the use of cookies. By accessing plantrxapp.com, you agreed to use cookies in agreement with the PlantRx Privacy Policy.
                </p>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
              </p>
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {[
                  { icon: "🔐", title: "Essential Cookies", desc: "Required for website functionality" },
                  { icon: "🔑", title: "Authentication", desc: "Keep you logged in securely" },
                  { icon: "📊", title: "Analytics", desc: "Understand site usage patterns" },
                  { icon: "📢", title: "Advertising", desc: "Deliver relevant advertisements" },
                  { icon: "⚙️", title: "Preferences", desc: "Remember your settings" },
                  { icon: "🛒", title: "Shopping", desc: "Track cart and purchases" }
                ].map((item, i) => (
                  <div key={i} className="bg-gold/10 dark:bg-gold/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gold/20 dark:border-gold/30">
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <span className="text-base sm:text-lg lg:text-xl">{item.icon}</span>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{item.title}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-4 sm:mt-6">
                For detailed information, see our <a href="/cookie-policy" className="text-green hover:text-green/70 dark:text-gold dark:hover:text-gold/70 font-medium underline min-h-[44px] inline-flex items-center">Cookie Policy</a>.
              </p>
            </section>

            {/* Section 4: Age Restrictions */}
            <section id="section-4" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                  <AlertTriangle className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">4. Age Restrictions</h2>
              </div>
              <div className="bg-gold/10 dark:bg-gold/5 border-l-4 border-gold p-3 sm:p-4 rounded-r-lg mb-4 sm:mb-6">
                <p className="text-sm sm:text-base text-gold font-medium">
                  You must be at least 16 years old to use PlantRx.
                </p>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                By using this Service, you represent and warrant that you are at least 16 years of age. If you are under 16, you may not use our Service under any circumstances. Parents and guardians should supervise their children's online activities and consult with pediatric healthcare providers for children's health concerns.
              </p>
            </section>

            {/* Section 5: License / Intellectual Property */}
            <section id="section-5" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Copyright className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">5. License & Intellectual Property</h2>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                Unless otherwise stated, PlantRx and/or its licensors own the intellectual property rights for all material on plantrxapp.com. All intellectual property rights are reserved. You may access this from plantrxapp.com for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <div className="bg-gold/10 dark:bg-gold/5 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gold/20">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">You Must NOT:</h3>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    "Republish material from plantrxapp.com",
                    "Sell, rent or sub-license material from plantrxapp.com",
                    "Reproduce, duplicate or copy material from plantrxapp.com",
                    "Redistribute content from plantrxapp.com",
                    "Use our branding for commercial purposes",
                    "Copy, modify, distribute, sell, or lease any part without permission"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 border border-gold/10">
                      <Ban className="w-6 h-6 sm:w-7 sm:h-7 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gold/10 dark:bg-gold/5 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gold/20">
                <p className="text-green dark:text-gold text-base sm:text-lg">
                  <strong>User-Generated Content:</strong> Content you create remains yours, but you grant PlantRx a non-exclusive license to use, reproduce, edit, and authorize others to use your content in any forms, formats, or media.
                </p>
              </div>
            </section>

            {/* Section 6: User Comments & Content */}
            <section id="section-6" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MessageSquare className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">6. User Comments & Content</h2>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. PlantRx does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of PlantRx, its agents and/or affiliates.
              </p>
              <div className="bg-gold/10 dark:bg-gold/5 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gold/20">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">You Warrant and Represent That:</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300">
                  {[
                    "You are entitled to post the Comments on our website and have all necessary licenses and consents to do so",
                    "The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party",
                    "The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy",
                    "The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gold/10">
                      <CheckCircle className="size-4 sm:size-5 text-green dark:text-gold flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-green/5 dark:bg-gold/5 border-l-4 border-green dark:border-gold p-4 sm:p-6 rounded-r-lg">
                <p className="text-sm sm:text-base font-semibold text-green dark:text-gold/80">
                  <strong>Moderation Notice:</strong> PlantRx reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
                </p>
              </div>
            </section>

            {/* Section 7: Health Disclaimer */}
            <section id="section-7" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Heart className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">7. Health Disclaimer - IMPORTANT</h2>
              </div>
              <div className="bg-gold/5 dark:bg-gold/5 rounded-lg p-4 border border-gold/15 mb-4 sm:mb-6">
                <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                  ⚠️ CRITICAL: PlantRx is for EDUCATIONAL PURPOSES ONLY
                </p>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                The information provided on PlantRx, including remedy information, health articles, AI-generated content, and expert opinions:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {[
                  { icon: "❌", text: "Is NOT medical advice. Always consult a qualified healthcare provider." },
                  { icon: "❌", text: "Does NOT replace professional medical diagnosis or treatment." },
                  { icon: "❌", text: "Has NOT been evaluated by FDA, MHRA, or other health agencies." },
                  { icon: "⚠️", text: "May cause adverse effects. Natural remedies can interact with medications." },
                  { icon: "❌", text: "Is not intended to diagnose, treat, cure, or prevent any disease." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gold/10">
                    <span className="size-4 sm:size-5">{item.icon}</span>
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gold/20 dark:bg-gold/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <p className="text-black dark:text-gold font-semibold text-base sm:text-lg">
                  🚨 In case of medical emergency, call 999 (UK), 911 (US), or 112 (EU) immediately.
                </p>
              </div>
            </section>

            {/* Section 8: Hyperlinking */}
            <section id="section-8" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Link2 className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">8. Hyperlinking to Our Content</h2>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                The following organizations may link to our Website without prior written approval:
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {["Government agencies", "Search engines", "News organizations", "Online directory distributors", "System wide Accredited Businesses", "Educational institutions"].map((org, i) => (
                  <div key={i} className="flex items-center gap-4 bg-green/10 dark:bg-green/5 rounded-xl p-3 sm:p-4 border border-green/20">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green dark:text-gold flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{org}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gold/10 dark:bg-gold/5 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gold/20">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Link Requirements</h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  These organizations may link to our home page, to publications or to other Website information so long as the link:
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Is not in any way deceptive",
                    "Does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services",
                    "Fits within the context of the linking party's site"
                  ].map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      <span className="text-gold -mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gold/10 dark:bg-gold/5 rounded-2xl p-4 sm:p-6 border border-gold/20">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2">Approved Link Methods</h4>
                <ul className="space-y-3 sm:space-y-4  text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <li>• By use of our corporate name</li>
                  <li>• By use of the uniform resource locator being linked to</li>
                  <li>• By use of any other description of our Website that makes sense within the context</li>
                </ul>
                <p className="mt-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 italic">
                  No use of PlantRx's logo or other artwork will be allowed for linking absent a trademark license agreement.
                </p>
              </div>
            </section>

            {/* Section 9: iFrames */}
            <section id="section-9" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Frame className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">9. iFrames</h2>
              </div>
              <div className="bg-gold/10 dark:bg-gold/5 border-l-4 border-gold p-4 rounded-r-lg">
                <p className="text-sm sm:text-base text-gold dark:text-gold">
                  Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
                </p>
              </div>
            </section>

            {/* Section 10: Content Liability */}
            <section id="section-10" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Shield className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">10. Content Liability</h2>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that arise on your Website.
              </p>
              <div className="bg-gold/5 dark:bg-gold/5 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gold/20">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
                </p>
              </div>
            </section>

            {/* Section 11: Reservation of Rights */}
            <section id="section-11" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <BookOpen className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">11. Reservation of Rights</h2>
              </div>
              <div className="space-y-6 sm:space-y-8">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request.
                </p>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  We also reserve the right to amend these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
                </p>
              </div>
            </section>

            {/* Section 12: Removal of Links */}
            <section id="section-12" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Trash2 className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">12. Removal of Links from Our Website</h2>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to do so or to respond to you directly.
              </p>
              <div className="bg-gold/20 dark:bg-gold/20 rounded-2xl p-4 sm:p-6 border border-gold">
                <p className="text-black/80 dark:text-gold text-sm sm:text-base">
                  <strong>Important:</strong> We do not ensure that the information on this website is correct. We do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
                </p>
              </div>
            </section>

            {/* Section 13: User Accounts */}
            <section id="section-13" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">13. User Accounts</h2>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                To access certain features of PlantRx, you must create an account using Firebase Authentication (Google sign-in or email/password).
              </p>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Your Responsibilities:</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                {[
                  "Provide accurate registration information",
                  "Maintain the security of your credentials",
                  "Notify us of unauthorized access",
                  "Accept responsibility for all account activities",
                  "Not share your account with others"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-green/10 dark:bg-green/5 rounded-xl p-3 sm:p-4 border border-green/20">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green dark:text-gold flex-shrink-0" />
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 14: Subscription Tiers */}
            <section id="section-14" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                  <CreditCard className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">14. Subscription Tiers</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                PlantRx offers the following subscription tiers:
              </p>
              <div className="grid gap-6 sm:gap-8 mb-4 sm:mb-6">
                <div className="bg-gold/20 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gold dark:border-amber-700">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <h4 className="font-bold text-xl sm:text-2xl lg:text-3xl text-green dark:text-amber-200">🥉 Bronze</h4>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">Basic access to remedy database, limited AI chat, community features</p>
                    </div>
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green dark:text-amber-300">Free</span>
                  </div>
                </div>
                <div className="bg-green/20 dark:from-gray-700/50 dark:to-slate-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-green dark:border-gray-600">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <h4 className="font-bold text-xl sm:text-2xl lg:text-3xl text-black dark:text-gray-200">🥈 Silver</h4>
                      <p className="text-sm sm:text-base text-gray-700  text-black dark:text-gray-400 mt-3">Unlimited AI chat, personalized recommendations, advanced features</p>
                    </div>
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-gray-200">£6.99<span className="text-base sm:text-lg font-normal">/mo</span></span>
                  </div>
                </div>
                <div className="bg-gold/70 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-gold dark:border-gold/60">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <h4 className="font-bold text-xl sm:text-2xl lg:text-3xl text-white dark:text-gold">🥇 Gold</h4>
                      <p className="text-sm sm:text-base text-gray-700 text-white dark:text-gray-300 mt-3">All Silver features + exclusive content, priority support, premium benefits</p>
                    </div>
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white dark:text-gold">£12.99<span className="text-base sm:text-lg font-normal">/mo</span></span>
                  </div>
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Subscription Terms:</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-300">
                {[
                  "Subscriptions are billed monthly via Stripe",
                  "Auto-renew unless cancelled before the next billing date",
                  "Cancel anytime; access continues until the end of billing period",
                  "Prices may change with 30 days' notice",
                  "Promotional trials (e.g., 24-hour Gold trial) are one-time offers"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 15: Store & Products */}
            <section id="section-15" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <ShoppingBag className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">15. Store & Product Purchases</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                PlantRx operates an online store through Shopify integration, offering wellness and health-related products.
              </p>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-green/10 dark:bg-green/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-green/20">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-green dark:text-green mb-4 sm:mb-6">Purchase Terms</h3>
                  <ul className="space-y-3 sm:space-y-4 text-gray-600 dark:text-gray-400 text-base sm:text-lg lg:text-xl">
                    {["Prices displayed in GBP (£)", "Secure payment via Stripe", "Fulfilled via dropshipping partners", "Shipping varies by location", "You provide accurate shipping info"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="text-green text-xl">•</span> {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gold/10 dark:bg-gold/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gold/20">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gold dark:text-gold mb-4 sm:mb-6">Product Disclaimer</h3>
                  <ul className="space-y-3 sm:space-y-4 text-gray-600 dark:text-gray-400 text-base sm:text-lg lg:text-xl">
                    {["For general wellness purposes only", "Not intended to treat or prevent disease", "Consult healthcare provider before use", "Check ingredients for allergens", "Not responsible for adverse reactions"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="text-gold text-xl">•</span> {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 16: Refunds */}
            <section id="section-16" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <RotateCcw className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">16. Refund & Return Policy</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-green/10 dark:bg-green/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-green/20">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-green dark:text-green mb-4 sm:mb-6">Subscription Refunds</h3>
                  <ul className="space-y-3 sm:space-y-4 text-gray-600 dark:text-gray-400 text-base sm:text-lg lg:text-xl">
                    <li className="flex items-start gap-3"><span className="text-green text-xl">•</span> Cancel anytime; no partial refunds for unused time</li>
                    <li className="flex items-start gap-3"><span className="text-green text-xl">•</span> Technical issues may qualify for prorated refund</li>
                  </ul>
                </div>
                <div className="bg-gold/10 dark:bg-gold/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gold/20">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gold dark:text-gold mb-4 sm:mb-6">Product Refunds</h3>
                  <ul className="space-y-3 sm:space-y-4 text-gray-600 dark:text-gray-400 text-base sm:text-lg lg:text-xl">
                    {["Damaged products: return within 14 days", "Contact support@plantrxapp.com with details", "Refunds processed within 14 days", "Opened consumables cannot be returned"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="text-gold text-xl">•</span> {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mt-8 sm:mt-10">
                For full details, see our <a href="/refunds" className="text-green hover:text-green/80 dark:text-green font-medium underline">Refund Policy</a> page.
              </p>
            </section>

            {/* Section 17: Prohibited Uses */}
            <section id="section-17" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Ban className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">17. Prohibited Uses</h2>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                You agree NOT to use PlantRx to:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  "Provide medical advice or pose as a medical professional",
                  "Upload unlawful, harmful, or defamatory content",
                  "Impersonate any person or entity",
                  "Upload spam or unsolicited advertising",
                  "Interfere with or disrupt the Service",
                  "Attempt unauthorized access",
                  "Scrape or harvest user data",
                  "Use for any illegal purpose",
                  "Violate applicable laws",
                  "Promote harmful health practices"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-gold/20 dark:bg-red-900/20 rounded-xl p-5 sm:p-6 lg:p-8">
                    <Ban className="w-6 h-6 sm:w-7 sm:h-7 text-green flex-shrink-0 mt-0.5" />
                    <span className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 18: AI Content */}
            <section id="section-18" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Sparkles className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">18. AI-Generated Content (Remy)</h2>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                PlantRx features "Remy," an AI-powered assistant that provides information about natural remedies and wellness.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { icon: "🤖", text: "Remy's responses are AI-generated and may not always be accurate" },
                  { icon: "📚", text: "AI content is for educational purposes only — NOT medical advice" },
                  { icon: "✅", text: "Verify information before acting on it" },
                  { icon: "⚖️", text: "We are not liable for decisions based on AI content" },
                  { icon: "👁️", text: "AI responses may be monitored to improve the Service" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 sm:gap-5 bg-gold/10 dark:bg-gold/5 rounded-xl p-5 sm:p-6 lg:p-8 border border-gold/20">
                    <span className="text-2xl sm:text-3xl lg:text-4xl">{item.icon}</span>
                    <span className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 19: Disclaimer */}
            <section id="section-19" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                  <AlertCircle className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">19. Disclaimer</h2>
              </div>
              <div className="bg-gold/5 dark:bg-gold/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gold/20">
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                </p>
                <ul className="space-y-4 sm:space-y-5 text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                  {[
                    "Limit or exclude our or your liability for death or personal injury",
                    "Limit or exclude our or your liability for fraud or fraudulent misrepresentation",
                    "Limit any of our or your liabilities in any way that is not permitted under applicable law",
                    "Exclude any of our or your liabilities that may not be excluded under applicable law"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-gold text-xl">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
              </p>
              <div className="bg-gold/10 dark:bg-gold/5 border-l-4 border-gold p-4 sm:p-6 rounded-r-xl mt-8 sm:mt-10">
                <p className="text-gold dark:text-gold text-base sm:text-lg lg:text-xl">
                  <strong>Free Services Notice:</strong> As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
                </p>
              </div>
            </section>

            {/* Section 20: Limitation of Liability */}
            <section id="section-20" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Scale className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">20. Limitation of Liability</h2>
              </div>
              <div className="bg-gold/10 dark:bg-gold/5 border-l-4 border-gold p-4 sm:p-6 rounded-r-xl mb-4 sm:mb-6">
                <p className="text-lg sm:text-xl lg:text-2xl text-gold dark:text-gold font-semibold">
                  To the fullest extent permitted by law, PlantRx Ltd disclaims all liability for any loss, damage, or injury arising from the use of our Service.
                </p>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8">PlantRx Ltd shall not be liable for:</p>
              <ul className="space-y-4 sm:space-y-5 text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                {[
                  "Any adverse health effects from using natural remedies or our information",
                  "Any indirect, incidental, special, consequential, or punitive damages",
                  "Loss of profits, data, use, goodwill, or other intangible losses",
                  "Any damages exceeding amounts paid in the 12 months prior to the claim",
                  "Actions or inactions of third-party service providers",
                  "Service interruptions, errors, or security breaches"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-gold mt-1 text-xl">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 21: Indemnification */}
            <section id="section-21" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Gavel className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">21. Indemnification</h2>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                You agree to indemnify, defend, and hold harmless PlantRx Ltd, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Service, your violation of these Terms, or your violation of any rights of a third party.
              </p>
            </section>

            {/* Section 22: Governing Law */}
            <section id="section-22" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Globe className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">22. Governing Law & Jurisdiction</h2>
              </div>
              <div className="bg-green/10 dark:bg-green/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-green/20">
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the <strong className="text-green dark:text-gold">laws of England and Wales</strong>, without regard to conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of the <strong className="text-green dark:text-gold">courts of London, United Kingdom</strong>.
                </p>
              </div>
            </section>

            {/* Section 23: Severability */}
            <section id="section-23" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Split className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">23. Severability</h2>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            {/* Section 24: Entire Agreement */}
            <section id="section-24" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-green flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FileCheck className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">24. Entire Agreement</h2>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms, together with our Privacy Policy, Cookie Policy, and any other legal notices published on the Service, constitute the entire agreement between you and PlantRx Ltd concerning the Service.
              </p>
            </section>

            {/* Section 25: Changes to Terms */}
            <section id="section-25" className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gold/20 dark:border-gold/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bell className="w-4 h-4 sm:size-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">25. Changes to Terms</h2>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. Material changes will be notified via email or prominent notice on our website. Continued use of the Service after changes constitutes acceptance of the updated Terms.
              </p>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Text Size Selector */}
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-gold/20 dark:border-gold/10">
                <div className="flex items-center gap-2 mb-4">
                  <Type className="w-5 h-5 text-green dark:text-green" />
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">Text Size</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {textSizeOptions.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setTextSize(size.id)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        textSize === size.id
                          ? 'bg-green text-white shadow-md'
                          : 'bg-gold/5 dark:bg-gold/5 text-gray-700 dark:text-gray-300 hover:bg-gold/20 dark:hover:bg-gold/10 border border-gold/20'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quick Navigation */}
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-gold/20 dark:border-gold/10">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-4">Quick Navigation</h3>
                <nav className="space-y-1 hidden lg:block max-h-96 overflow-y-auto">
                  {[
                    "About PlantRx", "Acceptance of Terms", "Cookies", "Age Restrictions",
                    "License & IP", "User Comments", "Health Disclaimer", "Hyperlinking",
                    "iFrames", "Content Liability", "Reservation of Rights", "Removal of Links",
                    "User Accounts", "Subscription Tiers", "Store & Products", "Refunds",
                    "Prohibited Uses", "AI Content (Remy)", "Disclaimer", "Liability",
                    "Indemnification", "Governing Law", "Severability", "Entire Agreement", "Changes to Terms"
                  ].map((item, i) => (
                    <a key={i} href={`#section-${i+1}`}
                       onClick={(e) => {
                         e.preventDefault();
                         document.getElementById(`section-${i+1}`)?.scrollIntoView({ behavior: 'smooth' });
                       }}
                       className="block text-sm text-gray-600 dark:text-gray-400 hover:text-green dark:hover:text-green transition-colors py-1.5 cursor-pointer">
                      {i+1}. {item}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Contact Card */}
              <div className="bg-green/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                <h3 className="font-bold text-base sm:text-lg !text-white">21. Contact Us</h3>
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

              {/* Related Policies */}
              <div className="bg-gold/5 dark:bg-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gold/20 dark:border-gold/10">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-4">Related Policies</h3>
                <div className="space-y-2">
                  {[
                    { name: "Privacy Policy", url: "/privacy-policy" },
                    { name: "Cookie Policy", url: "/cookie-policy" },
                    { name: "Refund Policy", url: "/refunds" },
                    { name: "Medical Disclaimer", url: "/disclaimer" }
                  ].map((link, i) => (
                    <a key={i} href={link.url}
                       className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green dark:hover:text-green text-sm sm:text-base transition-colors py-2">
                      <ExternalLink className="w-4 h-4" />
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}