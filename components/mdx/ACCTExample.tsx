import { ReactNode } from "react";

interface ACCTExampleProps {
  title: string;
  children: ReactNode;
}

export default function ACCTExample({ title, children }: ACCTExampleProps) {
  return (
    <div className="w-full bg-white border border-black rounded-lg dark:bg-black dark:border-white">
      <div className="p-2 text-white bg-black border-b-4 border-black rounded-t-lg dark:bg-white dark:text-black dark:border-white">
        {title}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
