import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";
import remarkMath from "remark-math";
import { remarkAdmonition } from "./remarkPlugins/admonition";

export const { docs, meta } = defineDocs({
  dir: "content/",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkAdmonition, remarkMath],
    // Place it at first so that it won't be changed by syntax highlighter
    rehypePlugins: (v) => [
      [rehypeKatex, { trust: true, strict: "ignore" }],
      rehypeMermaid,
      ...v,
    ],
  },
});
