import { Link } from "lucide-react";
import NextLink from "next/link";
import React from "react";

interface BlockProps {
  title: string;
  variant: string;
  children: React.ReactNode;
}

const ADMONITION_MAPPING = {
  tip: "primary",
  info: "secondary",
  note: "knowledge",
};

const STYLES = {
  primary: {
    body: "bg-green-50 dark:bg-green-800 border-green-600 dark:border-green-900",
    head: "bg-green-100 dark:bg-green-800 border-green-600",
  },
  secondary: {
    body: "bg-indigo-50 dark:bg-indigo-800 border-indigo-600 dark:border-indigo-900",
    head: "bg-indigo-100 dark:bg-indigo-800 border-indigo-600",
  },
  knowledge: {
    body: "bg-slate-100 dark:bg-slate-800 border-slate-600 dark:border-slate-700",
    head: "bg-slate-100 dark:bg-slate-700 border-slate-600",
  },
  example: {
    body: "bg-gray-50 dark:bg-gray-800 border-gray-50 dark:border-gray-800",
    head: "bg-gray-50 dark:bg-gray-800 border-gray-50",
  },
};

export default function Block({
  title = "Title",
  variant = "knowledge",
  children,
}: BlockProps) {
  const activeVariant: keyof typeof STYLES =
    variant in STYLES
      ? (variant as keyof typeof STYLES)
      : (variant as keyof typeof ADMONITION_MAPPING) in ADMONITION_MAPPING
      ? (ADMONITION_MAPPING[
          variant as keyof typeof ADMONITION_MAPPING
        ] as keyof typeof STYLES)
      : "knowledge";
  const href_id = title.replace(/\s+/g, "-").toLowerCase();

  return (
    <div
      className={`rounded-xl px-4 relative pt-1 mt-8 mb-6 ${STYLES[activeVariant].body} border-2  dark:bg-opacity-50`}
    >
      <div
        className={`${STYLES[activeVariant].head} -top-3 flex absolute items-center w-fit max-w-[calc(100%-1.5rem)] px-3 left-3 right-3 rounded-lg border-2 dark:border-none dark:py-[2px] dark:-translate-y-[2px] overflow-x-auto whitespace-nowrap`}
      >
        <h4 className="w-full m-0 mr-2 text-base font-bold" id={href_id}>
          {title}
        </h4>
        <NextLink href={`#${href_id}`}>
          <Link size={16} className="opacity-50" />
        </NextLink>
      </div>
      {children}
    </div>
  );
}
