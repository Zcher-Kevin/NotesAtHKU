"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import styles from "./CourseFiles.module.css";
import Icon from "./Icon";
export interface CourseFileProps {
  title?: string;
  description?: string;
  semester?: string;
  wip?: boolean;
  icon?: string;
  containerRef: React.MutableRefObject<any>;
  spacer?: boolean;
  index?: number;
}

export default function CourseFile({
  title,
  description,
  icon,
  wip,
  containerRef,
  spacer,
  index,
}: CourseFileProps) {
  const elementRef = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: elementRef,
    offset: ["end end", "start start"],
    layoutEffect: false,
  });
  // const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-30, -15, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 0.9]);

  return spacer ? (
    <motion.li
      ref={elementRef}
      style={{
        scale,
        rotateX: -30,
        // y,
        transformPerspective: 700,
      }}
      className="w-full min-h-16"
    ></motion.li>
  ) : (
    <motion.li
      ref={elementRef}
      style={{
        scale,
        rotateX: -30,
        y: 0,
        rotateZ: 0,
        transformPerspective: 700,
      }}
      whileHover={{
        rotateX: 0,
        y: -15,
        rotateZ: 2,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
    >
      <Link
        href={`notes/${title}`}
        className={`py-5 px-6 lg:py-6 w-full -mb-5 flex gap-4 items-center cursor-pointer transition-colors border border-fd-popover-foreground rounded-lg bg-fd-muted hover:bg-fd-accent hover:text-fd-accent-foreground justify-between ${styles.cf}`}
      >
        <Icon name={icon || "House"} size={32} />
        <div className="flex flex-col items-center w-full lg:mt-1 lg:flex-row lg:gap-4 justify-left ">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-xs lg:text-sm">{description}</p>
        </div>
        {wip ? (
          <div className={`text-white bg-red-500 ${styles.tag}`}>WIP</div>
        ) : (
          <div className={`text-white bg-green-600 ${styles.tag}`}>
            Complete
          </div>
        )}
        <ArrowRight size={24} className={styles.arrow} />
      </Link>
    </motion.li>
  );
}
