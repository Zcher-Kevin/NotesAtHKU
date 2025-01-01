"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconComponent: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({
  iconComponent,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className="flex items-center justify-center gap-2 px-8 py-4 border rounded-full bg-fd-card hover:bg-fd-accent/80 hover:text-fd-accent-foreground"
      {...props}
    >
      {iconComponent}
      {children}
    </button>
  );
}
