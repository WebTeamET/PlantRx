import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import InteractiveMuscleMap from "@/components/InteractiveMuscleMap";
import { Dumbbell, Target, Flame, Heart, Activity, TrendingUp, BookOpen, Clock, ArrowRight, ArrowDown, Zap, Trophy, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { FeatureLock } from "@/components/FeatureLock";
import { Feature } from "@shared/subscriptionFeatures";
import { motion, useScroll, useInView } from "framer-motion";
import { containerVariants, slideUpVariants } from "@/animation/framerMotionVariants";
import { SplitText } from "@/utils/SplitText";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  readingTime?: number;
  authorName?: string;
}

const muscleCategories = [
  { name: "Arms", href: "/fitness/arms", color: "from-yellow-500 to-yellow-600", icon: Dumbbell },
  { name: "Shoulders", href: "/fitness/shoulders", color: "from-orange-500 to-orange-600", icon: Target },
  { name: "Chest", href: "/fitness/chest", color: "from-red-500 to-red-600", icon: Flame },
  { name: "Back", href: "/fitness/back", color: "from-green-500 to-green-600", icon: Activity },
  { name: "Legs", href: "/fitness/legs", color: "from-purple-500 to-purple-600", icon: TrendingUp },
  { name: "Abs", href: "/fitness/abs", color: "from-cyan-500 to-cyan-600", icon: Heart },
];

const benefits = [
  { icon: Zap, title: "Track Progress", description: "Monitor your gains with detailed workout history" },
  { icon: Target, title: "Targeted Training", description: "Focus on specific muscle groups for balanced development" },
  { icon: Trophy, title: "Achievement System", description: "Unlock badges as you complete workout milestones" },
];

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

