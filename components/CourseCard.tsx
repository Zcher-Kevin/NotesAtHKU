import Link from "next/link";
import Icon from "./Icon";
import { BorderBeamCard } from "./ui/border-beam";
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
  const CardWrapper = updates ? BorderBeamCard : MagicCard;

  return (
    <Link href={`/notes/${title.toUpperCase()}`}>
      <CardWrapper
        className="cursor-pointer"
        gradientTo={!isCompleted && !updates ? "#ff8522" : undefined}
        gradientFrom={!isCompleted && !updates ? "#ff4e22" : undefined}
        duration={updates ? 5 : undefined}
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
              <div className="flex items-center px-2 text-orange-500 bg-orange-500/30 rounded-xl">
                <span className="text-nowrap">Updated recently</span>
              </div>
            )}
          </div>
        </div>
      </CardWrapper>
    </Link>
  );
}
