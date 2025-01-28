"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ComponentPropsWithoutRef } from "react";

interface BorderBeamProps extends ComponentPropsWithoutRef<"div"> {
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
  ...props
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",

        // mask styles
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",

        // pseudo styles
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className
      )}
      {...props}
    />
  );
};

export const BorderBeamCard = ({
  className,
  children,
  size,
  duration,
  anchor,
  borderWidth,
  colorFrom,
  colorTo,
  delay,
  ...props
}: BorderBeamProps) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-background size-full flex",
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      {...(props as any)}
    >
      {children}
      <BorderBeam
        size={size}
        duration={duration}
        anchor={anchor}
        borderWidth={borderWidth}
        colorFrom={colorFrom}
        colorTo={colorTo}
        delay={delay}
      />
    </motion.div>
  );
};
