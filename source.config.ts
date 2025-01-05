import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export const { docs, meta } = defineDocs({
  dir: "content/notes",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkMath, { trust: true, strict: "ignore" }]],
    // Place it at first so that it won't be changed by syntax highlighter
    rehypePlugins: (v) => [
      [rehypeKatex, { trust: true, strict: "ignore" }],
      ...v,
    ],
  },
});
