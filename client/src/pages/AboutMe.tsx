import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Lightbulb, Heart, Target, ChevronRight, ExternalLink, Sparkles, Leaf, BookOpen, Code, Rocket, Star, Zap, Award, Package, Users, TrendingUp, Store, Layers, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiLinkerd } from "react-icons/si";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import founderPhoto from "@assets/IMG_5496_1765046081124.jpeg";
import { slideRightVariants, slideUpVariants } from "@/animation/framerMotionVariants";
import { FadeInSection } from "@/components/ScrollReveal";
import { SplitText } from "@/utils/SplitText";

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const incrementTime = (duration * 1000) / end;
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [started, text]);

  return (
    <span>
      {displayText}
      {displayText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}

function FloatingElement({ children, delay = 0, duration = 3 }: { children: React.ReactNode; delay?: number; duration?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const values = [
  { icon: Zap, label: "Learn Fast" },
  { icon: Rocket, label: "Build Faster" },
  { icon: Star, label: "Improve Always", },
];

const stats = [
  { value: 166, label: "Remedies", suffix: "+" },
  { value: 12, label: "Languages", suffix: "" },
  { value: 24, label: "Hours Support", suffix: "/7" },
];

const timeline = [
  {
    year: "August 2024",
    title: "Where It Began",
    description: "PlantRx started with one simple goal: to bring clarity, trust, and modern design to natural wellness.",
    icon: Lightbulb,
    color: "bg-green",
    highlight: "The Vision"
  },
  {
    year: "November 2024",
    title: "Building the Foundation",
    description: "The first version was created, focusing on clear remedies, simple explanations, and a professional visual style.",
    icon: Code,
    color: "bg-gold",
    highlight: "Development"
  },
  {
    year: "January 2025",
    title: "Official Launch",
    description: "PlantRx launched publicly with evidence-informed remedies presented in a premium, modern way.",
    icon: Rocket,
    color: "bg-green",
    highlight: "Going Live"
  },
  {
    year: "March 2025",
    title: "Expanding Our Library",
    description: "The remedy library expanded to 166+ natural solutions, becoming a trusted resource for wellness seekers.",
    icon: BookOpen,
    color: "bg-gold",
    highlight: "166+ Remedies"
  },
  {
    year: "May 2025",
    title: "Introducing the Store",
    description: "PlantRx expanded into curated natural products and supplements with a clean, minimal store experience.",
    icon: Store,
    color: "bg-green",
    highlight: "E-Commerce"
  },
  {
    year: "August 2025",
    title: "Growing Into a Platform",
    description: "New tools, better navigation, and improved UX helped create a complete wellness platform with remedies, articles, and products.",
    icon: Layers,
    color: "bg-gold",
    highlight: "Full Platform"
  },
  {
    year: "October 2025",
    title: "Building Our Community",
    description: "PlantRx began reaching more people across social platforms, developing a steady community of wellness enthusiasts.",
    icon: Users,
    color: "bg-green",
    highlight: "Community"
  },
  {
    year: "December 2025",
    title: "Evolving Every Day",
    description: "Expanding remedies, enhancing the store, introducing new features, and listening to user feedback.",
    icon: TrendingUp,
    color: "bg-gold",
    highlight: "The Future"
  },
];

export default function AboutMe() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="page-wrapper">
      <SEOHead
        title="About Me - Zayan Beg, Founder of PlantRx"
        description="Meet Zayan Beg, the founder of PlantRx. Learn about the vision, philosophy, and commitment behind the natural wellness platform."
        keywords="Zayan Beg, PlantRx founder, natural wellness, health platform creator"
        canonical="https://plantrxapp.com/about/me"
      />

      <main className="page-content-narrow">
        {/* Breadcrumb - Mobile optimized with wrapping */}
        <motion.div variants={slideUpVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}>
          <FadeInSection>
            <nav
              className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-green-600 dark:hover:text-green-400 min-h-[44px] flex items-center transition-colors text-black/80">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/about" className="hover:text-green-600 dark:hover:text-green-400 min-h-[44px] flex items-center transition-colors text-black/80">About</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black dark:text-white font-medium">About Me</span>
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

        {/* Hero Section with Parallax */}
        <div ref={heroRef} className="relative text-center mb-12 sm:mb-16 py-8">
          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FloatingElement delay={0} duration={4}>
              <div className="absolute top-4 left-[10%] w-20 h-20 bg-gradient-to-br from-green-400/15 to-emerald-500/15 dark:from-green-400/8 dark:to-emerald-500/8 rounded-full blur-3xl" />
            </FloatingElement>
            <FloatingElement delay={0.5} duration={3.5}>
              <div className="absolute top-12 right-[15%] w-24 h-24 bg-gradient-to-br from-blue-400/15 to-indigo-500/15 dark:from-blue-400/8 dark:to-indigo-500/8 rounded-full blur-3xl" />
            </FloatingElement>
            <FloatingElement delay={1} duration={4.5}>
              <div className="absolute bottom-8 left-[20%] w-28 h-28 bg-gradient-to-br from-purple-400/15 to-pink-500/15 dark:from-purple-400/8 dark:to-pink-500/8 rounded-full blur-3xl" />
            </FloatingElement>
            <FloatingElement delay={1.5} duration={3}>
              <div className="absolute bottom-16 right-[25%] w-20 h-20 bg-gradient-to-br from-amber-400/15 to-orange-500/15 dark:from-amber-400/8 dark:to-orange-500/8 rounded-full blur-3xl" />
            </FloatingElement>

            {/* Floating Leaves */}
            {/* <motion.div
              className="absolute top-8 left-[5%] text-gold dark:text-green-400/20"
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Leaf className="w-6 h-6" />
            </motion.div>
            <motion.div
              className="absolute bottom-12 right-[8%] text-gold dark:text-emerald-400/20"
              animate={{ y: [0, 12, 0], rotate: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Leaf className="w-8 h-8" />
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-[3%] text-green dark:text-green-500/15"
              animate={{ y: [0, -8, 0], rotate: [5, -5, 5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div> */}
          </div>

          {/* Animated Avatar */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
            className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6"
          >
            {/* Glow rings */}
            <div className="absolute inset-0 bg-gradient-to-br from-green to-green rounded-full animate-pulse opacity-50 blur-md" />
            <div className="absolute inset-2 bg-gradient-to-br from-green to-green rounded-full animate-pulse opacity-30 blur-sm" style={{ animationDelay: "0.5s" }} />

            {/* Main avatar with photo */}
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-green/30 dark:shadow-blue-500/20 ring-4 ring-white/50 dark:ring-gray-800">
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

          {/* Badge with animation */}
          <motion.div
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <Badge className="font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 text-green text-sm inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-full border border-green/50 dark:border-emerald-600/30 shadow-lg shadow-green/20 mb-5">
              <Sparkles className="w-4 h-4 inline" />
              Founder & Creator
            </Badge>
          </motion.div>

          {/* Name with gradient */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 text-black dark:from-white dark:via-blue-200 dark:to-indigo-200"
          >
            <SplitText text="Zayan Beg"></SplitText>
          </h1>

          {/* Typewriter tagline */}
          <motion.p
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 px-4 min-h-[3rem]"
          >
            I created PlantRx to make natural wellness clear, modern, and genuinely helpful for everyone.
          </motion.p>

          {/* LinkedIn Button with hover effect */}
          <motion.div
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <a
              href="https://www.linkedin.com/in/mirza-zayan-beg-6b3b82285"
              onClick={(e) => { e.preventDefault(); window.open('https://www.linkedin.com/in/mirza-zayan-beg-6b3b82285', '_blank', 'noopener,noreferrer'); }}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-green hover:bg-gold text-white rounded-xl font-medium text-sm sm:text-base transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 group cursor-pointer"
            >
              <SiLinkerd className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Connect on LinkedIn
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Values Pills */}
        <motion.div
          variants={containerVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12 sm:mb-16"
        >
          {values.map((value, i) => (
            <motion.div
              variants={slideRightVariants as any}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] text-white font-medium text-sm shadow-lg cursor-pointer hover:shadow-xl transition-shadow`}
            >
              <value.icon className="w-4 h-4" />
              {value.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Timeline - Our Journey */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mb-16 sm:mb-20"
        >
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 text-green text-sm inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-full border border-green/50 dark:border-emerald-600/30 shadow-lg shadow-green/20 mb-5">
                <Leaf className="w-4 h-4 inline" />
                Our Story
              </Badge>
            </motion.div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3"
            >
              <SplitText text="The PlantRx Journey"></SplitText>
            </h2>
            <motion.p
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="text-sm sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            >
              From a simple idea to a complete wellness platform
            </motion.p>
          </div>

          <div className="relative">
            {/* Animated Timeline line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
              className="absolute left-[23px] sm:left-1/2 top-0 bottom-0 w-1 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] transform sm:-translate-x-1/2 rounded-full shadow-lg shadow-green-500/20"
            />

            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                className={`relative flex items-center mb-8 sm:mb-10 last:mb-0 pl-16 sm:pl-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
              >
                {/* Timeline dot with glow effect */}
                <div
                  className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 z-10"
                >
                  {/* Glow ring */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className={`absolute inset-0 ${item.color} rounded-full blur-md`}
                  />
                  {/* Main dot */}
                  <div className={`relative w-12 h-12 ${item.color} rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-900`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`w-full sm:w-[44%] group ${i % 2 === 0 ? "sm:mr-auto sm:text-right" : "sm:ml-auto sm:text-left"
                    }`}
                >
                  <div className={`p-5 sm:p-6 rounded-2xl bg-gold/20 dark:bg-gray-800/90 border border-gold dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 backdrop-blur-sm overflow-hidden relative`}>
                    {/* Decorative gradient corner */}
                    <div className={`absolute top-0 ${i % 2 === 0 ? 'right-0' : 'left-0'} w-24 h-24 ${item.color} opacity-10 blur-2xl`} />

                    {/* Year Badge */}
                    <div className={`flex items-center gap-2 mb-3 ${i % 2 === 0 ? 'sm:justify-end' : 'sm:justify-start'}`}>
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold ${item.color} text-white shadow-sm`}>
                        {item.year}
                      </span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {item.highlight}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Connecting line to dot (desktop) */}
                    <div className={`hidden sm:block absolute top-1/2 ${i % 2 === 0 ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'} w-8 h-0.5 bg-gradient-to-r ${i % 2 === 0 ? 'from-transparent to-gray-300 dark:to-gray-600' : 'from-gray-300 dark:from-gray-600 to-transparent'}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mission Statement at the bottom */}
          <motion.div
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-10 sm:mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gold/20 dark:from-green-900/20 dark:to-emerald-900/20 border border-gold dark:border-green-800">
              <Sparkles className="w-5 h-5 text-gold dark:text-green-400" />
              <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                Our mission: Make natural wellness <span className="text-gold dark:text-green-400 font-bold">clear</span>, <span className="text-gold dark:text-green-400 font-bold">trusted</span>, and <span className="text-gold dark:text-green-400 font-bold">accessible</span> to everyone.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Content Cards with 3D Hover */}
        <motion.div
          variants={containerVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-4 sm:space-y-6"
        >
          {[
            {
              icon: User,
              title: "Who I Am",
              gradient: "from-blue-500 to-indigo-600",
              bgLight: "bg-blue-100",
              bgDark: "dark:bg-blue-900/30",
              iconColor: "text-blue-600 dark:text-blue-400",
              content: [
                <>My name is <strong className="text-gray-900 dark:text-white">Zayan Beg</strong>, and I'm the founder of PlantRx.</>,
                "I'm someone who enjoys solving real problems through clear design and thoughtful digital experiences.",
                "I study modern wellness, user behaviour, and how people make decisions — all of which shape how PlantRx is built.",
                "What matters to me most is creating products that feel trustworthy, simple, and genuinely useful in people's everyday lives."
              ]
            },
            {
              icon: Lightbulb,
              title: "Why I Built PlantRx",
              gradient: "from-green-500 to-emerald-600",
              bgLight: "bg-green-100",
              bgDark: "dark:bg-green-900/30",
              iconColor: "text-green-600 dark:text-green-400",
              content: [
                "PlantRx was created to fix a problem almost everyone faces: natural wellness information online is often messy, confusing, or unreliable.",
                "I wanted a place where remedies are easy to understand, information feels clear and modern, everything is organised and stress-free, and people can get simple guidance without feeling overwhelmed.",
                <>PlantRx exists to give users one thing: <strong className="text-gray-900 dark:text-white">confidence in the natural choices they make.</strong></>
              ]
            },
            {
              icon: Target,
              title: "My Approach",
              gradient: "from-purple-500 to-pink-600",
              bgLight: "bg-purple-100",
              bgDark: "dark:bg-purple-900/30",
              iconColor: "text-purple-600 dark:text-purple-400",
              content: [
                "I believe good platforms are built with intention.",
                "For PlantRx, that means focusing on clear structure, clean minimal design, reliable information, and a calm user experience that reduces noise.",
                <>Every update is guided by one mindset: <strong className="text-gray-900 dark:text-white">improve a little every day based on what users actually need.</strong></>,
                "This approach helps PlantRx grow steadily, naturally, and with purpose."
              ]
            },
            {
              icon: Heart,
              title: "My Commitment",
              gradient: "from-rose-500 to-red-600",
              bgLight: "bg-rose-100",
              bgDark: "dark:bg-rose-900/30",
              iconColor: "text-rose-600 dark:text-rose-400",
              content: [
                <span className="font-medium">PlantRx is an educational wellness platform — not a replacement for medical care.</span>,
                "My commitment is to present natural-remedy information in a way that is honest, responsible, safe, and easy to follow.",
                "Users deserve clarity, not confusion. They deserve information that respects their health.",
                "Everything on PlantRx is created with care, accuracy, and transparency, so people can explore natural wellness with trust and peace of mind."
              ]
            }
          ].map((card, i) => (
            <motion.div
              variants={slideRightVariants as any}
              className="perspective-1000"
            >
              <Card className="bg-white dark:bg-gray-900 border-gold dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Animated gradient bar */}
                <motion.div
                  className={`h-1.5 mb-4 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)]`}
                />
                <CardContent className="p-5 sm:p-6 pt-0">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className={`w-12 h-12 sm:w-14 sm:h-14 bg-gold bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}
                    >
                      <card.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-white`} />
                    </motion.div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white">{card.title}</h2>
                  </div>
                  <div className="space-y-3">
                    {card.content.map((text, j) => (
                      <motion.p
                        className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base"
                      >
                        {text}
                      </motion.p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>


        {/* Navigation Cards - Side by side on mobile, smaller size */}
        <motion.div variants={containerVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mt-10">
          <Link href="/about/plantrx">
            <motion.div variants={slideUpVariants as any}>
              <Card className="bg-gold/20 dark:from-blue-900/20 dark:to-indigo-900/20 border-gold dark:border-blue-800 hover:shadow-xl active:scale-98 transition-all cursor-pointer group overflow-hidden h-full">
                <CardContent className="!px-3 !py-5 sm:p-6 flex flex-col items-center justify-center text-center relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green dark:bg-blue-900/50 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3">
                    <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white dark:group-hover:text-blue-400 transition-colors mb-0.5 sm:mb-1">About PlantRx</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Learn about our platform</p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
          <Link href="/about/mission">
            <motion.div variants={slideUpVariants as any}>
              <Card className="bg-gold/20 dark:from-blue-900/20 dark:to-indigo-900/20 border-gold dark:border-blue-800 hover:shadow-xl active:scale-98 transition-all cursor-pointer group overflow-hidden h-full">
                <CardContent className="!px-3 !py-5 sm:p-6 flex flex-col items-center justify-center text-center relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green dark:bg-blue-900/50 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-rose-400" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white dark:group-hover:text-blue-400 transition-colors mb-0.5 sm:mb-1">Our Mission</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Discover our purpose</p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
