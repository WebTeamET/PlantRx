import { motion, Variants } from "framer-motion";
import React from "react";

type SplitTextProps = {
  text: string;
  className?: string;
};

export const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const char: Variants = {
    hidden: { x: 40, opacity: 0 },
    show: {
      x: [40, -5, 0],
      opacity: [0, 1, 1, 1],
      transition: {
        duration: 1,
        times: [0, 0.65, 0.85, 1],
        ease: "easeOut",
      },
    },
  };

export const SplitText: React.FC<SplitTextProps> = ({ text, className = "" }) => {
  return (
    <motion.span
      variants={container}
      initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.1 }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((charItem, i) => (
        <motion.span
          key={i}
          variants={char}
          style={{ display: "inline-block" }}
        >
          {charItem === " " ? "\u00A0" : charItem}
        </motion.span>
      ))}
    </motion.span>
  );
};