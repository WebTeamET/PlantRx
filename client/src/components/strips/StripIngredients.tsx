import { ShopifyProduct, getMetaobjectField } from "@/lib/shopify";
import { slideLeftVariantsFast, slideUpVariants } from "@/animation/framerMotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState, useMemo, JSXElementConstructor, Key, ReactElement, ReactPortal } from "react";
import { createPortal } from "react-dom";



interface StripIngredientsProps {
    product?: ShopifyProduct;
    children?: ReactNode;
}

export default function StripIngredients({ product, children }: StripIngredientsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dynamic description from keyIngredient
    const keyIngredientText = useMemo(() => {
        // Use mapped field from the server
        return product?.keyIngredient?.description || "";
    }, [product]);

    const ingredientsListData = useMemo(() => {
        if (product?.ingredientsTable?.ingredients_table_list) {
            return product.ingredientsTable.ingredients_table_list;
        }
        return product?.keyIngredient?.ingredient_list || product?.ingredients || [];
    }, [product]);

    const supplementIngredients = useMemo(() => {
        if (!ingredientsListData) return [];

        // Handle case where it's an array of objects (metaobjects)
        if (ingredientsListData.length > 0 && typeof ingredientsListData[0] === 'object') {
            return (ingredientsListData as any[]).map((item: any) => {
                const rawName = (item.ingredient_name || item.name || item.title || item.ingredient || item.label || "").trim();
                const rawAmount = (item.amount_per_serving || item.amount || item.value || "").trim();
                const rawDailyValue = (item.daily_value || item.daily_value_value || "").trim();
                
                if (rawName && !rawAmount && /\(\d+\s*mg\)/i.test(rawName)) {
                    const amountMatch = rawName.match(/\((\d+\s*mg)\)\s*$/i);
                    const amount = amountMatch ? amountMatch[1] : "";
                    const name = amountMatch ? rawName.replace(/\s*\(\d+\s*mg\)\s*$/i, "").trim() : rawName;
                    return { name, amount, dailyValue: rawDailyValue };
                }

                return {
                    name: rawName,
                    amount: rawAmount,
                    dailyValue: rawDailyValue
                };
            }).filter(item => item.name); 
        }

        const activeIngredients = ingredientsListData.filter((item: any) =>
            typeof item === "string" && /\(\d+\s*mg\)/i.test(item)
        );
        return activeIngredients.map((item: string) => {
            const amountMatch = item.match(/\((\d+\s*mg)\)\s*$/i);
            const amount = amountMatch ? amountMatch[1] : "";
            const name = amountMatch ? item.replace(/\s*\(\d+\s*mg\)\s*$/i, "").trim() : item;
            return { name, amount };
        });
    }, [ingredientsListData]);

    const footnotes = useMemo(() => {
        if (product?.ingredientsTable?.ingredients_table_text) {
            return Array.isArray(product.ingredientsTable.ingredients_table_text) 
                ? product.ingredientsTable.ingredients_table_text 
                : [product.ingredientsTable.ingredients_table_text];
        }
        return [];
    }, [product]);

    const primaryColor = product?.colors?.primary_color || "#385127";
    const secondaryColor = product?.colors?.secondary_color || "#f5e8e5";

    const spinningImage = product?.ingredientsTable?.spinning_image || product?.keyIngredient?.ingredient_image;
    const sectionImage = product?.ingredientsTable?.section_image || product?.ingredientsTable?.image || product?.keyIngredient?.image;

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

    if (!product) return null;

    return (
        <>
            <section
                className="block w-full relative overflow-hidden"
            >
                <div className="new-container py-[50px] lg:pt-[180px] lg:pb-[30px]">
                    <div className="flex items-start justify-center max-xl:flex-col gap-10 2xl:gap-[84px] w-full">
                        <div className="w-full xl:max-w-[37.4%]">
                            <div className="title mb-[20px] lg:mb-[40px]">
                                <motion.h2
                                    className="pdp-title-style text-black dark:text-black font-semibold capitalize lg:max-w-[500px]"
                                    variants={slideUpVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
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
                                    {product?.keyIngredient?.title || "Key Ingredients"}
                                </motion.h2>
                            </div>
                            <div className="content">
                                <motion.p
                                    className="lg:text-[20px] font-normal text-black dark:text-black leading-[1.5] lg:leading-[40px] capitalize"
                                    variants={slideUpVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                >
                                    {keyIngredientText}
                                </motion.p>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="relative">
                                {spinningImage && (
                                    <div className="animate-spin-slow absolute -top-[33px] -left-[66px] w-[97px] h-[92px] z-30 max-md:hidden">
                                        <img src={spinningImage} alt="key-ingredients" width={97} height={92} className="w-full h-auto object-cover" />
                                    </div>
                                )}

                                <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-0">
                                    <div
                                        className="w-full md:w-[60%] flex-shrink-0 bg-white rounded-[20px] p-3 md:p-5 min-[1900px]:pt-[71px] min-[1900px]:pb-[56px] 2xl:pl-[25px] md:pr-0 relative z-10"
                                        style={{ border: `5px solid ${primaryColor}` }}
                                    >
                                        <div className="min-[1900px]:pr-[236px] pr-[25%] max-xl:pr-[50px] max-md:pr-0">
                                        <h3
                                            className="font-heading text-[24px] lg:text-[35px] md:mb-[14px] mb-2 leading-tight"
                                            style={{ color: primaryColor }}
                                        >
                                            Supplement Facts
                                        </h3>
                                        <div className="flex flex-col gap-[7px] mb-4 text-[14px] xl:text-base 2xl:text-lg text-black dark:text-black capitalize">
                                            <span>
                                                <span className="font-bold">Serving Size</span>:{" "}
                                                {product?.ingredientsTable?.serving_size_value || product?.keyIngredient?.serving_size || ""}
                                            </span>
                                            <span>
                                                <span className="font-bold">Serving Per Container:</span>{" "}
                                                {product?.ingredientsTable?.serving_per_container_value || product?.keyIngredient?.serving_per_container || ""}
                                            </span>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-1 rounded-full md:mb-4 mb-2" style={{ backgroundColor: secondaryColor }} />

                                        {/* Column headers */}
                                        <div className="flex items-end justify-between md:mb-4 mb-2">
                                            <div className="flex-1" />
                                            <div
                                                className="flex gap-5 text-sm font-bold leading-tight text-left capitalize"
                                                style={{ color: primaryColor }}
                                            >
                                                <span className="xl:w-20 w-[90px]">Amount Per <br></br> Serving</span>
                                                <span className="w-[50px]">%Daily Value</span>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-1 rounded-full mb-3" style={{ backgroundColor: secondaryColor }} />

                                        {/* Ingredient rows */}
                                        <div className="flex flex-col gap-2.5">
                                            {supplementIngredients.map((item: any, i: number) => (
                                                <div key={i} className="flex items-start justify-between w-full text-sm lg:text-[14px] text-black dark:text-black">
                                                    <span className="font-medium flex-1 pr-2 capitalize max-[1920px]:xl:max-w-[150px]">{item.name}</span>
                                                    <div className="flex gap-3 text-center flex-shrink-0">
                                                        <span className="font-medium xl:w-[80px] w-[130px] text-center text-black dark:text-black">{item.amount}</span>
                                                        <span className="w-[50px] font-medium  text-sm text-center text-black dark:text-black">
                                                            {item.dailyValue || "†"}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Bottom divider + footnotes */}
                                        <div className="mt-4 flex flex-col gap-2.5">
                                            <div className="h-1 rounded-full" style={{ backgroundColor: secondaryColor }} />
                                            <div
                                                className="flex flex-col gap-1 text-sm font-medium capitalize"
                                                style={{ color: primaryColor }}
                                            >
                                                {footnotes.length > 0 ? (
                                                    footnotes.map((text: string, i: number) => (
                                                        <span key={i}>{text}</span>
                                                    ))
                                                ) : (
                                                    <>
                                                        <span>†Daily value not established.</span>
                                                        <span>**Percent Daily Values are based on a 2,000 calorie diet.</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        </div>
                                    </div>

                                    {/* Product image — first on mobile, right + overlapping on desktop */}
                                    {sectionImage && (
                                        <motion.div
                                            className="order-1 lg:order-2 w-full max-md:max-w-[400px] max-md:mx-auto max-xl:-ml-[50px] -ml-[15%] max-md:m-0 min-[1900px]:-ml-[242px] relative z-20"
                                            variants={slideLeftVariantsFast}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, amount: 0.2 }}
                                        >
                                            <img
                                                src={sectionImage}
                                                alt="key-ingredients"
                                                width={641}
                                                height={634}
                                                className="w-full h-auto object-cover"
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center mt-[20px] lg:mt-[48px] w-full">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(true)}
                                    className="uppercase font-heading font-semibold text-StripPrimary dark:text-StripPrimary text-[clamp(18px,2.08vw,30px)] leading-none underline decoration-StripPrimary underline-offset-[5px] px-5 py-3 transition-transform duration-200 hover:text-black hover:decoration-black"
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
                            className="absolute inset-0  backdrop-blur-2xl"
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
                            className="relative p-5 md:px-[25px] md:py-[50px] lg:p-[50px] z-10 w-full max-w-[1284px] max-h-[90dvh] overflow-y-hidden bg-StripBackground border-[5px] border-StripPrimary rounded-[20px]"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Full ingredient list"
                            style={{
                            "--product-primary-color": product?.colors?.primary_color || "#643A3D",
                            "--product-secondary-color": product?.colors?.secondary_color || "#F0DDCE",
                            "--product-background-color": product?.colors?.background_color || "#F7EFE6",
                        } as React.CSSProperties}
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
                                    {product?.keyIngredient?.ingredient_title || "Ingredients"}
                                </h2>

                            </div>
                            <div className="max-h-[70vh] overflow-y-auto text-gray-800 xl:text-2xl 2xl:text-3xl 2xl:leading-[50px] max-w-[1068px]">
                                {children ? (
                                    children
                                ) : (
                                    <ul className="flex flex-col gap-[10px]">
                                        {ingredientsListData.map((item: any, i: number) => {
                                            const name = typeof item === 'string' ? item : (item.ingredient_name || item.name || item.title || item.ingredient || item.label || "");
                                            const amount = typeof item === 'string' ? "" : (item.amount_per_serving || item.amount || item.value || "");
                                            
                                            // Handle combined format in name field
                                            if (name && !amount && /\(\d+\s*mg\)/i.test(name)) {
                                                return (
                                                    <li key={i} className="flex gap-[12px] items-start dark:text-black">
                                                        <svg width="22" height="20" className="shrink-0 max-md:size-4 2xl:mt-4 mt-2 max-md:mt-1.5 text-StripPrimary" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M19.1627 0L22 2.01717L9.69779 20H6.86044L0 10.2575L2.83734 7.57511L8.27911 12.7253L19.1627 0Z" fill="currentColor" />
                                                        </svg>
                                                        {name}
                                                    </li>
                                                );
                                            }

                                            return (
                                                <li key={i} className="flex gap-[12px] items-start dark:text-black">
                                                    <svg width="22" height="20" className="shrink-0 max-md:size-4 2xl:mt-4 mt-2 max-md:mt-1.5 text-StripPrimary" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M19.1627 0L22 2.01717L9.69779 20H6.86044L0 10.2575L2.83734 7.57511L8.27911 12.7253L19.1627 0Z" fill="currentColor" />
                                                    </svg>
                                                    {name} {amount && `(${amount})`}
                                                </li>
                                            );
                                        })}
                                    </ul>
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
