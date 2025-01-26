import { cn } from "@/lib/utils";
import Link from "next/link";
import Icon from "./Icon";
import { FlickeringGrid } from "./ui/flickering-grid";
import { MagicCard } from "./ui/magic-card";

interface CourseCardParams {
  title: string;
  description: string;
  icon: string;
  isCompleted: boolean;
  updates: boolean;
}

export default function CourseCard({
  title,
  description,
  icon,
  isCompleted,
  updates,
}: CourseCardParams) {
  const COLORS = {
    notCompleted: {
      gradientFrom: "#ff4e22",
      gradientTo: "#ff8522",
    },
    completed: {
      gradientFromDark: "#FFFFFF",
      gradientFrom: "#000000",
      gradientToDark: "#FDFDFD",
      gradientTo: "#131313",
    },
  };

  return (
    <Link href={`/notes/${title.toUpperCase()}`}>
      <MagicCard
        className="cursor-pointer"
        gradientTo={
          isCompleted
            ? COLORS.completed.gradientTo
            : COLORS.notCompleted.gradientTo
        }
        gradientFrom={
          isCompleted
            ? COLORS.completed.gradientFrom
            : COLORS.notCompleted.gradientFrom
        }
        gradientFromDark={
          isCompleted ? COLORS.completed.gradientFromDark : undefined
        }
        gradientToDark={
          isCompleted ? COLORS.completed.gradientToDark : undefined
        }
      >
        <div className="flex-grow mx-5 my-4 ">
          <div className="flex items-center w-full mb-2">
            <Icon name={icon} size={20} strokeWidth={1.5} />
            <h3 className="ml-2">{title}</h3>
          </div>
          <p className="text-sm opacity-50">{description}</p>
          <div className="flex h-5 gap-2 mt-1 text-xs">
            {!isCompleted && (
              <div className="flex items-center px-2 text-red-500 rounded-xl bg-red-500/30">
                <span>WIP</span>
              </div>
            )}
            {updates && (
              <div className="flex items-center px-2 text-green-500 bg-green-100 dark:bg-green-900 rounded-xl">
                <span className="text-nowrap">Updated recently</span>
              </div>
            )}
          </div>
        </div>
        {updates && (
          <FlickeringGrid
            className={cn(
              "[mask-image:linear-gradient(to_top_left,white,transparent,transparent)] " +
                "absolute inset-0 -z-10 size-full bottom-0 right-0 "
            )}
            squareSize={6}
            gridGap={3}
            color="#23f24c"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
        )}
      </MagicCard>
    </Link>
  );
}
