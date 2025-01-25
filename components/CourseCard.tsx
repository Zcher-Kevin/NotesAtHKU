import { Flame } from "lucide-react";
import Link from "next/link";
import Icon from "./Icon";
import { BorderBeamCard } from "./ui/border-beam";
import { MagicCard } from "./ui/magic-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
      >
        <div className="flex-grow mx-5 my-4 ">
          <div className="flex items-center w-full mb-2">
            <Icon name={icon} size={20} strokeWidth={1.5} />
            <h3 className="ml-2">{title}</h3>
            <TooltipProvider delayDuration={200}>
              <div className="absolute flex items-center justify-end flex-grow gap-2 top-2 right-2 ">
                {!isCompleted && (
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </TooltipTrigger>
                    <TooltipContent>Work in progress!</TooltipContent>
                  </Tooltip>
                )}
                {updates && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Flame size={18} strokeWidth={1.5} color={"#ff7300"} />
                    </TooltipTrigger>
                    <TooltipContent>Updated in the last 5 days!</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </TooltipProvider>
          </div>
          <p className="text-sm opacity-50">{description}</p>
        </div>
      </CardWrapper>
    </Link>
  );
}
