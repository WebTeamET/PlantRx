"use client";
import { containerVariants, slideLeftVariantsFast, slideRightVariantsFast, slideUpVariants } from "@/animation/framerMotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { ShopifyProduct } from "@/lib/shopify";

// Key ingredients data is now fetched dynamically from product.supplementIngredientsFaq


export default function SupplementIngredients({ product }: { product: ShopifyProduct }) {
  const data = product.supplementIngredientsFaq;
  const ingredients = data?.ingredient_faq_list || [];
  const title = data?.title || product.supplementKeyIngredients?.title || "Key Ingredients";
  const productImage = data?.image || "/key-ingredients.png";
  const [openIndex, setOpenIndex] = useState<number>(0);


  return (
    <>
      <section className="key-ingredients-section relative overflow-hidden -mb-1">
        <div className="bg-green">
          <div
            className="relative z-10 flex flex-col items-center pt-24 md:pt-32 2xl:pt-[189px] pb-9 lg:pb-20 xl:pb-9 gap-10 md:gap-14 xl:gap-20 new-container">
            <div className="title title-black title-stroke text-center">
              <motion.h2
                className="capitalize text-center supplement-pdp-heading"
                variants={slideUpVariants as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-90px' }}
                style={{ WebkitTextStroke: "clamp(2px, 0.7vw, 14px) #FFFFFF", color: "#000", willChange: "transform, opacity" }}
              >
                {title}
              </motion.h2>
            </div>
          </div>
        </div>
      </section>

      <section className="key-ingredients-content-section general-padding">
        <div className="new-container">
          <motion.div
            className="flex flex-col lg:flex-row gap-16 items-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="flex flex-col gap-5 flex-1">
              {ingredients.map((ingredient, index) => (
                <motion.div key={index} variants={slideRightVariantsFast}>
                  <div className="ki-accordion-card p-8 md:p-9">
                    <div className="flex gap-5 items-start">
                      {ingredient.icon && (
                        <img
                          src={ingredient.icon}
                          alt={ingredient.question}
                          width={41}
                          height={41}
                          className="ki-accordion-icon"
                        />
                      )}
                      <div className="flex flex-col gap-5 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <div className="title title-black ki-ingredient-title">
                            <h3>{ingredient.question}</h3>
                          </div>
                          <button
                            type="button"
                            aria-label={
                              openIndex === index
                                ? `Collapse ${ingredient.question}`
                                : `Expand ${ingredient.question}`
                            }
                            className="ki-toggle-btn p-1.5"
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                          >
                            <span className="ki-toggle-icon">
                              {openIndex === index ? "−" : "+"}
                            </span>
                          </button>
                        </div>

                        <AnimatePresence initial={false}>
                          {openIndex === index && (
                            <motion.div
                              key="description"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              style={{ overflow: "hidden", willChange: "height, opacity" }}
                            >
                              <div className="content content-black">
                                <p>{ingredient.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Product Image */}
            <motion.div className="flex-1" variants={slideLeftVariantsFast}>
              <img
                src={productImage}
                alt={title}
                width={928}
                height={768}
                className="ki-product-image"
              />
            </motion.div>

          </motion.div>
        </div>
      </section>
    </>
  );
}
