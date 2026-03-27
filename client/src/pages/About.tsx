import { useEnhancedPageTracking } from '../hooks/useAnalytics';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SEOHead } from "@/components/SEOHead";
import { BackButton } from "@/components/BackButton";
import { Link } from "wouter";
import { Leaf, Award,Info, Users,User, Globe, BookOpen, Microscope, Sparkles, AlertCircle, ChevronRight, ArrowRight, ArrowLeft, CheckCircle, ChevronDown, Shield, Zap, Target, Download, Heart } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { FadeInSection } from "@/components/ScrollReveal";
import { SplitText } from "@/utils/SplitText";
import { containerVariants, slideRightVariants, slideUpVariants } from "@/animation/framerMotionVariants";
import { Feature } from "@shared/subscriptionFeatures";
import { useRef } from "react";
import founderPhoto from "@assets/IMG_5496_1765046081124.jpeg";


const ourMission = [
  {
    icon: Leaf,
    title: "Natural First",
    description: "Prioritizing plant-based solutions that work with your body's natural healing processes.",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    planType: "diet" as const
  },
  {
    icon: Microscope,
    title: "Science-Backed",
    description: "Every recommendation is supported by both traditional wisdom and modern research.",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    planType: "workout" as const
  },
];

const features = [
  { icon: BookOpen, title: "Curate Natural Remedies", description: "We research, verify, and catalog over 130+ plant-based remedies from traditional healing systems worldwide." },
  { icon: Users, title: "Instant Generation", description: "Access our network of certified herbalists, naturopaths, and wellness experts for personalized guidance." },
  { icon: Microscope, title: "Provide Smart Tools", description: "Use AI-powered symptom analysis and personalized health plans to find the right remedies for your needs." },
];

const remedies = [
  { icon: Globe, title: "Traditional Herbal Medicine", description: "Ancient healing systems including Ayurveda, Traditional Chinese Medicine, and Indigenous practices passed down through generations." },
  { icon: Microscope, title: "Modern Scientific Research", description: "Cutting-edge research from peer-reviewed studies, medical journals, and global health organizations validating traditional practices." },
  { icon: Users, title: "Certified Experts", description: "Network of certified herbalists, naturopaths, and wellness experts who bring real-world clinical experience and practical wisdom." },
];

const educationalCards = [
  {
    // icon: Scale,
    title: "Traditional Documentation",
    formula: "Weight (kg) ÷ Height (m)²",
    description: "We examine historical texts from traditional medicine systems including Ayurveda, Traditional Chinese Medicine, and Indigenous healing practices, documenting centuries of safe use and therapeutic applications across diverse populations and health conditions.",
    categories: [
      { range: "Under 18.5", label: "Underweight", color: "text-blue-600 dark:text-blue-400" },
      { range: "18.5 – 24.9", label: "Normal", color: "text-green-600 dark:text-green-400" },
      { range: "25 – 29.9", label: "Overweight", color: "text-yellow-600 dark:text-yellow-400" },
      { range: "30+", label: "Obese", color: "text-red-600 dark:text-red-400" },
    ],
    limitation: "BMI doesn't distinguish between muscle and fat, so very muscular people may show as \"overweight\" even when healthy.",
    gradient: "from-blue-500 to-indigo-500",
    bgGlow: "bg-gold/10 dark:bg-blue-500/5"
  },
  {
    // icon: Ruler,
    title: "Scientific Research",
    formula: "Waist (cm) ÷ Height (cm)",
    description: "Every remedy is cross-referenced with peer-reviewed clinical trials from PubMed, research databases, and phytochemical studies. We evaluate study quality, sample sizes, dosing protocols, and reproducibility to ensure recommendations are supported by rigorous scientific evidence.",
    categories: [
      { range: "Under 0.50", label: "Healthy", color: "text-green-600 dark:text-green-400" },
      { range: "0.50 – 0.59", label: "Increased Risk", color: "text-yellow-600 dark:text-yellow-400" },
      { range: "0.60+", label: "High Risk", color: "text-red-600 dark:text-red-400" },
    ],
    limitation: "The golden rule: keep your waist circumference to less than half your height for optimal health.",
    gradient: "from-purple-500 to-pink-500",
    bgGlow: "bg-gold/10 dark:bg-purple-500/5"
  },
  {
    // icon: Heart,
    title: "Clinical Expertise",
    formula: "Composite Score (0-100)",
    description: "Certified herbalists, naturopaths, and integrative medicine practitioners review each remedy for real-world effectiveness, practical preparation methods, typical patient responses, and appropriate clinical applications based on years of hands-on treatment experience.",
    categories: [
      { range: "80-100", label: "Strong", color: "text-green-600 dark:text-green-400" },
      { range: "60-79", label: "Fair", color: "text-yellow-600 dark:text-yellow-400" },
      { range: "40-59", label: "Needs Attention", color: "text-orange-600 dark:text-orange-400" },
      { range: "0-39", label: "High Risk", color: "text-red-600 dark:text-red-400" },
    ],
    limitation: "This score is a wellness estimate, not a medical diagnosis. Use it as motivation for healthy lifestyle changes.",
    gradient: "from-teal-500 to-emerald-500",
    bgGlow: "bg-gold/10 dark:bg-teal-500/5"
  }
];

