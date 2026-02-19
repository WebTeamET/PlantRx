import React, { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useSpring
} from "framer-motion"

interface Slide {
  title: string
  description: string
  image: string
}

const slides: Slide[] = [
  {
    title: "Open & Take",
    description: "Open the tin and gently take out one oral strip with clean, dry hands.",
    image: "/attached_assets/remedy_images/Classic%20Turmeric%20Golden%20Milk%20Elixir.jpg"
  },
  {
    title: "Place Under Tongue",
    description: "Place the strip on or under your tongue for optimal absorption.",
    image: "/attached_assets/remedy_images/Healing%20Aloe%20Burn%20Recovery%20Gel.jpg"
  },
  {
    title: "Let It Dissolve",
    description: "Allow the strip to fully dissolve—no chewing, no water needed.",
    image: "/attached_assets/remedy_images/Calming%20Lavender%20Stress%20Relief%20Balm.jpg"
  },
  {
    title: "Enjoy the Benefits",
    description: "Experience fast absorption and convenient, anytime support. Take only one strip per day.",
    image: "/attached_assets/remedy_images/Natural%20Olive%20Oil%20Hair%20Mask.jpg"
  }
]

function SlideCard({
  index,
  scrollIndex,
  totalSlides,
  slide
}: {
  index: number
  scrollIndex: MotionValue<number>
  totalSlides: number
  slide: Slide
}) {
  const range = [index - 1, index, index + 1]
  const outputRange = [90, 0, -90]

  const rotateRaw = useTransform(scrollIndex, range, outputRange)
  const rotate = useSpring(rotateRaw, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="flex-shrink-0 flex items-center justify-center absolute left-0 top-0 h-full w-full origin-[center_104.166667vw]"
      style={{
        rotate: rotate,
        zIndex: totalSlides - index, 
      }}
    >
      <div className="card-inner w-full bg-green rounded-lg relative">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 h1 font-bold opacity-70 text-green">{totalSlides}</div>
        <div className="relative z-10 p-7 text-center *:text-white">
            <h3 className="mb-3">
              {slide.title}
            </h3>
            <p className="xl:text-xl max-w-md mx-auto">
              {slide.description}
            </p>
          </div>
          <div className="h-[400px] p-4">
            <div className="w-full h-full rounded-lg overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
    </motion.div>
  )
}

function StripHowToUse() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const scrollIndex = useTransform(scrollYProgress, [0, 1], [0, slides.length - 1])

  return (
    <section
      ref={containerRef}
      className="how-to-wrapper relative"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div className="how-to-sticky sticky top-[50px] flex h-screen items-center justify-center overflow-hidden perspective-[1000px]">
        <div className="how-to-stage relative w-full 2xl:max-w-[800px] max-w-[700px] aspect-[3/4]">
          {slides.map((slide, index) => (
            <SlideCard
              key={index}
              index={index}
              slide={slide}
              scrollIndex={scrollIndex}
              totalSlides={slides.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StripHowToUse