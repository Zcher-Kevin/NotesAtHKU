import Button from "@/components/Button";
import CourseFiles from "@/components/CourseFiles";
import { REPO } from "@/constants";
import { Github } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Notes@HKU by Jax",
  description: "Notes@HKU by Jax",
};

export default function HomePage() {
  const COMMON_STYLES =
    "border rounded-lg bg-fd-card hover:bg-fd-accent/80 hover:text-fd-accent-foreground";
  return (
    <main className="flex flex-col items-center justify-center flex-grow w-full max-w-3xl mx-auto text-center">
      <h1 className="mb-4 text-5xl font-bold">
        Concise, open, collective notes for HKU students
      </h1>
      <p className="mb-12 text-lg">Browse around!</p>
      <CourseFiles className="mb-12" />
      <div className="flex items-center gap-4">
        <p className="opacity-50">Interested in sharing your notes?</p>
        <Link href={REPO}>
          <Button iconComponent={<Github />}>Contribute</Button>
        </Link>
      </div>
    </main>
  );
}

// export default function HomePage() {
//   const COMMON_STYLES =
//     "border rounded-lg bg-fd-card hover:bg-fd-accent/80 hover:text-fd-accent-foreground";
//   return (
//     <main className="flex flex-col flex-grow w-full gap-6 p-8 lg:w-4/5 lg:mx-auto lg:flex-row">
//       <div
//         className={`flex-[7] ${COMMON_STYLES} p-10 flex flex-col justify-between`}
//       >
//         <h1>Notes @ HKU</h1>
//         <div className="">
//           <CourseFiles />
//         </div>
//       </div>
//       <div className="flex-[3] gap-6 flex lg:flex-col">
//         <div className={`flex flex-grow ${COMMON_STYLES}`}></div>
//         <div className={`flex flex-grow ${COMMON_STYLES}`}></div>
//       </div>
//     </main>
//   );
// }