export default function About() {
  // Enhanced analytics tracking for about page
  useEnhancedPageTracking('about', 'main');
  const ourMissionRef = useRef<HTMLDivElement>(null);
  const meetOurFounderRef = useRef<HTMLDivElement>(null);
  const warningRef = useRef<HTMLDivElement>(null);


  const scrollToourMission = () => {
    ourMissionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    meetOurFounderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    warningRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <SEOHead
        title="About PlantRx - Your Natural Health Companion | Expert Plant-Based Remedies"
        description="Learn about PlantRx's mission to make natural, plant-based remedies accessible to everyone. Discover our trusted sources of knowledge and why we're different."
        keywords="about PlantRx, natural health platform, plant-based remedies, herbal medicine, traditional healing, modern science"
        canonical="https://plantrxapp.com/about"
      />

      {/* Back Button */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BackButton />
        </div>
      </div>

      {/* Hero Section with Logo */}
      <div className="relative overflow-hidden">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 dark:from-emerald-400/5 dark:via-teal-400/5 dark:to-cyan-400/5"></div> */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16">
          <div className="text-center">
            <div className="text-center max-w-4xl mx-auto">
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 sm:rounded-2xl mb-4 sm:mb-5 lg:mb-6 bg-green dark:bg-gold rounded-2xl inline-flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(56,81,39,0.15)] dark:shadow-[0_4px_20px_-4px_rgba(56,81,39,0.1)] rotate-3 shadow-lg">
                <Leaf className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6 leading-tight tracking-tight">
                <SplitText text="PlantRx — Your Natural Health Companion" />
              </h1>

              {/* Subtitle */}
              <motion.p variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0 }} className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto">
                PlantRx is a revolutionary health and wellness platform that bridges the gap between ancient herbal wisdom and modern scientific research, making natural remedies safe, accessible, and effective for everyone.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do */}
      <div className="py-12 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-8 sm:mb-16">
            <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
              <SplitText text="What We Do" />
            </h2>
          </FadeInSection>

          <motion.div variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <FadeInSection key={feature.title} delay={index * 0.1} className="h-full">
                <motion.div
                  className="h-full"
                >
                  <motion.div className="h-full" variants={slideUpVariants as any}>
                    <Card className="h-full bg-gold/20 dark:from-gray-800 dark:to-gray-900 border-none dark:border-gray-700 dark:hover:border-purple-600 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all">
                      <CardContent className="p-3 sm:p-8 pt-3 sm:pt-6 h-full flex flex-col">
                        <div
                          className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] flex items-center justify-center mt-1 sm:mt-2 mb-3 sm:mb-5 shadow-lg"
                        >
                          <feature.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <h3 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{feature.title}</h3>
                        <p className="text-[10px] sm:text-base text-gray-600 dark:text-gray-400 flex-grow">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </FadeInSection>
            ))}
          </motion.div>
        </div>
      </div>

      {/* our mission */}
      <div ref={ourMissionRef} className="py-12 sm:py-24 lg:py-32 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-8 sm:mb-16">
            {/* Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 sm:rounded-2xl mb-4 sm:mb-5 lg:mb-6 bg-green dark:bg-gold rounded-2xl inline-flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(56,81,39,0.15)] dark:shadow-[0_4px_20px_-4px_rgba(56,81,39,0.1)] rotate-3 shadow-lg">
              <Leaf className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
              <SplitText text="Our Mission" />
            </h2>
            <motion.div
              variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <p className="text-sm sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our mission is to help people live healthier lives through natural remedies, holistic guidance, and trustworthy education. We believe in empowering individuals to take control of their health with safe, plant-based solutions backed by both tradition and science.
              </p>
            </motion.div>
          </FadeInSection>

          <motion.div variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
            {ourMission.map((type, index) => (
              <motion.div variants={slideUpVariants as any} key={type.title}>
                <motion.div
                  onClick={() => handleSelectBlueprintType(type.planType)}
                  whileHover={{ y: -15, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="cursor-pointer h-full"
                >
                  <Card className="h-full bg-white dark:bg-gray-800 border-none dark:border-gray-700 dark:hover:border-gray-700 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                    <div className={`h-1 sm:h-2 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto]`} />
                    <CardContent className="p-3 sm:p-8 pt-3 sm:pt-6 text-center flex flex-col items-center h-full">
                      <motion.div
                        className={`w-10 h-10 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] mb-3 sm:mb-6 mt-1 sm:mt-2 flex items-center justify-center shadow-xl`}
                      >
                        <type.icon className="w-5 h-5 sm:w-10 sm:h-10 text-white" />
                      </motion.div>
                      <h3 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-3">{type.title}</h3>
                      <p className="text-[10px] sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed flex-grow line-clamp-2 sm:line-clamp-none">{type.description}</p>

                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Features Grid */}
      <div ref={meetOurFounderRef} className="py-12 sm:py-24 lg:py-32 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-8 sm:mb-16">
            <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
              <SplitText text="Meet Our Founder" />
            </h2>
          </FadeInSection>

          <motion.div variants={slideUpVariants as any}>
            <Card className="bg-white dark:bg-gray-900 border-gold dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
              <div className={`h-1.5 bg-gradient-to-r`} />
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start flex-col md:flex-row gap-4 lg:mt-6 mb-4">
                  {/* Animated Avatar */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}

                    className="relative w-24 h-24 sm:w-40 sm:h-40 sm:min-w-40 mb-6"
                  >
                    {/* Glow rings */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green to-green rounded-full animate-pulse opacity-50 blur-md" />
                    <div className="absolute inset-2 bg-gradient-to-br from-green to-green rounded-full animate-pulse opacity-30 blur-sm" style={{ animationDelay: "0.5s" }} />

                    {/* Main avatar with photo */}
                    <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-green/30 dark:shadow-gold/20 ring-4 ring-white/50 dark:ring-gray-800">
                      <img
                        src={founderPhoto}
                        alt="Zayan Beg - Founder of PlantRx"
                        className="w-full h-full object-cover scale-110"
                        style={{ objectPosition: '50% 25%' }}
                      />

                      {/* Sparkle decorations */}
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-2 -left-2"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      >
                        <Sparkles className="w-5 h-5 text-amber-400" />
                      </motion.div>
                    </div>
                  </motion.div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Zayan Beg</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Founder & CEO, PlantRx</p>
                    <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Zayan Beg founded PlantRx with a vision to bridge the gap between ancient herbal wisdom and modern scientific research. Based in London, UK, Zayan recognized that millions of people were searching for natural health solutions but struggling to find reliable, evidence-based information they could trust.
                    </p>
                    <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      Under Zayan's leadership, PlantRx has grown to feature over 130 verified plant-based remedies, serving a global community of health-conscious individuals seeking natural alternatives. The platform combines AI-powered personalization with expert-curated content to make professional-grade natural health information accessible to everyone.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* warningRef */}
      <div ref={warningRef} className="py-12 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="flex items-start gap-3 sm:gap-4 bg-gold/20 dark:bg-gold/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border border-gold/30 dark:border-gold/10">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green dark:text-gold flex-shrink-0 mt-0.5" />
              <div className="space-y-1.5 sm:space-y-2">
                <p className="font-semibold text-green dark:text-gold text-base sm:text-lg">Important Health Advisory</p>
                <p className="text-sm sm:text-base text-green dark:text-gold leading-relaxed">
                  <strong>PlantRx is for educational purposes only and is NOT a substitute for professional medical advice, diagnosis, or treatment. </strong>The information provided on our platform is intended to complement, not replace, the relationship between you and your healthcare provider.
                </p>
                <p className="text-sm sm:text-base text-green dark:text-gold leading-relaxed">
                  Always consult with a qualified healthcare professional before starting any new health regimen, using natural remedies, or making changes to your current treatment plan. Natural remedies can interact with medications and may not be suitable for everyone.
                </p>

                <p className="text-sm sm:text-base text-green dark:text-gold leading-relaxed">
                  For full details, please read our <a href="/disclaimer" className="text-red-600 dark:text-red-400 hover:underline font-medium">Medical Disclaimer</a> and <a href="/disclaimer" className="text-red-600 dark:text-red-400 hover:underline font-medium">Terms & Conditions</a>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Accordion */}
      <div className="py-12 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-1.5 sm:gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 sm:[&_svg]:size-5 [&_svg]:shrink-0 bg-background hover:bg-accent hover:text-accent-foreground text-sm sm:h-10 sm:px-4 sm:py-2 sm:text-base !h-auto w-full flex items-center justify-between rounded-2xl border-2 border-green/50 dark:border-emerald-800 hover:border-green dark:hover:border-green !bg-white dark:bg-gray-900 transition-all group p-3 sm:p-4 lg:p-6 min-h-[64px] sm:min-h-[80px] lg:min-h-[96px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green rounded-xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <h2 className="text-sm sm:text-base lg:text-xl font-bold text-black dark:text-green leading-tight">
                        How PlantRx Was Founded
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
                    PlantRx emerged from a simple observation: while thousands of people search daily for natural health solutions, most online resources offer either oversimplified folk remedies without scientific backing or dense academic research inaccessible to everyday users. The gap between traditional herbal wisdom and modern evidence-based medicine left people confused, skeptical, or worse – trying ineffective or potentially harmful treatments.
                  </p>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                    Our founders, a team of certified herbalists, naturopathic physicians, and health technology experts, recognized that clinical herbal medicine deserves the same professional standards as conventional healthcare. They assembled a network of practitioners who had spent decades successfully treating patients with plant-based remedies, documented their most effective protocols, and cross-referenced this clinical experience with peer-reviewed research databases.
                  </p>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                    What started as a collaborative database among practicing herbalists evolved into PlantRx – a comprehensive platform making professional-grade natural medicine accessible to everyone. We maintain the clinical rigor demanded by healthcare practitioners while presenting information in clear, practical terms anyone can understand and apply. Every remedy reflects years of real-world clinical use, validated by both traditional documentation and modern scientific research, ensuring you receive guidance that's both time-tested and evidence-based.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </FadeInSection>
        </div>
      </div>

      {/* Remedies */}
      <div className="py-12 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">

            {/* Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 sm:rounded-2xl mb-4 sm:mb-5 lg:mb-6 bg-green dark:bg-gold rounded-2xl inline-flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(56,81,39,0.15)] dark:shadow-[0_4px_20px_-4px_rgba(56,81,39,0.1)] rotate-3 shadow-lg">
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6 leading-tight tracking-tight">
              <SplitText text="Where Our Remedies Come From" />
            </h1>

            {/* Subtitle */}
            <motion.p variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }} className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto">
              Every remedy on PlantRx is built from three trusted sources of knowledge:
            </motion.p>
          </div>

          <motion.div variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {remedies.map((remedies, index) => (
              <FadeInSection key={remedies.title} delay={index * 0.1} className="h-full">
                <motion.div
                  className="h-full"
                >
                  <motion.div className="h-full" variants={slideUpVariants as any}>
                    <Card className="h-full bg-gold/20 dark:from-gray-800 dark:to-gray-900 border-none dark:border-gray-700 dark:hover:border-purple-600 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all">
                      <CardContent className="p-3 sm:p-8 pt-3 sm:pt-6 h-full flex flex-col">
                        <div
                          className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] flex items-center justify-center mt-1 sm:mt-2 mb-3 sm:mb-5 shadow-lg"
                        >
                          <remedies.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <h3 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{remedies.title}</h3>
                        <p className="text-[10px] sm:text-base text-gray-600 dark:text-gray-400 flex-grow">{remedies.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </FadeInSection>
            ))}
          </motion.div>
        </div>
      </div>


      {/* Accordion */}
      <div className="py-12 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-1.5 sm:gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 sm:[&_svg]:size-5 [&_svg]:shrink-0 bg-background hover:bg-accent hover:text-accent-foreground text-sm sm:h-10 sm:px-4 sm:py-2 sm:text-base !h-auto w-full flex items-center justify-between rounded-2xl border-2 border-green/50 dark:border-emerald-800 hover:border-green dark:hover:border-green !bg-white dark:bg-gray-900 transition-all group p-3 sm:p-4 lg:p-6 min-h-[64px] sm:min-h-[80px] lg:min-h-[96px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green rounded-xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <h2 className="text-sm sm:text-base lg:text-xl font-bold text-black dark:text-green leading-tight">
                        How PlantRx Was Founded
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
                    How we verify and validate every natural remedy in our database
                  </p>

                <div classNmae="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                  {educationalCards.map((card, index) => (
                    <motion.div
                      key={card.title}
                      variants={slideUpVariants as any}
                    >
                      <Card className={`h-full bg-white dark:bg-gray-900/80 shadow-xl border border-gold/30 dark:border-gold/10 overflow-hidden backdrop-blur-sm ${card.bgGlow}`}>
                        <div className={`h-1.5 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)]`} />
                        <CardContent className="p-6 lg:p-8">
                          <div className="flex items-center gap-3 mb-5">
                            <div className="p-3 rounded-xl bg-green text-white shadow-lg">
                              {/* <card.icon className="w-6 h-6" /> */}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{card.title}</h3>
                          </div>

                          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            {card.description}
                          </p>

                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </FadeInSection>
        </div>
      </div>



      <div className="py-12 sm:py-24 lg:py-32 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10 lg:pb-16">

          {/* NEW: Evidence-Based Methodology Section - 300+ Words - COLLAPSIBLE */}
          <ScrollReveal variant="fadeUp">
            <Card className="mb-8 sm:mb-12 shadow-xl border-0 bg-gradient-to-br from-white via-emerald-50 to-white dark:from-gray-800 dark:via-emerald-900/10 dark:to-gray-800 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 bg-white dark:bg-gray-900 transition-all group mb-4"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-emerald-800 dark:text-emerald-200">Our Evidence-Based Methodology</h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                      How we verify and validate every natural remedy in our database
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
                      <Card className="bg-white dark:bg-gray-800 border-2 border-emerald-200 dark:border-emerald-800 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center text-emerald-700 dark:text-emerald-300">
                            <span className="text-3xl mr-3">📚</span>
                            <span className="text-lg sm:text-xl">Traditional Documentation</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-700 dark:text-gray-300">
                          <p className="text-sm sm:text-base leading-relaxed">
                            We examine historical texts from traditional medicine systems including Ayurveda, Traditional Chinese Medicine, and Indigenous healing practices, documenting centuries of safe use and therapeutic applications across diverse populations and health conditions.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-white dark:bg-gray-800 border-2 border-teal-200 dark:border-teal-800 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center text-teal-700 dark:text-teal-300">
                            <span className="text-3xl mr-3">🔬</span>
                            <span className="text-lg sm:text-xl">Scientific Research</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-700 dark:text-gray-300">
                          <p className="text-sm sm:text-base leading-relaxed">
                            Every remedy is cross-referenced with peer-reviewed clinical trials from PubMed, research databases, and phytochemical studies. We evaluate study quality, sample sizes, dosing protocols, and reproducibility to ensure recommendations are supported by rigorous scientific evidence.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-white dark:bg-gray-800 border-2 border-cyan-200 dark:border-cyan-800 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center text-cyan-700 dark:text-cyan-300">
                            <span className="text-3xl mr-3">👨‍⚕️</span>
                            <span className="text-lg sm:text-xl">Clinical Expertise</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-700 dark:text-gray-300">
                          <p className="text-sm sm:text-base leading-relaxed">
                            Certified herbalists, naturopaths, and integrative medicine practitioners review each remedy for real-world effectiveness, practical preparation methods, typical patient responses, and appropriate clinical applications based on years of hands-on treatment experience.
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                      <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Our Verification Standards
                      </h4>
                      <div className="prose prose-lg max-w-none dark:prose-invert">
                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          Before any remedy enters our database, it must pass a comprehensive verification process. We require documented traditional use spanning at least 50 years, preferably across multiple cultures or medical systems. Scientific evidence must include human clinical trials or robust observational studies – animal studies alone are insufficient. Safety profiles are thoroughly examined, including potential side effects, contraindications, medication interactions, and special populations (pregnancy, nursing, children, elderly).
                        </p>
                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          We prioritize remedies with established safety records and clear therapeutic benefits. Each remedy undergoes regular review as new research emerges, ensuring our recommendations remain current with the latest scientific understanding. This rigorous approach means you can trust that PlantRx remedies represent the gold standard in evidence-based natural medicine – thoroughly researched, professionally vetted, and proven effective through both traditional wisdom and modern science.
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* 4. Why PlantRx Is Different */}
          <ScrollReveal variant="fadeUp">
            <Card className="mb-8 sm:mb-12 shadow-xl border-0 bg-gradient-to-br from-white via-emerald-50 to-white dark:from-gray-800 dark:via-emerald-900/10 dark:to-gray-800 backdrop-blur-sm">
              <CardHeader className="text-center pb-4 sm:pb-6 md:pb-8">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <Award className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white drop-shadow-sm" />
                </div>
                <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Why PlantRx Is Different
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 sm:p-6 md:p-8 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2 sm:mb-3">Transparent, Research-Backed Remedies</h3>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">No hidden agendas — every remedy is backed by verifiable research and traditional use with full transparency about sources and effectiveness.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-4 sm:p-6 md:p-8 border border-teal-200 dark:border-teal-800">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-teal-800 dark:text-teal-200 mb-2 sm:mb-3">Free Access with Premium Tools</h3>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">Core knowledge is free for everyone, with advanced AI-powered personalization and expert consultations available for deeper health optimization.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl p-4 sm:p-6 md:p-8 border border-cyan-200 dark:border-cyan-800">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-cyan-600 dark:text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-cyan-800 dark:text-cyan-200 mb-2 sm:mb-3">Global Wisdom Meets Modern Science</h3>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">Unique synthesis of traditional healing wisdom from around the world combined with cutting-edge scientific validation and AI-powered insights.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 sm:p-6 md:p-8 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2 sm:mb-3">Community-Driven & Ethical</h3>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">Built by and for the natural health community with sustainable practices, ethical sourcing, and respect for traditional knowledge holders.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* NEW: Clinical Standards & Professional Commitment - 300+ Words - COLLAPSIBLE */}
          <ScrollReveal variant="fadeUp">
            <Card className="mb-8 sm:mb-12 shadow-xl border-0 bg-gradient-to-br from-white via-slate-50 to-white dark:from-gray-800 dark:via-slate-900/10 dark:to-gray-800 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-gray-900 transition-all group mb-4"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">Clinical Standards & Professional Commitment</h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        Professional healthcare demands rigorous standards, and clinical herbal medicine is no exception. PlantRx applies the same level of professional scrutiny to natural remedies that conventional medicine applies to pharmaceutical treatments. This means comprehensive safety documentation, clear contraindication warnings, drug interaction alerts, and honest assessments of both benefits and limitations. We never overstate effectiveness or ignore potential risks in pursuit of promoting natural medicine.
                      </p>

                      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        Every remedy profile includes detailed safety information addressing potential side effects, populations who should avoid the remedy (pregnant women, nursing mothers, children, those with specific health conditions), and important medication interactions. We clearly indicate when professional medical consultation is essential rather than optional. For serious conditions, emergencies, or complex health situations, we explicitly direct users to seek appropriate conventional medical care, recognizing that natural remedies complement rather than replace professional healthcare when needed.
                      </p>

                      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        Quality assurance extends beyond safety to efficacy and practical application. We specify when standardized herbal extracts are preferable to whole plant preparations, noting the active compounds and optimal concentrations supported by clinical research. For remedies requiring specific preparation methods, we provide detailed instructions ensuring users can accurately replicate therapeutic protocols. When multiple preparation methods exist, we explain the trade-offs to help users choose approaches matching their needs and capabilities.
                      </p>

                      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Our professional commitment means continuous education and improvement. As new research emerges or safety concerns arise, we promptly update remedy profiles and notify users of significant changes. We acknowledge uncertainties and knowledge gaps honestly, distinguishing between well-established remedies backed by substantial evidence and promising treatments requiring further research. This transparent, evidence-based approach ensures PlantRx users receive the most accurate, current, and professionally vetted natural health guidance available, delivered with the integrity and responsibility healthcare demands.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border-2 border-emerald-200 dark:border-emerald-800 text-center">
                        <div className="text-4xl mb-3">✓</div>
                        <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-200 mb-2">Evidence-Based</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">All recommendations supported by clinical research and traditional documentation</p>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800 text-center">
                        <div className="text-4xl mb-3">🛡️</div>
                        <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">Safety First</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive safety profiles with contraindications and interaction warnings</p>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800 text-center">
                        <div className="text-4xl mb-3">🔄</div>
                        <h4 className="text-lg font-bold text-purple-800 dark:text-purple-200 mb-2">Continuously Updated</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Regular reviews and updates as new research and safety data emerges</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* NEW: Three Core Pillars - COLLAPSIBLE */}
          <ScrollReveal variant="fadeUp">
            <Card className="mb-8 sm:mb-12 shadow-xl border-0 bg-gradient-to-br from-white via-purple-50 to-white dark:from-gray-800 dark:via-purple-900/10 dark:to-gray-800 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 bg-white dark:bg-gray-900 transition-all group mb-4"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-purple-800 dark:text-purple-200">Three Core Pillars of Natural Health at PlantRx</h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
                      Our specialized therapeutic approaches target the most common health challenges facing modern individuals
                    </p>

                    <div className="space-y-8">
                      {/* Pillar 1: Hormone Balance */}
                      <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10 rounded-2xl p-6 sm:p-8 border border-pink-200 dark:border-pink-800 shadow-lg">
                        <h4 className="text-xl sm:text-2xl font-bold text-pink-900 dark:text-pink-200 mb-4 flex items-center">
                          <span className="text-3xl mr-3">🌸</span>
                          Pillar 1: Hormone Balance & Endocrine Support
                        </h4>
                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          Hormonal imbalances affect millions of people, manifesting as irregular cycles, mood swings, weight changes, fatigue, and reproductive challenges. Our hormone-balancing remedies utilize phytoestrogens, adaptogens, and endocrine-supporting herbs like vitex, maca, and evening primrose to help restore natural hormonal rhythms. These plant medicines work gently over weeks to months, supporting your body's own regulatory systems rather than forcing hormonal changes.
                        </p>
                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          Popular hormone-balancing remedies include spearmint tea for reducing excess androgens in PCOS, saw palmetto for prostate health and hormonal acne, white peony and licorice combinations for estrogen-progesterone balance, and ashwagandha for thyroid support. Each remedy targets specific hormonal pathways with documented clinical efficacy, offering natural alternatives for managing menopause symptoms, premenstrual syndrome, fertility challenges, and hormonal skin conditions. We provide detailed protocols including optimal timing relative to menstrual cycles and realistic timeframes for seeing improvements.
                        </p>
                      </div>

                      {/* Pillar 2: Immune Resilience */}
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-2xl p-6 sm:p-8 border border-blue-200 dark:border-blue-800 shadow-lg">
                        <h4 className="text-xl sm:text-2xl font-bold text-blue-900 dark:text-blue-200 mb-4 flex items-center">
                          <span className="text-3xl mr-3">🛡️</span>
                          Pillar 2: Immune Resilience & Inflammatory Response
                        </h4>
                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          Chronic inflammation underlies countless modern health conditions, from arthritis and autoimmune diseases to cardiovascular problems and metabolic disorders. Our anti-inflammatory and immune-supporting remedies harness powerful plant compounds like curcumin from turmeric, gingerols from ginger, and boswellic acids from frankincense to modulate inflammatory pathways naturally. These aren't just pain relievers – they address root causes by reducing inflammatory markers like C-reactive protein and supporting balanced immune function.
                        </p>
                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          Key remedies include golden milk turmeric formulas for systemic inflammation, echinacea and elderberry for acute immune support during illness, medicinal mushrooms like reishi and turkey tail for long-term immune modulation, and quercetin-rich foods for histamine regulation. We emphasize remedies with strong anti-inflammatory research, including dosing strategies that match clinical trials (like 500-1000mg curcumin with black pepper for enhanced absorption). Our protocols distinguish between acute immune support for fighting infections and chronic immune modulation for autoimmune conditions.
                        </p>
                      </div>

                      {/* Pillar 3: Stress & Sleep */}
                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-2xl p-6 sm:p-8 border border-purple-200 dark:border-purple-800 shadow-lg">
                        <h4 className="text-xl sm:text-2xl font-bold text-purple-900 dark:text-purple-200 mb-4 flex items-center">
                          <span className="text-3xl mr-3">🧘</span>
                          Pillar 3: Stress Management & Sleep Optimization
                        </h4>
                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          Chronic stress and poor sleep create cascading health problems affecting every body system. Our nervine and sedative herbs provide natural support for your nervous system, helping regulate cortisol levels, reduce anxiety, and improve sleep quality without the dependency risks of pharmaceutical options. Adaptogenic herbs help your body respond more effectively to stressors, while calming nervines directly soothe an overactive nervous system.
                        </p>
                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          Essential stress and sleep remedies include chamomile and passionflower for gentle relaxation, valerian and hops combinations for deeper sleep support, holy basil and rhodiola for daytime stress resilience without sedation, and magnesium-rich herbal preparations for muscle relaxation and GABA support. We provide comprehensive sleep protocols addressing sleep onset (trouble falling asleep), sleep maintenance (frequent waking), and sleep quality (non-restorative sleep), along with stress management strategies that combine herbal support with lifestyle modifications for maximum effectiveness.
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* 5. Call-to-Action */}
          <ScrollReveal variant="fadeUp">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-cyan-900/30 backdrop-blur-sm">
              <CardContent className="text-center py-8 sm:py-12 md:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-xl">
                  <Leaf className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white drop-shadow-lg" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                  Ready to Start Your Natural Health Journey?
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-200 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
                  Discover over 130+ verified plant-based remedies, connect with certified experts, and take the first step toward a healthier, more natural lifestyle. Your journey to optimal wellness starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/remedies">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 text-base sm:text-lg md:text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      data-testid="button-explore-remedies"
                    >
                      <Leaf className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                      Explore Remedies
                    </Button>
                  </Link>
                  <Link href="/smart-tools">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 text-base sm:text-lg md:text-xl font-bold rounded-xl transition-all duration-300"
                      data-testid="button-try-smart-tools"
                    >
                      <Microscope className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                      Try Smart Tools
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
}