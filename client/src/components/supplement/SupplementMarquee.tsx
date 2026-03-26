"use client";
import Marquee from "react-fast-marquee";

const marqueeItems = [
  "MORINGA",
  "WELLNESS",
  "ENERGY",
  "BALANCE",
  "IMMUNITY",
];

export default function SupplementMarquee() {
  return (
    <section className="relative overflow-hidden w-full">
      <div className="bg-gold">
        <Marquee
          speed={70}
          gradient={false}
          direction="left"
        >
          {marqueeItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center"
            >
              <span className="text-white font-heading font-medium select-none text-[clamp(20px,3.77vw,72px)] leading-[1.35] px-[clamp(10px,1.56vw,30px)]">
                &nbsp;•&nbsp;
              </span>
              <span className="text-white font-heading font-medium uppercase text-[clamp(20px,3.77vw,72px)] leading-[1.35]">
                {item}
              </span>
            </div>
          ))}
        </Marquee>
      </div>

    </section>
  );
}
