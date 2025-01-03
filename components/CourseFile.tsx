"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import styles from "./CourseFiles.module.css";
import Icon from "./Icon";

export interface CourseFileProps {
  title: string;
  description: string;
  semester: string;
  wip?: boolean;
  icon?: string;
  key: string;
  index: number;
  containerRef: React.MutableRefObject<any>;
}

export default function CourseFile({
  title,
  description,
  icon,
  wip,
  index,
  containerRef,
}: CourseFileProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: elementRef,
    offset: ["end end", "start start"],
    layoutEffect: false,
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-45, -15, 0]);

  return (
    <Link href={`notes/${title}`}>
      <motion.div
        ref={elementRef}
        style={{
          rotateX: rotateX,
          transformPerspective: 700,
        }}
        // whileHover={{
        //   rotateX: -5,
        //   transition: { duration: 0.2 },
        // }}
        className={`py-5 px-6 lg:py-6 w-full -mb-5 flex gap-4 items-center cursor-pointer transition-colors border border-gray-400 dark:border-gray-600 rounded-lg bg-fd-card dark:bg-gray-600/20 hover:bg-fd-accent/50 hover:text-fd-accent-foreground backdrop-blur-md justify-between ${styles.cf}`}
      >
        <Icon name={icon || "House"} size={32} />
        <div className="flex flex-col items-center w-full lg:mt-1 lg:flex-row lg:gap-4 justify-left ">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-xs lg:text-sm">{description}</p>
        </div>
        {wip ? (
          <div
            className={`px-4 py-1 text-xs text-white bg-red-500 rounded-full ${styles.tag}`}
          >
            WIP
          </div>
        ) : (
          <div
            className={`px-4 py-1 text-xs text-white bg-green-600 rounded-full ${styles.tag}`}
          >
            Complete
          </div>
        )}
        <ArrowRight size={24} className={styles.arrow} />
      </motion.div>
    </Link>
  );
}
