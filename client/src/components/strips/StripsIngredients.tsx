import { itemBlurLeftVars } from '@/animation/framerMotionVariants'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import React, { useRef } from 'react'

const containerStaggerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, 
      delayChildren: 0.2,
    },
  },
}

const imageUpVars = {
  hidden: { 
    y: 300, 
    opacity: 0 
  },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      duration: 1.5, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
}

const wrapperFadeVars = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

const ingredientsList = [
  "Hericium erinaceus (Lion’s Mane) — 30 mg",
  "Grifola frondosa (Maitake) — 25 mg",
  "Cordyceps sinensis (Cordyceps) — 25 mg",
  "Lentinus edodes (Shiitake) — 20 mg",
  "Pullulan",
  "Cellulose",
  "Lecithin",
  "Chocolate flavor",
  "Monk fruit extract",
  "Medium-chain triglycerides (MCT)",
  "Xanthan gum",
  "Steviol glycosides"
]

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const blur = useTransform(progress, range, [8, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  return (
    <motion.span 
      style={{ filter }} 
      className="inline-block mr-[4px]"
    >
      {children}
    </motion.span>
  )
}

const ListItem = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const words = children.split(" ");
  const amount = range[1] - range[0];
  const step = amount / (words.length + 1);

  return (
    <li className="flex items-start">      
      <p className="flex flex-wrap text-lg font-medium">
        {words.map((word, i) => {
          const start = range[0] + (i * step);
          const end = start + (step * 2); 

          return (
            <Word key={i} progress={progress} range={[start, end]}>
              {word}
            </Word>
          )
        })}
      </p>
    </li>
  )
}

const ScrollRevealingList = ({ items, progress }: { items: string[], progress: MotionValue<number> }) => {
  const y = useTransform(progress, [0, 0.9], [800, 0])

  return (
    <motion.ul 
      style={{y}}
      className="text-left list-none space-y-7"
    >
      {items.map((item, i) => {
        const startOffset = 0.25; 
        const endOffset = 1.0;
        
        const rangeDuration = endOffset - startOffset;
        const step = rangeDuration / items.length;
        
        const start = startOffset + (i * step);
        const end = start + step; 
        
        return (
          <ListItem key={i} progress={progress} range={[start, end]}>
            {item}
          </ListItem>
        )
      })}
    </motion.ul>
  )
}

function StripsIngredients() {
  const targetRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  return (
    <section ref={targetRef} className='strips-ingredients-section relative'>
      <div className="relative h-[300vh]">
        <div className="strips-ingre-inner h-full">
          <div className="container sticky top-0 h-dvh flex items-center justify-center overflow-hidden">
            
            <motion.div 
              variants={containerStaggerVars}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.3, once: true }}
              className="flex items-center justify-between gap-5 h-full w-full relative"
            >
              <div className="heading-wrapper text-right -mt-40">
                <motion.h2
                  variants={itemBlurLeftVars as any}
                  className='h1'
                >
                  Ingredients
                </motion.h2>
              </div>

              <motion.div
                variants={imageUpVars}
                className="product-image-wrapper  w-full flex justify-center perspective-[1200px] transform-style-3d absolute bottom-0"
              >
                <img 
                  className='product-image h-full w-full object-contain max-w-[500px]' 
                  src='/mushroom-focus-strips-product.png' 
                  alt="Strips Product"
                />
              </motion.div>

              <motion.div 
                variants={wrapperFadeVars} 
                className="ingredients-wrapper"
              >
                <ScrollRevealingList items={ingredientsList} progress={scrollYProgress} />
              </motion.div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StripsIngredients