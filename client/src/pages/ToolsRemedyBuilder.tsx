import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Sparkles, Wand2, Leaf, Heart, CheckCircle, Package, Clock, ChevronDown, Gauge, TrendingUp, Zap, ArrowDown, Beaker, FlaskConical, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/contexts/TranslationContext";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { showSignInModal } from "@/lib/showSignInModal";
import { UpgradeInterstitial } from "@/components/FeatureLock";
import { Feature } from "@shared/subscriptionFeatures";
import { motion, useScroll, useInView } from "framer-motion";
import { containerVariants, slideUpVariants } from "@/animation/framerMotionVariants";
import { SplitText } from "@/utils/SplitText";

const symptomSuggestions = [
  { label: "Fatigue", icon: "⚡" },
  { label: "Anxiety", icon: "🧠" },
  { label: "Skin inflammation", icon: "✨" },
  { label: "Cold symptoms", icon: "🤧" },
  { label: "Digestive discomfort", icon: "🌿" },
  { label: "Sleep issues", icon: "😴" },
  { label: "Joint pain", icon: "🦴" },
  { label: "Headaches", icon: "🤕" },
];

const preferenceSuggestions = [
  { label: "No caffeine", icon: "☕" },
  { label: "Gentle herbs only", icon: "🌸" },
  { label: "Quick preparation", icon: "⏱️" },
  { label: "Tea form preferred", icon: "🍵" },
];

const herbBenefits: Record<string, { color: string; benefit: string }> = {
  "chamomile": { color: "from-yellow-400 to-amber-500", benefit: "Calming" },
  "lavender": { color: "from-purple-400 to-violet-500", benefit: "Relaxing" },
  "ginger": { color: "from-orange-400 to-amber-500", benefit: "Warming" },
  "turmeric": { color: "from-yellow-500 to-orange-500", benefit: "Anti-inflammatory" },
  "peppermint": { color: "from-emerald-400 to-green-500", benefit: "Refreshing" },
  "echinacea": { color: "from-pink-400 to-rose-500", benefit: "Immune boost" },
  "valerian": { color: "from-indigo-400 to-purple-500", benefit: "Sleep aid" },
  "ashwagandha": { color: "from-amber-500 to-yellow-600", benefit: "Adaptogenic" },
  "lemon balm": { color: "from-lime-400 to-green-500", benefit: "Soothing" },
  "elderberry": { color: "from-purple-500 to-violet-600", benefit: "Antioxidant" },
  "passionflower": { color: "from-fuchsia-400 to-pink-500", benefit: "Tranquil" },
  "ginseng": { color: "from-red-400 to-rose-500", benefit: "Energizing" },
  "rhodiola": { color: "from-rose-400 to-pink-500", benefit: "Stamina" },
  "holy basil": { color: "from-green-400 to-emerald-500", benefit: "Stress relief" },
  "licorice root": { color: "from-amber-400 to-yellow-500", benefit: "Soothing" },
  "milk thistle": { color: "from-purple-300 to-violet-400", benefit: "Liver support" },
  "dandelion": { color: "from-yellow-300 to-amber-400", benefit: "Detoxifying" },
  "nettle": { color: "from-green-500 to-teal-500", benefit: "Nourishing" },
  "fennel": { color: "from-lime-300 to-green-400", benefit: "Digestive" },
  "cinnamon": { color: "from-amber-600 to-orange-600", benefit: "Warming" },
};

const howItWorks = [
  { step: 1, icon: Beaker, title: "Describe Your Needs", description: "Tell us about your health concern and any preferences you have." },
  { step: 2, icon: FlaskConical, title: "AI Formulation", description: "Our expert AI creates a personalized herbal formula just for you." },
  { step: 3, icon: BookOpen, title: "Get Your Recipe", description: "Receive detailed instructions with ingredients, benefits, and dosage." }
];

// function ScrollProgress() {
//   const { scrollYProgress } = useScroll();
//   return (
//     <motion.div
//       className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 origin-left z-50"
//       style={{ scaleX: scrollYProgress, willChange: "transform" }}
//     />
//   );
// }

function FadeInSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.92, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.92, y: 24 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingElement({ children, duration = 4 }: { children: React.ReactNode; duration?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

const calculateConfidence = (input: string, hasPreferences: boolean, ingredientCount: number): { level: 'High' | 'Medium' | 'Low'; score: number; factors: string[] } => {
  let score = 0;
  const factors: string[] = [];

  const wordCount = input.trim().split(/\s+/).filter(w => w.length > 2).length;
  if (wordCount >= 5) { score += 35; factors.push("Detailed description"); }
  else if (wordCount >= 3) { score += 20; factors.push("Good description"); }
  else { score += 10; factors.push("Brief description"); }

  const healthKeywords = ['pain', 'sleep', 'stress', 'anxiety', 'fatigue', 'digestion', 'skin', 'cold', 'headache', 'inflammation', 'immune', 'energy', 'joint', 'muscle'];
  const matchedKeywords = healthKeywords.filter(kw => input.toLowerCase().includes(kw));
  if (matchedKeywords.length >= 2) { score += 30; factors.push("Multiple symptoms identified"); }
  else if (matchedKeywords.length === 1) { score += 20; factors.push("Symptom identified"); }

  if (hasPreferences) { score += 15; factors.push("Preferences specified"); }
  if (ingredientCount >= 3) { score += 20; factors.push("Rich herbal formula"); }
  else if (ingredientCount >= 2) { score += 15; factors.push("Balanced formula"); }

  score = Math.min(100, score);
  const level: 'High' | 'Medium' | 'Low' = score >= 70 ? 'High' : score >= 45 ? 'Medium' : 'Low';
  return { level, score, factors };
};

export default function ToolsRemedyBuilder() {
  const [remedyNeed, setRemedyNeed] = useState("");
  const [preferences, setPreferences] = useState("");
  const [generatedRemedy, setGeneratedRemedy] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);
  const [confidenceData, setConfidenceData] = useState<{ level: 'High' | 'Medium' | 'Low'; score: number; factors: string[] } | null>(null);
  const [, navigateTo] = useLocation();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) { }
    };
    fetchUser();
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  const scrollToBuilder = () => {
    const builderSection = document.getElementById('remedy-builder');
    builderSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRemedyGeneration = async () => {
    if (!user) {
      showSignInModal({ hard: false, onDismiss: () => { } });
      return;
    }

    if (!remedyNeed.trim()) {
      toast({ title: "Please describe what you need help with", description: "Enter your health concern to generate a custom remedy.", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-remedy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ healthConcern: remedyNeed, preferences: preferences }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate remedy');
      }

      const remedy = await response.json();
      setGeneratedRemedy(remedy);
      setIsSaved(false);

      const confidence = calculateConfidence(remedyNeed, preferences.trim().length > 0, remedy.ingredients?.length || 0);
      setConfidenceData(confidence);

      toast({ title: "🌿 Expert Remedy Generated!", description: "Your personalized natural remedy has been crafted by our AI health experts." });
    } catch (error: any) {
      let errorTitle = "Generation Failed";
      let errorDescription = "Unable to generate remedy at this time. Please try again.";
      if (error.message?.includes("only provide guidance on health")) {
        errorTitle = "Health Topic Required";
        errorDescription = "I can only provide guidance on health and wellness topics.";
      }
      toast({ title: errorTitle, description: errorDescription, variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveRemedy = async () => {
    if (!generatedRemedy) return;
    setIsSaving(true);
    try {
      const authCheck = await fetch('/api/auth/me', { credentials: 'include' });
      if (!authCheck.ok) {
        toast({ title: "Authentication required", description: "Please log in to save custom remedies.", variant: "destructive" });
        navigateTo('/login');
        return;
      }
      const customRemedyData = {
        name: generatedRemedy.name,
        description: `Custom remedy generated for: ${remedyNeed}`,
        ingredients: generatedRemedy.ingredients || [],
        benefits: generatedRemedy.benefits || [],
        instructions: generatedRemedy.instructions || '',
        form: generatedRemedy.form || 'custom',
        category: 'custom',
        symptoms: [remedyNeed],
        generatedFrom: 'Custom Remedy Generator'
      };
      await apiRequest('/api/custom-remedies', 'POST', customRemedyData);
      setIsSaved(true);
      toast({ title: "Remedy saved successfully!", description: "You can access it from your dashboard." });
      queryClient.invalidateQueries({ queryKey: ['/api/custom-remedies'] });
    } catch (error: any) {
      toast({ title: "Failed to save remedy", description: error.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <UpgradeInterstitial feature={Feature.SMART_REMEDY_BUILDER}>
      <Helmet>
        <title>Remedy Builder - Create Custom Remedies | PlantRx</title>
        <meta name="description" content="Design your own natural remedy blends using PlantRx's interactive Remedy Builder tool powered by expert AI." />
      </Helmet>

      {/* <ScrollProgress /> */}

      <div className="overflow-x-hidden touch-pan-y relative">
        {/* Hero Section */}
        <section className="min-h-[60vh] sm:min-h-[75vh] lg:min-h-[85vh] relative flex flex-col items-center justify-center py-10 sm:py-16 bg-gold/20 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
          {/* Decorative elements - hidden on mobile for performance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gold/20 dark:bg-emerald-600/10 rounded-full" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/30 dark:bg-teal-600/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green/10 dark:bg-cyan-600/5 rounded-full" />
          </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
            <motion.div>
              <Badge className="m-5 inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-green dark:text-green backdrop-blur-md rounded-full border border-green/50 dark:border-green/50 shadow-lg shadow-green/20">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-green dark:text-green" />
                FEATURED EXPERT TOOL
              </Badge>
            </motion.div>

            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28 bg-green rounded-2xl sm:rounded-3xl mx-auto mb-4 sm:mb-8 flex items-center justify-center shadow-2xl">
                <Wand2 className="w-7 h-7 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-white" />
              </div>
            </motion.div>

            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h1 className="text-2xl sm:text-4xl lg:text-6xl xl:text-7xl text-black dark:text-black mb-3 sm:mb-6 lg:mb-8 leading-tight">
                <SplitText text={t('home.symptom.title', 'Smart Remedy Builder')} />
              </h1>
            </motion.div>

            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-sm sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-700 max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2 sm:px-0">
                {t('home.generator.subtitle', 'Expert herbal knowledge creates personalized natural remedies tailored specifically to your unique health needs')}
              </p>
            </motion.div>

            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="inline-flex items-center gap-2 sm:gap-3 btn-green px-5 py-3 sm:px-10 sm:py-4 lg:px-12 lg:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg lg:text-xl shadow-2xl cursor-pointer"
              onClick={scrollToBuilder}
              data-testid="button-create-remedy"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              <span>Create My Remedy</span>
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
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <span className="text-green dark:text-gold font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-4 block">
                  Simple Process
                </span>
              </motion.div>
              <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
                <SplitText text="How It Works" />
              </h2>
              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <p className="text-sm sm:text-xl text-gray-600 dark:text-white max-w-2xl mx-auto px-2 sm:px-0">
                  Create your personalized herbal remedy in three easy steps
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
                    className="h-full text-center p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gold/20 dark:from-gray-800 dark:to-gray-900 border border-gold shadow-lg hover:shadow-2xl transition-shadow flex flex-col items-center"
                  >
                    <div className="relative flex-shrink-0 inline-block mb-3 sm:mb-5 mx-auto">
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
                    <div className="flex-1 sm:flex-none">
                      <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 sm:mb-3">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-white/80 leading-relaxed flex-1 flex-grow">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </FadeInSection>
              ))}
            </motion.div>

          </div>
        </section>

        {/* Builder Section */}
        <section id="remedy-builder" className="py-12 sm:py-20 lg:py-28 relative">
          {/* Luxury background */}
          <div className="absolute inset-0 bg-gold/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent dark:from-gold/10" />

          {/* Decorative corner accents - hidden on mobile */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="hidden sm:block absolute top-0 left-0 w-64 h-64 bg-gold/20 dark:from-yellow-800/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="hidden sm:block absolute bottom-0 right-0 w-80 h-80 bg-gold/30 dark:from-amber-800/10 rounded-full translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <FadeInSection className="text-center mb-8 sm:mb-16">
              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/70 backdrop-blur-md border border-green/50 dark:border-green/50 shadow-lg shadow-green/20 mb-4 sm:mb-6">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-green dark:text-green" />
                  <span className="text-xs sm:text-sm font-semibold text-green dark:text-text-green uppercase tracking-wider">AI-Powered Formula</span>
                </div>
              </motion.div>
              <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-gray-900 mb-2 sm:mb-4">
                <SplitText text="Create Your Custom Remedy" />
              </h2>
              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <p className="text-sm sm:text-xl text-gray-600 dark:text-gray-700 max-w-2xl mx-auto px-2 sm:px-0">
                  Tell us your health concerns and preferences, and our expert AI will craft a personalized herbal solution just for you
                </p>
              </motion.div>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <Card className="relative rounded-xl sm:rounded-2xl lg:rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-4 sm:p-8 lg:p-14 max-w-4xl mx-auto bg-white/90 dark:bg-gray-900/95 border border-gold/80 dark:border-yellow-900/30 overflow-hidden">
                {/* Card inner glow effect */}
                <div className="absolute inset-0 bg-gold/10 via-transparent to-gold/5 dark:from-yellow-900/10 dark:via-transparent dark:to-amber-900/5 pointer-events-none" />

                {/* Premium corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 to-transparent dark:from-yellow-900/20 rounded-bl-full" />

                <CardHeader className="text-center pb-4 sm:pb-6 lg:pb-10 relative z-10">
                  <CardTitle className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-green rounded-xl sm:rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-xl">
                        <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-900">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">{t('home.generator.cardtitle', 'Expert-Crafted Solutions')}</div>
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 mt-2 sm:mt-3 flex-wrap">
                        <span className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gold">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gold" />
                          Personalized
                        </span>
                        <span className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gold">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gold" />
                          Scientific
                        </span>
                        <span className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gold">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gold" />
                          Natural
                        </span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 sm:space-y-6 lg:space-y-10 relative z-10">
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                    {/* Health Concern Input */}
                    <div className="group">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gold/20 dark:from-yellow-900/30 dark:to-amber-900/30 flex items-center justify-center">
                          <span className="text-sm sm:text-lg">💭</span>
                        </div>
                        <label className="block text-sm sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">{t('home.generator.need.label', 'What do you need help with?')}</label>
                      </div>
                      <div className="relative">
                        <Input
                          placeholder={t('home.generator.need.placeholder', 'Describe your health concern in detail...')}
                          value={remedyNeed}
                          onChange={(e) => setRemedyNeed(e.target.value)}
                          className="text-sm sm:text-base lg:text-lg p-3 sm:p-5 lg:p-6 min-h-[44px] sm:min-h-[56px] border-2 border-gray-200/80 dark:border-gray-700/80 rounded-xl sm:rounded-2xl focus:border-gold dark:focus:border-gold focus:ring-4 focus:ring-gold/20 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white shadow-sm hover:shadow-md transition-shadow"
                          data-testid="input-remedy-need"
                        />
                      </div>
                      <div className="mt-2 sm:mt-4">
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gold mb-2 sm:mb-3 font-medium uppercase tracking-wider">Quick Select:</p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3">
                          {symptomSuggestions.map((suggestion) => (
                            <button
                              key={suggestion.label}
                              type="button"
                              onClick={() => setRemedyNeed(prev => prev ? `${prev}, ${suggestion.label.toLowerCase()}` : suggestion.label.toLowerCase())}
                              className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg sm:rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-gold dark:hover:border-gold hover:bg-gold/10 dark:hover:bg-gold/10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group/btn"
                              data-testid={`suggestion-${suggestion.label.toLowerCase().replace(' ', '-')}`}
                            >
                              <span className="text-sm sm:text-lg group-hover/btn:scale-110 transition-transform">{suggestion.icon}</span>
                              <span className="font-medium">{suggestion.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
                      <div className="flex items-center gap-2 text-gold dark:text-gray-500">
                        <Leaf className="w-4 h-4" />
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
                    </div>

                    {/* Preferences Input */}
                    <div className="group">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4 flex-wrap">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-green/10 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                          <span className="text-sm sm:text-lg">✨</span>
                        </div>
                        <label className="block text-sm sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">{t('home.generator.preferences.label', 'Any preferences?')}</label>
                        <span className="text-xs sm:text-sm text-gold dark:text-gray-500 font-normal">(Optional)</span>
                      </div>
                      <Textarea
                        placeholder={t('home.generator.preferences.placeholder', 'Share your preferences...')}
                        value={preferences}
                        onChange={(e) => setPreferences(e.target.value)}
                        className="resize-none h-20 sm:h-28 text-sm sm:text-base lg:text-lg p-3 sm:p-5 lg:p-6 border-2 border-gray-200/80 dark:border-gray-700/80 rounded-xl sm:rounded-2xl focus:border-green dark:focus:border-green focus:ring-4 focus:ring-green/20 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white shadow-sm hover:shadow-md transition-shadow"
                        data-testid="input-preferences"
                      />
                      <div className="mt-2 sm:mt-4">
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gold mb-2 sm:mb-3 font-medium uppercase tracking-wider">Popular Preferences:</p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3">
                          {preferenceSuggestions.map((suggestion) => (
                            <button
                              key={suggestion.label}
                              type="button"
                              onClick={() => setPreferences(prev => prev ? `${prev}, ${suggestion.label.toLowerCase()}` : suggestion.label.toLowerCase())}
                              className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg sm:rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-green dark:hover:border-green hover:bg-green/10 dark:hover:bg-green/10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group/btn"
                              data-testid={`preference-${suggestion.label.toLowerCase().replace(' ', '-')}`}
                            >
                              <span className="text-sm sm:text-lg group-hover/btn:scale-110 transition-transform">{suggestion.icon}</span>
                              <span className="font-medium">{suggestion.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Generate Button */}
                    <div className="pt-2 sm:pt-4">
                      <Button
                        onClick={handleRemedyGeneration}
                        disabled={isGenerating}
                        className="w-full btn-green text-white py-3 sm:py-5 lg:py-7 min-h-[48px] sm:min-h-[60px] text-sm sm:text-lg lg:text-xl font-bold rounded-xl sm:rounded-2xl hover:shadow-[0_10px_40px_-10px_rgba(56,81,39,0.5)] transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        data-testid="button-generate-remedy"
                      >
                        {isGenerating ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{t('home.generator.loading', 'Crafting Your Expert Remedy...')}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3 !text-white">
                            <Wand2 className="w-5 h-5 sm:w-6 sm:h-6" />
                            <span>{t('home.generator.button', 'Create My Expert Remedy')}</span>
                            <ArrowDown className="w-5 h-5 rotate-[-90deg]" />
                          </div>
                        )}
                      </Button>
                      <p className="text-center text-xs text-gold dark:text-white/60 mt-3">Powered by Expert AI • Results in seconds</p>
                    </div>
                  </div>

                  {generatedRemedy && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 sm:mt-12 overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl bg-gold/10 border border-gold dark:border-gold/30">
                      <div className="bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] p-3 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center">
                              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-sm sm:text-2xl">Your Custom Remedy</h3>
                              <p className="text-white/80 text-xs sm:text-sm opacity-90">Expert-crafted solution</p>
                            </div>
                          </div>
                          <Button onClick={handleSaveRemedy} disabled={isSaving || isSaved} className={`${isSaved ? 'bg-red-500/80 hover:bg-red-600/80 border-red-400' : 'bg-white/20 hover:bg-white/30 border-white/30'} text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-lg transition-all text-xs sm:text-base backdrop-blur-sm`} variant="outline">
                            {isSaving ? (<div className="flex items-center"><div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1 sm:mr-2" /><span className="hidden sm:inline">Saving...</span></div>) : (<><Heart className={`w-3 h-3 sm:w-4 sm:h-4 sm:mr-2 ${isSaved ? 'fill-white' : ''}`} /><span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span></>)}
                          </Button>
                        </div>
                      </div>

                      <div className="p-3 sm:p-8">
                        <div className="text-center sm:text-left mb-4 sm:mb-6">
                          <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">{generatedRemedy.name}</h4>
                        </div>

                        {confidenceData && (
                          <div className="mb-4 sm:mb-6 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${confidenceData.level === 'High' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : confidenceData.level === 'Medium' ? 'bg-gold' : 'bg-gradient-to-r from-orange-400 to-red-500'}`}>
                                  <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div>
                                  <h5 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">Confidence Score</h5>
                                  <p className="text-xs text-gray-500 dark:text-gold">Based on your input analysis</p>
                                </div>
                              </div>
                              <Badge className={`text-sm sm:text-base px-3 py-1 font-bold ${confidenceData.level === 'High' ? 'bg-green/10 text-green dark:bg-green/20 dark:text-green border-green/30' : confidenceData.level === 'Medium' ? 'bg-gold/10 text-gold dark:bg-gold/20 dark:text-gold border-gold/30' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300'}`}>
                                {confidenceData.level === 'High' && <TrendingUp className="w-3 h-3 mr-1" />}
                                {confidenceData.level === 'Medium' && <Zap className="w-3 h-3 mr-1" />}
                                {confidenceData.level}
                              </Badge>
                            </div>
                            <div className="w-full h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                              <div className={`h-full rounded-full transition-all duration-1000 ${confidenceData.level === 'High' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : confidenceData.level === 'Medium' ? 'bg-gold' : 'bg-gradient-to-r from-orange-400 to-red-500'}`} style={{ width: `${confidenceData.score}%` }} />
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {confidenceData.factors.map((factor, index) => (
                                <span key={index} className="inline-flex items-center text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                                  <CheckCircle className="w-3 h-3 mr-1 text-green" />{factor}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {generatedRemedy.ingredients && generatedRemedy.ingredients.length > 0 && (
                          <div className="mb-4 sm:mb-6 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center mb-4">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green/10 dark:bg-green/20 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                                <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-green dark:text-green" />
                              </div>
                              <h5 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Herbs Used</h5>
                            </div>
                            <div className="flex flex-wrap gap-3 sm:gap-4">
                              {generatedRemedy.ingredients.map((ingredient: string, index: number) => {
                                const herbKey = ingredient.toLowerCase();
                                const herbInfo = Object.entries(herbBenefits).find(([key]) => herbKey.includes(key));
                                const color = herbInfo ? herbInfo[1].color : 'from-green-400 to-emerald-500';
                                const benefit = herbInfo ? herbInfo[1].benefit : 'Healing';
                                return (
                                  <div key={index} className="flex flex-col items-center group">
                                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ring-2 ring-white dark:ring-gray-700`}>
                                      <span className="text-lg sm:text-2xl">🌿</span>
                                    </div>
                                    <span className="mt-2 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 text-center max-w-[80px] truncate">{ingredient}</span>
                                    <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gold italic">{benefit}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <div className="space-y-3 sm:space-y-6">
                          {generatedRemedy.ingredients && (
                            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                              <div className="flex items-center mb-2 sm:mb-3">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green/10 dark:bg-green/20 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                                  <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-green dark:text-green" />
                                </div>
                                <h5 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Key Ingredients</h5>
                              </div>
                              <div className="flex flex-wrap gap-1 sm:gap-2">
                                {generatedRemedy.ingredients.map((ingredient: string, index: number) => (
                                  <Badge key={index} className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-green/10 dark:bg-green/20 text-green dark:text-green border-green/30 dark:border-green/40">{ingredient}</Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {generatedRemedy.instructions && (
                            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                              <div className="flex items-center mb-2 sm:mb-3">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gold/20 dark:bg-gold/10 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                                  <Wand2 className="w-3 h-3 sm:w-4 sm:h-4 text-gold dark:text-gold" />
                                </div>
                                <h5 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">{t('home.remedy.prepare', 'How to Prepare')}</h5>
                              </div>
                              <p className="text-xs sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{generatedRemedy.instructions}</p>
                            </div>
                          )}

                          <div className="sm:hidden">
                            <Collapsible open={showAdvancedDetails} onOpenChange={setShowAdvancedDetails}>
                              <CollapsibleTrigger asChild>
                                <Button variant="outline" className="w-full flex items-center justify-between p-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gold dark:hover:border-gold transition-all">
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{showAdvancedDetails ? 'Hide Advanced Details' : 'Show Benefits, Dosage & More'}</span>
                                  <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedDetails ? 'rotate-180' : ''}`} />
                                </Button>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="space-y-3 mt-3">
                                {generatedRemedy.benefits && (
                                  <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center mb-2">
                                      <div className="w-6 h-6 bg-gold/20 dark:bg-gold/10 rounded-lg flex items-center justify-center mr-2">
                                        <CheckCircle className="w-3 h-3 text-gold dark:text-gold" />
                                      </div>
                                      <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Health Benefits</h5>
                                    </div>
                                    <div className="space-y-1">
                                      {generatedRemedy.benefits.slice(0, 3).map((benefit: string, index: number) => (
                                        <div key={index} className="flex items-start">
                                          <div className="w-1.5 h-1.5 bg-green rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                                          <span className="text-xs text-gray-700 dark:text-gray-300 leading-tight">{benefit}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {generatedRemedy.form && (
                                  <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center mb-1">
                                      <Package className="w-3 h-3 text-gold dark:text-gold mr-1" />
                                      <h5 className="text-xs font-semibold text-gray-800 dark:text-gray-200">{t('home.remedy.form', 'Form')}</h5>
                                    </div>
                                    <Badge className="capitalize text-xs px-1 py-0.5 bg-gold/10 dark:bg-gold/20 text-gold dark:text-gold border-gold/30">{generatedRemedy.form}</Badge>
                                  </div>
                                )}
                                {generatedRemedy.dosage && (
                                  <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center mb-1">
                                      <Clock className="w-3 h-3 text-green dark:text-green mr-1" />
                                      <h5 className="text-xs font-semibold text-gray-800 dark:text-gray-200">{t('home.remedy.dosage', 'Dosage')}</h5>
                                    </div>
                                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-tight">{generatedRemedy.dosage}</p>
                                  </div>
                                )}
                              </CollapsibleContent>
                            </Collapsible>
                          </div>

                          <div className="hidden sm:block space-y-6">
                            {generatedRemedy.benefits && (
                              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center mb-2 sm:mb-3">
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gold/20 dark:bg-gold/10 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gold dark:text-gold" />
                                  </div>
                                  <h5 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Health Benefits</h5>
                                </div>
                                <div className="space-y-2">
                                  {generatedRemedy.benefits.map((benefit: string, index: number) => (
                                    <div key={index} className="flex items-start">
                                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green rounded-full mr-2 sm:mr-3 mt-2 flex-shrink-0"></div>
                                      <span className="text-xs sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{benefit}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <Alert className="border-green/30 dark:border-gold/40 bg-green/10 dark:bg-gold/10">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-green dark:text-gold" />
                    <AlertDescription className="text-green dark:text-gold/80 text-xs sm:text-sm leading-tight sm:leading-normal">
                      <strong>{t('home.remedy.important', 'Important:')}</strong> {t('home.remedy.disclaimer', 'This expert-crafted remedy is for educational purposes only and should not replace professional medical advice.')}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </section>
      </div>
    </UpgradeInterstitial>
  );
}
