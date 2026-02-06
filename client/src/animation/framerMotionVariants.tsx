'use client'
import { Variants } from 'framer-motion'

export const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.45,
    },
  },
}

export const containerBlurVars: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

export const wordRisePerspective: Variants = {
  hidden: {
    opacity: 0,
    transform: 'translate3d(0, 100%, 0) rotateX(-80deg)',
  },
  visible: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) rotateX(0deg)',
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1]
    }
  }
}

export const slideDownVariants: Variants = {
  hidden: {
    transform: "translate3d(0, -40px, 0)",
    opacity: 0,
  },
  visible: {
    transform: "translate3d(0, 0, 0)",
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1]
    },
  },
};

export const slideUpVariants: Variants = {
  hidden: {
    transform: "translate3d(0,300px, 0)",
    opacity: 0,
  },
  visible: {
    transform: "translate3d(0, 0, 0)",
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1]
    },
  },
};
export const itemScaleUpVariants: Variants = {
  hidden: {
    transform: "translate3d(0, 100px, 0) scale(0)",
    opacity: 0,
  },
  visible: {
    transform: "translate3d(0, 0, 0) scale(1)",
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1]
    },
  },
};
export const itemBlurLeftVars: Variants = {
  hidden: {
    opacity: 0,
    transform: "translate3d(-40px, 0, 0)",
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
    filter: "blur(0px)", 
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

export const itemBlurRightVars: Variants = {
  hidden: {
    opacity: 0,
    transform: "translate3d(40px, 0, 0)",
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

export const itemBlurVars: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
    transform: "translateZ(0)", 
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transform: "translateZ(0)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}