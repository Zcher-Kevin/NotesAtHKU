import { buttonVariants } from "@/components/Button";
import { Separator } from "@/components/Seperator";
import { TextAnimate } from "@/components/ui/text-animate";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { GridPattern } from "../ui/grid-pattern";
import BottomTextScroll from "./BottomTextScroll";

export default function Hero() {
  return (
    <>
      <main className="text-center -mt-14">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          )}
        />
        <div className="z-50 flex flex-col items-center justify-center w-full h-screen max-w-3xl px-8 mx-auto mb-16">
          <div
            className={cn(
              "group rounded-full border border-black bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800 mb-8"
            )}
          >
            <Link
              href={"/notes/"}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                }),
                "rounded-full"
              )}
            >
              🚧
              <Separator className="h-4 mx-2" orientation="vertical" />
              Spring 2025 Notes WIP!
              <ChevronRight className="w-4 h-4 ml-1 text-muted-foreground" />
            </Link>
          </div>
          <h1 className="h1">Open notes for HKU students</h1>
          <p className="mb-16 md:text-lg">
            <b>10+ </b>
            <TextAnimate animation={"blurInUp"} as="span" staggerTime={0.02}>
              open source, hand-typed notes for various courses by students, for
              students at HKU.
            </TextAnimate>
            {"  "}
            <TextAnimate animation={"blurInUp"} as="span" delay={1.1}>
              Learn easier,
            </TextAnimate>{" "}
            <TextAnimate animation={"blurInUp"} as="b" delay={1.25}>
              together.
            </TextAnimate>
          </p>

          <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row">
            <Link
              href="/notes/"
              className={cn(
                buttonVariants({
                  variant: "rainbow",
                  size: "lg",
                }),
                "w-full gap-2 text-nowrap"
              )}
            >
              Browse all Notes
              <ChevronRight className="ml-1 transition-all duration-300 ease-out size-4 shrink-0 group-hover:translate-x-1" />
            </Link>
            <Link
              href={"/contribute/"}
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "rainbow-outline",
                }),
                "w-full gap-2 text-nowrap"
              )}
            >
              Contribution Guide
              <ChevronRight className="ml-1 transition-all duration-300 ease-out size-4 shrink-0 group-hover:translate-x-1" />
            </Link>
          </div>

          <BottomTextScroll />
        </div>
      </main>
    </>
  );
}
