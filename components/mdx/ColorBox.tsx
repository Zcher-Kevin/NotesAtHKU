import { ReactNode } from "react";

interface ColorBoxProps {
  color: string;
  children: ReactNode;
}

export default function ColorBox({ color, children }: ColorBoxProps) {
  return (
    <div className="relative inline-block w-fit">
      <span className="relative px-1 py-[1px] rounded-sm" style={{ zIndex: 1 }}>
        {children}
      </span>
      <div
        className="absolute inset-0 rounded-sm opacity-50"
        style={{ backgroundColor: color, zIndex: 0 }}
      ></div>
    </div>
  );
}
