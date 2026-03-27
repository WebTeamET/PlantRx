"use client";
import { getMetafieldImage } from "@/lib/shopify";
import { ShopifyProduct } from "@/lib/shopify";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";


// ─── Props ────────────────────────────────────────────────────────────────────

interface StripIngredientsProps {
    product?: ShopifyProduct;
    children?: ReactNode;
}
// ─── Component ────────────────────────────────────────────────────────────────

export default function StripIngredients({ product, children }: StripIngredientsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = previousOverflow;
        }
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isModalOpen]);
    return (
        <>
            <section
                className="block w-full relative"
            >
                <div className="new-container py-[50px] lg:pt-[180px] lg:pb-[30px]">
                    <div className="flex flex-wrap items-start justify-center gap-10 2xl:gap-[84px] w-full">
                        <div className="w-full lg:max-w-[600px]">
                            <div className="title mb-[20px] lg:mb-[40px]">
                                <h2
                                    className="pdp-title-style text-black dark:text-black font-semibold capitalize lg:max-w-[500px]"
                                    style={{
                                        textShadow: `
                                        0 6px 0 #fff,  0 -6px 0 #fff,
                                        6px 0 0 #fff,  -6px 0 0 #fff,
                                        4px 4px 0 #fff, -4px 4px 0 #fff,
                                        4px -4px 0 #fff,-4px -4px 0 #fff,
                                        5px 2px 0 #fff,-5px 2px 0 #fff,
                                        5px -2px 0 #fff,-5px -2px 0 #fff,
                                        2px 5px 0 #fff,-2px 5px 0 #fff,
                                        2px -5px 0 #fff,-2px -5px 0 #fff
                                    `,
                                    }}
                                >
                                    Key Ingredients
                                </h2>
                            </div>
                            <div className="content">
                                <p className="lg:text-[20px] font-normal text-black dark:text-black leading-[1.5] lg:leading-[40px] capitalize">
                                    Stay sharp and centered with Mushroom Focus Strips, a convenient and flavorful way to support your mental clarity and overall wellness. These smooth, chocolate-flavored oral strips dissolve on your tongue, delivering a curated blend of functional mushroom extracts traditionally valued for their role in promoting normal cognitive function and daily vitality.
                                </p>
                            </div>
                        </div>
                        <div className="w-full lg:flex-1">
                            <div className="relative">
                                <div className="animate-spin-slow absolute -top-[33px] -left-[36px] w-[97px] h-[92px]">
                                    <img src="/mushroom-small.png" alt="key-ingredients" width={97} height={92} className="w-full h-auto object-cover" />
                                </div>
                                <img src="/key-ingredients.png" alt="key-ingredients" width={982} height={652} className="w-full h-auto object-cover" />
                            </div>
                            <div className="flex justify-center mt-[20px] lg:mt-[48px] w-full">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(true)}
                                    className="uppercase font-heading font-semibold text-[#6B3A3A] dark:text-[#6B3A3A] text-[clamp(18px,2.08vw,30px)] leading-none underline decoration-[#6B3A3A] underline-offset-[5px] px-5 py-3 transition-transform duration-200 hover:text-black hover:decoration-black"
                                >
                                    Full Ingredient List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {createPortal(
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        key="ingredients-modal"
                        className="fixed top-0 left-0 w-screen h-dvh z-[9999] flex items-center justify-center px-4 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-[#F7EFE6]/20 backdrop-blur-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }}
                            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeIn" } }}
                            onClick={() => setIsModalOpen(false)}
                            aria-hidden="true"
                        />
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, scale: 0.75 },
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
                                },
                                exit: {
                                    opacity: 0,
                                    scale: 0.75,
                                    transition: { duration: 0.5, ease: "easeOut" },
                                },
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative p-5 md:px-[25px] md:py-[50px] lg:p-[50px] z-10 w-full max-w-[1284px] max-h-[90dvh] overflow-y-auto bg-[#F7EFE6] border-[5px] border-[#643A3D] rounded-[20px]"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Full ingredient list"
                        >
                            <div className="absolute md:top-[30px] md:right-[30px] right-5 top-5">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="block transition hover:rotate-180 duration-300 min-w-fit min-h-fit"
                                    aria-label="Close"
                                >
                                    <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-md:size-4">
                                        <path d="M17.1745 20.0025L0.586526 3.41853C0.400574 3.23257 0.25307 3.01182 0.152433 2.76886C0.051797 2.5259 1.95932e-09 2.2655 0 2.00253C-1.95932e-09 1.73955 0.051797 1.47915 0.152433 1.23619C0.25307 0.993235 0.400574 0.772478 0.586526 0.586526C0.772478 0.400574 0.993235 0.25307 1.23619 0.152433C1.47915 0.051797 1.73955 -1.95932e-09 2.00253 0C2.2655 1.95932e-09 2.5259 0.051797 2.76886 0.152433C3.01182 0.25307 3.23257 0.400574 3.41853 0.586526L20.0025 17.1745L36.5865 0.586526C36.9621 0.210979 37.4714 0 38.0025 0C38.5336 0 39.043 0.210979 39.4185 0.586526C39.7941 0.962072 40.0051 1.47142 40.0051 2.00253C40.0051 2.53363 39.7941 3.04298 39.4185 3.41853L22.8305 20.0025L39.4185 36.5865C39.7941 36.9621 40.0051 37.4714 40.0051 38.0025C40.0051 38.5336 39.7941 39.043 39.4185 39.4185C39.043 39.7941 38.5336 40.0051 38.0025 40.0051C37.4714 40.0051 36.9621 39.7941 36.5865 39.4185L20.0025 22.8305L3.41853 39.4185C3.04298 39.7941 2.53363 40.0051 2.00253 40.0051C1.47142 40.0051 0.962072 39.7941 0.586526 39.4185C0.210979 39.043 0 38.5336 0 38.0025C0 37.4714 0.210979 36.9621 0.586526 36.5865L17.1745 20.0025Z" fill="black" />
                                    </svg>
                                </button>
                            </div>
                            <div className="block xl:mb-[40px] mb-7">
                                <h2
                                    className="pdp-title-style font-normal text-black dark:text-black"
                                    style={{
                                        textShadow: `
                                        0 6px 0 #fff,  0 -6px 0 #fff,
                                        6px 0 0 #fff,  -6px 0 0 #fff,
                                        4px 4px 0 #fff, -4px 4px 0 #fff,
                                        4px -4px 0 #fff,-4px -4px 0 #fff,
                                        5px 2px 0 #fff,-5px 2px 0 #fff,
                                        5px -2px 0 #fff,-5px -2px 0 #fff,
                                        2px 5px 0 #fff,-2px 5px 0 #fff,
                                        2px -5px 0 #fff,-2px -5px 0 #fff
                                    `,
                                    }}
                                >
                                    Ingredients
                                </h2>

                            </div>
                            <div className="max-h-[70vh] overflow-y-auto text-gray-800 xl:text-2xl 2xl:text-3xl 2xl:leading-[50px] max-w-[1068px]">
                                {children ? (
                                    children
                                ) : (
                                    <>
                                        <ul className="flex flex-col gap-[10px]">
                                            <li className="flex gap-[12px] items-start dark:text-black">
                                                <svg width="22" height="20" className="shrink-0 max-md:size-4 2xl:mt-4 mt-2 max-md:mt-1.5" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.1627 0L22 2.01717L9.69779 20H6.86044L0 10.2575L2.83734 7.57511L8.27911 12.7253L19.1627 0Z" fill="#643A3D" />
                                                </svg>

                                                Hericium Erinaceus (Lion’s Mane) (30 mg),
                                            </li>
                                            <li className="flex gap-[12px] items-start dark:text-black">
                                                <svg width="22" height="20" className="shrink-0 max-md:size-4 2xl:mt-4 mt-2 max-md:mt-1.5" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.1627 0L22 2.01717L9.69779 20H6.86044L0 10.2575L2.83734 7.57511L8.27911 12.7253L19.1627 0Z" fill="#643A3D" />
                                                </svg>

                                                Grifola Frondosa (Maitake) (25 mg),
                                            </li>
                                            <li className="flex gap-[12px] items-start dark:text-black">
                                                <svg width="22" height="20" className="shrink-0 max-md:size-4 2xl:mt-4 mt-2 max-md:mt-1.5" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.1627 0L22 2.01717L9.69779 20H6.86044L0 10.2575L2.83734 7.57511L8.27911 12.7253L19.1627 0Z" fill="#643A3D" />
                                                </svg>

                                                Cordyceps Sinensis (Cordyceps) (25 mg),
                                            </li>
                                            <li className="flex gap-[12px] items-start dark:text-black">
                                                <svg width="22" height="20" className="shrink-0 max-md:size-4 2xl:mt-4 mt-2 max-md:mt-1.5" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.1627 0L22 2.01717L9.69779 20H6.86044L0 10.2575L2.83734 7.57511L8.27911 12.7253L19.1627 0Z" fill="#643A3D" />
                                                </svg>

                                                Lentinus Edodes (Shiitake) (20 mg),
                                            </li>
                                            <li className="flex gap-[12px] items-start dark:text-black">
                                                <svg width="22" height="20" className="shrink-0 max-md:size-4 2xl:mt-4 mt-2 max-md:mt-1.5" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.1627 0L22 2.01717L9.69779 20H6.86044L0 10.2575L2.83734 7.57511L8.27911 12.7253L19.1627 0Z" fill="#643A3D" />
                                                </svg>

                                                Pullulan, Cellulose, Lecithin, Chocolate Flavor, Monk Fruit Extract, Medium-Chain Triglycerides, Xanthan Gum, Steviol Glycosides.
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>,
            document.body
            )}
        </>
    );
}
