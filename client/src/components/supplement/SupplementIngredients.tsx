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
            className="relative z-10 flex flex-col items-center pt-24 md:pt-32 2xl:pt-[189px] pb-7 md:pb-10 2xl:pb-[100px] gap-10 md:gap-14 xl:gap-20 new-container">
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
            <div className="key-ingredients-content w-full">
              <motion.div
                className="flex flex-col-reverse lg:flex-row gap-7 lg:gap-10 2xl:gap-16 items-start"
                variants={slideRightVariantsFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="flex flex-col gap-5 flex-1">
                  {ingredients.map((ingredient, index) => (
                    <motion.div key={index} variants={slideRightVariantsFast} layout>
                      <div
                        className="bg-white rounded-xl cursor-pointer transition-all duration-300 p-3 md:p-5 2xl:p-[30px]"
                        onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                      >
                        <div className="flex gap-3 lg:gap-5 items-start">
                          {ingredient.icon && (
                            <img
                              src={ingredient.icon}
                              alt={ingredient.question}
                              width={1000}
                              height={1000}
                              className="ki-accordion-icon object-contain size-[41px] shrink-0"
                            />
                          )}
                          <div className="flex flex-col gap-3 md:gap-5 flex-1">
                            <div className="title title-black">
                              <h3 className="font-semibold font-plusJakarta text-lg md:text-xl 2xl:text-[25px] 2xl:leading-8">{ingredient.question}</h3>
                            </div>
                            <AnimatePresence initial={false}>
                              {openIndex === index && (
                                <motion.div
                                  key="description"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                                    opacity: { duration: 0.3, ease: "easeOut" },
                                  }}
                                  style={{ overflow: "hidden" }}
                                >
                                  <div className="content content-black">
                                    <p className="2xl:text-lg 2xl:leading-[35px] text-base md:leading-7 leading-5">{ingredient.answer}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <button
                            type="button"
                            aria-label={
                              openIndex === index
                                ? `Collapse ${ingredient.question}`
                                : `Expand ${ingredient.question}`
                            }
                            className="md:size-[30px] md:min-h-[30px] md:min-w-[30px] size-5 min-w-5 min-h-5 flex items-center justify-center shrink-0 text-white bg-green lg:rounded-[8px] rounded-[2px] md:rounded-sm"
                          >
                            <span>
                              {openIndex === index ?
                                <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-md:size-2">
                                <path d="M12.1875 0H0.9375C0.419824 0 0 0.419824 0 0.9375V1.875C0 2.39268 0.419824 2.8125 0.9375 2.8125H12.1875C12.7052 2.8125 13.125 2.39268 13.125 1.875V0.9375C13.125 0.419824 12.7052 0 12.1875 0Z" fill="currentColor"/>
                                </svg>                                
                                :
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-md:size-2">
                                  <path d="M12.1875 5.15625H7.96875V0.9375C7.96875 0.419824 7.54893 0 7.03125 0H6.09375C5.57607 0 5.15625 0.419824 5.15625 0.9375V5.15625H0.9375C0.419824 5.15625 0 5.57607 0 6.09375V7.03125C0 7.54893 0.419824 7.96875 0.9375 7.96875H5.15625V12.1875C5.15625 12.7052 5.57607 13.125 6.09375 13.125H7.03125C7.54893 13.125 7.96875 12.7052 7.96875 12.1875V7.96875H12.1875C12.7052 7.96875 13.125 7.54893 13.125 7.03125V6.09375C13.125 5.57607 12.7052 5.15625 12.1875 5.15625Z" fill="currentColor" />
                                </svg>
                              }
                            </span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Right: Product Image */}
                <motion.div className="flex-1 basis-[14%]" variants={slideLeftVariantsFast}>
                  <img
                    src={productImage}
                    alt={title}
                    width={928}
                    height={768}
                    className="ki-product-image rounded-[10px] size-full"
                  />
                </motion.div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
