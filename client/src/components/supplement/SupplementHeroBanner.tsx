"use client";
import { itemScaleUpVariants, slideUpVariants } from "@/animation/framerMotionVariants";
import { motion } from "framer-motion";
import { ShopifyProduct } from "@/lib/shopify";

export default function SupplementHeroBanner({ product }: { product: ShopifyProduct }) {
  const leafVars = {
    initial: { opacity: 0, scale: 0.93 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.1, delay: 0.1 },
    },
  };

  return (
    <section className="relative overflow-hidden w-full bg-gradient-to-b from-[#c2a058] via-[#d4b875] to-white">
      <motion.div
        className="absolute left-0 bottom-0 2xl:bottom-[30px] max-[2000px]:w-[21.9%] w-[15%] pointer-events-none select-none z-0"
        variants={leafVars}
        initial="initial"
        animate="animate"
        aria-hidden="true"
      >
        <img
          src="/moringa-sup-left-leaf.png"
          width={500}
          height={593}
          alt="Moringa leaf branch left decoration"
          className="w-full h-auto"
        />
      </motion.div>
      <motion.div
        className="absolute right-0 top-0 max-[2000px]:w-[21.1%] w-[15%] pointer-events-none select-none z-0"
        variants={leafVars}
        initial="initial"
        animate="animate"
        aria-hidden="true"
      >
        <div>
          <img
            src="/moringa-sup-right-leaf.png"
            width={500}
            height={593}
            alt="Moringa leaf branch right decoration"
            className="w-full h-auto"
          />
        </div>
      </motion.div>
      <img
        className="absolute pointer-events-none select-none z-0 w-[1.3%] max-w-[18px] opacity-70"
        style={{ top: "7.45%", left: "9.74%" }}
        src="/moringa-sup-hero-star.svg"
        width={18}
        height={18}
        alt="Decorative leaf element"
        aria-hidden="true"
      />
      <img
        className="absolute pointer-events-none select-none z-0 w-[1.3%] max-w-[18px] opacity-70 rotate-[-51.9deg]"
        style={{ top: "6.71%", left: "83.46%" }}
        src="/moringa-sup-hero-star.svg"
        width={18}
        height={18}
        alt="Decorative star element"
        aria-hidden="true"
      />

      <img
        className="absolute pointer-events-none select-none z-0 w-[1.3%] max-w-[18px] opacity-70"
        style={{ top: "40%", left: "13.7%" }}
        src="/moringa-sup-hero-star.svg"
        width={18}
        height={18}
        alt="Decorative dot element"
        aria-hidden="true"
      />

      <img
        className="absolute pointer-events-none select-none z-0 w-[1.3%] max-w-[18px] opacity-70 rotate-[-51.9deg]"
        style={{ top: "54.64%", left: "78.23%" }}
        src="/moringa-sup-hero-star.svg"
        width={18}
        height={18}
        alt="Decorative star element"
        aria-hidden="true"
      />

      <img
        className="absolute pointer-events-none select-none z-0 w-[1.3%] max-w-[18px] opacity-70 rotate-[-51.9deg]"
        style={{ top: "77.66%", left: "27.24%" }}
        src="/moringa-sup-hero-star.svg"
        width={18}
        height={18}
        alt="Decorative star element"
        aria-hidden="true"
      />
      <div className="flex flex-col items-center pt-10 md:pt-20 xl:pt-[155px] 2xl:pb-[61px] h-full justify-between gap-5 new-container">
        <div
          className="text-center"
        >
          <div className="title title-green title-stroke">
            <motion.h1
              className="font-heading font-semibold capitalize supplement-pdp-heading"
              variants={slideUpVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{ WebkitTextStroke: "clamp(2px, 0.7vw, 14px) #FFFFFF", color: "#385127", willChange: "transform, opacity" }}
            >
              {product.title}
            </motion.h1>
          </div>
        </div>
        <motion.div
          className="z-10"
          variants={itemScaleUpVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ willChange: "transform, opacity" }}
        >
          <img
            src="/moringa-sup-hero-hands.png"
            width={935}
            height={623}
            alt={`Hands holding ${product.title} supplement bottle`}
            className="w-full h-auto object-contain md:max-w-[61%] max-w-[90%] mx-auto"
          />
        </motion.div>
      </div>



      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none z-20 -mb-1"
        aria-hidden="true"
      >
        <img
          src="/supplement-wave-pattern.svg"
          width={1920}
          height={124}
          alt="Decorative green wave"
          className="w-full block"
        />
      </div>

    </section>
  );
}
