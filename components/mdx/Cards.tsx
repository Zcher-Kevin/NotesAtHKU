import { cn } from "@/lib/utils";
import Link from "fumadocs-core/link";
import React, { ReactNode } from "react";
import Icon from "./Icon";

interface CardsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Cards({ children, className, ...props }: CardsProps) {
  return (
    <div
      {...props}
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}
    >
      {children}
    </div>
  );
}

interface CardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: string;
  title: string;
  description?: string;
  href?: string;
  children?: ReactNode;
}

export function Card({
  icon,
  title,
  description,
  href,
  className,
  children,
  ...props
}: CardProps) {
  const E = (href ? Link : "div") as React.ElementType;
  return (
    <E
      {...props}
      href={href}
      data-card={true}
      className={cn(
        "block rounded-lg border bg-fd-card p-4 text-fd-card-foreground shadow-md transition-colors",
        href && "hover:bg-fd-accent/80",
        className
      )}
    >
      {icon && (
        <span className="not-prose mb-2 rounded-xl w-10 h-10 flex items-center justify-center border bg-fd-muted text-fd-muted-foreground [&_svg]:size-4">
          <Icon name={icon} />
        </span>
      )}
      <h3 className="mb-1 text-sm font-medium not-prose">{title}</h3>
      {description && (
        <p className="my-0 text-sm text-fd-muted-foreground">{description}</p>
      )}
      {children && (
        <div className="text-sm text-fd-muted-foreground prose-no-margin">
          {children}
        </div>
      )}
    </E>
  );
}
