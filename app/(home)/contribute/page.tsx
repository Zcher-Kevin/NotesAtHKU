import { components } from "@/components/mdx";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsBody, DocsPage } from "fumadocs-ui/page";
import { HandHeart } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Page() {
  const page = source.getPage(["docs/contribute"]);
  if (!page) return notFound();
  const MDX = page.data.body;
  return (
    <>
      <main className="">
        <DocsLayout
          tree={{ name: "", children: [] }}
          sidebar={{ enabled: false }}
          nav={{ enabled: false }}
          containerProps={{ className: "absolute w-full" }}
        >
          <DocsPage
            tableOfContent={{
              style: "clerk",
              single: false,
            }}
            toc={page.data.toc}
          >
            <HandHeart size={64} className="mt-20" />
            <h1 className="h1 sm:text-5xl md:text-5xl lg:text-5xl">
              Contribution Guide
            </h1>
            <DocsBody>
              <MDX components={components} />
            </DocsBody>
          </DocsPage>
        </DocsLayout>
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
    </>
  );
}
