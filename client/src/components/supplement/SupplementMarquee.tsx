"use client";
import Marquee from "react-fast-marquee";

/*
  Figma: node 1:206 — 1920 × 273px frame
  Background: #C2A058 (gold), border: 3px solid #000000
  Text: FONTSPRING DEMO - Recoleta Alt Medium, font-weight: 500
  font-size: 72.3798px, line-height: 98px, color: #FFFFFF
  Rotation: +2.61deg clockwise
  Vertical padding: (273 - 73.62) / 2 ≈ 99.69px → 5.19vw at 1920px
*/

const marqueeItems = [
  "MORINGA",
  "WELLNESS",
  "ENERGY",
  "BALANCE",
  "IMMUNITY",
];

export default function SupplementMarquee() {
  return (
    /*
      Outer section: overflow-hidden clips the rotated band's corners.
      Negative vertical margin makes the tilted band overlap adjacent sections.
    */
    <section className="relative overflow-hidden w-full -my-[clamp(10px,2.2vw,42px)]">

      {/*
        Rotated band:
          - rotate-[2.61deg] matches the exact Figma rotation
          - w-[110%] -ml-[5%] extends past both edges so corners stay filled
          - border-[3px] border-black matches Rectangle 81 border spec
          - py: frame h=273px, text h≈73.62px → (273-73.62)/2 ≈ 99.69px = 5.19vw
      */}
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
              {/* Space + bullet + space separator — matches Figma spacing pattern */}
              <span className="text-white font-heading font-medium select-none text-[clamp(20px,3.77vw,72px)] leading-[1.35] px-[clamp(10px,1.56vw,30px)]">
                &nbsp;•&nbsp;
              </span>

              {/* Item text — font-size: 72.3798px, line-height: 98px at 1920px */}
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
