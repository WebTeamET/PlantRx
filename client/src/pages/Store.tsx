import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import { SEOHead } from '@/components/SEOHead';
import { useTranslation } from '@/contexts/TranslationContext';
import { useEnhancedPageTracking } from '@/hooks/useAnalytics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, Sparkles, CheckCircle, Award, Mail, ShoppingCart, Loader2 } from 'lucide-react';
import { shopifyService, type ShopifyProduct, getProductIngredients } from '@/lib/shopify';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart as CartComponent } from '@/components/ShoppingCart';
import { ScrollReveal } from '@/components/ScrollReveal';
import { containerVariants, slideRightVariantsFast, slideUpVariants } from '@/animation/framerMotionVariants';
import { SplitText } from '@/utils/SplitText';
import { motion } from 'framer-motion';
import ProductCard2 from '@/components/Category/ProductCard2';

export default function Store() {
  // Enhanced analytics tracking for store pages
  useEnhancedPageTracking('store', 'main');

  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Advanced filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'in-stock' | 'out-of-stock'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState<'best-selling' | 'price-low-high' | 'price-high-low' | 'name-a-z' | 'name-z-a'>('best-selling');
  const [minRating, setMinRating] = useState(0);

  const { addToCart, setCartOpen } = useCart();

  // Load products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await shopifyService.fetchProducts();
        setProducts(fetchedProducts);
        setError(null);

        // Set initial price range based on products
        if (fetchedProducts.length > 0) {
          const prices = fetchedProducts
            .filter(p => p.variants.length > 0)
            .map(p => parseFloat(p.variants[0].price.amount));
          if (prices.length > 0) {
            const minPrice = Math.floor(Math.min(...prices));
            const maxPrice = Math.ceil(Math.max(...prices));
            setPriceRange([minPrice, maxPrice]);
          }
        }
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      console.log('Email submitted for store notifications:', email);
      setIsSubmitted(true);
      setEmail("");

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };


  // Advanced filter and sort products
  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.productType?.toLowerCase().includes(query) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply availability filter
    if (availabilityFilter === 'in-stock') {
      filtered = filtered.filter(product =>
        product.variants.length > 0 && product.variants[0].availableForSale
      );
    } else if (availabilityFilter === 'out-of-stock') {
      filtered = filtered.filter(product =>
        product.variants.length === 0 || !product.variants[0].availableForSale
      );
    }


    // Apply price filter
    filtered = filtered.filter(product => {
      if (product.variants.length === 0) return false;
      const price = parseFloat(product.variants[0].price.amount);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          if (a.variants.length === 0 || b.variants.length === 0) return 0;
          return parseFloat(a.variants[0].price.amount) - parseFloat(b.variants[0].price.amount);

        case 'price-high-low':
          if (a.variants.length === 0 || b.variants.length === 0) return 0;
          return parseFloat(b.variants[0].price.amount) - parseFloat(a.variants[0].price.amount);

        case 'name-a-z':
          return a.title.localeCompare(b.title);

        case 'name-z-a':
          return b.title.localeCompare(a.title);

        case 'best-selling':
        default:
          return 0;
      }
    });

    return filtered;
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setAvailabilityFilter('all');
    setMinRating(0);
    setSortBy('best-selling');
    if (products.length > 0) {
      const prices = products
        .filter(p => p.variants.length > 0)
        .map(p => parseFloat(p.variants[0].price.amount));
      if (prices.length > 0) {
        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));
        setPriceRange([minPrice, maxPrice]);
      }
    }
  };

  const filteredProducts = getFilteredAndSortedProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      <SEOHead
        title="PlantRx Store | Premium Natural Products & Supplements"
        description="Shop our premium collection of scientifically-backed, expert-verified natural products including organic spirulina, turmeric curcumin, ashwagandha, and more. Lab-tested for purity and potency."
        keywords="natural products, premium supplements, plant-based wellness, herbal remedies, organic health products, spirulina, turmeric, ashwagandha, echinacea, reishi mushroom"
      />

      <Header />

      {/* Hero Section */}
       <div className="max-w-7xl mx-auto mobile-safe-area py-4 sm:py-8 ios-safe-area-bottom hero-desktop">
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

          <motion.div variants={slideUpVariants as any} initial="hidden" animate="visible">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 shadow-[0_8px_30px_-4px_rgba(56,81,39,0.25)] dark:shadow-[0_8px_30px_-4px_rgba(56,81,39,0.2)] dark:bg-emerald-500/20 rounded-full blur-xl scale-150"></div>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-green dark:bg-gold rounded-2xl flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(56,81,39,0.15)] dark:shadow-[0_4px_20px_-4px_rgba(194, 160, 88,0.1)] rotate-3 shadow-lg">
                  <span className="text-2xl sm:text-3xl invert-[1] filter brightness-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                  </span>
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
                Premium Natural Products
                </span>
                
              </div>
            </div>
          </motion.div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-5 tracking-tight leading-tight px-2 mt-5">
            {/* <span className="text-black dark:from-white dark:via-gray-100 dark:to-white">
              <SplitText className="" text={t('remedies.title', '166+ Expert-Verified')} />
            </span> */}
            <span className="text-green dark:text-white">
              {/* Natural Remedies */}
              <SplitText className="" text={"PlantRx Wellness Shop"} />
            </span>
          </h1>

          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent dark:via-gold"></div>
            <div className="w-2 h-2 bg-gold dark:bg-gold rounded-full"></div>
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent dark:via-gold"></div>
          </div>

          <motion.p variants={slideUpVariants as any} initial="hidden" animate="visible"
            className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-4"
          >
            {t('Experience the future of natural wellness with our premium collection of scientifically-backed, ethically-sourced products. Each item is verified by our expert team for maximum potency and effectiveness.')}
          </motion.p>
        </div>
        </div>

      {/* Products Section */}
      <section className="pb-16 sm:pb-32 px-3 sm:px-4 relative mt-10">
        <div className="max-w-7xl mx-auto">

          {loading ? (
            /* Loading State */
            <div className="text-center py-16">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Loading Premium Products...
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Fetching the finest natural products for you
              </p>
            </div>
          ) : error ? (
            /* Error State */
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
                Store Temporarily Unavailable
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {error}
              </p>

              {/* Email Notification Form */}
              <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email for updates"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white min-h-[48px] text-base"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold px-6 min-h-[48px] text-base"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Notify Me
                  </Button>
                </div>

                {isSubmitted && (
                  <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg">
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      ✅ Thank you! We'll notify you when the store is available.
                    </p>
                  </div>
                )}
              </form>
            </div>
          ) : products.length === 0 ? (
            /* No Products State */
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
                Premium Natural Products
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Browse our expertly curated collection of 12+ scientifically-backed natural wellness products including organic spirulina, turmeric curcumin, ashwagandha, and more.
              </p>
            </div>
          ) : (
            /* Products Display */
            <>
              <motion.div 
              variants={slideUpVariants as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Products</h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Discover our expertly curated collection of natural wellness products</p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {showAllProducts ? filteredProducts.length : Math.min(16, filteredProducts.length)} of {filteredProducts.length} products
                </div>
              </motion.div>

              {/* Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 sm:p-4 mb-6">
                <motion.div 
                variants={containerVariants as any}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search */}
                  <motion.div
                  variants={slideRightVariantsFast as any}
                  >
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="min-h-[48px] text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </motion.div>

                  {/* Availability */}
                  <motion.div
                  variants={slideRightVariantsFast as any}
                  >
                    <Select value={availabilityFilter} onValueChange={(value) => setAvailabilityFilter(value as any)}>
                      <SelectTrigger className="min-h-[48px] text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Products</SelectItem>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Sort */}
                  <motion.div
                  variants={slideRightVariantsFast as any}
                  >
                    <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                      <SelectTrigger className="min-h-[48px] text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="best-selling">Best Selling</SelectItem>
                        <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                        <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                        <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                        <SelectItem value="name-z-a">Name: Z to A</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div 
              variants={containerVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ margin: "-80px", once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 lg:gap-10 xl:gap-20 md:gap-10 gap-x-5 gap-y-10 items-stretch xl:mt-20 md:mt-12 mt-10">
                {(showAllProducts ? filteredProducts : filteredProducts.slice(0, 16)).map((product) => {
                  const isStrip =
                    product.productType?.toLowerCase().includes('strip') ||
                    product.title.toLowerCase().includes('strip') ||
                    product.tags?.some(t => t.toLowerCase().includes('strip'));


                  const productLink = isStrip
                    ? `/strips/${product.handle}`
                    : `/supplements/${product.handle}`;

                  return (
                    <ProductCard2
                      key={product.id}
                      product={{
                        id: product.id,
                        title: product.title,
                        variantId: product.variants[0]?.id || "",
                        price: product.variants[0]?.price.amount || "0.00",
                        productLink: productLink,
                        productImage: product.images[0]?.url || "",
                        cardBgColor: "#F3F4F6",
                        ingredients: getProductIngredients(product)
                      }}
                    />
                  );
                })}
              </motion.div>

              {/* View More Button */}
              {filteredProducts.length > 20 && !showAllProducts && (
                <div className="text-center mt-12">
                  <Button
                    onClick={() => setShowAllProducts(true)}
                    className="ctm-button btn-green"
                  >
                    View More Products ({filteredProducts.length - 16} more)
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Store Features - Always show */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-3 xl:gap-6 md:mt-[120px] mt-20 justify-between items-start">
            <div className="text-center">
              <div className="w-12 h-12 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-1">Expert Verified</h3>
              <p className="text-sm text-black dark:text-gray-300">All products vetted by our team of natural health experts</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-1">Lab Tested</h3>
              <p className="text-sm text-black dark:text-gray-300">Third-party tested for purity, potency, and safety</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-1">Premium Quality</h3>
              <p className="text-sm text-black dark:text-gray-300">Sustainably sourced from trusted global suppliers</p>
            </div>
          </div>

        </div>
      </section>

      {/* Shopping Cart Component */}
      <CartComponent />
    </div>
  );
}