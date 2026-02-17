import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */

interface Slide {
  title: string
  description: string
  image: string
}

/* ---------------------------------- */
/* Data */
/* ---------------------------------- */

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

/* ---------------------------------- */
/* Slide Card */
/* ---------------------------------- */

function SlideCard({
  index,
  scrollYProgress,
  totalSlides,
  slide
}: {
  index: number
  scrollYProgress: MotionValue<number>
  totalSlides: number
  slide: Slide
}) {

  const segmentSize = 1 / (totalSlides - 1)
  const center = index * segmentSize

  // Dead zone where rotation stays at 0deg
  const deadZone = segmentSize * 0.1

  const inputRange = [
    Math.max(0, center - segmentSize),
    center - deadZone,
    center,
    center + deadZone,
    Math.min(1, center + segmentSize)
  ]

  const rotate = useTransform(
    scrollYProgress,
    inputRange,
    [60, 0, 0, 0, -60]
  )

  const smoothRotate = useSpring(rotate, {
    stiffness: 70,
    damping: 22,
    mass: 0.8
  })

  return (
    <motion.div
      className="flex-shrink-0 w-screen flex items-center justify-center how-to-use-slide"
      style={{ rotate: smoothRotate }}
    >
      <div className="relative max-w-[40vw] w-full bg-green rounded-xl overflow-hidden shadow-2xl">

        {/* Text */}
        <div className="relative z-10 p-6 text-center *:text-white">
          <h3 className="mb-3 text-3xl font-semibold">
            {slide.title}
          </h3>
          <p className="text-lg max-w-md mx-auto">
            {slide.description}
          </p>
        </div>

        {/* Image */}
        <div className="h-[500px] p-4">
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

/* ---------------------------------- */
/* Main Section */
/* ---------------------------------- */

function StripHowToUse() {

  const containerRef = useRef<HTMLDivElement>(null)

  const SCROLL_HEIGHT = "400vh"

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Move exactly one slide per step
  const maxTranslate = -((slides.length - 1) * 100)

  const transformRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [0, maxTranslate]
  )

  const smoothX = useSpring(transformRaw, {
    stiffness: 60,
    damping: 25,
    mass: 0.9
  })

  const x = useTransform(smoothX, v => `${v}vw`)

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: SCROLL_HEIGHT }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gray-50 flex items-center">

        <motion.div
          style={{
            x,
            width: `${slides.length * 100}vw`,
            perspective: 1200
          }}
          className="flex"
        >
          {slides.map((slide, index) => (
            <SlideCard
              key={index}
              index={index}
              slide={slide}
              scrollYProgress={scrollYProgress}
              totalSlides={slides.length}
            />
          ))}
        </motion.div>

      </div>
    </div>
  )
}

export default StripHowToUse
