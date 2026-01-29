import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

const PATHS = {
  initial: "M 189,80.37 C 243,66.12 307.3,87.28 350.9,124.1 389.3,156.6 417,211.2 418.1,263.4 419.1,305.7 401.8,355.6 368.5,379.1 298.8,428 179.2,446.4 117.6,386.3 65.4,335.3 78.55,230.3 105.5,160.5 119.7,123.6 152.6,89.85 189,80.37 Z",
};

const transition = {
  duration: 0.8,
  ease: [0.23, 1, 0.32, 1], 
};

const blobsData = [
  {
    title: "Corn",
    image: "/oil-background.webp",
  },
  {
    title: "Wheat",
    image: "/oil-background.webp",

  },
  {
    title: "Sunflower",
    image: "/oil-background.webp",
  }
];

const SingleBlob = ({ item, index, scrollYProgress }: { item: typeof blobsData[0], index: number, scrollYProgress: MotionValue<number> }) => {
  const clipId = `clip-shape-${index}`;
  

  return (
    <motion.div 
      className="absolute w-[450px] h-[450px] cursor-pointer pointer-events-auto"
      initial="initial"
      whileHover="hover"
    >
      <svg width="100%" height="100%" viewBox="0 0 500 500" className="overflow-visible">
        <defs>
          <clipPath id={clipId}>
            <motion.path
              variants={{
                initial: { d: PATHS.initial, y: 0 },
                hover: { d: PATHS.initial, y: -15 } 
              }}
              transition={transition} 
            />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          <motion.image
            href={item.image}
            x="0" y="0" width="500" height="500"
            preserveAspectRatio="xMidYMid slice"
            variants={{
              initial: { y: 0 },
              hover: { y: -15 } 
            }}
            transition={transition}
          />
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.h2 
          className="text-emerald-800 text-2xl font-bold text-center drop-shadow-md"
          variants={{
            initial: { y: 0 },
            hover: { y: -20 } 
          }}
          transition={transition}
        >
          {item.title}
        </motion.h2>
      </div>
    </motion.div>
  );
};

const OrganicBlobList: React.FC<{ scrollYProgress: MotionValue<number> }> = ({ scrollYProgress }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      {blobsData.map((blob, index) => (
        <SingleBlob key={index} item={blob} index={index} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
};

export default OrganicBlobList;