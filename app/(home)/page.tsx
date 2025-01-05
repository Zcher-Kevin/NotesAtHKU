import Button from "@/components/Button";
import CourseFiles from "@/components/CourseFiles";
import Grid from "@/components/Grid";
import { REPO } from "@/constants";
import { Blocks, Flame, Github, Rewind } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center flex-grow w-full h-screen max-w-3xl px-6 mx-auto text-center -m-14">
        <h1 className="mb-4 text-4xl font-extrabold tracking-wide sm:text-5xl md:text-6xl lg:leading-tight lg:text-7xl">
          <span className="relative whitespace-nowrap">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-3/4 h-[0.58em] w-full fill-fd-foreground"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
            </svg>
            <span className="relative text-opacity-100">Open notes </span>
          </span>
          <span className="opacity-80">for HKU students</span>
        </h1>
        <p className="mb-12">Hand-typed notes by students, for students.</p>
        <CourseFiles className="mb-12" />
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-sm text-left opacity-80 md:text-base">
            Interested in sharing your notes?
          </p>
          <Link href={REPO}>
            <Button iconComponent={<Github />}>Contribute</Button>
          </Link>
        </div>
      </main>
      <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none">
        <Grid
          lineThickness={0.5}
          rows={15}
          columns={15}
          className={`absolute w-screen aspect-video bottom-0 text-fd-foreground opacity-40 ${styles.grid}`}
        />
      </div>
      <section className="relative z-10 grid grid-cols-1 py-10 mx-auto mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl max-sm:p-0 max-sm:mx-0 max-sm:w-full">
        <B icon={<Rewind />} title="Background">
          Notes@HKU was created to provide a centralized platform for students
          at the University of Hong Kong to access and share their study notes.
          The initiative aims to foster a collaborative learning environment
          where students can benefit from the collective knowledge and efforts
          of their peers.
        </B>
        <B icon={<Flame />} title="Why open?">
          By keeping the notes open and accessible, we ensure that every
          student, regardless of their background or financial situation, has
          the opportunity to access high-quality study materials. This openness
          promotes inclusivity and equal learning opportunities for all
          students.
        </B>
        <B icon={<Blocks />} title="Concise, clear, straight to the point.">
          Our notes are designed to be concise and clear, focusing on the most
          important concepts and information. This approach helps students
          quickly grasp the key points without getting overwhelmed by
          unnecessary details, making their study sessions more efficient and
          effective.
        </B>
        <B
          icon={<Github />}
          title="Contributions welcome!"
          className="border-r-0"
        >
          Contributions are welcomed! It can be as easy as leaving a comment
          about inaccurate information or as involved as submitting a pull
          request to add new notes!
        </B>
      </section>
    </>
  );
}

function B({
  icon,
  title,
  children,
  className,
  ...props
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={`relative flex flex-col py-10 text-left border-r group/feature border-neutral-800 dark:border-neutral-800 ${className}`}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full transition duration-200 opacity-0 pointer-events-none group-hover/feature:opacity-100 bg-gradient-to-t from-neutral-300 dark:from-neutral-800 to-transparent"></div>
      <div className="relative z-10 px-10 mb-4">{icon}</div>
      <div className="relative z-10 px-10 mb-2 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 w-1 h-6 transition-all duration-200 origin-center rounded-tr-full rounded-br-full group-hover/feature:h-8 bg-neutral-700 group-hover/feature:bg-white"></div>
        <h2 className="inline-block transition duration-200 group-hover/feature:translate-x-2 ">
          {title}
        </h2>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm ">{children}</p>
    </div>
  );
}
