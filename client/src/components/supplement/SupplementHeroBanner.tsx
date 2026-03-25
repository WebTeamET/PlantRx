"use client";
import { motion } from "framer-motion";

export default function SupplementHeroBanner() {
  const titleVars = {
    initial: {
      opacity: 0,
      filter: "blur(10px)",
      transform: "translate3d(0, 20px, 0)",
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      transform: "translate3d(0, 0, 0)",
      transition: { duration: 0.9, ease: [0.33, 1, 0.68, 1] },
    },
  };

  const imageVars = {
    initial: {
      opacity: 0,
      transform: "translate3d(0, 50px, 0)",
    },
    animate: {
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
      transition: { duration: 1.2, delay: 0.35, ease: [0.33, 1, 0.68, 1] },
    },
  };

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
      <div className="flex flex-col items-center pt-10 md:pt-20 xl:pt-[155px] 2xl:pb-[61px] h-full justify-between gap-5">
      <div
        className="whitespace-nowrap text-center"
      >
        <div className="title title-green title-stroke">
          <motion.h1
            className="font-heading font-semibold capitalize leading-none text-[clamp(32px,6.25vw,120px)]"
            style={{ WebkitTextStroke: "clamp(2px, 1vw, 14px) #FFFFFF", color: "#385127" }}
            variants={titleVars}
            initial="initial"
            animate="animate"
          >
            Moringa Pure Capsules
          </motion.h1>
        </div>
      </div>
      <motion.div
        className="z-10"
        variants={imageVars}
        initial="initial"
        animate="animate"
      >
        <img
          src="/moringa-sup-hero-hands.png"
          width={935}
          height={623}
          alt="Hands holding Moringa Pure Capsules supplement bottle"
          className="w-full h-auto object-contain md:max-w-[61%] max-w-[90%] mx-auto"
        />
      </motion.div>
      </div>



      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none z-20"
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
