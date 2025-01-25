import { REPO } from "@/constants";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <span>Notes@HKU</span>
        <span className="text-xs font-normal opacity-40"> by Jax</span>
      </>
    ),
  },
  githubUrl: REPO,
  links: [
    {
      text: "Browse Notes",
      url: "/notes",
      active: "nested-url",
    },
  ],
};
