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
    <ul className={` ${className} ${styles.cf_container}`} ref={containerRef}>
      {sortedFiles.map((jsonData: CourseFileProps, index: number) => (
        <CourseFile
          key={`course-${index}`}
          title={jsonData.title}
          icon={jsonData?.icon}
          wip={jsonData.wip}
          semester={jsonData.semester}
          description={jsonData.description}
          containerRef={containerRef}
          index={index}
        />
      ))}
      <CourseFile spacer containerRef={containerRef} />
      <CourseFile spacer containerRef={containerRef} />
    </ul>
  );
}
