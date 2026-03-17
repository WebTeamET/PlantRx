import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, CheckCircle, Star, Award, Users, BookOpen, MapPin, UserPlus, Mail } from "lucide-react";
import ExpertCard from "@/components/ExpertCard";
import { BusinessMap } from "@/components/BusinessMap";
import { EnhancedRegistration } from "@/components/EnhancedRegistration";
import Header from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { UpgradeInterstitial } from "@/components/FeatureLock";
import { Feature } from "@shared/subscriptionFeatures";
import { slideUpVariants } from "@/animation/framerMotionVariants";
import { motion } from "framer-motion";
import { SplitText } from "@/utils/SplitText";

export default function Experts() {
  return (
    <UpgradeInterstitial feature={Feature.EXPERT_CONSULTATIONS}>
      <ExpertsContent />
    </UpgradeInterstitial>
  );
}

function ExpertsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("experts");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: experts = [], isLoading } = useQuery({
    queryKey: ["/api/experts"],
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      console.log('Email submitted for notifications:', email);
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => { setIsSubmitted(false); }, 3000);
    }
  };

  const filteredExperts = (experts as any[]).filter((expert: any) =>
    expert.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (expert.expertCredentials?.specialization || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredExperts = [
    {
      id: 1,
      name: "Dr. Sage Herbwell",
      title: "Naturopathic Doctor",
      specialization: "Herbal Medicine & Digestive Health",
      experience: "15+ years",
      education: "ND from Fictional University, MS in Herbal Medicine",
      certifications: ["Licensed Naturopathic Doctor", "Certified Herbalist", "AANP Member"],
      remedies: 127,
      rating: 4.9,
      bio: "Dr. Herbwell specializes in integrative approaches to digestive health, combining traditional herbal medicine with modern nutritional science.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Dr. Felix Plantwise",
      title: "Clinical Herbalist",
      specialization: "Stress, Anxiety & Mental Wellness",
      experience: "12+ years",
      education: "Master's in Botanical Medicine, PhD in Demo Studies",
      certifications: ["Registered Herbalist (Demo)", "Clinical Aromatherapist", "Mindfulness Teacher"],
      remedies: 89,
      rating: 4.8,
      bio: "Dr. Plantwise focuses on plant-based approaches to mental wellness, specializing in adaptogenic herbs and stress management.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Dr. Luna Wellspring",
      title: "Ayurvedic Practitioner",
      specialization: "Constitutional Medicine & Nutrition",
      experience: "18+ years",
      education: "BAMS from Example College, MS in Nutrition",
      certifications: ["Certified Ayurvedic Practitioner", "Clinical Nutritionist", "Demo Specialist"],
      remedies: 156,
      rating: 4.9,
      bio: "Dr. Wellspring brings authentic Ayurvedic wisdom to modern wellness, specializing in constitutional analysis and personalized nutrition.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&w=300&h=300&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gold/10 dark:from-black dark:via-gray-950 dark:to-black">
      <SEOHead
        title="Expert Health Professionals - Natural Medicine Specialists"
        description="Connect with verified natural health experts, naturopathic doctors, and certified herbalists. Find professional health guidance and join our expert network for natural medicine and wellness consultations."
        keywords="natural health experts, naturopathic doctors, certified herbalists, health professionals, expert consultations, natural medicine specialists, wellness experts"
        canonical="https://plantrxapp.com/experts"
      />
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          variants={slideUpVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb- sm:mb-6">
            <h1 className="text-4xl sm:text-6xl font-black text-black mb-4">
              <SplitText text="Expert Network"></SplitText>
            </h1>
          </div>
          <motion.p variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Discover verified health professionals, explore our business directory, and join our expert community
          </motion.p>
        </motion.div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid gap-2 w-full grid-cols-3 mb-8 sm:mb-12 bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-gold dark:border-gold/10 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-2xl shadow-gold/10 dark:shadow-gold/5 h-auto">
            <TabsTrigger
              value="experts"
              className="flex items-center justify-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 text-gray-900 dark:text-white data-[state=active]:bg-green data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gold/10 dark:hover:bg-gold/5 min-h-[48px] sm:min-h-[60px]"
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm lg:text-base">
                <span className="hidden sm:inline">Expert Profiles</span>
                <span className="sm:hidden">Experts</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="flex items-center justify-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 text-gray-900 dark:text-white data-[state=active]:bg-green data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gold/10 dark:hover:bg-gold/5 min-h-[48px] sm:min-h-[60px]"
            >
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm lg:text-base">
                <span className="hidden sm:inline">Business Map</span>
                <span className="sm:hidden">Map</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="join"
              className="flex items-center justify-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 text-gray-900 dark:text-white data-[state=active]:bg-green data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gold/10 dark:hover:bg-gold/5 min-h-[48px] sm:min-h-[60px]"
            >
              <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm lg:text-base">Join Us</span>
            </TabsTrigger>
          </TabsList>

          {/* Expert Profiles Tab */}
          <TabsContent value="experts" className="space-y-6 sm:space-y-8">
            <div className="relative">
              {/* Blurred Background Content */}
              <div className="blur-sm opacity-30 pointer-events-none">
                {/* Search */}
                <div className="max-w-3xl mx-auto mb-8 sm:mb-16">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-[linear-gradient(to_right,#385127,#c2a058)] rounded-xl sm:rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative bg-white/95 dark:bg-black/95 backdrop-blur-xl rounded-xl sm:rounded-2xl p-1 border border-gold/30 dark:border-gold/10">
                      <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5 sm:w-6 sm:h-6" />
                      <Input
                        placeholder="Search experts by name or specialization..."
                        value=""
                        className="pl-12 sm:pl-16 pr-4 sm:pr-6 py-4 sm:py-6 bg-transparent border-0 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300 focus:ring-0 text-base sm:text-lg rounded-xl sm:rounded-2xl"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* Stats */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-16">
                  {[
                    { icon: Users, gradient: "bg-green", glow: "from-green/40 to-green/60", value: "127+", label: "Verified Experts" },
                    { icon: BookOpen, gradient: "bg-[linear-gradient(to_right,#385127,#c2a058)]", glow: "from-gold/40 to-gold/60", value: "850+", label: "Expert Remedies" },
                    { icon: Award, gradient: "bg-green", glow: "from-green/40 to-green/60", value: "25+", label: "Specializations" },
                    { icon: Star, gradient: "bg-[linear-gradient(to_right,#385127,#c2a058)]", glow: "from-gold/40 to-gold/60", value: "4.8", label: "Average Rating" },
                  ].map((stat, i) => (
                    <div key={i} className="group relative">
                      <div className={`absolute -inset-1 bg-gradient-to-r ${stat.glow} rounded-2xl sm:rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300`}></div>
                      <div className="relative bg-white/95 dark:bg-black/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center border border-gold/30 dark:border-gold/10 shadow-xl">
                        <div className={`w-10 h-10 sm:w-16 sm:h-16 ${stat.gradient} rounded-xl sm:rounded-2xl mx-auto mb-2 sm:mb-4 flex items-center justify-center shadow-lg`}>
                          <stat.icon className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div className="text-xl sm:text-3xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">{stat.value}</div>
                        <div className="text-gray-600 dark:text-gray-300 font-medium text-xs sm:text-base">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div> */}

                {/* Featured Experts */}
                <div className="mb-12 sm:mb-20">
                  <h2 className="text-2xl sm:text-4xl font-black bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-clip-text text-transparent mb-6 sm:mb-12 text-center">Featured Experts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
                    {["Dr. Expert Name", "Dr. Another Expert", "Dr. Third Expert"].map((name, i) => (
                      <Card key={i} className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-gold/30 dark:border-gold/10 rounded-2xl sm:rounded-3xl shadow-xl">
                        <CardContent className="p-4 sm:p-8 text-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold/20 dark:bg-gray-700 rounded-full mx-auto mb-3 sm:mb-4"></div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                            {i === 0 ? "Natural Health Specialist" : i === 1 ? "Herbal Medicine Expert" : "Wellness Practitioner"}
                          </p>
                          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-green text-white text-xs font-bold rounded-full">
                            Verified Expert
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coming Soon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center max-w-2xl mx-auto px-4 sm:px-8">
                  <motion.div
                    variants={slideUpVariants as any}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-2 bg-[linear-gradient(to_right,#385127,#c2a058,#385127)] rounded-2xl sm:rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
                    <Card className="relative bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-gold dark:border-gold/10 rounded-2xl sm:rounded-3xl shadow-2xl">
                      <CardContent className="!p-6 sm:!p-12">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green rounded-xl sm:rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-2xl">
                          <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black text-black mb-3 sm:mb-4">
                          Coming Soon
                        </h2>
                        <p className="text-base sm:text-xl text-gray-700 dark:text-gray-200 mb-6 sm:mb-8 leading-relaxed">
                          We're building the world's largest network of verified natural health experts. Get exclusive early access to:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 text-left">
                          {["Expert consultations", "Custom remedy creation", "Professional networking", "Verified credentials"].map((item) => (
                            <div key={item} className="flex items-center space-x-3">
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Email Notification Signup */}
            <div className="mt-8 sm:mt-12">
              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative group max-w-2xl mx-auto px-4 sm:px-0"
              >
                <div className="absolute -inset-1 bg-[linear-gradient(to_right,#385127,#c2a058,#385127)] rounded-2xl sm:rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                <Card className="relative bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-gold/30 dark:border-gold/10 rounded-2xl sm:rounded-3xl shadow-2xl">
                  <CardContent className="!p-6 sm:!p-8">
                    <div className="text-center mb-4 sm:mb-6">
                      <Mail className="w-10 h-10 sm:w-12 sm:h-12 bg-green rounded-lg sm:rounded-xl mx-auto mb-3 sm:mb-4 p-2 sm:p-3 text-white" />
                      <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Get Notified When We Launch</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                        Be the first to access our expert network and receive exclusive health insights
                      </p>
                    </div>
                    <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
                      <Input
                        placeholder="Enter your email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 py-3 px-4 text-gray-900 dark:text-white bg-white/90 dark:bg-black/90 border-gold/30 dark:border-gold/10 rounded-xl focus:border-gold focus:ring-gold/20"
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitted}
                        className="bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-gold/25 transition-all duration-300 disabled:opacity-50"
                      >
                        {isSubmitted ? "Added!" : "Notify Me"}
                      </Button>
                    </form>
                    {isSubmitted ? (
                      <p className="text-center text-sm text-green dark:text-green/80 mt-4 font-medium">
                        ✓ Thank you! You'll be notified when our expert network launches.
                      </p>
                    ) : (
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                        No spam, just exclusive updates about our expert network launch
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Business Map Tab */}
          <TabsContent value="map" className="space-y-8">
            <div className="text-center py-20">
              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative group max-w-2xl mx-auto"
              >
                <div className="absolute -inset-2 bg-[linear-gradient(to_right,#385127,#c2a058,#385127)] rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                <Card className="relative bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-gold/30 dark:border-gold/10 rounded-3xl shadow-2xl">
                  <CardContent className="p-12">
                    <div className="w-20 h-20 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                      <MapPin className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-black bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-clip-text text-transparent mb-4">
                      Interactive Business Map
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                      Discover verified natural health businesses near you with our interactive map featuring real-time location data and expert-verified establishments.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                      {["Location-based search", "Business verification", "Expert recommendations", "Real-time availability"].map((item) => (
                        <div key={item} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Coming soon - Sign up above to get notified when this feature launches
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Join Us Tab */}
          <TabsContent value="join" className="space-y-8">
            <div className="text-center py-20">
              <motion.div
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative group max-w-2xl mx-auto"
              >
                <div className="absolute -inset-2 bg-[linear-gradient(to_right,#385127,#c2a058,#385127)] rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                <Card className="relative bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-gold/30 dark:border-gold/10 rounded-3xl shadow-2xl">
                  <CardContent className="p-12">
                    <div className="w-20 h-20 bg-green rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                      <UserPlus className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-black bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-clip-text text-transparent mb-4">
                      Expert Applications
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                      Join the world's most trusted network of natural health professionals. Our rigorous verification process ensures only qualified experts join our community.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                      {["Credential verification", "Professional networking", "Revenue opportunities", "Global reach"].map((item) => (
                        <div key={item} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Applications opening soon - Join our notification list above for early access
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}