export default function Fitness() {
  const { data: fitnessArticles = [], isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ['/api/blog/posts', 'fitness'],
    queryFn: async () => {
      const response = await fetch('/api/blog/posts?category=fitness&limit=6');
      if (!response.ok) throw new Error('Failed to fetch articles');
      return response.json();
    }
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  const scrollToMap = () => {
    const mapSection = document.getElementById('muscle-map');
    mapSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Fitness & Workouts - Interactive Training | PlantRx</title>
        <meta name="description" content="Explore our interactive fitness training with targeted muscle group workouts. Build strength, improve flexibility, and track your progress." />
      </Helmet>

      <div className="min-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <section className="min-h-[75vh] sm:min-h-[85vh] relative flex flex-col items-center justify-center py-12 sm:py-16 bg-gold/20 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
          {/* Decorative elements - hidden on mobile for performance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gold/20 dark:bg-emerald-600/10 rounded-full" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/30 dark:bg-teal-600/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green/10 dark:bg-cyan-600/5 rounded-full" />
          </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}>
              <Badge className="m-5 inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-full border border-green dark:border-emerald-600/30 shadow-lg shadow-green/20">
                <div>💪</div>
                Interactive Training
              </Badge>
            </motion.div>

            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-green rounded-3xl mx-auto mb-6 sm:mb-8 flex items-center justify-center shadow-2xl">
                <Dumbbell className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
              </div>
            </motion.div>

            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl text-black mb-4 sm:mb-6 leading-tight">
                <SplitText text="Fitness & Training" />
              </h1>
            </motion.div>

            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0">
                Click on the body to target specific muscle groups, or choose a category below
              </p>
            </motion.div>

            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="inline-flex items-center gap-3 bg-gold bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] text-white px-8 py-4 sm:px-12 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-2xl cursor-pointer"
              onClick={scrollToMap}
              data-testid="button-start-training"
            >
              <Target className="w-6 h-6" />
              <span>Start Training</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Muscle Categories Section */}
        <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection className="text-center mb-10">
              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <span className="text-green dark:text-purple-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                  Quick Access
                </span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                <SplitText text="Choose Your Focus" />
              </h2>
              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Select a muscle group to view targeted workouts
                </p>
              </motion.div>
            </FadeInSection>

            <motion.div
              variants={containerVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              {muscleCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <FadeInSection key={category.name} delay={index * 0.05}>
                    <motion.div variants={slideUpVariants as any}>
                      <Link href={category.href}>
                        <Card
                          className="cursor-pointer border-2 border-gold dark:border-gray-700 hover:border-gold dark:hover:border-gold/50 shadow-md hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-200 ease-out group active:scale-95 bg-white dark:bg-gray-900/80"
                          data-testid={`fitness-category-${category.name.toLowerCase()}`}
                        >
                          <CardContent className="!p-3 sm:!p-4 text-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-green flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{category.name}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  </FadeInSection>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-20 bg-gold/20 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection className="text-center mb-12">
              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <span className="text-green dark:text-purple-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
                  Why Train With Us
                </span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                <SplitText text="Built for Results" />
              </h2>
            </FadeInSection>

            <motion.div
              variants={containerVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {benefits.map((benefit, index) => (
                <FadeInSection key={benefit.title} delay={index * 0.1}>
                  <motion.div variants={slideUpVariants as any}>
                    <Card className="h-full bg-white dark:bg-gray-900/80 border border-gold/30 dark:border-gray-700 hover:border-gold dark:hover:border-gold/50 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-200 ease-out group active:scale-98">
                      <CardContent className="!p-4 sm:!p-6 text-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-green flex items-center justify-center mb-3 sm:mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-200">
                          <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeInSection>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Interactive Muscle Map Section */}
        <section id="muscle-map" className="py-12 sm:py-20 lg:py-28 relative">
          {/* Premium background */}
          <div className="absolute inset-0 bg-gold/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent dark:from-gold/5" />

          {/* Decorative accents */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* <div className="absolute top-0 left-0 w-40 sm:w-72 h-40 sm:h-72 bg-gold/20 dark:from-yellow-800/10 rounded-full -translate-x-1/2 -translate-y-1/2" /> */}
            <div className="absolute bottom-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-gold/30 dark:from-amber-800/10 rounded-full translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <FadeInSection className="text-center mb-8 sm:mb-12 lg:mb-16">
              <motion.div variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-green/50 dark:border-emerald-600/30 shadow-lg shadow-green/20 mb-4 sm:mb-6">
                <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green dark:text-blue-400" />
                <span className="text-xs sm:text-sm font-semibold text-green dark:text-emerald-300 uppercase tracking-wider">Premium Feature</span>
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4">
                <SplitText text="Interactive Muscle Map"></SplitText>
              </h2>
              <motion.p variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
                Click on any muscle group to discover expert-designed workouts tailored to your training goals
              </motion.p>
            </FadeInSection>

            <FadeInSection delay={0.15}>
              <FeatureLock feature={Feature.INTERACTIVE_MUSCLE_TRAINER}>
                <div className="max-w-5xl mx-auto">
                  <div className="relative bg-white dark:bg-gray-800 shadow-xl sm:shadow-2xl border border-gold/30 dark:border-gold/10 rounded-2xl sm:rounded-3xl overflow-hidden">
                    {/* Top accent bar */}
                    <div className="h-1 sm:h-1.5 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)]" />

                    {/* Content area */}
                    <div className="p-3 sm:p-6 md:p-8 lg:p-10">
                      <InteractiveMuscleMap />
                    </div>

                    {/* Bottom accent bar */}
                    <div className="h-1 sm:h-1.5 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)]" />
                  </div>
                </div>
              </FeatureLock>
            </FadeInSection>

            {/* Trust indicators */}
            <FadeInSection delay={0.25} className="mt-8 sm:mt-12 lg:mt-16">
              <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-clip-text text-transparent">50+</span>
                  <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400">Workouts</span>
                </div>
                <div className="w-px h-8 sm:h-10 bg-gray-200 dark:bg-gray-700" />
                <div className="flex flex-col items-center">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-clip-text text-transparent">6</span>
                  <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400">Muscle Groups</span>
                </div>
                <div className="w-px h-8 sm:h-10 bg-gray-200 dark:bg-gray-700" />
                <div className="flex flex-col items-center">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-clip-text text-transparent">Pro</span>
                  <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400">Quality</span>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Fitness Articles Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green flex items-center justify-center shadow-lg flex-shrink-0">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      Fitness Articles
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                      Expert guides for training, recovery & performance
                    </p>
                  </div>
                </div>
                <Link href="/articles/fitness">
                  <button className="flex items-center gap-2 text-green dark:text-green/80 hover:text-green/70 dark:hover:text-green/60 font-medium transition-colors hover:gap-3 duration-200 text-sm sm:text-base">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </FadeInSection>

            {articlesLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 h-40 sm:h-48 rounded-xl" />
                  </div>
                ))}
              </div>
            ) : fitnessArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {fitnessArticles.slice(0, 6).map((article, index) => (
                  <FadeInSection key={article.id} delay={index * 0.08}>
                    <Link href={`/blog/${article.slug}`}>
                      <Card
                        className="h-full cursor-pointer transition-all duration-200 ease-out border border-gold/30 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl hover:border-gold dark:hover:border-gold/50 hover:-translate-y-1 sm:hover:-translate-y-2 rounded-xl group active:scale-98"
                        data-testid={`fitness-article-${article.id}`}
                      >
                        <CardContent className="p-4 sm:p-5">
                          <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <Badge className="bg-green text-white border-0 shadow-sm text-xs">
                              <Dumbbell className="w-3 h-3 mr-1" />
                              Fitness
                            </Badge>
                            {article.readingTime && (
                              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {article.readingTime} min
                              </span>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-green dark:group-hover:text-green/80 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed">
                            {article.excerpt}
                          </p>
                          {article.authorName && (
                            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 mt-2 sm:mt-3 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-green" />
                              {article.authorName}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  </FadeInSection>
                ))}
              </div>
            ) : (
              <FadeInSection>
                <Card className="bg-gold/5 dark:bg-gray-800/50 border-dashed border-gold/30 rounded-xl">
                  <CardContent className="!py-12 text-center">
                    <BookOpen className="w-12 h-12 mx-auto text-gold mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      No fitness articles available yet. Check back soon!
                    </p>
                  </CardContent>
                </Card>
              </FadeInSection>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
