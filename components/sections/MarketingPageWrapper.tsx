import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import React from "react";
import Icon from "../Icon";

export default function MarketingPageWrapper({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="">
      <div className="z-50 flex flex-col justify-center w-full max-w-3xl px-8 pt-12 mx-auto sm:pt-24">
        <Icon name={icon || "Album"} size={64} className="mb-10" />
        <h1 className="h1 sm:text-5xl md:text-5xl lg:text-5xl">{title}</h1>
        {children}
      </div>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.2}
        duration={1}
        strokeDasharray={"10 10"}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] "
          // "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </main>
  );
}
