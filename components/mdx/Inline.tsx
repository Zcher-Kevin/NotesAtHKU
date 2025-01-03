import React from "react";

interface HLayoutProps {
  children: React.ReactNode;
}

export default function Inline({ children }: HLayoutProps) {
  return <div className="flex items-center justify-center">{children}</div>;
}
