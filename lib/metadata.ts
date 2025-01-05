import { REPO_NAME } from "@/constants";
import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: "https://" + REPO_NAME,
      images: "/banner.png", // TODO: UPDATE
      siteName: "Notes@HKU",
      ...override.openGraph,
    },
    // twitter: {
    //   card: "summary_large_image",
    //   creator: "@money_is_shark",
    //   title: override.title ?? undefined,
    //   description: override.description ?? undefined,
    //   images: "/banner.png",
    //   ...override.twitter,
    // },
  };
}

export const baseUrl = new URL("https://" + REPO_NAME);
