import FAB from "@/components/FAB";
import { components } from "@/components/mdx";
import { REPO_BRANCH, REPO_NAME, REPO_OWNER } from "@/constants";
import { getGithubLastEdit } from "@/lib/git-edit";
import { source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

const computerModern = localFont({
  src: [
    {
      path: "fonts/cmunrm.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "fonts/cmunti.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "fonts/cmunbx.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "fonts/cmunbi.woff",
      weight: "700",
      style: "italic",
    },
  ],
});

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const pagePath = params?.slug ? ["notes", ...params.slug] : ["notes"];
  const page = source.getPage(pagePath);
  const currentCourseCode = params.slug?.join("/").split("/")[0] || "";
  if (!page) notFound();

  const MDX = page.data.body;

  let time = undefined;

  if (process.env.ENV != "dev") {
    time = await getGithubLastEdit({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: `content/notes/${page.file.path}`,
      token: process.env.PROD_GITHUB_TOKEN || "",
    });
  }

  return (
    <>
      <DocsPage
        toc={page.data.toc}
        full={page.data.full}
        tableOfContent={{
          style: "clerk",
          single: false,
        }}
        editOnGithub={{
          repo: REPO_NAME,
          owner: REPO_OWNER,
          sha: REPO_BRANCH,
          path: page.file.path,
        }}
        article={{
          className: "max-sm:pb-16",
        }}
        lastUpdate={time ? new Date(time) : undefined}
      >
        <DocsTitle className={computerModern.className}>
          {page.data.title}
        </DocsTitle>
        <DocsDescription className={computerModern.className}>
          {page.data.description}
        </DocsDescription>
        <DocsBody className={computerModern.className}>
          <MDX components={components} />
        </DocsBody>
      </DocsPage>
      <FAB currentCourseCode={currentCourseCode} />
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const pagePath = params?.slug ? ["notes", ...params.slug] : ["notes"];
  const page = source.getPage(pagePath);
  const courseCode = params.slug?.join("/").split("/")[0] || "";
  if (!page) notFound();

  const pageTitle = page.data.title;
  let title = pageTitle + " | " + courseCode;
  if (pageTitle.endsWith("HKU")) {
    title = courseCode;
  }

  return {
    title,
    description: page.data.description,
  };
}
