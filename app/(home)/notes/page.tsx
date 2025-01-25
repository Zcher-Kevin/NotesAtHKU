import CourseCard from "@/components/CourseCard";
import { Step, Steps } from "@/components/Steps";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import getSortedFiles, { MetaData } from "@/lib/getSortedFiles";
import { getUpdatedFilesInLast5Days } from "@/lib/getUpdates";
import { cn } from "@/lib/utils";
import { Album } from "lucide-react";

interface GroupedCourses {
  [key: string]: MetaData[];
}

export default async function Page() {
  const sortedFiles = getSortedFiles();
  const updatedFiles = await getUpdatedFilesInLast5Days();

  // Group courses by semester
  const groupedCourses = sortedFiles.reduce<GroupedCourses>(
    (groups, course) => {
      const semester = course.semester;
      if (!groups[semester]) {
        groups[semester] = [];
      }
      groups[semester].push(course);
      return groups;
    },
    {}
  );

  return (
    <main className="">
      <div className="z-50 flex flex-col justify-center w-full max-w-3xl px-8 pt-12 mx-auto sm:pt-24">
        <Album size={64} className="mb-10" />
        <h1 className="h1 sm:text-5xl md:text-5xl lg:text-5xl">
          Notes Directory
        </h1>
        <p className="text-sm font-light sm:text-base">
          Browse notes by the year their content is based in.
          <br />
          Please keep in mind that content might not be up to date! If any
          inaccuracies of missing information is found, please contribute and
          help keep the notes up to date.
        </p>

        <Steps variant="bar">
          {Object.entries(groupedCourses).map(([semester, courses]) => (
            <>
              <Step>
                {semester}{" "}
                <span className="ml-2 text-sm font-light opacity-40">
                  ({courses.length})
                </span>
              </Step>
              <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard
                    key={course.title}
                    title={course.title}
                    description={course.description}
                    icon={course.icon}
                    isCompleted={!course.wip}
                    updates={updatedFiles.some((file) =>
                      file.includes(
                        course.title.toLowerCase().replace(/\s+/g, "-")
                      )
                    )}
                  />
                ))}
              </div>
            </>
          ))}
        </Steps>
      </div>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.2}
        duration={1}
        strokeDasharray={"10 10"}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] "
          // "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </main>
  );
}
