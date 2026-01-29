import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import RevealText from '@/utils/RevealText';

const LiquidMorphSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const pathInitial = "M -44,-50 C -52.71,28.52 15.86,8.186 184,14.69 383.3,22.39 462.5,12.58 638,14 835.5,15.6 987,6.4 1194,13.86 1661,30.68 1652,-36.74 1582,-140.1 1512,-243.5 15.88,-589.5 -44,-50 Z";
  const pathTarget = "M -120,-50 C -44,50 100,200 336,200 500,200 500,120 676,120 850,120 1000,250 1154,250 1400,250 1600,100 1582,-50 1500,-200 200,-200 -44,-50 Z";

  const pathMorph = useTransform(scrollYProgress, [0, 0.2], [pathInitial, pathTarget]);
  const fillOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const dropY = useTransform(scrollYProgress, [0, 0.2], ["-20%", "0%"]);

  const content1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1, 0]);
  const content2Opacity = useTransform(scrollYProgress, [0.24, 0.3, 0.42, 0.45], [0, 1, 1, 0]);

  const bottleOpacity = useTransform(scrollYProgress, [0.45, 0.5], [0, 1]);
  const bottleYTransform = useTransform(scrollYProgress, [0.45, 0.5], ["200px", "0px"]);
  const bottleY = useSpring(bottleYTransform, { stiffness: 100, damping: 20 });

  const rawX = useTransform(scrollYProgress, [0.5, 0.54, 0.57, 0.6], [0, 550, 300, 0]);
  const rawY = useTransform(scrollYProgress, [0.5, 0.56, 0.58, 0.6], [600, -180, -320, -185]);
  const rawZ = useTransform(scrollYProgress, [0.5, 0.55, 0.6], [0, 500, 0]);
  const rawScale = useTransform(scrollYProgress, [0.5, 0.55, 0.6], [1.6, 2, 1]);
  const rawRotate = useTransform(scrollYProgress, [0.5, 0.56, 0.6], [90, 15, 0]);

  const springConfig = { stiffness: 60, damping: 25, mass: 1, restDelta: 0.001 };
  const lidX = useSpring(rawX, springConfig);
  const lidY = useSpring(rawY, springConfig);
  const lidZ = useSpring(rawZ, springConfig);
  const lidScale = useSpring(rawScale, springConfig);
  const lidRotate = useSpring(rawRotate, springConfig);

  const benefits = [
    { title: "Deep Hydration", desc: "Locks in moisture for 24 hours." },
    { title: "Pure Botanicals", desc: "100% organic, cold-pressed oils." },
    { title: "Radiant Glow", desc: "Instantly brightens and evens tone." },
    { title: "Anti-Pollution", desc: "Protects against daily environmental stressors." }
  ];

  const card1Y = useTransform(scrollYProgress, [0.65, 0.72], ["100vh", "0px"]);
  const card2Y = useTransform(scrollYProgress, [0.75, 0.82], ["100vh", "40px"]);
  const card3Y = useTransform(scrollYProgress, [0.85, 0.92], ["100vh", "80px"]);
  const card4Y = useTransform(scrollYProgress, [0.93, 0.98], ["100vh", "120px"]);

  const cardOpacities = [
    useTransform(scrollYProgress, [0.65, 0.68], [0, 1]),
    useTransform(scrollYProgress, [0.75, 0.78], [0, 1]),
    useTransform(scrollYProgress, [0.85, 0.88], [0, 1]),
    useTransform(scrollYProgress, [0.93, 0.95], [0, 1]),
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-green h-[1400vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.svg
            style={{ y: dropY }}
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 800"
          >
            <motion.path d={pathMorph} fill="#fff" style={{ fillOpacity }} />
          </motion.svg>
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="container relative w-full h-full flex items-center justify-start px-10">
            
            <motion.div style={{ opacity: content1Opacity }} className="absolute text-left max-w-[700px]">
              <RevealText tag='h2' className='text-white text-4xl md:text-5xl font-serif leading-tight'>
                A quiet ritual of calm—pure botanicals, deep nourishment, radiant skin.
              </RevealText>
            </motion.div>

            <motion.div style={{ opacity: content2Opacity }} className="absolute text-left">
              <h2 className="text-white text-6xl font-bold mb-4">Ingredients</h2>
              <p className="text-white max-w-2xl text-lg uppercase tracking-widest leading-relaxed">
                Simmondsia Chinensis, Squalane, Magnolia Officinalis, Bisabolol, Opuntia Ficus-Indica.
              </p>
            </motion.div>

            <motion.div
              style={{
                opacity: bottleOpacity,
                y: bottleY,
                perspective: 1200
              }}
              className="absolute w-full flex items-start justify-start top-[40%]"
            >
              <div className="relative">
                <img
                  src='/oil-bottle-2.png'
                  className='w-full h-auto object-contain max-w-[250px]'
                  alt="Bottle"
                />
                <motion.img
                  src='/oil-lid-new.png'
                  style={{
                    x: lidX,
                    y: lidY,
                    z: lidZ,
                    scale: lidScale,
                    rotate: lidRotate,
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center"
                  }}
                  className='absolute top-[55px] object-contain max-w-[400px] pointer-events-none'
                  alt="Dropper"
                />
              </div>
            </motion.div>

            <div className="absolute right-10 top-[20%] w-[350px] flex flex-col items-center h-full">
                {benefits.map((benefit, index) => {
                    const yPos = [card1Y, card2Y, card3Y, card4Y][index];
                    return (
                        <motion.div
                            key={index}
                            style={{ 
                                y: yPos, 
                                opacity: cardOpacities[index],
                                zIndex: 30 + index 
                            }}
                            className="absolute w-full p-8 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-2"
                        >
                            <h3 className="text-green text-2xl font-bold">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.desc}</p>
                        </motion.div>
                    );
                })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LiquidMorphSection;