import { REPO } from "@/constants";
import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: REPO,
      images: "/banner.png",
      siteName: "Notes@HKU",
      ...override.openGraph,
    },
  };
}

export const baseUrl = new URL(REPO);
