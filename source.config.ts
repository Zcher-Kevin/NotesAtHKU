import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { remarkAdmonition } from "./remarkPlugins/admonition";

export const { docs, meta } = defineDocs({
  dir: "content/notes",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkAdmonition, remarkMath],
    // Place it at first so that it won't be changed by syntax highlighter
    rehypePlugins: (v) => [
      [rehypeKatex, { trust: true, strict: "ignore" }],
      ...v,
    ],
  },
});
