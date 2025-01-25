import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import getSortedFiles from "@/lib/getSortedFiles";
import Link from "next/link";

export default function BottomTextScroll() {
  const files = getSortedFiles();
  const half = Math.ceil(files.length / 2);
  const firstHalf = files.slice(0, half);
  const secondHalf = files.slice(half);
  return (
    <div className="absolute bottom-0 w-full">
      <VelocityScroll defaultVelocity={0.8} numRows={1}>
        {firstHalf.map((file) => (
          <Link href={`/notes/${file.title}`} key={file.title}>
            <span className="mr-8 transition-all duration-200 hover:opacity-100 opacity-30">
              {file.title}
            </span>
          </Link>
        ))}
      </VelocityScroll>
      <VelocityScroll defaultVelocity={-0.8} numRows={1}>
        {secondHalf.map((file) => (
          <Link href={`/notes/${file.title}`} key={file.title}>
            <span className="mr-8 transition-all duration-200 hover:opacity-100 opacity-30">
              {file.title}
            </span>
          </Link>
        ))}
      </VelocityScroll>
    </div>
  );
}
