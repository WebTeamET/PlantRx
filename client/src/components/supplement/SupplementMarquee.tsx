"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import { ShopifyProduct } from "@/lib/shopify";

const marqueeItems = [
  "MORINGA",
  "WELLNESS",
  "ENERGY",
  "BALANCE",
  "IMMUNITY",
];

interface SupplementMarqueeProps {
  marginTop?: number;
  marginBottom?: number;
  product: ShopifyProduct;
}

export default function SupplementMarquee({ marginTop = 0, marginBottom = 0, product }: SupplementMarqueeProps) {
  const mtClasses = marginTop !== 0
    ? "-mt-[calc(var(--marquee-mt)_-_40px)] sm:-mt-[calc(var(--marquee-mt)_-_20px)] lg:-mt-[var(--marquee-mt)]"
    : "";
  const mbClasses = marginBottom !== 0
    ? "-mb-[calc(var(--marquee-mb)_-_40px)] sm:-mb-[calc(var(--marquee-mb)_-_20px)] lg:-mb-[var(--marquee-mb)]"
    : "";

  const displayItems = marginBottom !== 0
    ? (product.supplementMarquee2 && product.supplementMarquee2.length > 0 ? product.supplementMarquee2 : marqueeItems)
    : (product.supplementMarquee1 && product.supplementMarquee1.length > 0 ? product.supplementMarquee1 : (product.marquee && product.marquee.length > 0 ? product.marquee : marqueeItems));

  return (
    <section
      className={`relative overflow-hidden w-full supplement-marquee-section z-[1] ${mtClasses} ${mbClasses}`}
      style={{ "--marquee-mt": `${marginTop}px`, "--marquee-mb": `${marginBottom}px` } as React.CSSProperties}
    >
      <div className="relative w-full max-sm:aspect-[1920/460]">
        <svg
          viewBox="0 0 1927 273"
          className="w-full h-full block"
          preserveAspectRatio="none"
        >
          <path
            d="M1925.5 90.5479V271.431L1.5 184.623V1.57031L1925.5 90.5479Z"
            fill="#C2A058"
            stroke="black"
            strokeWidth="3"
          />
        </svg>

        <div className="absolute inset-0 flex items-center">
          <Marquee
            speed={70}
            gradient={false}
            direction="left"
          >
            {displayItems.map((item, i) => (
              <div key={i} className="flex items-center">
                <span className="text-white font-heading font-medium select-none text-[clamp(20px,3.77vw,72px)] leading-[100%] px-3">
                  &nbsp;•&nbsp;
                </span>
                <span className="text-white font-heading font-medium uppercase text-[clamp(20px,3.77vw,72px)] leading-[100%]">
                  {item}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
