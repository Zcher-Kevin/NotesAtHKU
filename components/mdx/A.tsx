import React from "react";

interface AProps {
  href: string;
  children: React.ReactNode;
}

export default function A({ href, children }: AProps) {
  return <a href={href}>{children}</a>;
}
