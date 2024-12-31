"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./CourseFiles.module.css";
import Icon from "./Icon";

export default function CourseFiles({ sortedFiles }: any) {
  return (
    <div className="flex flex-col w-4/5">
      {sortedFiles.map((jsonData: CourseFileProps, index: number) => (
        <CourseFile
          key={`course-${index}`}
          title={jsonData.title}
          icon={jsonData?.icon}
          description={jsonData.description}
        />
      ))}
    </div>
  );
}

interface CourseFileProps {
  title: string;
  description: string;
  icon?: string;
  key: string;
}

// const CARD_STYLE =
//   "transition-colors border rounded-lg bg-fd-card hover:bg-fd-accent/80 hover:text-fd-accent-foreground ";

function CourseFile({ title, description, icon }: CourseFileProps) {
  return (
    <Link href={`notes/${title}`}>
      <div
        className={`p-6 w-full -mb-5 flex gap-4 items-center cursor-pointer transition-colors border rounded-lg bg-fd-card hover:bg-fd-accent/50 hover:text-fd-accent-foreground backdrop-blur-md justify-between ${styles.cf} `}
      >
        <Icon name={icon || "House"} size={32} />
        <div className="flex items-center w-full gap-4 mt-1 ">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
        <ArrowRight size={24} className={styles.arrow} />
      </div>
    </Link>
  );
}
