import { containerVariants, slideUpVariants } from '@/animation/framerMotionVariants'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import React, { useState, useRef } from 'react'

function SupplementFaqs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const faqs = [
    {
      question: "What makes Mushroom Complex 10 X unique compared to other supplements?",
      answer:
        "Mushroom Complex 10 X combines a blend of 10 medicinal mushrooms in one formula — including trusted species like Reishi, Lion’s Mane, Cordyceps, Chaga, and Turkey Tail — to provide a wide range of nutritional and wellness-supporting compounds in a single capsule. This multi-mushroom approach is designed to support several body systems at once.",
    },
    {
      question: "Can this supplement help with stress or mood support?",
      answer:
        "Many of the mushrooms in the complex (such as Reishi and Lion’s Mane) are considered adaptogenic, meaning they may help the body respond to occasional stress and support balanced mood and cognitive function when taken consistently as a dietary supplement.",
    },
    {
      question: "Is Mushroom Complex 10 X suitable for vegans or people with dietary restrictions?",
      answer:
        "Yes — the product is formulated in vegetable capsules and, according to the label, is free from common allergens like lactose and hormones, and is suitable for vegetarian and vegan-friendly routines.",
    },
    {
      question: "How long does one bottle of Mushroom Complex 10 X last?",
      answer:
        "Each bottle contains 60 capsules, and the recommended serving is two capsules once daily, meaning one bottle provides about 30 days of use when taken as directed.",
    },
    {
      question: "Is Mushroom Complex 10 X safe to take with other supplements or foods?",
      answer:
        "Mushroom Complex 10 X can generally be taken alongside a balanced diet and other vitamins or supplements. However, because it affects immune and metabolic pathways, it’s best to talk with a healthcare professional if you’re on medications, have a medical condition, or are combining many supplements — especially to avoid interactions.",
    },
  ]

  return (
    <section ref={sectionRef} className="pb-[100px] pt-10 relative z-[9999] bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          variants={containerVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center xl:mb-14 mb-10"
        >
          <motion.div
            variants={slideUpVariants as any}
            className="inline-flex items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-green/10 dark:bg-emerald-900/40 text-green dark:text-emerald-200 border-green dark:border-green mb-4 text-sm sm:text-base px-4 sm:px-7 py-2 font-semibold tracking-wide uppercase"
          >
            FAQs
          </motion.div>

          <motion.h2
            variants={slideUpVariants as any}
            className="text-center h1"
          >
            Have <span className="text-gold">questions?</span>
          </motion.h2>
        </motion.div>

        {/* FAQ List */}
        <div
           className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index
            return (
              <motion.div
                className={`rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-green *:text-white'
                    : 'bg-gray-100 *:text-black'
                }`}
              >
                <button 
                  onClick={() =>
                    setActiveIndex(isActive ? null : index)
                  }
                  className="w-full flex items-center justify-between md:px-6 md:py-5 py-3 px-4 text-left gap-2"
                >
                  <p className="text-base lg:text-lg xl:text-xl font-heading">
                    {faq.question}
                  </p>

                  <div
                    className={`shrink-0 md:w-10 md:h-10 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-green'
                        : 'bg-green text-white'
                    }`}
                  >
                    {isActive ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SupplementFaqs