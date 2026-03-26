"use client";
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

function WhyUseCard({ card, index }: { card: (typeof cards)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isShifted = index % 2 !== 0;
  const isTextTop = card.textPosition === "top";
  const flipFrom = index % 2 === 0 ? -90 : 90;

  return (
    <div
      ref={ref}
      className={`flex-1 min-w-0 ${isShifted ? "md:mt-[clamp(40px,5.83vw,98px)]" : ""}`}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        initial={{ rotateY: flipFrom, opacity: 0, transformOrigin: index % 2 === 0 ? "left center" : "right center" }}
        animate={isInView ? { rotateY: 0, opacity: 1 } : { rotateY: flipFrom, opacity: 0 }}
        transition={{
          rotateY: { duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
          opacity: { duration: 0.4, delay: index * 0.12 },
        }}
        style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        className={`flex flex-col max-md:gap-3 ${isShifted ? "max-md:flex-col-reverse" : ""}`}
      >
        {isTextTop && (
          <div className="content content-white md:mb-[clamp(8px,2.6vw,20px)]">
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
          <div className="content content-white md:mt-[clamp(8px,2.6vw,20px)]">
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
  return (
    <section
      className="relative w-full overflow-hidden bg-green"
      style={{
        backgroundImage: "url('/why-use-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 w-full new-container pt-[clamp(48px,5.36vw,103px)] pb-[clamp(60px,12vw,180px)]">
        <div className="flex justify-between lg:items-end max-lg:flex-col items-start mb-[clamp(40px,7.8vw,150px)] gap-5">
          <div
            className="title title-stroke"
          >
            <h2
              className="font-heading font-semibold capitalize! leading-[clamp(34px,6.3vw,140px)] text-[clamp(32px,5vw,120px)]"
            style={{ WebkitTextStroke: "clamp(2px, 0.7vw, 14px) #FFFFFF", color: "#000" }}
            >
              <SplitText text="Why" />
              <br />
              <SplitText text="People Use" />
            </h2>
          </div>

          <div className="content content-white lg:ml-auto lg:max-w-[397px]">
            <p className="font-normal xl:text-xl xl:leading-10">
              Moringa leaves contain naturally occurring vitamins, minerals, and
              antioxidants that support daily wellness.
            </p>
          </div>
        </div>
        <div className="flex items-start max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-5 max-md:gap-[30px]">
          {cards.map((card, i) => (
            <WhyUseCard
              key={i}
              card={card}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
