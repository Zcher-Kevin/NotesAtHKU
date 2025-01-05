import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
  links: [],
  sidebar: {
    tabs: {
      transform(option, node) {
        const meta = source.getNodeMeta(node);
        if (!meta) return option;
        // @ts-expect-error New property
        const isWip = meta.data.wip;

        return {
          ...option,
          title: isWip ? (
            <span className="flex items-center">
              <span className="text-sm font-medium">{meta.data.title}</span>
              <span
                className="px-2 ml-2 rounded-md bg-gradient-to-t from-fd-background/80"
                style={{
                  color: `#F15550`,
                  backgroundColor: `hsla(0, 100%, 75%, 0.3)`,
                }}
              >
                {/* @ts-expect-error New property */}
                {meta.data.semester.slice(2)}
              </span>
            </span>
          ) : (
            meta.data.title
          ),
          icon: isWip ? (
            <div
              className="rounded-md border bg-gradient-to-t from-fd-background/80 p-1 shadow-md [&_svg]:size-5"
              style={{
                color: `#F15550`,
                backgroundColor: `hsla(0, 100%, 75%, 0.3)`,
              }}
            >
              {node.icon}
            </div>
          ) : (
            <div
              className="rounded-md border bg-gradient-to-t from-fd-background/80 p-1 shadow-md [&_svg]:size-5"
              style={{
                color: `#A8B1FF`,
                backgroundColor: `hsla(240, 100%, 75%, 0.3)`,
              }}
            >
              {node.icon}
            </div>
          ),
        };
      },
    },
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
