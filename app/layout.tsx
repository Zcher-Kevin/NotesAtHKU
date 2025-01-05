import getSortedFiles from "@/lib/getSortedFiles";
import { baseUrl, createMetadata } from "@/lib/metadata";
import { RootProvider } from "fumadocs-ui/provider";
import "katex/dist/katex.css";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";

const font = Geist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = createMetadata({
  title: {
    template: "%s Notes@HKU",
    default: "Notes@HKU by Jax",
  },
  description:
    "Notes at HKU is the home to hand-typed notes by students, for students.",
  metadataBase: baseUrl,
});

export default function Layout({ children }: { children: ReactNode }) {
  const sortedFiles = getSortedFiles();
  const tags = sortedFiles.map((file) => ({
    name: file.title,
    value: file.title, // assuming file has a value property
  }));

  return (
    <html lang="en" className={font.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            options: {
              defaultTag: "",
              tags,
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
