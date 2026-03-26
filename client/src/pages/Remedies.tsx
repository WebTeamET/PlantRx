import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Filter, ChevronDown, ChevronRight, BookOpen, X, Leaf, SlidersHorizontal } from "lucide-react";
import RemedyCard from "@/components/RemedyCard";
import Header from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { useTranslation } from "@/contexts/TranslationContext";
import { useLuxuryLoader } from "@/components/LuxuryLoader";
import { useIsMobile } from "@/hooks/use-mobile";
import { containerVariants, slideRightVariants, slideRightVariantsFast, slideUpVariants } from "@/animation/framerMotionVariants";
import { SplitText } from "@/utils/SplitText";

export default function Remedies() {
  const { t } = useTranslation();
  const { showLoader, hideLoader } = useLuxuryLoader();
  const isMobile = useIsMobile();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [formFilter, setFormFilter] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const hasRestoredScroll = useRef(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  useEffect(() => {
    if (cardsVisible && !hasRestoredScroll.current) {
      const savedPosition = sessionStorage.getItem('remediesScrollPosition');
      if (savedPosition && savedPosition !== '0') {
        const scrollY = parseInt(savedPosition);
        setTimeout(() => {
          window.scrollTo(0, scrollY);
          setTimeout(() => {
            hasRestoredScroll.current = true;
          }, 100);
        }, 50);
      } else {
        hasRestoredScroll.current = true;
      }
    }
  }, [cardsVisible]);

  const { data: allRemedies = [], isLoading } = useQuery({
    queryKey: ["/api/remedies", { category: selectedCategory, search: searchQuery }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }
      if (searchQuery) {
        params.append("search", searchQuery);
      }
      const response = await fetch(`/api/remedies?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch remedies');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  useEffect(() => {
    if (isLoading) {
      showLoader();
    } else {
      hideLoader();
      if (allRemedies.length > 0) {
        setCardsVisible(true);
        setContentReady(true);
      }
    }
  }, [isLoading, allRemedies.length, showLoader, hideLoader]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const saveScrollPosition = () => {
      if (hasRestoredScroll.current && window.scrollY > 0) {
        sessionStorage.setItem('remediesScrollPosition', window.scrollY.toString());
      }
    };
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(saveScrollPosition, 100);
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && hasRestoredScroll.current && window.scrollY > 0) {
        sessionStorage.setItem('remediesScrollPosition', window.scrollY.toString());
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const getDifficultyLevel = (remedy: any) => {
    const ingredients = remedy.ingredients?.length || 0;
    const instructionLength = remedy.instructions?.length || 0;
    if (ingredients <= 3 && instructionLength <= 100) return "easy";
    if (ingredients <= 6 && instructionLength <= 300) return "medium";
    return "advanced";
  };

  const getPreparationTime = (remedy: any) => {
    const form = remedy.form?.toLowerCase();
    const instructions = remedy.instructions?.toLowerCase() || "";
    if (form === "raw" || instructions.includes("immediately") || instructions.includes("instant")) return "instant";
    if (form === "tea" || instructions.includes("5 min") || instructions.includes("steep")) return "5min";
    if (form === "drink" || instructions.includes("mix") || instructions.includes("blend")) return "10min";
    return "30min";
  };

  const allFilteredRemedies = allRemedies
    .filter((remedy: any) => {
      if (difficultyFilter !== "all") {
        const difficulty = getDifficultyLevel(remedy);
        if (difficulty !== difficultyFilter) return false;
      }
      if (timeFilter !== "all") {
        const time = getPreparationTime(remedy);
        if (time !== timeFilter) return false;
      }
      if (formFilter !== "all") {
        if (remedy.form !== formFilter) return false;
      }
      return true;
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "difficulty":
          const difficultyOrder = { "easy": 1, "medium": 2, "advanced": 3 };
          return difficultyOrder[getDifficultyLevel(a) as keyof typeof difficultyOrder] -
            difficultyOrder[getDifficultyLevel(b) as keyof typeof difficultyOrder];
        case "time":
          const timeOrder = { "instant": 1, "5min": 2, "10min": 3, "30min": 4 };
          return timeOrder[getPreparationTime(a) as keyof typeof timeOrder] -
            timeOrder[getPreparationTime(b) as keyof typeof timeOrder];
        case "ingredients":
          return (a.ingredients?.length || 0) - (b.ingredients?.length || 0);
        case "newest":
        default:
          return b.id - a.id;
      }
    });

  const remedies = allFilteredRemedies;

  const categories = [
    { value: "all", label: t('remedies.category.all', 'All Categories'), icon: "🌿" },
    { value: "digestive", label: "Digestive Health", icon: "🍃" },
    { value: "anti-inflammatory", label: "Anti-Inflammatory", icon: "🔥" },
    { value: "skin-care", label: "Skin Care", icon: "✨" },
    { value: "sleep", label: "Sleep Support", icon: "🌙" },
    { value: "pain-relief", label: "Pain Relief", icon: "💪" },
    { value: "headache", label: "Headache Relief", icon: "🤕" },
    { value: "migraine", label: "Migraine Support", icon: "😵" },
    { value: "wound-care", label: "Wound Care", icon: "🩹" },
    { value: "immune-support", label: "Immune Support", icon: "🛡️" },
    { value: "stress-relief", label: "Stress Relief", icon: "🧘" },
    { value: "antioxidant", label: "Antioxidant", icon: "🌟" },
    { value: "antimicrobial", label: "Antimicrobial", icon: "🦠" },
    { value: "brain-health", label: "Brain & Cognitive", icon: "🧠" },
    { value: "throat-health", label: "Throat Health", icon: "🗣️" },
    { value: "kidney-health", label: "Kidney Health", icon: "🫘" },
    { value: "liver-health", label: "Liver Health", icon: "🫀" },
    { value: "cognitive", label: "Brain Health", icon: "🧠" },
    { value: "nutritional", label: "Nutritional Support", icon: "🥗" },
    { value: "technique", label: "Natural Techniques", icon: "🙏" },
  ];

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setDifficultyFilter("all");
    setTimeFilter("all");
    setFormFilter("all");
    setSortBy("newest");
  };

  const hasActiveFilters =
    searchQuery.length > 0 ||
    selectedCategory !== "all" ||
    difficultyFilter !== "all" ||
    timeFilter !== "all" ||
    formFilter !== "all" ||
    sortBy !== "newest";

  // ─── MOBILE LAYOUT ────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="min-h-screen luxury-gradient-bg">
        <SEOHead
          title="166+ Natural Remedies That Actually Work | Expert-Verified Plant Medicine"
          description="Browse proven natural remedies with step-by-step instructions. Expert-verified plant medicine for anxiety, pain, digestion & more. Find your solution today - FREE!"
          keywords="natural remedies directory, herbal medicine database, plant-based healing, expert-verified remedies"
          canonical="https://plantrxapp.com/remedies"
          ogType="website"
        />
        <Header />

        <div className="px-4 pt-4 pb-8 ios-safe-area-bottom">

          {/* ── Mobile Hero — mirrors desktop exactly ─────────────────────────── */}
          <div className="text-center mb-6 relative overflow-hidden py-6">

            {/* Multi-layer background effects — same as desktop */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[280px] bg-gradient-to-r from-emerald-200/40 via-teal-200/30 to-green-200/40 dark:from-emerald-900/30 dark:via-teal-900/25 dark:to-green-900/30 rounded-full blur-3xl"></div>
              <div className="absolute top-0 right-1/4 w-[200px] h-[200px] bg-gradient-to-br from-amber-200/20 to-transparent dark:from-amber-900/15 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-1/4 w-[160px] h-[160px] bg-gradient-to-tr from-cyan-200/20 to-transparent dark:from-cyan-900/15 rounded-full blur-2xl"></div>
              {/* Floating dots */}
              <div className="absolute top-8 left-[15%] w-2.5 h-2.5 bg-emerald-400/30 dark:bg-emerald-500/20 rounded-full animate-float-slow"></div>
              <div className="absolute top-14 right-[20%] w-2 h-2 bg-teal-400/40 dark:bg-teal-500/25 rounded-full animate-float-delayed"></div>
              <div className="absolute bottom-10 left-[25%] w-2 h-2 bg-green-400/35 dark:bg-green-500/20 rounded-full animate-float-slow"></div>
              <div className="absolute bottom-6 right-[30%] w-1.5 h-1.5 bg-emerald-300/30 dark:bg-emerald-400/20 rounded-full animate-float-delayed"></div>
            </div>

            {/* Leaf icon with glow — same as desktop */}
            <motion.div variants={slideUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }}>
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 shadow-[0_8px_30px_-4px_rgba(56,81,39,0.25)] dark:shadow-[0_8px_30px_-4px_rgba(56,81,39,0.2)] dark:bg-emerald-500/20 rounded-full blur-xl scale-150"></div>
                  <div className="relative w-12 h-12 bg-green dark:bg-emerald-400 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(56,81,39,0.15)] dark:shadow-[0_4px_20px_-4px_rgba(56,81,39,0.1)] rotate-3 shadow-lg">
                    <span className="text-2xl invert-[1] filter brightness-0">🌿</span>
                  </div>
                </div>
              </div>

              {/* Badge — exact desktop style */}
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-full border border-green/50 dark:border-emerald-600/30 shadow-lg shadow-green/20 mb-5">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-green"></span>
                </span>
                <span className="text-xs font-semibold text-green dark:text-emerald-300 tracking-wide">
                  Natural Remedies Collection
                </span>
              </div>
            </motion.div>

            {/* Main title — same SplitText + color as desktop */}
            <h1 className="text-2xl font-bold mb-3 tracking-tight leading-tight px-2 mt-2">
              <span className="text-black dark:text-white">
                <SplitText className="text-black dark:text-white" text={t('remedies.title', '166+ Expert-Verified')} />
              </span>
            </h1>

            {/* Decorative divider — same gold as desktop */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent dark:via-emerald-600"></div>
              <div className="w-2 h-2 bg-gold dark:bg-emerald-500 rounded-full"></div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent dark:via-emerald-600"></div>
            </div>

            {/* Subtitle — same color tokens as desktop */}
            <p
              className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mx-auto leading-relaxed px-4"
            >
              {t('remedies.subtitle', 'Explore our comprehensive database of verified natural remedies, each carefully curated by experts to provide safe and effective solutions for your health needs.')}
            </p>
          </div>
          {/* ── End Mobile Hero ──────────────────────────────────────────────── */}

          {/* Mobile Search & Filters Section */}
          <div className="relative rounded-2xl overflow-hidden mb-5">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-green/10 to-teal-50/30 dark:from-gray-900 dark:via-emerald-950/30 dark:to-teal-950/20"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green/5 to-transparent dark:from-emerald-800/20 rounded-bl-full"></div>

            <div className="relative border border-green dark:border-emerald-800/30 rounded-2xl backdrop-blur-sm p-4">
              {/* Search Bar */}
              <div className="relative mb-4">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-gradient-to-br from-gold to-green-500 rounded-xl flex items-center justify-center shadow-md shadow-green/20">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                </div>
                <Input
                  placeholder="Search remedies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-10 py-3 h-12 text-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-green dark:focus:border-emerald-400 focus:ring-2 focus:ring-green/15 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm placeholder:text-gray-400"
                  data-testid="mobile-search-input"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 p-0 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>

              {/* Sort & Advanced Filters Row */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Sort:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="flex-1 h-7 text-xs rounded-lg border-0 bg-transparent shadow-none focus:ring-0 p-0 font-medium text-gray-900 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="difficulty">Difficulty</SelectItem>
                      <SelectItem value="time">Prep Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className={`h-10 px-3 rounded-xl border-2 transition-all ${showAdvancedFilters
                    ? "border-green bg-green/10 dark:bg-emerald-900/30 text-green dark:text-emerald-300"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  data-testid="mobile-advanced-filters-btn"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-1.5" />
                  <span className="text-xs font-medium">Filters</span>
                  {(difficultyFilter !== "all" || timeFilter !== "all" || formFilter !== "all") && (
                    <span className="ml-1.5 w-5 h-5 rounded-full bg-green text-white text-[10px] font-bold flex items-center justify-center">
                      {[difficultyFilter, timeFilter, formFilter].filter(f => f !== "all").length}
                    </span>
                  )}
                </Button>
              </div>

              {/* Advanced Filters Panel */}
              {showAdvancedFilters && (
                <div className="space-y-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] font-medium text-gray-600 dark:text-gray-400 mb-1 block">Difficulty</label>
                      <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                        <SelectTrigger className="w-full h-9 text-xs rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-gray-600 dark:text-gray-400 mb-1 block">Time</label>
                      <Select value={timeFilter} onValueChange={setTimeFilter}>
                        <SelectTrigger className="w-full h-9 text-xs rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any</SelectItem>
                          <SelectItem value="instant">Instant</SelectItem>
                          <SelectItem value="5min">Quick</SelectItem>
                          <SelectItem value="10min">Medium</SelectItem>
                          <SelectItem value="30min">Extended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-gray-600 dark:text-gray-400 mb-1 block">Form</label>
                      <Select value={formFilter} onValueChange={setFormFilter}>
                        <SelectTrigger className="w-full h-9 text-xs rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="tea">Tea</SelectItem>
                          <SelectItem value="drink">Drink</SelectItem>
                          <SelectItem value="topical">Topical</SelectItem>
                          <SelectItem value="syrup">Syrup</SelectItem>
                          <SelectItem value="food">Food</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDifficultyFilter("all");
                      setTimeFilter("all");
                      setFormFilter("all");
                    }}
                    className="w-full text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Category Pills — now using same btn-green + gold border as desktop */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green/50 rounded-full"></span>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Categories</span>
                </div>
                <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                  <div className="flex gap-2 w-max">
                    {categories.map((category) => {
                      const isSelected = selectedCategory === category.value;
                      return (
                        <button
                          key={category.value}
                          onClick={() => setSelectedCategory(category.value)}
                          className={`
                            inline-flex items-center gap-1.5 whitespace-nowrap
                            px-3 py-2 rounded-full text-xs font-medium
                            transition-all duration-500 ease-out active:scale-95
                            ${isSelected
                              ? "btn-green text-white shadow-lg shadow-[#385127]/25"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gold dark:border-gray-700 hover:border-gold dark:hover:border-emerald-500 hover:text-gold dark:hover:text-emerald-400 hover:shadow-md"
                            }
                          `}
                          data-testid={`mobile-filter-${category.value}`}
                        >
                          <span className="text-sm">{category.icon}</span>
                          <span>{category.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-1.5 h-1.5 bg-green rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green dark:text-emerald-300">Active:</span>
                      {searchQuery && (
                        <span className="px-2 py-0.5 rounded-full bg-green/10 dark:bg-green-800 text-green dark:text-emerald-200 text-[10px] font-medium">
                          "{searchQuery.length > 10 ? searchQuery.substring(0, 10) + '...' : searchQuery}"
                        </span>
                      )}
                      {selectedCategory !== "all" && (
                        <span className="px-2 py-0.5 rounded-full bg-green/10 dark:bg-green-800 text-green dark:text-emerald-200 text-[10px] font-medium">
                          {categories.find(c => c.value === selectedCategory)?.icon} {categories.find(c => c.value === selectedCategory)?.label}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="h-7 px-2 text-[10px] text-green hover:text-green/80 hover:bg-green/10 dark:hover:bg-green-800/50 rounded-full"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Results Section */}
          {isLoading ? null : !cardsVisible ? null : (remedies as any[]).length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No remedies found</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Try adjusting your search criteria
              </p>
              <Button
                onClick={clearAllFilters}
                className="btn-green text-white rounded-xl"
              >
                Show All Remedies
              </Button>
            </div>
          ) : (
            <>
              {/* Results Header — matches desktop token colors */}
              <div className="flex items-center gap-3 mb-4 py-3 px-4 rounded-xl bg-gradient-to-r from-green/5 via-transparent to-teal-50/50 dark:from-emerald-950/20 dark:via-transparent dark:to-teal-950/20 border border-green/20 dark:border-emerald-900/30">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-gold/20 rounded-lg blur-md"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-gold via-green to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green/20">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-green dark:text-emerald-400">
                      {(remedies as any[]).length}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">remedies</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {searchQuery ? `Searching "${searchQuery}"` : selectedCategory !== "all" ? categories.find(c => c.value === selectedCategory)?.label : "All categories"}
                  </p>
                </div>
              </div>

              {/* 2-Column Card Grid */}
              <div className="grid grid-cols-2 gap-3">
                {(remedies as any[]).map((remedy: any, index: number) => (
                  <motion.div
                    key={remedy.id}
                    initial={{ opacity: 0.9, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.2,
                      delay: Math.min((index % 2) * 0.05, 0.1),
                      ease: "easeOut",
                    }}
                    className="group relative"
                  >
                    <RemedyCard remedy={remedy} />
                  </motion.div>
                ))}
              </div>

              {/* Bottom decoration — same as desktop */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent dark:via-emerald-700"></div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-gold rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-green rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-gold rounded-full animate-pulse"></div>
                </div>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent dark:via-emerald-700"></div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ─── DESKTOP LAYOUT (unchanged) ───────────────────────────────────────────────
  return (
    <div className="min-h-screen luxury-gradient-bg">
      <SEOHead
        title="166+ Natural Remedies That Actually Work | Expert-Verified Plant Medicine"
        description="Browse proven natural remedies with step-by-step instructions. Expert-verified plant medicine for anxiety, pain, digestion & more. Find your solution today - FREE!"
        keywords="natural remedies directory, herbal medicine database, plant-based healing, expert-verified remedies, traditional medicine, wellness solutions, botanical treatments"
        canonical="https://plantrxapp.com/remedies"
        ogType="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Natural Remedies Directory",
          "description": "Comprehensive collection of expert-verified natural plant-based remedies",
          "url": "/remedies",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Natural Remedies Collection",
            "description": "166+ expert-verified natural remedies",
            "numberOfItems": 166
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://plantrxapp.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Natural Remedies",
                "item": "https://plantrxapp.com/remedies"
              }
            ]
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://plantrxapp.com/remedies?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <Header />

      <div className="max-w-7xl mx-auto mobile-safe-area py-4 sm:py-8 ios-safe-area-bottom">
        {/* Premium Header */}
        <div className="text-center mb-6 sm:mb-10 relative overflow-hidden py-6 sm:py-10">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-200/40 via-teal-200/30 to-green-200/40 dark:from-emerald-900/30 dark:via-teal-900/25 dark:to-green-900/30 rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-amber-200/20 to-transparent dark:from-amber-900/15 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-1/4 w-[250px] h-[250px] bg-gradient-to-tr from-cyan-200/20 to-transparent dark:from-cyan-900/15 rounded-full blur-2xl"></div>
            <div className="absolute top-8 left-[15%] w-3 h-3 bg-emerald-400/30 dark:bg-emerald-500/20 rounded-full animate-float-slow"></div>
            <div className="absolute top-16 right-[20%] w-2 h-2 bg-teal-400/40 dark:bg-teal-500/25 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-12 left-[25%] w-2.5 h-2.5 bg-green-400/35 dark:bg-green-500/20 rounded-full animate-float-slow"></div>
            <div className="absolute bottom-8 right-[30%] w-2 h-2 bg-emerald-300/30 dark:bg-emerald-400/20 rounded-full animate-float-delayed"></div>
          </div>

          <motion.div variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }}>
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 shadow-[0_8px_30px_-4px_rgba(56,81,39,0.25)] dark:shadow-[0_8px_30px_-4px_rgba(56,81,39,0.2)] dark:bg-emerald-500/20 rounded-full blur-xl scale-150"></div>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-green dark:bg-gold rounded-2xl flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(56,81,39,0.15)] dark:shadow-[0_4px_20px_-4px_rgba(194, 160, 88,0.1)] rotate-3 shadow-lg">
                  <span className="text-2xl sm:text-3xl invert-[1] filter brightness-0">🌿</span>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/70 dark:bg-gold/20 backdrop-blur-md rounded-full border border-green/50 dark:border-gold/40 shadow-lg shadow-green/20 dark:shadow-gold/20">
                <span className="flex h-2.5 w-2.5 sm:h-3 sm:w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green dark:bg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-green dark:bg-gold"></span>
                </span>
                <span className="text-xs sm:text-sm font-semibold text-green dark:text-gold tracking-wide">
                  Natural Remedies Collection
                </span>
                
              </div>
            </div>
          </motion.div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-5 tracking-tight leading-tight px-2 mt-5">
            <span className="text-black dark:from-white dark:via-gray-100 dark:to-white">
              <SplitText className="" text={t('remedies.title', '166+ Expert-Verified')} />
            </span>
            <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-green via-green/80 to-green/50 dark:from-gold dark:via-gold/80 dark:to-gold/50 bg-clip-text text-transparent">
              {/* Natural Remedies */}
              <SplitText className="" text={t('remedies.title', '166+ Expert-Verified')} />
            </span>
          </h1>

          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent dark:via-gold"></div>
            <div className="w-2 h-2 bg-gold dark:bg-gold rounded-full"></div>
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent dark:via-gold"></div>
          </div>

          <p
            className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-4"
          >
            {t('remedies.subtitle', 'Explore our comprehensive database of verified natural remedies, each carefully curated by experts to provide safe and effective solutions for your health needs.')}
          </p>
        </div>

        {/* Advanced Search and Filter */}
        <motion.div
          variants={slideUpVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
        >
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-4 sm:mb-6 md:mb-8">
 {/* <div className="absolute inset-0 bg-gradient-to-br from-white via-green/10 to-teal-50/30 dark:from-gray-900 dark:via-emerald-950/30 dark:to-teal-950/20"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green/10 via-transparent to-transparent dark:from-emerald-900/20"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green/5 to-transparent dark:from-emerald-800/20 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green/5 to-transparent dark:from-teal-800/20 rounded-tr-full"></div> */}

            <div className="absolute inset-0 bg-gradient-to-br from-white via-green/10 to-teal-50/30 dark:from-gray-900 dark:via-gold/30 dark:to-gold/20"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green/10 via-transparent to-transparent dark:from-gold/20"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green/5 to-transparent dark:from-gold/20 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green/5 to-transparent dark:from-gold/20 rounded-tr-full"></div>

            <div className="relative border border-green dark:border-gold/20 rounded-2xl sm:rounded-3xl backdrop-blur-sm p-4 sm:p-5 md:p-7">

              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0 }}
              >
                <div className="flex items-start gap-4 mb-5 sm:mb-6">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-gold/20 dark:bg-emerald-500/15 rounded-2xl blur-lg scale-125 animate-pulse-slow"></div>
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gold via-green-500 to-gold rounded-2xl flex items-center justify-center shadow-lg shadow-green/25 group">
                      <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform group-hover:scale-110" />
                      <div className="absolute w-2 h-2 bg-white/80 rounded-full animate-orbit"></div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white">
                        Find Your Perfect Natural Remedy
                      </h3>
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold dark:bg-gold/20 text-white dark:text-gold text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 bg-green dark:bg-gold rounded-full animate-pulse"></span>
                        Smart
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      Use our intelligent search to discover plant-based solutions tailored to your needs
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-4 sm:space-y-5">
                {/* Search Bar */}
                <motion.div
                  variants={slideUpVariants as any}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0 }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green via-green-400 to-green/50 rounded-2xl opacity-0 group-focus-within:opacity-20 blur-lg transition-opacity duration-500"></div>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 sm:left-4 z-10">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green to-green-500 rounded-xl flex items-center justify-center group-focus-within:scale-105 transition-transform duration-300">
                          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      </div>
                      <Input
                        placeholder={t('remedies.search.placeholder', 'Search remedies, ingredients, or health concerns...')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-14 sm:pl-16 pr-12 py-3 sm:py-4 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base border-2 outline-0 focus:outline-0 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl focus:border-green dark:focus:border-gold focus:ring-4 focus:ring-green bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        data-testid="search-input"
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSearchQuery("")}
                          className="absolute right-2 sm:right-3 w-8 h-8 p-0 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Sort and Advanced Filters Toggle */}
                <motion.div
                  variants={slideUpVariants as any}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0 }}
                >
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Sort:</span>
                          <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-28 sm:w-32 min-h-[32px] sm:min-h-[36px] text-xs sm:text-sm rounded-lg border-0 bg-transparent shadow-none focus:ring-0 p-0 pl-1 font-medium text-gray-900 dark:text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="newest">Newest First</SelectItem>
                              <SelectItem value="name">Name A-Z</SelectItem>
                              <SelectItem value="difficulty">Difficulty</SelectItem>
                              <SelectItem value="time">Prep Time</SelectItem>
                              <SelectItem value="ingredients">Ingredient Count</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                      className={`text-xs sm:text-sm rounded-xl border-2 min-h-[40px] sm:min-h-[44px] px-4 sm:px-5 font-medium transition-all duration-300 ${showAdvancedFilters
                        ? 'border-green dark:border-gold/40 bg-green/10 dark:bg-gold/20 text-green dark:text-gold shadow-md shadow-green/10 dark:shadow-gold/10'
                        : 'border-gray-200 dark:border-gray-600 hover:border-green dark:hover:border-gold/40 hover:bg-green/5 dark:hover:bg-gold/20'
                        }`}
                      data-testid="advanced-filters-toggle"
                    >
                      <Filter className={`w-4 h-4 mr-2 transition-transform duration-300 ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                      <span>Advanced Filters</span>
                      <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                </motion.div>

                {/* Advanced Filters Panel */}
                {showAdvancedFilters && (
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 space-y-3 sm:space-y-4">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Advanced Filters</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">🎯 Difficulty Level</label>
                        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                          <SelectTrigger className="w-full rounded-xl"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="easy">🟢 Easy (1-3 ingredients)</SelectItem>
                            <SelectItem value="medium">🟡 Medium (4-6 ingredients)</SelectItem>
                            <SelectItem value="advanced">🔴 Advanced (7+ ingredients)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">⏱️ Preparation Time</label>
                        <Select value={timeFilter} onValueChange={setTimeFilter}>
                          <SelectTrigger className="w-full rounded-xl"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Any Time</SelectItem>
                            <SelectItem value="instant">⚡ Instant (0-2 min)</SelectItem>
                            <SelectItem value="5min">🚀 Quick (3-10 min)</SelectItem>
                            <SelectItem value="10min">⏰ Medium (10-20 min)</SelectItem>
                            <SelectItem value="30min">🕐 Extended (20+ min)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">🧪 Remedy Form</label>
                        <Select value={formFilter} onValueChange={setFormFilter}>
                          <SelectTrigger className="w-full rounded-xl"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Forms</SelectItem>
                            <SelectItem value="tea">🍵 Tea</SelectItem>
                            <SelectItem value="drink">🥤 Drink</SelectItem>
                            <SelectItem value="topical">🧴 Topical</SelectItem>
                            <SelectItem value="syrup">🍯 Syrup</SelectItem>
                            <SelectItem value="compress">🧊 Compress</SelectItem>
                            <SelectItem value="soak">🛁 Soak</SelectItem>
                            <SelectItem value="technique">🙏 Technique</SelectItem>
                            <SelectItem value="food">🍎 Food</SelectItem>
                            <SelectItem value="raw">🌿 Raw</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setDifficultyFilter("all"); setTimeFilter("all"); setFormFilter("all"); setSortBy("newest"); }}
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        Clear Advanced Filters
                      </Button>
                    </div>
                  </div>
                )}

                {/* Category Filter Tags */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between lg:hidden">
                    <button
                      onClick={() => setShowAllCategories(!showAllCategories)}
                      className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green dark:hover:text-emerald-400 transition-colors group"
                    >
                      <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green/50 dark:bg-emerald-900/50 flex items-center justify-center transition-transform duration-300 ${showAllCategories ? 'rotate-90' : ''}`}>
                        <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white dark:text-emerald-400" />
                      </span>
                      <span>Filter by category</span>
                      <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">({categories.length} options)</span>
                    </button>

                    {!showAllCategories && selectedCategory !== "all" && (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green/10 dark:bg-emerald-900/50 text-green dark:text-emerald-300 text-xs sm:text-sm font-medium">
                          {categories.find(c => c.value === selectedCategory)?.icon}
                          <span>{categories.find(c => c.value === selectedCategory)?.label}</span>
                        </span>
                        <button
                          onClick={() => setSelectedCategory("all")}
                          className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center justify-center transition-colors group"
                        >
                          <X className="w-3 h-3 text-gray-500 group-hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="hidden lg:flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green rounded-full"></span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Filter by category</span>
                  </div>

                  <div className={`overflow-hidden transition-all duration-500 ease-out lg:max-h-none lg:opacity-100 ${showAllCategories ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'}`}>
                    <motion.div variants={containerVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 pt-2 lg:pt-0 pb-1">
                      {categories.map((category) => {
                        const isSelected = selectedCategory === category.value;
                        return (

                          <motion.button
                            variants={slideRightVariantsFast as any}
                            key={category.value}
                            onClick={() => { setSelectedCategory(category.value); setShowAllCategories(false); }}
                            className={`
                              inline-flex items-center justify-center gap-1.5 sm:gap-2
                              px-3 sm:px-4 py-2.5 sm:py-3
                              rounded-xl text-xs sm:text-sm
                              transition-all duration-500 ease-out active:scale-95
                              ${isSelected
                                ? "btn-green text-white shadow-lg shadow-[#385127]/25"
                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gold dark:border-gray-700 hover:border-gold dark:hover:border-gold/40 hover:text-gold dark:hover:text-gold hover:shadow-md hover:shadow-gold/10"
                              }
                            `}
                            data-testid={`filter-${category.value}`}
                          >
                            {category.icon && (
                              <span className={`text-base sm:text-lg transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`}>
                                {category.icon}
                              </span>
                            )}
                            <span className="whitespace-nowrap truncate">{category.label}</span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  </div>

                  {!showAllCategories && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:hidden">
                      {categories.slice(0, 6).map((category) => {
                        const isSelected = selectedCategory === category.value;
                        return (
                          <button
                            key={category.value}
                            onClick={() => setSelectedCategory(category.value)}
                            className={`
                              inline-flex items-center gap-1 sm:gap-1.5
                              px-2.5 sm:px-3 py-1.5 sm:py-2
                              rounded-full text-[10px] sm:text-xs font-medium
                              transition-all duration-200 ease-out active:scale-95
                              ${isSelected
                                ? "btn-green text-white shadow-md shadow-[#385127]/20"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green/10 dark:hover:bg-emerald-900/30 hover:text-green dark:hover:text-emerald-300"
                              }
                            `}
                          >
                            {category.icon && <span className="text-xs sm:text-sm">{category.icon}</span>}
                            <span>{category.label}</span>
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setShowAllCategories(true)}
                        className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium bg-green/10 dark:bg-emerald-900/20 text-green dark:text-emerald-400 hover:bg-green/20 dark:hover:bg-emerald-900/40 transition-colors"
                      >
                        <span>+{categories.length - 6} more</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Active Filters */}
                {(searchQuery || selectedCategory !== "all" || difficultyFilter !== "all" || timeFilter !== "all" || formFilter !== "all" || sortBy !== "newest") && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-xl sm:rounded-2xl border border-green-200 dark:border-green-800">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="w-2 h-2 bg-green rounded-full animate-pulse-stable"></div>
                      <span className="text-sm font-medium text-green dark:text-emerald-300">Active filters:</span>
                      {searchQuery && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green/10 dark:bg-green-800 text-green dark:text-emerald-200 text-xs font-medium">
                          Search: "{searchQuery.length > 15 ? searchQuery.substring(0, 15) + '...' : searchQuery}"
                        </div>
                      )}
                      {selectedCategory !== "all" && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green/10 dark:bg-green-800 text-green dark:text-emerald-200 text-xs font-medium">
                          {categories.find(c => c.value === selectedCategory)?.icon} {categories.find(c => c.value === selectedCategory)?.label}
                        </div>
                      )}
                      {difficultyFilter !== "all" && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium">
                          🎯 {difficultyFilter.charAt(0).toUpperCase() + difficultyFilter.slice(1)}
                        </div>
                      )}
                      {timeFilter !== "all" && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-medium">
                          ⏱️ {timeFilter === "5min" ? "Quick" : timeFilter === "instant" ? "Instant" : timeFilter === "10min" ? "Medium" : "Extended"}
                        </div>
                      )}
                      {formFilter !== "all" && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-xs font-medium">
                          🧪 {formFilter.charAt(0).toUpperCase() + formFilter.slice(1)}
                        </div>
                      )}
                      {sortBy !== "newest" && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium">
                          📊 {sortBy === "name" ? "A-Z" : sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setDifficultyFilter("all"); setTimeFilter("all"); setFormFilter("all"); setSortBy("newest"); }}
                      className="text-green hover:text-green/80 hover:bg-green/10 dark:hover:bg-green-800/50 rounded-full px-4 py-2 shrink-0"
                    >
                      Clear All
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Grid */}
        {isLoading ? null : !cardsVisible ? null : (remedies as any[]).length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
            >
              <Search className="w-10 h-10 text-gray-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No remedies found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Try adjusting your search criteria or browse all categories</p>
            <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} className="btn-green text-white">
              Show All Remedies
            </Button>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
            >
              <div className="relative mb-8 sm:mb-10">
                <div className="absolute inset-0 bg-gradient-to-r from-green/5 via-transparent to-teal-50/50 dark:from-emerald-950/20 dark:via-transparent dark:to-teal-950/20 rounded-2xl -z-10"></div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-5 rounded-2xl border border-green/20 dark:border-emerald-900/30">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold/20 rounded-xl blur-md animate-pulse-slow"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-gold via-green to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green/20">
                        <Leaf className="w-6 h-6 text-white animate-float-slow" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl sm:text-3xl font-bold text-green dark:text-emerald-400">
                          {(remedies as any[]).length}
                        </span>
                        <span className="text-lg text-gray-600 dark:text-gray-400">of</span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">{(allFilteredRemedies as any[]).length}</span>
                        <span className="text-lg text-gray-600 dark:text-gray-400">remedies</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {searchQuery && <>Searching for "<span className="text-green dark:text-emerald-400 font-medium">{searchQuery}</span>" </>}
                        {selectedCategory !== "all" && (<>in <span className="text-green dark:text-emerald-400 font-medium">{categories.find(c => c.value === selectedCategory)?.label}</span></>)}
                        {!searchQuery && selectedCategory === "all" && "Explore our complete collection"}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-gradient-to-r from-gold to-green' : 'bg-gray-300 dark:bg-gray-600'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 auto-rows-fr">
              {(remedies as any[]).map((remedy: any, index: number) => (
                <motion.div
                  key={remedy.id}
                  initial={{ opacity: 0.92, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: (index % 3) * 0.06, ease: "easeOut" }}
                  whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
                  style={{ willChange: "transform, opacity" }}
                  className="group relative"
                >
                  <RemedyCard remedy={remedy} />
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
            >
              <div className="flex items-center justify-center gap-3 mt-10 sm:mt-14">
                <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent dark:via-emerald-700"></div>
                <div className="flex items-center gap-1.5">
                  <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} className="w-2 h-2 bg-green rounded-full" />
                  <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                </div>
                <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent dark:via-emerald-700"></div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* SEO Content Block */}
      <motion.div
        variants={slideUpVariants as any}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }}
      >
        <div className="bg-gradient-to-br from-gold/50 via-gold/50 to-gold-50 dark:from-emerald-900/10 dark:via-teal-900/10 dark:to-cyan-900/10 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="!h-auto w-full flex items-center justify-between p-6 rounded-2xl border-2 border-green/50 dark:border-emerald-800 hover:border-green dark:hover:border-emerald-600 !bg-white dark:bg-gray-900 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-black">
                        Understanding Plant-Based Natural Remedies
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive guide to clinical herbal medicine</p>
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-6">
                <div className="prose prose-lg max-w-none dark:prose-invert p-6 bg-white dark:bg-gray-800/50 rounded-2xl">
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Natural plant-based remedies represent humanity's oldest form of medicine, with documented therapeutic use spanning thousands of years across every culture worldwide. Unlike synthetic pharmaceuticals developed in recent centuries, these botanical treatments harness compounds plants evolved over millions of years for their own survival – compounds that often interact beneficially with human physiology. Modern research increasingly validates traditional knowledge, revealing sophisticated biochemical mechanisms through which plant medicines modulate inflammation, support immune function, balance hormones, enhance detoxification, and promote healing across virtually every body system.
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Categories of Natural Remedies at PlantRx</h3>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Our comprehensive database organizes remedies into therapeutic categories based on primary applications, making it easier to find solutions for specific health concerns. Major categories include digestive health remedies featuring herbs like ginger, peppermint, and fennel that support digestion and reduce gastrointestinal discomfort; anti-inflammatory treatments utilizing powerful compounds from turmeric, boswellia, and white willow bark; skin care solutions incorporating aloe vera, calendula, and tea tree oil for various dermatological conditions; and sleep support remedies leveraging calming herbs like valerian, chamomile, and passionflower.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Additional specialized categories address pain relief through natural analgesics and anti-inflammatories, immune support via echinacea and medicinal mushrooms, stress management using adaptogenic herbs, brain health optimization with nootropic botanicals, and hormonal balance through phytoestrogen and endocrine-supporting plants. Each category reflects distinct therapeutic mechanisms, allowing users to target specific health concerns with botanicals that have demonstrated clinical efficacy for those particular applications.
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">How to Choose the Right Natural Remedy</h3>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Selecting appropriate natural remedies requires consideration of your specific symptoms, overall health status, current medications, and personal preferences regarding preparation methods and taste. Start by clearly identifying your primary health concern, then explore remedies within the relevant therapeutic category. Pay attention to preparation forms – teas work quickly but require brewing, capsules offer convenience but slower onset, tinctures provide concentrated doses in small volumes, while topical applications target localized conditions directly.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Consult the safety information for each remedy, noting any contraindications or medication interactions. Those with chronic health conditions, pregnant or nursing individuals, and anyone taking prescription medications should discuss herbal use with qualified healthcare providers before beginning new treatments. Start with recommended dosages rather than exceeding them, as more isn't necessarily better with botanical medicine. Give remedies adequate time to work – many natural treatments require consistent use over weeks to reach full effectiveness, unlike pharmaceuticals that often work immediately.
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Safety Guidelines for Natural Remedy Use</h3>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    While natural remedies are generally safer than synthetic drugs, they're not risk-free and require informed, responsible use. Quality matters enormously – purchase herbs from reputable suppliers who test for contaminants, verify species identification, and provide transparent sourcing information. Store dried herbs in cool, dark, dry locations, discarding any that develop mold or off odors. Follow preparation instructions precisely, as incorrect methods can reduce effectiveness or create safety concerns.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Be alert for potential allergic reactions when trying new botanicals, starting with smaller doses to assess tolerance. Discontinue use if adverse effects occur and consult healthcare providers if symptoms persist or worsen. Never use natural remedies to replace necessary conventional medical treatment for serious conditions – they work best as complementary approaches supporting overall wellness or addressing minor to moderate health concerns. For emergencies, severe illness, or chronic conditions requiring professional management, always seek appropriate medical care regardless of natural remedy use.
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Evidence-Based Approach to Herbal Medicine</h3>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    PlantRx emphasizes evidence-based herbalism, requiring both traditional documentation and scientific validation for included remedies. This means you're accessing treatments that have demonstrated effectiveness through generations of human use while also meeting modern research standards for safety and efficacy. We prioritize remedies with robust clinical trial data, clear safety profiles, and realistic therapeutic applications. Where evidence is preliminary or conflicting, we acknowledge these limitations honestly rather than overstating benefits. This balanced approach helps you make informed decisions about natural health treatments based on the best available evidence rather than marketing claims or unsubstantiated folklore.
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Clinical Applications & Professional Dosage Guidance</h3>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Professional herbalism recognizes that proper dosing distinguishes therapeutic benefit from ineffective treatment or potential harm. Each PlantRx remedy profile includes specific dosage ranges based on clinical research and traditional therapeutic use, accounting for preparation methods that significantly influence bioavailability. For example, standardized extracts containing concentrated active compounds require smaller doses than whole plant teas, while tinctures deliver alcohol-extracted constituents more rapidly than capsules requiring digestive breakdown. Understanding these preparation-specific dosing frameworks ensures you achieve therapeutic concentrations of active compounds without exceeding safe limits.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Timing and duration of treatment matter equally to dosage precision. Acute conditions like headaches or digestive upset often respond to single doses or short-term use over days, while chronic concerns including hormonal imbalances, immune dysfunction, or persistent inflammation typically require consistent daily use extending weeks or months before maximum benefits manifest. We specify realistic timeframes for each remedy application, preventing premature abandonment of effective treatments that simply need adequate time to work. Additionally, we note optimal timing for doses – whether remedies work best on empty stomachs, with meals, at bedtime, or distributed throughout the day – maximizing therapeutic impact through proper administration schedules.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Contraindication awareness represents essential clinical knowledge often overlooked in casual herbal use. Certain natural remedies interact with prescription medications, potentially increasing or decreasing drug effectiveness, or creating dangerous combinations. Others pose risks for specific populations including pregnant women, nursing mothers, infants, children, elderly individuals, or those with particular health conditions. We provide comprehensive contraindication information for each remedy, clearly stating when professional medical consultation is mandatory rather than optional. This professional standard approach ensures natural remedies complement your healthcare safely and effectively rather than creating unintended complications. When in doubt about safety or appropriateness for your situation, consult qualified healthcare practitioners knowledgeable in both conventional medicine and clinical herbalism before beginning new natural treatments.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </motion.div>

    </div>
  );
}