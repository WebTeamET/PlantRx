import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useIsMediaQuery } from '@/hooks/useIsMediaQuery';

const StripsTrustSignals: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMediaQuery(1024);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001,
  });

  const LID_START_OFFSET = isMobile ? 24 : 40;

  const lidY = useTransform(smoothProgress, [0, 0.25], [LID_START_OFFSET, -600]);
  const lidRotate = useTransform(smoothProgress, [0, 0.25], [0, -20]);
  const lidOpacity = useTransform(smoothProgress, [0.3, 0.4], [1, 0]);

  return (
    <section ref={containerRef} className="product-box relative md:h-[600dvh] h-[400dvh] product-section">
      <div className="product-box sticky lg:pt-52 top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="relative w-[300px] h-[330px] md:w-[500px] md:h-[500px]">
          <div className="absolute top-0 left-0 w-full z-0">
            <img
              src="/Product-fill-box.png"
              alt="Box"
              className="w-full h-auto block"
              style={{ 
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
          </div>

          <motion.div
            style={{ 
              y: lidY, 
              rotate: lidRotate, 
              opacity: lidOpacity, 
              zIndex: 20,
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
            className="absolute top-0 left-0 w-full pointer-events-none"
          >
            <img
              src="/mushroom-strip-box-lid.png"
              alt="Lid"
              className="w-full h-auto block drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StripsTrustSignals; 
