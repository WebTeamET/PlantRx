import React, { useEffect, useRef, useState } from "react"
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

const titleShadow = `
  0 5px 0 #fff,  0 -5px 0 #fff,
  5px 0 0 #fff, -5px 0 0 #fff,
  3px 3px 0 #fff, -3px 3px 0 #fff,
  3px -3px 0 #fff,-3px -3px 0 #fff
`;

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

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

function getPageY(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top + window.scrollY
}

function MobileHowToSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = window.setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3200)

    return () => window.clearTimeout(id)
  }, [current])

  return (
    <section className="lg:hidden bg-gradient-to-b from-white via-[#F7EFE6] to-white py-14">
      <div className="max-w-5xl mx-auto px-5">

        <div className="overflow-hidden rounded-2xl shadow-lg bg-[#F0DDCE]">
          <div
            className="flex transition-transform duration-500 ease-[0.22,1,0.36,1]"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.title} className="w-full flex-shrink-0">
                <div className="p-6 text-center *:text-black">
                  <h3 className="text-2xl font-semibold mb-3" style={{ textShadow: titleShadow }}>
                    {slide.title}
                  </h3>
                  <p className="text-base leading-relaxed">{slide.description}</p>
                </div>
                <div className="px-6 pb-6">
                  <div className="h-72 rounded-xl overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              className={`h-2.5 !min-w-fit !min-h-fit rounded-full transition-all duration-300 ${
                current === idx ? "w-6 bg-black" : "w-2.5 bg-black/30"
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

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
  const outputRange = [100, 0, -100]

  const rotateRaw = useTransform(scrollIndex, range, outputRange)
  const rotate = useSpring(rotateRaw, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="flex-shrink-0 flex justify-center absolute left-0 top-0 h-full w-full origin-[center_100vw]"
      style={{
        rotate: rotate,
        zIndex: totalSlides - index, 
      }}
    >
      <div className="card-inner w-full bg-[#F0DDCE] rounded-lg relative h-fit">
        {/* <div className="absolute -top-16 left-1/2 -translate-x-1/2 h1 font-bold opacity-70 text-green">{totalSlides}</div> */}
        <div className="relative z-10 pb-3 p-7 text-center *:text-black dark:*:text-black">
          <h2
            className="mb-3 text-[clamp(28px,_5.5vw,_90px)] leading-[1.1]"
            style={{ textShadow: titleShadow }}
          >
            {slide.title}
          </h2>
          <p className="xl:text-xl max-w-md mx-auto">
            {slide.description}
          </p>
          </div>
          <div className="h-[400px] pt-3 p-7">
            <div className="w-full h-full rounded-lg overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-700"
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
    <>
      {/* Desktop / large screens: keep sticky scroll animation */}
      <section
        ref={containerRef}
        className="how-to-wrapper relative ] hidden lg:block "
        style={{ height: `${slides.length * 150}vh` }}
      >
        <div className="how-to-sticky sticky top-[50px] py-24 lg:pb-28 lg:pt-[170px block h-screen justify-center overflow-hidden perspective-[1000px] bg-[linear-gradient(180deg,rgba(247,239,230,0)_0%,#F7EFE6_8.81%,#F7EFE6_51.44%,#F7EFE6_83.43%,rgba(247,239,230,0)_100%)]">
          <div className="how-to-stage relative w-full xl:max-w-[800px] max-w-[560px] mx-auto lg:aspect-[4/3]">
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

      {/* Mobile / tablet: horizontal autoplay slider */}
      <MobileHowToSlider />
    </>
  )
}

export default StripHowToUse

export function StickyStripImg() {
  const [visible, setVisible] = useState(false)
  const [inHowTo, setInHowTo] = useState(false)
  const [howToWidth, setHowToWidth] = useState<number | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const howToEl = document.querySelector<HTMLElement>(".how-to-wrapper")
    if (!howToEl) return

    const update = () => {
      const viewportH = window.innerHeight
      const scrollY = window.scrollY

      const howToTop = getPageY(howToEl)
      const howToBottom = howToTop + howToEl.getBoundingClientRect().height

      const stickyStart = howToTop - 50
      const stickyEnd = howToBottom - viewportH + 0

      const active = scrollY >= stickyStart && scrollY <= stickyEnd
      setVisible(active)
      setInHowTo(active)
      setHowToWidth(howToEl.getBoundingClientRect().width)
      setReady(true)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  if (!ready) return null

  const width = howToWidth ? clamp(howToWidth * 0.35, 180, 340) : inHowTo ? 260 : 220

  return (
    <motion.div
      className="pointer-events-none fixed z-[80] inset-x-0 flex justify-center"
      style={{ bottom: inHowTo ? "0" : "30px" }}
      initial={{ scale: 1 }}
      animate={{ scale: visible ? 1 : 1, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-hidden={!visible}
    >
      <img
        src="/strip-2.png"
        alt="Mushroom focus strips"
        className="drop-shadow-2xl"
        style={{ width }}
        loading="lazy"
      />
      <div className="absolute size-full bg-gradient-to-t to-transparent via-[#F7EFE6] from-[#F7EFE6]"></div>
    </motion.div>
  )
}
