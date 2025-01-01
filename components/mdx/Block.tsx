import React from "react";

interface BlockProps {
  title: string;
  variant: "primary" | "secondary" | "knowledge";
  children: React.ReactNode;
}

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
};

export default function Block({
  title = "Title",
  variant = "knowledge",
  children,
}: BlockProps) {
  variant = variant in STYLES ? variant : "knowledge";
  const href_id = title.replace(/\s+/g, "-").toLowerCase();

  return (
    <div
      className={`rounded-xl px-4 relative pt-1 mb-6 mt-3 ${STYLES[variant].body} border-2  dark:bg-opacity-50`}
    >
      <div
        className={`${STYLES[variant].head} -top-3 absolute w-fit px-3 left-3 rounded-lg border-2   dark:border-none dark:py-[2px] dark:-translate-y-[2px]`}
      >
        <h3 className="m-0 text-base font-medium" id={href_id}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
