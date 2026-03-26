"use client";
import { slideUpVariants } from "@/animation/framerMotionVariants";
import { SplitText } from "@/utils/SplitText";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cards = [
  { image: "/why-use-card-1.jpg", text: "Supports general nutritional balance", textPosition: "bottom" as const },
  { image: "/why-use-card-2.jpg", text: "Provides natural plant-based nutrients", textPosition: "top" as const },
  { image: "/why-use-card-3.jpg", text: "Contains naturally occurring antioxidants", textPosition: "bottom" as const },
  { image: "/why-use-card-4.jpg", text: "Supports overall wellbeing and vitality", textPosition: "top" as const },
  { image: "/why-use-card-5.jpg", text: "Easy capsule format for daily use", textPosition: "bottom" as const },
];

function WhyUseCard({ card, index, isInView }: { card: (typeof cards)[0]; index: number; isInView: boolean }) {
  const isShifted = index % 2 !== 0;
  const isTextTop = card.textPosition === "top";
  const flipFrom = index % 2 === 0 ? -90 : 90;
  const delay = index * 0.5;

  return (
    <div
      className={`flex-1 min-w-0 ${isShifted ? "md:mt-[clamp(40px,5.83vw,98px)]" : ""}`}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        initial={{ rotateY: flipFrom, opacity: 0 }}
        animate={isInView ? { rotateY: 0, opacity: 1 } : { rotateY: flipFrom, opacity: 0 }}
        transition={{
          rotateY: { duration: 0.8, delay, ease: [0.22, 0.61, 0.36, 1] },
          opacity: { duration: 0.8, delay, ease: "easeOut" },
        }}
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transformOrigin: index % 2 === 0 ? "left center" : "right center",
        }}
        className={`flex flex-col max-md:gap-3 ${isShifted ? "max-md:flex-col-reverse" : ""}`}
      >
        {isTextTop && (
          <div className="content content-white md:mb-[clamp(8px,2.6vw,20px)] lg:max-w-[220px]">
            <p className="font-bold 2xl:text-xl 2xl:leading-7.5 xl:text-lg xl:leading-6 text-base leading-5 capitalize">
              {card.text}
            </p>
          </div>
        )}

        <div className="overflow-hidden rounded-[20px] border-4 border-black w-full aspect-[320/311]">
          <img
            src={card.image}
            width={320}
            height={311}
            alt={card.text}
            className="w-full h-full object-cover"
          />
        </div>

        {!isTextTop && (
          <div className="content content-white md:mt-[clamp(8px,2.6vw,20px)] lg:max-w-[230px]">
            <p className="font-bold 2xl:text-xl 2xl:leading-7.5 xl:text-lg xl:leading-6 text-base leading-5 capitalize">
              {card.text}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function SupplementWhyUse() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardsRef, { once: true, amount: 0.3 });

  return (
    <section
      className="relative w-full overflow-hidden bg-green -mt-0.5"
      style={{
        backgroundImage: "url('/why-use-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 w-full new-container pt-[clamp(48px,5.36vw,103px)] pb-[clamp(96px,12vw,180px)]">
        <div className="flex justify-between lg:items-end max-lg:flex-col items-start mb-[clamp(40px,7.8vw,150px)] gap-5">
          <div
            className="title title-stroke"
          >
            <h2
              className="tracking-wide supplement-pdp-heading"
            style={{ WebkitTextStroke: "clamp(2px, 0.7vw, 14px) #FFFFFF", color: "#000" }}
            >
              <SplitText text="Why" />
              <br />
              <SplitText text="People Use" />
            </h2>
          </div>

          <div className="content content-white lg:ml-auto lg:max-w-[397px]">
            <motion.p
             variants={slideUpVariants as any}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
             style={{ willChange: "transform, opacity" }}
            className="font-normal xl:text-xl xl:leading-10 capitalize">
              Moringa leaves contain naturally occurring vitamins, minerals, and
              antioxidants that support daily wellness.
            </motion.p>
          </div>
        </div>
        <div ref={cardsRef} className="flex items-start max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-5 max-md:gap-[30px]">
          {cards.map((card, i) => (
            <WhyUseCard
              key={i}
              card={card}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
