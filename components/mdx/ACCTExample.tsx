import { ReactNode } from "react";

interface ACCTExampleProps {
  title: string;
  children: ReactNode;
}

export default function ACCTExample({ title, children }: ACCTExampleProps) {
  return (
    <div className="w-full mb-12 bg-white border border-black rounded-lg dark:bg-slate-800 dark:border-slate-500">
      <div className="px-4 py-1 text-white bg-black rounded-t-lg rounded-s-lg dark:bg-slate-500 dark:border-white">
        {title}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
