import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue
} from "framer-motion";
import React, { useRef } from "react";

const slides = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg"
];

// Card dimensions for layout / transforms
const CARD_WIDTH = 320;

function StripHowToUse() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Full "path" of the gallery is tied to the section height
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={sectionRef}
      className="relative z-10"
      style={{ height: "400vh" }} // Use standard vh or dvh
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-neutral-950">
        
        {/* Perspective Container */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1200px", overflow: "visible" }}
        >
          {/* Centered stage; each card positions itself along a 3D arc */}
          <div className="relative w-full h-full">
            {slides.map((src, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
              >
                <RotatingCard
                  index={i}
                  progress={scrollYProgress}
                  total={slides.length}
                  src={src}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StripHowToUse;

type CardProps = {
  index: number;
  total: number;
  progress: MotionValue<number>;
  src: string;
};

function RotatingCard({ index, total, progress, src }: CardProps) {
  // 1. Map the 0-1 scroll progress to the integer index of the cards.
  //    e.g., if we have 4 cards, the value goes from 0 to 3.
  const currentScrollIndex = useTransform(progress, [0, 1], [0, total - 1]);

  // 2. Relative offset of this card from the "active" (center) index
  const offset = useTransform(currentScrollIndex, (v) => index - v);

  // 3. Map offset to a circular arc using polar coordinates
  const angleStep = Math.PI / 6; // 30deg between cards
  const radius = 550; // distance from the viewer / curve radius

  const angle = useTransform(offset, (v) => v * angleStep);
  const x = useTransform(angle, (a) => Math.sin(a) * radius);
  const z = useTransform(angle, (a) => (Math.cos(a) - 1) * radius);

  // 4. Rotate so the card roughly faces the viewer as it comes to center
  const rotateY = useTransform(angle, (a) => (-a * 180) / Math.PI);

  // 5. Scale & opacity based on how far from center the card is
  const scale = useTransform(offset, [-2, -1, 0, 1, 2], [0.7, 0.85, 1, 0.85, 0.7]);
  const opacity = useTransform(offset, [-2, -1, 0, 1, 2], [0.2, 0.5, 1, 0.5, 0.2]);

  // 6. Blur side cards a bit for depth
  const blurValue = useTransform(offset, [-2, -1, 0, 1, 2], [6, 3, 0, 3, 6]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <motion.div
      style={{
        x,
        z,
        rotateY,
        scale,
        opacity,
        filter,
        transformStyle: "preserve-3d",
        width: CARD_WIDTH,
        height: 460
      }}
      className="relative rounded-xl overflow-hidden bg-white shadow-2xl"
    >
      <img
        src={src}
        className="w-full h-full object-cover"
        alt={`Slide ${index}`}
      />
    </motion.div>
  );
}