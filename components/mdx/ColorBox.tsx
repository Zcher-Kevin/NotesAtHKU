import { ReactNode } from "react";

interface ColorBoxProps {
  color: string;
  children: ReactNode;
}

export default function ColorBox({ color, children }: ColorBoxProps) {
  return (
    <span
      className="inline p-1 text-black rounded-sm w-fit"
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
}
