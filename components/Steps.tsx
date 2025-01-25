import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StepsProps {
  children: ReactNode;
  variant?: "default" | "bar";
}

interface StepProps {
  children: ReactNode;
}

export function Steps({ children, variant = "default" }: StepsProps) {
  return (
    <div
      className={cn(
        "mb-12 ml-4 border-l pl-8",
        variant === "default"
          ? "[&>h3]:step steps [counter-reset:step]"
          : "[&>h3]:bar steps [counter-reset:step]"
      )}
    >
      {children}
    </div>
  );
}

export function Step({ children }: StepProps) {
  return (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
      )}
    >
      {children}
    </h3>
  );
}
