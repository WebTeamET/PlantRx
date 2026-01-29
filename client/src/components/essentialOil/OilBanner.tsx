import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LavaCanvas from './LavaCanvas';

const OilBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bottleScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  const text = "JOJOBA FACE OIL";
  const characters = text.split("");

  const liquidVariants = {
    initial: { 
      y: 0, 
      skewX: 0, 
      scaleY: 1,
      filter: "url(#no-distort)" 
    },
    hover: (i: number) => ({
      y: [0, -10, 5, 0],
      skewX: [0, 15, -15, 0],
      scaleY: [1, 1.1, 0.9, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.1, 
      },
    }),
  };

  return (
    <div ref={containerRef} className='relative h-[calc(100dvh-56px)] sm:h-[calc(100dvh-64px)] lg:h-[calc(140dvh-80px)] bg-white'>
      <div className="sticky top-[50%] left-[51%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-30 pointer-events-none w-0 h-0 bg-transparent">
        <motion.img 
          style={{ scale: bottleScale }}
          animate={{ y: [-15, 15] }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "mirror", 
            duration: 3, 
            ease: "easeInOut" 
          }}
          src="/essential-oil-new.png" 
          alt="Essential Oil Bottle" 
          className="object-contain drop-shadow-[0_35px_50px_rgba(0,0,0,0.3)] max-w-[380px] block h-auto mx-auto"
        />
      </div>

      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LavaCanvas />
        </div>

        <div className="relative w-full h-screen flex items-center justify-center select-none z-10"> 
          <motion.h1 
            className="uppercase text-primary font-black text-[8vw] md:text-[150px] leading-none flex whitespace-pre"
            initial="initial"
            whileHover="hover"
          >
            {characters.map((char, i) => {
              const isFront = [4, 10, 13].includes(i);
              
              return (
                <motion.span 
                  key={i} 
                  custom={i}
                  variants={liquidVariants}
                  className="inline-block relative"
                  style={{ 
                    zIndex: isFront ? 30 : 10,
                  }}
                >
                  <span className="hover:filter-[url(#liquid-wave)] transition-all duration-300">
                    {char === " " ? "\u00A0" : char}
                  </span>
                </motion.span>
              );
            })}
          </motion.h1>
        </div>
      </section>
    </div>
  );
};

export default OilBanner;