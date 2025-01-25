import fs from "fs";
import path from "path";

export interface MetaData {
  title: string;
  semester: string;
  description: string;
  root: boolean;
  icon: string;
  pages: string[];
  wip: boolean;
}

export default function getSortedFiles(): MetaData[] {
  const directoryPath = path.join(process.cwd(), "content/notes");
  const jsonFiles: MetaData[] = [];

  function readDirectory(directory: string) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        readDirectory(fullPath);
      } else if (file === "meta.json") {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const jsonData: MetaData = JSON.parse(fileContents);
        if (jsonData.title) {
          jsonFiles.push(jsonData);
        }
      }
    });
  }

  readDirectory(directoryPath);

  return jsonFiles.sort((a, b) => {
    // sort by year, season, and title
    const [yearA, seasonA] = a.semester.split(" ");
    const [yearB, seasonB] = b.semester.split(" ");

    if (yearA !== yearB) {
      return parseInt(yearA) - parseInt(yearB);
    }

    if (seasonA !== seasonB) {
      return seasonA === "Spring" ? -1 : 1;
    }

    return a.title.localeCompare(b.title);
  });
}
