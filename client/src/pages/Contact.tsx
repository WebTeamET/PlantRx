import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEnhancedPageTracking } from '../hooks/useAnalytics';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, Shield, AlertTriangle, MessageCircle, HelpCircle, Sparkles, Clock, CheckCircle2, Leaf } from "lucide-react";
import Header from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { BackButton } from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";
import { FadeInSection } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { containerVariants, slideRightVariants, slideUpVariants } from "@/animation/framerMotionVariants";
import { SplitText } from "@/utils/SplitText";

export default function Contact() {
  useEnhancedPageTracking('contact', 'main');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
    urgent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let toEmail = "support@plantrxapp.com";
      if (formData.category === "billing") {
        toEmail = "billing@plantrxapp.com";
      } else if (formData.category === "privacy") {
        toEmail = "legal@plantrxapp.com";
      }

      const categoryLabel = contactCategories.find(c => c.value === formData.category)?.label || formData.category;

      const emailBody = `
Hello PlantRx Support Team,

${formData.message}

---
Contact Details:
Name: ${formData.name}
Email: ${formData.email}
Category: ${categoryLabel}
${formData.urgent ? "⚠️ URGENT: This requires immediate attention" : ""}

Sent via PlantRx Contact Form
      `.trim();

      const emailSubject = formData.urgent
        ? `[URGENT] ${formData.subject}`
        : formData.subject;

      const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;

      toast({
        title: "Opening Email Client",
        description: "Your email app should open with your message ready to send.",
      });

      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", category: "", message: "", urgent: false });
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open email client. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCategories = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "billing", label: "Billing & Refunds" },
    { value: "privacy", label: "Privacy & Data Deletion" },
    { value: "expert", label: "Expert Application" },
    { value: "report", label: "Report Content/User" },
    { value: "partnership", label: "Business Partnership" },
    { value: "media", label: "Media & Press" }
  ];

  return (
    <div className="min-h-screen bg-gold/10 dark:bg-gray-900">
      <SEOHead
        title="Contact PlantRx - Support & Customer Service"
        description="Get in touch with PlantRx support team for help with natural remedies, expert consultations, billing questions, or technical issues. We're here to help you on your natural health journey."
        keywords="PlantRx contact, customer support, natural health help, remedy questions, technical support, billing help, expert consultation"
        canonical="https://plantrxapp.com/contact"
      />
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <BackButton />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <motion.div
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-green/10 dark:bg-gold/20 text-green dark:text-gold px-4 py-2 rounded-full text-sm font-medium mb-4 border border-green/30 dark:border-gold/40">
              <Leaf className="w-4 h-4" />
              We're Here to Help
            </div>
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            <SplitText text="How Can We Help You?" />
          </h1>
          <motion.div
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the fastest way to get support for your natural health journey.
            </p>
          </motion.div>
        </div>

        {/* Quick Action Cards */}
        <motion.div
          variants={containerVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {/* Email Support Card */}
          <motion.div variants={slideUpVariants as any}>
            <Card className="luxury-glass hover:shadow-lg transition-all duration-300 border border-gold/20 dark:border-gold/10 h-full">
              <CardContent className="sm:!p-8 !p-6 text-center">
                <div className="w-16 h-16 bg-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Send us a detailed message
                </p>
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <Clock className="w-4 h-4" />
                  Response within 24 hours
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Chat Card */}
          <motion.div variants={slideUpVariants as any}>
            <Card className="luxury-glass border-2 border-green dark:border-green relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 h-full"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).Tawk_API) {
                  (window as any).Tawk_API.maximize();
                }
              }}
              data-testid="live-chat-card">
              <div className="absolute top-0 right-0 bg-green text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                Fastest
              </div>
              <CardContent className="sm:!p-8 !p-6  text-center">
                <div className="w-16 h-16 bg-green rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Chat with Remy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Get instant support via live chat
                </p>
                <div className="flex items-center justify-center gap-2 text-green dark:text-green text-sm font-medium">
                  <span className="w-2 h-2 bg-green rounded-full animate-pulse"></span>
                  Available Now
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ask Remy AI Card */}
          <motion.div variants={slideUpVariants as any}>
            <Card className="luxury-glass hover:shadow-lg transition-all duration-300 cursor-pointer border border-gold/20 dark:border-gold/10 h-full"
              onClick={() => window.location.href = '/symptom-finder'}
              data-testid="ask-remy-card">
              <CardContent className="sm:!p-8 !p-6  text-center">
                <div className="w-16 h-16 bg-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ask Remy AI</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Get health advice from our AI expert
                </p>
                <div className="flex items-center justify-center gap-2 text-gold dark:text-gold text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  24/7 AI Assistant
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div variants={containerVariants as any}
initial="hidden"
whileInView="visible"
viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Sidebar */}
          <motion.div variants={slideUpVariants as any} className="space-y-6">
            {/* Email Addresses */}
            <Card className="luxury-glass border border-gold/20 dark:border-gold/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="w-5 h-5 text-green" />
                  Email Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green/5 dark:bg-green/10 rounded-lg border border-green/20">
                  <div className="w-8 h-8 bg-green/10 dark:bg-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-4 h-4 text-green" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-white">General Support</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">support@plantrxapp.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gold/5 dark:bg-gold/10 rounded-lg border border-gold/20">
                  <div className="w-8 h-8 bg-gold/10 dark:bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-white">Privacy & GDPR</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">legal@plantrxapp.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green/5 dark:bg-green/10 rounded-lg border border-green/20">
                  <div className="w-8 h-8 bg-green/10 dark:bg-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-green" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-white">Billing & Refunds</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">billing@plantrxapp.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card className="luxury-glass border border-gold/20 dark:border-gold/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-green" />
                  Response Times
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gold/10 dark:border-gold/5">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Live Chat</span>
                  <span className="text-sm font-semibold text-gold">Instant</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gold/10 dark:border-gold/5">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Email Support</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">24 hours</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Urgent Issues</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">2-6 hours</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={slideUpVariants as any} className="lg:col-span-2">
            <Card className="luxury-glass border border-gold/20 dark:border-gold/10">
              <CardHeader>
                <CardTitle className="text-xl">Send us a Message</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Fill out the form below and our team will get back to you promptly.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Full Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        required
                        data-testid="input-name"
                        className="bg-white dark:bg-gray-800 border-gold/30 focus:border-gold focus:ring-gold/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Email Address *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        required
                        data-testid="input-email"
                        className="bg-white dark:bg-gray-800 border-gold/30 focus:border-gold focus:ring-gold/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Category *</label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger data-testid="select-category" className="bg-white dark:bg-gray-800 border-gold/30 focus:border-gold focus:ring-gold/20">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Subject *</label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief description"
                        required
                        data-testid="input-subject"
                        className="bg-white dark:bg-gray-800 border-gold/30 focus:border-gold focus:ring-gold/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Message *</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your inquiry in detail..."
                      rows={5}
                      required
                      data-testid="textarea-message"
                      className="bg-white dark:bg-gray-800 border-gold/30 focus:border-green focus:ring-green/20"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="urgent"
                      checked={formData.urgent}
                      onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                      className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/20"
                      data-testid="checkbox-urgent"
                    />
                    <label htmlFor="urgent" className="text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <AlertTriangle className="w-4 h-4 text-gold" />
                      Mark as urgent (requires immediate attention)
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] text-white py-3 text-base font-medium hover:shadow-lg transition-all duration-300"
                    data-testid="button-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    <Shield className="w-3 h-3 inline mr-1" />
                    Your information is protected by our privacy policy and GDPR compliant.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Emergency Notice */}
            <div className="mt-6 bg-green/10 dark:bg-red-900/20 border border-green/20 dark:border-red-700 rounded-xl p-5 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">

                {/* Icon */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green/20 dark:bg-red-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-green" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold text-green dark:text-red-200 text-base sm:text-lg leading-snug mb-1">
                    Medical Emergency?
                  </h3>

                  <p className="text-xs sm:text-sm text-green dark:text-red-300 leading-relaxed">
                    Don’t use this form for emergencies. Call your local emergency services immediately:
                    <span className="block sm:inline font-semibold mt-1 sm:mt-0">
                      911 (US) • 999 (UK) • 112 (EU)
                    </span>
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <div className="mt-16">
          <FadeInSection className="text-center mb-8">
            <motion.div
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                <SplitText text="Frequently Asked Questions" />
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Quick answers to common questions</p>
            </motion.div>
          </FadeInSection>

          <motion.div
            variants={containerVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6"
          >
            {[
              {
                q: "How do I get instant support?",
                a: "Click the chat bubble in the bottom-right corner of any page to start a live chat with Remy. It's the fastest way to get help with any questions or issues."
              },
              {
                q: "How quickly will I receive an email response?",
                a: "We typically respond to emails within 24 hours on business days. Urgent matters are prioritized and addressed within 2-6 hours."
              },
              {
                q: "Can I request a refund?",
                a: "Yes! Contact billing@plantrxapp.com for refund requests. We offer a satisfaction guarantee and process refunds within 5-7 business days."
              },
              {
                q: "How do I delete my data?",
                a: "For GDPR data deletion requests, select \"Privacy & Data Deletion\" in the form above or email legal@plantrxapp.com. We process requests within 30 days."
              },
              {
                q: "Can I suggest a new remedy?",
                a: "Absolutely! We love community suggestions. Use the contact form with \"General Inquiry\" to share remedy ideas or feature requests."
              },
              {
                q: "How can I speak with a health expert?",
                a: "Use our \"Ask Remy\" AI feature for 24/7 health guidance, or select \"Expert Application\" in the form to inquire about premium expert consultations."
              }
            ].map((faq, i) => (
              <motion.div key={i} variants={slideUpVariants as any}>
                <Card className="luxury-glass h-full bg-gold/20 border border-gold/20 dark:border-gold/10 hover:border-gold/50 hover:shadow-md transition-all duration-300">

                  <CardContent className="!pt-5 sm:!pt-6 !px-5 sm:!px-6 !b-5 sm:!pb-6">

                    {/* Question */}
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-xl leading-snug mb-2 sm:mb-3">
                      {faq.q}
                    </h3>

                    {/* Answer */}
                    <p className="text-xs sm:text-sm lg:text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.a}
                    </p>

                  </CardContent>

                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <FadeInSection className="mt-16 mb-8 text-center">
          <motion.div
            variants={slideUpVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              className="inline-flex items-center gap-2 bg-[linear-gradient(to_right,#385127_0%,#c2a058_51%,#385127_100%)] bg-[length:200%_auto] text-white px-6 py-3 rounded-full cursor-pointer hover:shadow-lg transition-all"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).Tawk_API) {
                  (window as any).Tawk_API.maximize();
                }
              }}
              data-testid="bottom-chat-cta"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Still have questions? Chat with us now</span>
            </div>
          </motion.div>
        </FadeInSection>
      </div>
    </div>
  );
}