import CourseFiles from "@/components/CourseFiles";
import fs from "fs";
import path from "path";

export const metadata = {
  title: "Notes@HKU Directory",
  description: "Choose a note to view",
};

function getJsonFiles() {
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
  return jsonFiles;
}

export default function Page() {
  const jsonFiles = getJsonFiles();

  const sortedFiles = jsonFiles.sort((a, b) => {
    const [yearA, seasonA] = a.description.split(" ");
    const [yearB, seasonB] = b.description.split(" ");

    if (yearA !== yearB) {
      return parseInt(yearA) - parseInt(yearB);
    }

    return seasonA === "Spring" ? -1 : 1;
  });

  return (
    <div className="flex items-center justify-center flex-grow mb-20">
      <CourseFiles sortedFiles={sortedFiles} />
    </div>
  );
}
