import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, Heart, Target, Users, Shield, CheckCircle, ChevronRight, Sparkles, Leaf, AlertTriangle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { slideUpVariants } from "@/animation/framerMotionVariants";
import { FadeInSection } from "@/components/ScrollReveal";
import { SplitText } from "@/utils/SplitText";

const containerVariants = {
  hidden: { opacity: 0.4 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0.4, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export default function OurMission() {
  const whatWeProvide = [
    { text: "Clear explanations", icon: "📖" },
    { text: "Natural remedies that make sense", icon: "🌿" },
    { text: "Evidence-based insights", icon: "🔬" },
    { text: "Culturally rooted wellness practices", icon: "🌍" },
    { text: "A safe space to explore natural healing", icon: "🏡" },
    { text: "A clean platform built for people, not algorithms", icon: "💚" }
  ];

  const problems = [
    { text: "Overwhelmed", icon: "😰" },
    { text: "Under-informed", icon: "❓" },
    { text: "Misled by poor-quality content", icon: "⚠️" },
    { text: "Searching for answers that actually work", icon: "🔍" }
  ];

  const howWeHelp = [
    { text: "Understand their symptoms", icon: "🩺" },
    { text: "Explore safe natural options", icon: "🌱" },
    { text: "Learn from verified knowledge", icon: "✅" },
    { text: "Improve daily wellness", icon: "💪" },
    { text: "Build healthier habits", icon: "🎯" }
  ];

  const promises = [
    { text: "Stay natural", icon: "🌿", },
    { text: "Stay transparent", icon: "🔍", },
    { text: "Stay educational", icon: "📚", },
    { text: "Stay focused on helping people", icon: "❤️" },
    { text: "Stay committed to accurate and responsible content", icon: "✓" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEOHead
        title="Our Mission - Making Natural Wellness Easy | PlantRx"
        description="Our mission is simple: Make natural wellness easy for everyone. PlantRx provides clear explanations, natural remedies, and evidence-based insights."
        keywords="PlantRx mission, natural wellness, health mission, wellness platform purpose"
        canonical="https://plantrxapp.com/about/mission"
      />

      {/* Mobile-optimized main container with generous padding */}
      <main className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16 relative">
        {/* Floating Background Elements - hidden on mobile for performance */}
        <div className="hidden sm:block fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[5%] w-32 h-32 bg-gradient-to-br from-rose-400/10 to-pink-500/10 dark:from-rose-400/5 dark:to-pink-500/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-40 right-[10%] w-40 h-40 bg-gradient-to-br from-purple-400/10 to-indigo-500/10 dark:from-purple-400/5 dark:to-indigo-500/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-40 left-[15%] w-36 h-36 bg-gradient-to-br from-green-400/10 to-emerald-500/10 dark:from-green-400/5 dark:to-emerald-500/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 right-[20%] w-28 h-28 bg-gradient-to-br from-amber-400/10 to-orange-500/10 dark:from-amber-400/5 dark:to-orange-500/5 rounded-full blur-3xl"
          />
        </div>

        {/* Content wrapper with vertical spacing */}
        <div className="mb-10 sm:mb-20">

          {/* Breadcrumb - Mobile optimized with wrapping */}
          <motion.div variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}>
            <FadeInSection>
              <nav
                className="flex items-center space-x-2 text-sm mb-6"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="text-black/80 dark:text-white hover:text-green/100 dark:hover:text-gold min-h-[44px] flex items-center transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4 text-black/80 dark:text-white" />
                <Link href="/about" className="text-black/80 dark:text-white hover:text-green/100 dark:hover:text-gold min-h-[44px] flex items-center transition-colors">About</Link>
                <ChevronRight className="w-4 h-4 text-black/80 dark:text-white" />
                <span className="text-black dark:text-white font-medium">Our Mission</span>
              </nav>
            </FadeInSection>
          </motion.div>

          {/* Back Button - Touch friendly */}
          <motion.div variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}>
            <FadeInSection delay={0.05}>
              <Link href="/">
                <Button variant="outline" className="ctm-button btn-green hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Button>
              </Link>
            </FadeInSection>
          </motion.div>

          {/* Hero Section */}
          <FadeInSection delay={0.1} className="text-center mb-10 sm:mb-12 relative mt-5 max-sm:mt-10">
            <motion.div variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 max-sm:mb-3 bg-green rounded-2xl flex items-center justify-center shadow-xl shadow-green-500/20">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </motion.div>
            <motion.div variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}>
              <Badge className="text-green text-sm inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-full border border-green/50 dark:border-emerald-600/30 shadow-lg shadow-green/20 mb-5">
                <Sparkles className="w-4 h-4 inline" />
                Our Purpose
              </Badge>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-black">
              <SplitText text=" Our Mission"></SplitText>
            </h1>

            <motion.p variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }} className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Make natural wellness easy for everyone.
            </motion.p>
          </FadeInSection>

          {/* Main Problem Statement Card */}
          <motion.div
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="relative z-10 mb-10 sm:mb-12"
          >
            <Card className="bg-gold/20 dark:from-rose-900/20 dark:to-pink-900/20 border-gold dark:border-gold overflow-hidden shadow-lg">
              <CardContent className="p-4 sm:p-8 lg:p-12 text-center">
                <p className="text-sm sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-8 max-w-3xl mx-auto">
                  The world is overwhelmed by conflicting health advice, long medical explanations, and misinformation. People want natural solutions — but the internet makes it hard to trust anything.
                </p>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 sm:px-8 py-2.5 sm:py-4 ctm-button btn-green border-none !capitalize text-white rounded-full font-bold text-sm sm:text-lg lg:text-xl cursor-none"
                >
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
                  <span className="font-bold text-sm sm:text-lg lg:text-xl">PlantRx solves that problem.</span>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* What We Provide Section */}
          <motion.div
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="relative z-10 mb-10 sm:mb-12"
          >
            <Card className="bg-gold/20 dark:bg-gray-900 border-gold dark:border-gray-700 overflow-hidden shadow-lg">
              <motion.div
                className="h-1.5 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)]"
                initial={{ scaleX: 0.3 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
              <CardContent className="p-4 sm:p-8 lg:p-10">
                {/* Section Header - Stacked on mobile */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-green dark:bg-green-900/30 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <CheckCircle className="w-5 h-5 sm:w-8 sm:h-8 text-white dark:text-green-400" />
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">We Provide</h2>
                </div>

                {/* Grid with proper mobile spacing */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-5"
                >
                  {whatWeProvide.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-3 sm:gap-4 p-3 sm:p-5 bg-transparent dark:bg-green-900/20 rounded-lg sm:rounded-xl border border-gold dark:border-green-800/50 active:bg-green-100 dark:active:bg-green-900/30 transition-colors min-h-[48px] sm:min-h-[64px]"
                    >
                      <span className="text-lg sm:text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                      <span className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* The Problem Section */}
          <motion.div
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="relative z-10 mb-10 sm:mb-12"
          >
            <Card className="rounded-lg border text-card-foreground bg-gold/20 dark:bg-gray-900 border-gold dark:border-gray-700 overflow-hidden shadow-lg">
              <motion.div
                className="h-1.5 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)]"
                initial={{ scaleX: 0.3 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
              <CardContent className="p-4 sm:p-8 lg:p-10">
                {/* Section Header - Stacked on mobile */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-green dark:bg-green-900/30 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Target className="w-5 h-5 sm:w-8 sm:h-8 text-white dark:text-green-400" />
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">The Problem We're Solving</h2>
                </div>

                <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 mb-3 sm:mb-6 leading-relaxed">
                  People today are:
                </p>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-4 mb-4 sm:mb-8"
                >
                  {problems.map((problem, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-3 sm:gap-4 p-3 sm:p-5 bg-transparent dark:bg-green/20 rounded-lg sm:rounded-xl border border-gold dark:border-green-800/50 active:bg-green-100 dark:active:bg-green-900/30 transition-colors min-h-[48px] sm:min-h-[64px]"
                    >
                      <span className="text-lg sm:text-2xl flex-shrink-0">{problem.icon}</span>
                      <span className="text-xs sm:text-lg text-gray-700 dark:text-gray-300 font-medium">{problem.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="p-3 sm:p-6  rounded-lg sm:rounded-xl border border-gold dark:border-gold">
                  <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-medium text-center leading-relaxed">
                    PlantRx cuts through the noise by focusing on{" "}
                    <span className="text-gold dark:text-amber-400 font-bold">clarity</span>,{" "}
                    <span className="text-gold dark:text-amber-400 font-bold">education</span>, and{" "}
                    <span className="text-gold dark:text-amber-400 font-bold">usability</span>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* How We Serve Section */}
          <motion.div
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="relative z-10 mb-10 sm:mb-12"
          >
            <Card className="bg-gold/20 dark:bg-gray-900 border-gold dark:border-gray-700 overflow-hidden shadow-lg">
              <motion.div
                className="h-1.5 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)]"
                initial={{ scaleX: 0.3 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
              <CardContent className="p-4 sm:p-8 lg:p-10">
                {/* Section Header - Stacked on mobile */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-green dark:bg-green-900/30 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Users className="w-5 h-5 sm:w-8 sm:h-8 text-white dark:text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">How We Serve the Community</h2>
                </div>

                <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 mb-3 sm:mb-6 leading-relaxed">
                  We help users:
                </p>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-2.5 sm:space-y-4 mb-4 sm:mb-8"
                >
                  {howWeHelp.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-3 sm:gap-4 p-3 sm:p-5 bg-transparent dark:bg-green-900/20 rounded-lg sm:rounded-xl border border-gold dark:border-green-800/50 active:bg-green-100 dark:active:bg-green-900/30 transition-colors min-h-[48px] sm:min-h-[64px]"
                    >
                      <span className="text-lg sm:text-2xl flex-shrink-0">{item.icon}</span>
                      <span className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="p-3 sm:p-5 bg-transparent dark:bg-amber-900/20 rounded-lg sm:rounded-xl border border-gold dark:border-gold flex items-start gap-2 sm:gap-3">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-gold dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-base text-black dark:text-amber-300 leading-relaxed">
                    We do this without claiming to diagnose or treat any condition and always encourage professional medical support when needed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Our Promise Section */}
          <motion.div
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="relative z-10  mb-10 sm:mb-12"
          >
            <Card className="bg-gold/20 dark:bg-gray-900 border-gold dark:border-gray-700 overflow-hidden shadow-lg">
              <motion.div
                className="h-1.5 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)]"
                initial={{ scaleX: 0.3 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
              <CardContent className="p-4 sm:p-8 lg:p-10">
                {/* Section Header - Stacked on mobile */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-green dark:bg-green-900/30 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Shield className="w-5 h-5 sm:w-8 sm:h-8 text-white dark:text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Our Promise</h2>
                </div>

                <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 mb-3 sm:mb-8 leading-relaxed">
                  We promise to:
                </p>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-2.5 sm:space-y-5 mb-4 sm:mb-10"
                >
                  {promises.map((promise, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-3 sm:gap-4 p-3 sm:p-5 bg-transparent dark:bg-green-900/20 rounded-lg sm:rounded-xl border border-gold dark:border-green-800/50 active:bg-green-100 dark:active:bg-green-900/30 transition-colors min-h-[48px] sm:min-h-[64px]"
                    >
                      <div className={`w-9 h-9 sm:w-12 sm:h-12 bg-gold/50 rounded-lg flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                        <span className="text-base sm:text-xl">{promise.icon}</span>
                      </div>
                      <span className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 font-semibold leading-snug">{promise.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="text-center p-4 sm:p-8 bg-transparent dark:from-purple-900/30 dark:via-pink-900/30 dark:to-rose-900/30 rounded-xl sm:rounded-2xl">
                  <p className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-relaxed">
                    PlantRx exists to <span className="text-gold">empower people</span> — not confuse them.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>


          {/* Navigation Cards - Side by side on mobile, smaller size */}
          <motion.div variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            <Link href="/about/me">
              <motion.div variants={slideUpVariants as any}>
                <Card className="bg-gold/20 order-gold dark:border-gold hover:shadow-xl active:scale-98 transition-all cursor-pointer group overflow-hidden h-full">
                  <CardContent className="!px-3 !py-5 sm:p-6 flex flex-col items-center justify-center text-center relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green dark:bg-gold rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white dark:group-hover:text-white transition-colors mb-0.5 sm:mb-1">The Creator</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Meet the founder</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
            <Link href="/about/plantrx">
              <motion.div variants={slideUpVariants as any}>
                <Card className="bg-gold/20 order-gold dark:border-gold hover:shadow-xl active:scale-98 transition-all cursor-pointer group overflow-hidden h-full">
                  <CardContent className="!px-3 !py-5 sm:p-6 flex flex-col items-center justify-center text-center relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green dark:bg-gold rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3">
                      <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white dark:group-hover:text-white transition-colors mb-0.5 sm:mb-1">About PlantRx</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Learn about our platform</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
