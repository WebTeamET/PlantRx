import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Sparkles, ArrowDown, ArrowUp, Brain, Stethoscope, Leaf, Zap, ExternalLink, ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { SEOHead } from "@/components/SEOHead";
import { UpgradeInterstitial } from "@/components/FeatureLock";
import { Feature } from "@shared/subscriptionFeatures";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import HealthChat from "@/components/HealthChat";
import { containerVariants, slideRightVariants, slideRightVariantsFast, slideUpVariants } from "@/animation/framerMotionVariants";
import { SplitText } from "@/utils/SplitText";

function FadeInSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.92, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.92, y: 24 }}
      transition={{
        duration: 0.35,
        delay,
        ease: "easeOut"
      }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingElement({ children, duration = 3 }: { children: React.ReactNode; duration?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxSection({ children, className = "", speed = 0.5 }: { children: React.ReactNode; className?: string; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const howItWorks = [
  {
    step: 1,
    icon: Brain,
    title: "Describe Your Symptoms",
    description: "Tell our AI about your health concerns in natural language - no medical jargon needed."
  },
  {
    step: 2,
    icon: Stethoscope,
    title: "AI Analysis",
    description: "Our advanced AI analyzes your symptoms using clinical herbal medicine expertise."
  },
  {
    step: 3,
    icon: Leaf,
    title: "Get Remedies",
    description: "Receive personalized natural remedy recommendations backed by research."
  }
];

export default function ToolsSymptomFinder() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const scrollToChat = () => {
    const chatSection = document.getElementById('symptom-chat');
    chatSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>AI Symptom Finder - Smart Health Analysis Tool | PlantRx</title>
        <meta name="description" content="Get instant personalized natural remedies with our FREE AI Symptom Finder. Expert-guided health solutions tailored to your needs. Try our smart health analysis now!" />
      </Helmet>
      <SEOHead
        title="AI Symptom Finder - Smart Health Analysis | PlantRx Smart Tools"
        description="Get instant personalized natural remedies with our FREE AI Symptom Finder. Expert-guided health solutions tailored to your needs. Try our smart health analysis now!"
        keywords="AI symptom finder, symptom analyzer, natural remedy finder, health assessment tool, PlantRx smart tools, personalized wellness, remedy finder, natural health AI"
        canonical="https://plantrxapp.com/tools/symptom-finder"
        ogType="website"
      />

      <UpgradeInterstitial feature={Feature.AI_SYMPTOM_FINDER}>

        <div className="overflow-x-hidden touch-pan-y">
          {/* Hero Section */}
          <section className="min-h-[70vh] sm:min-h-[90vh] relative flex flex-col items-center justify-center py-10 sm:py-20 bg-gold/20 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
              <div className="absolute top-20 left-10 w-72 h-72 bg-gold/20 dark:bg-emerald-600/10 rounded-full" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/30 dark:bg-teal-600/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green/10 dark:bg-cyan-600/5 rounded-full" />
            </div>
            {/* Animated background elements - GPU accelerated */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div>
                <Badge className="m-5 inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-green dark:text-green backdrop-blur-md rounded-full border border-green/50 dark:border-green/50 shadow-lg shadow-green/20">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-green dark:text-green" />
                  AI-Powered Health Analysis
                </Badge>
              </motion.div>
              <motion.div
                variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-green rounded-2xl sm:rounded-3xl mx-auto mb-4 sm:mb-8 flex items-center justify-center shadow-2xl">
                  <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white" />
                </div>
              </motion.div>

              <h1 className="text-2xl sm:text-4xl lg:text-6xl xl:text-7xl text-black dark:text-black mb-3 sm:mb-6 lg:mb-8 leading-tight">
                <SplitText text="AI Symptom Finder" />
              </h1>

              <motion.div variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <p className="text-sm sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-700 max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2">
                  Advanced symptom analysis to help you find the perfect natural solutions for your health concerns
                </p>
              </motion.div>

              <motion.div
                variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                className="inline-flex items-center gap-2 sm:gap-4 btn-green px-6 py-3 sm:px-10 sm:py-5 lg:px-14 lg:py-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg lg:text-xl shadow-2xl cursor-pointer"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                <span>Start Analysis</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </motion.div>
              </motion.div>

            </div>
          </section>


          {/* How It Works Section */}
          <section className="py-10 sm:py-16 lg:py-24 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">

              <FadeInSection className="text-center mb-8 sm:mb-16">
                <motion.div
                  variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                  <span className="text-green dark:text-gold font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-4 block">Simple Process</span>
                </motion.div>
                <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
                  <SplitText text="How It Works" />
                </h2>
                <motion.div
                  variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                  <p className="text-sm sm:text-xl text-gray-600 dark:text-white max-w-2xl mx-auto">
                    Get personalized remedy recommendations in three easy steps
                  </p>
                </motion.div>
              </FadeInSection>

              <motion.div
                variants={containerVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-10"
              >
                {howItWorks.map((item, index) => (
                  <FadeInSection key={item.step} delay={index * 0.15} className="h-full">
                    <motion.div
                      variants={slideUpVariants as any}
                      className="h-full text-center p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-gold/20 dark:from-gray-800 dark:to-gray-900 border border-gold shadow-lg hover:shadow-2xl transition-shadow flex flex-col items-center"
                    >
                      <div className="relative inline-block mb-3 sm:mb-5 mx-auto">
                        <motion.div
                          className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-gold flex items-center justify-center shadow-xl"
                          whileHover={{ rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                        </motion.div>
                        <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-green border-2 sm:border-4 border-green flex items-center justify-center text-xs sm:text-lg font-bold text-white shadow-lg">
                          {item.step}
                        </div>
                      </div>
                      <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 sm:mb-3">{item.title}</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed flex-1 flex-grow">{item.description}</p>
                    </motion.div>
                  </FadeInSection>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Chat Section - Premium Experience */}
          <section id="symptom-chat" className="relative py-12 sm:py-20 lg:py-32">
            {/* Layered gradient background */}
            <div className="absolute inset-0 bg-gold/20 dark:from-gray-900 dark:via-emerald-900/10 dark:to-gray-900" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-gray-900/50 to-transparent" />

            {/* Decorative elements - hidden on mobile */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto]" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-gold/30 dark:bg-emerald-600/10 rounded-full hidden sm:block" />
              <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-green/20 dark:bg-teal-600/10 rounded-full hidden sm:block" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12 lg:mb-14">



                <FadeInSection className="text-center mb-8 sm:mb-16">
                  <motion.div
                    variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <span className="text-green dark:text-green font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-4 block">AI Expert Available 24/7</span>
                  </motion.div>
                  <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-gray-900 mb-2 sm:mb-4">
                    <SplitText text="How It Works" />
                  </h2>
                  <motion.div
                    variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <p className="text-sm sm:text-xl text-gray-600 dark:text-gray-600 max-w-2xl mx-auto">
                      Your personal AI health expert. Describe your symptoms and receive personalized natural remedy recommendations instantly.
                    </p>
                  </motion.div>
                </FadeInSection>
              </div>

              <FadeInSection delay={0.2}>
                <motion.div
                  className="w-full bg-gray-50 dark:bg-gray-950 h-[580px] sm:h-[700px] lg:h-[850px] xl:h-[900px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:border-gray-700/60"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <HealthChat />
                </motion.div>
              </FadeInSection>

              {/* Trust indicators - side by side */}

              <motion.div variants={containerVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-8 mt-8 sm:mt-12 lg:mt-14 text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
                <motion.div variants={slideRightVariantsFast as any}>
                  <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 bg-white/70 dark:bg-gray-800/70 px-2 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-full shadow-md">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] flex items-center justify-center shadow-lg shadow-gold/20 flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-[10px] sm:text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-300 text-center sm:text-left">Instant Analysis</span>
                  </div>
                </motion.div>
                <motion.div variants={slideRightVariantsFast as any}>
                  <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 bg-white/70 dark:bg-gray-800/70 px-2 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-full shadow-md">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] flex items-center justify-center shadow-lg shadow-gold/20 flex-shrink-0">
                      <Leaf className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-[10px] sm:text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-300 text-center sm:text-left">131 Remedies</span>
                  </div>
                </motion.div>
                <motion.div variants={slideRightVariantsFast as any}>
                  <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 bg-white/70 dark:bg-gray-800/70 px-2 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-full shadow-md">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] flex items-center justify-center shadow-lg shadow-gold/20 flex-shrink-0">
                      <Brain className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-[10px] sm:text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-300 text-center sm:text-left">Expert Knowledge</span>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </section>

          {/* Quick Start Symptoms - Interactive Category Selector */}
          <section className="py-10 sm:py-16 lg:py-28 bg-white dark:bg-gray-900 relative">
            {/* Subtle background decoration - hidden on mobile */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gold/20 dark:from-emerald-900/20 to-transparent rounded-full hidden sm:block" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gold/20 dark:from-teal-900/20 to-transparent rounded-full hidden sm:block" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
              <FadeInSection className="text-center mb-6 sm:mb-10 lg:mb-12">
                <motion.div
                  variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                  <div className="inline-flex items-center gap-2 bg-green/10 dark:bg-gold/20 border border-green dark:border-gold/40 rounded-full px-4 py-2 mb-5">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green dark:text-gold" />
                    <span className="text-xs sm:text-sm font-semibold text-green dark:text-gold">Quick Start</span>
                  </div>
                </motion.div>
                <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
                  <SplitText text="Common Health Concerns" />
                </h2>

                <motion.div
                  variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                  <p className="text-sm sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Select a category to get instant natural remedy suggestions from our AI expert
                  </p>
                </motion.div>
              </FadeInSection>

              <motion.div variants={containerVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
                {[
                  { icon: "😴", title: "Sleep", desc: "Insomnia & rest", color: "from-gold/50 to-gold/50", category: "sleep" },
                  { icon: "🧠", title: "Stress", desc: "Anxiety & calm", color: "from-gold/50 to-gold/50", category: "stress-relief" },
                  { icon: "⚡", title: "Energy", desc: "Fatigue & vitality", color: "from-gold/50 to-gold/50", category: "brain-health" },
                  { icon: "🍃", title: "Digestion", desc: "Gut health", color: "from-gold/50 to-gold/50", category: "digestive" },
                  { icon: "💪", title: "Immunity", desc: "Defense & recovery", color: "from-gold/50 to-gold/50", category: "immune-support" },
                  { icon: "🌸", title: "Skin", desc: "Glow & clarity", color: "from-gold/50 to-gold/50", category: "skin-care" }
                ].map((item, index) => (
                  <motion.div variants={slideUpVariants as any} key={item.title} className="h-full">
                    <Link href={`/remedies?category=${item.category}`}>
                      <motion.div
                        whileHover={{ y: -8, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-3 sm:p-5 lg:p-6 border-2 border-gray-100 dark:border-gray-700 shadow-md sm:shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full min-h-[120px] sm:min-h-[160px] lg:min-h-[180px] flex flex-col items-center justify-center cursor-pointer group"
                      >
                        {/* Top gradient bar */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                        {/* Icon */}
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.color} mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center text-lg sm:text-2xl lg:text-3xl shadow-md sm:shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {item.icon}
                        </div>

                        {/* Text */}
                        <h3 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm lg:text-lg mb-0.5 sm:mb-1 group-hover:text-gold dark:group-hover:text-gold transition-colors text-center">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs lg:text-sm text-center">
                          {item.desc}
                        </p>

                        {/* Hover indicator - hidden on mobile */}
                        <div className="mt-2 sm:mt-3 hidden sm:flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-gold dark:text-gold font-medium">View Remedies</span>
                          <ExternalLink className="w-3 h-3 text-gold dark:text-gold" />
                        </div>

                        {/* Corner decoration */}
                        <div className={`absolute -bottom-6 -right-6 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats row */}
              <motion.div variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto">
                  {[
                    { value: "131", label: "Natural Remedies" },
                    { value: "24/7", label: "AI Available" },
                    { value: "Free", label: "To Try" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl text-green font-bold mb-0.5 sm:mb-1">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Learn More Section */}
          <div className="bg-gradient-to-br from-gold/50 via-gold/50 to-gold-50 dark:from-emerald-900/10 dark:via-teal-900/10 dark:to-cyan-900/10 py-8 sm:py-12 lg:py-16">
            <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
              <FadeInSection>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-1.5 sm:gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 sm:[&_svg]:size-5 [&_svg]:shrink-0 bg-background hover:bg-accent hover:text-accent-foreground text-sm sm:h-10 sm:px-4 sm:py-2 sm:text-base !h-auto w-full flex items-center justify-between rounded-2xl border-2 border-green/50 dark:border-emerald-800 hover:border-green dark:hover:border-emerald-600 !bg-white dark:bg-gray-900 transition-all group p-3 sm:p-4 lg:p-6 min-h-[64px] sm:min-h-[80px] lg:min-h-[96px]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green rounded-xl flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <h2 className="text-sm sm:text-base lg:text-xl font-bold text-black dark:text-white leading-tight">
                            AI-Powered Health Analysis
                          </h2>
                          <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                            Click to learn how our symptom finder works
                          </p>
                        </div>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform group-data-[state=open]:rotate-180 flex-shrink-0" />
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-4 sm:mt-6">
                    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert p-4 sm:p-5 lg:p-6 bg-white dark:bg-gray-800/50 rounded-xl sm:rounded-2xl">
                      <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                        PlantRx AI Symptom Finder represents the convergence of artificial intelligence and clinical herbal medicine expertise, creating an unprecedented resource for personalized natural health guidance. Our AI analyzer processes your health concerns through sophisticated algorithms trained on thousands of documented remedy applications, cross-referenced with clinical research and traditional herbal knowledge spanning centuries.
                      </p>

                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4 mt-6 sm:mt-8">
                        How AI Symptom Analysis Works
                      </h3>

                      <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                        When you describe symptoms in conversational language, our AI parses this input to identify key indicators including symptom location, intensity, duration, timing patterns, and what makes symptoms better or worse. This detailed profile queries our extensive remedy database to identify botanical treatments with documented efficacy for your specific presentation. The AI recognizes symptom combinations and patterns that indicate specific therapeutic needs, mirroring the differential diagnosis process healthcare practitioners use.
                      </p>

                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4 mt-6 sm:mt-8">
                        Benefits of AI-Powered Remedy Matching
                      </h3>

                      <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                        Traditional remedy discovery requires extensive research and reading – a time-consuming process that frequently leads to suboptimal choices. AI symptom analysis delivers targeted recommendations within minutes based on comprehensive data analysis. You receive prioritized treatment protocols accounting for remedy synergies, preparation preferences, and your specific symptom patterns, with personalization considering your complete health picture including concurrent symptoms, existing conditions, medications, and lifestyle factors.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </FadeInSection>
            </div>
          </div>
        </div>
      </UpgradeInterstitial>
    </>
  );
}
