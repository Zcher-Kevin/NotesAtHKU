"use client";
import { useRef } from "react";
import CourseFile, { CourseFileProps } from "./CourseFile";
import styles from "./CourseFiles.module.css";

export default function CourseFiles({
  className,
  sortedFiles,
}: {
  className?: string;
  sortedFiles: CourseFileProps[];
}) {
  const containerRef = useRef(null);
  return (
    <div
      className={`flex flex-col w-full px-4 pt-6 overflow-y-scroll h-64 lg:h-80 relative ${className} ${styles.cf_container}`}
      ref={containerRef}
    >
      {sortedFiles.map((jsonData: CourseFileProps, index: number) => (
        <CourseFile
          key={`course-${index}`}
          title={jsonData.title}
          icon={jsonData?.icon}
          wip={jsonData.wip}
          semester={jsonData.semester}
          description={jsonData.description}
          index={index}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}
