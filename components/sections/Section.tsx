import { cn } from "@/lib/utils";
import { Blocks, Flame, Github, Rewind } from "lucide-react";
import { FlickeringGrid } from "../ui/flickering-grid";

export default function Section() {
  return (
    <section className="relative w-full border-t-[1pt] border-t-gray-400/30">
      <div className="relative z-10 grid grid-cols-1 px-10 py-32 mx-auto mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl ">
        <B icon={<Rewind />} title="Background">
          Notes@HKU was set up to give students at the University of Hong Kong a
          one-stop spot to find and share their study notes. The goal is to
          create a space where everyone can chip in and learn from each other.
        </B>
        <B icon={<Flame />} title="Why open?">
          We believe we can learn easier, together. By collaborating and sharing
          our notes, we can help each other out and make studying a little less
          stressful.
        </B>
        <B icon={<Blocks />} title="Concise, clear, straight to the point.">
          Our notes are all about being short and sweet, focusing on the key
          stuff. This way, students can quickly get the main ideas without
          getting bogged down by too much info, making their study time more
          productive.
        </B>
        <B
          icon={<Github />}
          title="Contributions welcome!"
          className="border-r-0"
        >
          We love contributions! Whether it{"'"}s just a comment about something
          that{"'"}s off or a full-on pull request to add new notes, every bit
          helps!
        </B>
      </div>
      <FlickeringGrid
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] " +
            "absolute inset-0 -z-10 size-full"
        )}
        squareSize={10}
        gridGap={5}
        color="#6B7280"
        maxOpacity={0.3}
        flickerChance={0.1}
      />
    </section>
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
      className={`relative flex flex-col py-10 text-left border-0 sm:border-r group/feature border-neutral-800 dark:border-neutral-800 ${className}`}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full transition duration-200 opacity-0 pointer-events-none group-hover/feature:opacity-100 bg-gradient-to-t from-neutral-300 dark:from-neutral-800 to-transparent"></div>
      <div className="relative z-10 px-10 mb-4">{icon}</div>
      <div className="relative z-10 px-10 mb-2 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 w-1 h-6 transition-all duration-200 origin-center rounded-tr-full rounded-br-full group-hover/feature:h-8 bg-neutral-700 dark:group-hover/feature:bg-white group-hover/feature:bg-black"></div>
        <h2 className="inline-block transition duration-200 group-hover/feature:translate-x-2 ">
          {title}
        </h2>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm ">{children}</p>
    </div>
  );
}
