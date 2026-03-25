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
    <section className="relative overflow-hidden w-full -my-[clamp(10px,2.2vw,42px)]">
      <div className="rotate-[2.61deg] bg-[#C2A058] border-[3px] border-solid border-black w-[110%] -ml-[5%] py-[clamp(20px,5.19vw,100px)]">
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
