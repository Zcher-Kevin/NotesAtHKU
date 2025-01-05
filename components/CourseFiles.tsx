import getSortedFiles from "@/lib/getSortedFiles";
import CourseFiles from "./CourseFiles.client";

export default function CourseFilesWrapper({
  className,
}: {
  className?: string;
}) {
  const sortedFiles = getSortedFiles();

  return <CourseFiles className={className} sortedFiles={sortedFiles} />;
}
