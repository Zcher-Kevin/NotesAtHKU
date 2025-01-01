import { ReactNode } from "react";

interface ColorBoxProps {
  color: string;
  children: ReactNode;
}

export default function ColorBox({ color, children }: ColorBoxProps) {
  return (
    <span style={{ backgroundColor: color }} className="p-[2px] w-fit inline">
      {children}
    </span>
  );
}
