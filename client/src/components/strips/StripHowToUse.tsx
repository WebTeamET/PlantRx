import React, { useEffect, useRef, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useSpring
} from "framer-motion"
import { ShopifyProduct, getMetaobjectsList, getMetaobjectField } from "@/lib/shopify"

interface Slide {
  title: string
  description: string
  image: string
  mobileImage?: string
}

interface StripHowToUseProps {
  product?: ShopifyProduct
}

const titleShadow = `
  0 5px 0 #fff,  0 -5px 0 #fff,
  5px 0 0 #fff, -5px 0 0 #fff,
  3px 3px 0 #fff, -3px 3px 0 #fff,
  3px -3px 0 #fff,-3px -3px 0 #fff
`;

const DEFAULT_SLIDES: Slide[] = [
  {
    title: "Open & Take",
    description: "Open the tin and gently take out one oral strip with clean, dry hands.",
    image: "/strips-instruction-1.png"
  },
  {
    title: "Place Under Tongue",
    description: "Place the strip on or under your tongue for optimal absorption.",
    image: "/strips-instruction-2.png"
  },
  {
    title: "Let It Dissolve",
    description: "Allow the strip to fully dissolve—no chewing, no water needed.",
    image: "/strips-instruction-3.png"
  },
  {
    title: "Enjoy the Benefits",
    description: "Experience fast absorption and convenient, anytime support. Take only one strip per day.",
    image: "/strips-instruction-4.png"
  }
]

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

function getPageY(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top + window.scrollY
}

function MobileHowToSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const id = window.setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3200)

    return () => window.clearTimeout(id)
  }, [current, slides.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrent((prev) => Math.min(slides.length - 1, prev + 1))
      } else {
        setCurrent((prev) => Math.max(0, prev - 1))
      }
    }
  }

  return (
    <section className="lg:hidden bg-gradient-to-b from-white via-[#F7EFE6] to-white py-14">
      <div className="max-w-5xl mx-auto px-5">

        <div className="overflow-hidden rounded-2xl shadow-lg bg-StripSecondary">
          <div
            className="flex transition-transform duration-500 ease-[0.22,1,0.36,1]"
            style={{ transform: `translateX(-${current * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((slide) => (
              <div key={slide.title} className="w-full flex-shrink-0">
                <div className="p-6 text-center *:text-black dark:*:text-black title-stroke">
                  <h3 className="text-2xl font-semibold mb-3 dark:!text-black"
                    style={{
                      textShadow: `
                      0 0.5vw 0 #fff,  0 -0.5vw 0 #fff,
                      0.5vw 0 0 #fff,  -0.5vw 0 0 #fff,
                      0.38vw 0.38vw 0 #fff, -0.38vw 0.38vw 0 #fff,
                      0.38vw -0.38vw 0 #fff,-0.38vw -0.38vw 0 #fff,
                      0.45vw 0.25vw 0 #fff,-0.45vw 0.25vw 0 #fff,
                      0.45vw -0.25vw 0 #fff,-0.45vw -0.25vw 0 #fff,
                      0.25vw 0.45vw 0 #fff,-0.25vw 0.45vw 0 #fff,
                      0.25vw -0.45vw 0 #fff,-0.25vw -0.45vw 0 #fff
                    `,
                    }}
                  >
                    {slide.title}
                  </h3>
                  <p className="text-base leading-relaxed dark:text-black">{slide.description}</p>
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
              className={`h-2.5 !min-w-fit !min-h-fit rounded-full transition-all duration-300 ${current === idx ? "w-6 bg-black" : "w-2.5 bg-black/30"
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
      <div className="card-inner w-full bg-StripSecondary rounded-[20px] xl:rounded-[32px] relative h-fit">
        <div className="relative z-10 pb-3 p-7 text-center *:text-black dark:*:text-black">
          <h2
            className="mb-3 text-[clamp(28px,_5.5vw,_90px)] leading-[1.1]"
            style={{ textShadow: titleShadow }}
          >
            {slide.title}
          </h2>
          <p className="2xl:text-[32px] 2xl:leading-[56px] max-w-[750px] mx-auto">
            {slide.description}
          </p>
        </div>
        <div className="xl:h-[400px] h-[250px] pt-3 p-7">
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

export default function StripHowToUse({ product }: StripHowToUseProps) {
  const slides = React.useMemo(() => {
    // cardSpin is now a mapped object containing cards, card or card_list (array of objects)
    const list = product?.cardSpin?.cards || product?.cardSpin?.card || product?.cardSpin?.card_list;
    if (!list || !Array.isArray(list) || list.length === 0) return DEFAULT_SLIDES;

    return list.map((node: any) => ({
      title: node.title || node.card_title || "",
      description: node.description || node.card_description || "",
      image: node.image || node.card_image || "/strips-instruction-1.png",
      mobileImage: node.mobile_image || node.mobile_card_image || node.image || "/strips-instruction-1.png",
    }));
  }, [product]);

  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const scrollIndex = useTransform(scrollYProgress, [0, 1], [0, slides.length - 1])

  return (
    <>
      <section
        ref={containerRef}
        className="how-to-wrapper relative hidden lg:block "
        style={{ height: `${slides.length * 150}vh` }}
      >
        <div className="how-to-sticky sticky top-[50px] py-24 lg:pb-0 lg:pt-20 block h-screen justify-center overflow-hidden perspective-[1000px] bg-[linear-gradient(180deg,transparent_0%,var(--product-background-color)_8.81%,var(--product-background-color)_51.44%,var(--product-background-color)_83.43%,transparent_100%)]">
          <div className="how-to-stage relative w-full 2xl:max-w-[1200px] xl:max-w-[800px] max-w-[650px] mx-auto lg:aspect-[4/3]">
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

      <MobileHowToSlider slides={slides} />
    </>
  )
}

export function StickyStripImg({ product }: { product?: ShopifyProduct }) {
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
      const stickyEnd = howToBottom - viewportH

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
  const imageSrc = product?.cardSpin?.mobile_image || "/strip-2.png"

  return (
    <motion.div
      className="pointer-events-none fixed z-[80] inset-x-0 flex justify-center bottom-[-190px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-hidden={!visible}
    >
      <img
        src={imageSrc}
        alt="Mushroom focus strips"
        className="drop-shadow-2xl"
        style={{ width }}
        loading="lazy"
      />
      <div className="absolute size-full bg-[linear-gradient(180deg,transparent_0%,var(--product-background-color)_46.73%,var(--product-background-color)_43.21%,var(--product-background-color)_75.62%,transparent_91.76%)]"></div>
    </motion.div>
  )
}
