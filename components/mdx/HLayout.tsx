import React from "react";

interface HLayoutProps {
  children: React.ReactNode;
  split?: string[];
}

export default function HLayout({ split = [], children }: HLayoutProps) {
  return (
    <div className="flex gap-4">
      {React.Children.map(children, (child, index) => (
        <div
          style={{
            width: split[index] || "auto",
            flexGrow: split[index] === "" || split.length === 0 ? 1 : 0,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
