import CourseCard from "@/components/CourseCard";
import MarketingPageWrapper from "@/components/sections/MarketingPageWrapper";
import { Step, Steps } from "@/components/Steps";
import getSortedFiles, { MetaData } from "@/lib/getSortedFiles";
import { getUpdatedFilesInLast5Days } from "@/lib/getUpdates";
import React from "react";

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
    <MarketingPageWrapper title="Notes Directory" icon="Album">
      <p className="text-sm font-light sm:text-base">
        Browse notes by the year their content is based in.
        <br />
        Please keep in mind that content might not be up to date! If any
        inaccuracies of missing information is found, please contribute and help
        keep the notes up to date.
      </p>

      <Steps variant="bar">
        {Object.entries(groupedCourses)
          .reverse()
          .map(([semester, courses]) => (
            <React.Fragment key={semester}>
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
                      file.includes(course.title.toUpperCase())
                    )}
                  />
                ))}
              </div>
            </React.Fragment>
          ))}
      </Steps>
    </MarketingPageWrapper>
  );
}
