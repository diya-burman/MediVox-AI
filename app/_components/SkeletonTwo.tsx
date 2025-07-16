"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const SkeletonTwo = () => {
  const arr = new Array(6).fill(0);
  const [widths, setWidths] = useState<number[]>([]);

  useEffect(() => {
    const randomWidths = arr.map(
      () => Math.random() * (100 - 40) + 40
    );
    setWidths(randomWidths);
  }, []);

  const variants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: { duration: 0.2 },
    },
    hover: {
      width: ["0%", "100%"],
      transition: { duration: 2 },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {widths.length > 0 &&
        arr.map((_, i) => (
          <motion.div
            key={`skeleton-two-${i}`}
            variants={variants}
            style={{
              maxWidth: `${widths[i]}%`,
            }}
            className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
          />
        ))}
    </motion.div>
  );
};

export default SkeletonTwo;
