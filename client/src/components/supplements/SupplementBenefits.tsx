import React from 'react'
import { motion, useInView } from 'framer-motion'
import Marquee from 'react-fast-marquee'
import { containerVariants } from '@/animation/framerMotionVariants'
import { once } from 'events'

const slideUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

type BentoItem = {
    type: 'text' | 'image'
    title?: string
    description?: string
    image?: string
    className?: string
    bgColor?: string
}

function SupplementBenefits() {
    const sectionRef = React.useRef<HTMLDivElement | null>(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
    const bentoItems: BentoItem[] = [
        {
            type: 'text',
            title: 'Immune Support',
            description:
                'Naturally bolsters immune responses.',
            className: ' *:text-white',
            bgColor: "#6A954D"
        },
        {
            type: 'text',
            title: 'Brain',
            description:
                'Strengthens neuropathways supporting mood, cognition, and focus.',
            className: ''
        },
        {
            type: 'image',
            image: '/bento-image-1.png',
            className: 'sm:row-span-2'
        },
        {
            type: 'image',
            image: '/bento-image-2.png',
            className: 'sm:row-span-2'
        },
        {
            type: 'text',
            title: 'Antioxidant',
            description:
                'Helps reduce oxidation and free radicles.',
            className: ''
        },
        {
            type: 'text',
            title: 'Energy',
            description:
                'Full of micronutrients that provide the body with even the rarest of nutrients.',
            className: '*:text-white',
            bgColor: "#6A954D"
        },
    ]

    return (
        <section className="xl:pb-[100px] pb-[60px] pt-10 relative z-[9999] bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    variants={containerVariants as any}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex flex-col items-center xl:mb-14 mb-10">
                    <motion.div
                        variants={slideUpVariants as any}
                        className="inline-flex items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-green/10 dark:bg-emerald-900/40 text-green dark:text-emerald-200 border-green dark:border-green mb-4 text-sm sm:text-base px-4 sm:px-7 py-2 font-semibold tracking-wide uppercase"
                    >
                        Benefits
                    </motion.div>

                    <motion.h2
                        variants={slideUpVariants as any}
                        className="text-center h1"
                    >
                        Why You’ll <span className="text-gold">Love </span>It
                    </motion.h2>

                    <motion.p
                        variants={slideUpVariants as any}
                        className="text-center mt-5 max-w-2xl mx-auto"
                    >
                        This mushroom 10X complex combines the top most valuable and sought-after medicinal mushrooms all in one easy-to-swallow capsule.
                    </motion.p>
                </motion.div>

                <div ref={sectionRef} className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:gap-6 gap-4 auto-rows-[200px] md:auto-rows-[220px] lg:auto-rows-[240px]">
                        {bentoItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={
                                    item.type === 'image'
                                        ? { clipPath: 'inset(0 100% 0 0)', WebkitClipPath: 'inset(0 100% 0 0)', y: 80 }
                                        : undefined
                                }
                                whileInView={
                                    item.type === 'image'
                                        ? { clipPath: 'inset(0 0% 0 0)', WebkitClipPath: 'inset(0 0% 0 0)', y: 0 }
                                        : undefined
                                }
                                transition={{ duration: 1.2, ease: 'easeOut' }}
                                viewport={{ once: true }}
                                style={{
                                    backgroundColor: item.bgColor,
                                    transformOrigin: 'left'
                                }}
                                className={`rounded-lg overflow-hidden *:text-green bg-[#FCF2E5] flex items-center justify-center text-center ${item.type === 'text' ? item.className : ''
                                    } ${item.className ?? ''}`}
                            >
                                {item.type === 'text' ? (
                                    <div className='flex flex-col items-center lg:px-6 px-3'>
                                        <motion.p
                                            variants={slideUpVariants as any}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, amount: 0.4 }}
                                            className="xl:mb-3 mb-2 h3 font-heading"
                                        >
                                            {item.title}
                                        </motion.p>
                                        <motion.p
                                            variants={slideUpVariants as any}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, amount: 0.4 }}
                                            className="text-base leading-6 grow"
                                        >
                                            {item.description}
                                        </motion.p>
                                    </div>
                                ) : (
                                    <img
                                        src={item.image}
                                        alt="Supplement"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </motion.div>
                        ))}

                        <motion.div
                            className="rounded-lg bg-[linear-gradient(114.57deg,#678951_-3.59%,#385127_97.89%)] overflow-hidden flex flex-col justify-center lg:col-start-2 lg:row-start-2 max-md:sm:col-span-2"
                        >
                            <div className="space-y-4">
                                <Marquee
                                    speed={30}
                                    gradient={false}
                                    direction="left"
                                    pauseOnHover
                                    play={isInView}
                                >
                                    <div className="flex gap-4 mr-4">
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white bg-transparent text-white text-sm font-semibold uppercase tracking-wide shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            Go Green
                                        </span>
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white bg-transparent text-white text-sm font-semibold uppercase tracking-wide shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            Eco Conscious
                                        </span>
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white bg-transparent text-white text-sm font-semibold uppercase tracking-wide shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            Recycling
                                        </span>
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white bg-transparent text-white text-sm font-semibold uppercase tracking-wide shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            Sustainable
                                        </span>
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white bg-transparent text-white text-sm font-semibold uppercase tracking-wide shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            Plant Based
                                        </span>
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white bg-transparent text-white text-sm font-semibold uppercase tracking-wide shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            Clean Living
                                        </span>
                                    </div>
                                </Marquee>

                                <Marquee
                                    speed={30}
                                    gradient={false}
                                    direction="right"
                                    pauseOnHover
                                    play={isInView}
                                >
                                    <div className="flex gap-4 mr-4">
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white bg-transparent text-white text-sm font-semibold uppercase tracking-wide shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            Adaptogens
                                        </span>
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white bg-transparent text-white text-sm font-semibold uppercase tracking-wide shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            Immunity
                                        </span>
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white bg-transparent text-white text-sm font-semibold uppercase tracking-wide shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            Brain Health
                                        </span>
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white bg-transparent text-white text-sm font-semibold uppercase tracking-wide shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            Energy
                                        </span>
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white bg-transparent text-white text-sm font-semibold uppercase tracking-wide shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            Antioxidants
                                        </span>
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white bg-transparent text-white text-sm font-semibold uppercase tracking-wide shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            Wellness
                                        </span>
                                    </div>
                                </Marquee>
                            </div>
                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default SupplementBenefits