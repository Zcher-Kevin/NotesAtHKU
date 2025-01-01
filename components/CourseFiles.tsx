import fs from "fs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import path from "path";
import styles from "./CourseFiles.module.css";
import Icon from "./Icon";

export default function CourseFiles({ className }: { className?: string }) {
  const sortedFiles = getSortedFiles();

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {sortedFiles.map((jsonData: CourseFileProps, index: number) => (
        <CourseFile
          key={`course-${index}`}
          title={jsonData.title}
          icon={jsonData?.icon}
          wip={jsonData.wip}
          semester={jsonData.semester}
          description={jsonData.description}
        />
      ))}
    </div>
  );
}

interface CourseFileProps {
  title: string;
  description: string;
  semester: string;
  wip?: boolean;
  icon?: string;
  key: string;
}

function getSortedFiles() {
  const directoryPath = path.join(process.cwd(), "content/notes");
  const jsonFiles: any[] = [];

  function readDirectory(directory: string) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        readDirectory(fullPath);
      } else if (file === "meta.json") {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const jsonData = JSON.parse(fileContents);
        if (jsonData.title) {
          jsonFiles.push(jsonData);
        }
      }
    });
  }

  readDirectory(directoryPath);

  return jsonFiles.sort((a, b) => {
    const [yearA, seasonA] = a.semester.split(" ");
    const [yearB, seasonB] = b.semester.split(" ");

    if (yearA !== yearB) {
      return parseInt(yearA) - parseInt(yearB);
    }

    return seasonA === "Spring" ? -1 : 1;
  });
}

// const CARD_STYLE =
//   "transition-colors border rounded-lg bg-fd-card hover:bg-fd-accent/80 hover:text-fd-accent-foreground ";

function CourseFile({ title, description, icon, wip }: CourseFileProps) {
  return (
    <Link href={`notes/${title}`}>
      <div
        className={`p-6 w-full -mb-5 flex gap-4 items-center cursor-pointer transition-colors border border-gray-400 dark:border-gray-600 rounded-lg bg-fd-card dark:bg-gray-600/20 hover:bg-fd-accent/50 hover:text-fd-accent-foreground backdrop-blur-md justify-between ${styles.cf} `}
      >
        <Icon name={icon || "House"} size={32} />
        <div className="flex items-center w-full gap-4 mt-1 ">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
        {wip ? (
          <div
            className={`px-4 py-1 text-xs text-white bg-red-500 rounded-full ${styles.tag}`}
          >
            WIP
          </div>
        ) : (
          <div
            className={`px-4 py-1 text-xs text-white bg-green-600 rounded-full ${styles.tag}`}
          >
            Complete
          </div>
        )}
        <ArrowRight size={24} className={styles.arrow} />
      </div>
    </Link>
  );
}
