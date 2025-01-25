import type { RootContent } from "mdast";
import { type Root } from "mdast";
import { type Transformer } from "unified";
import { visit } from "unist-util-visit";

export function flattenNode(node: RootContent): string {
  if ("children" in node)
    return node.children.map((child) => flattenNode(child)).join("");

  if ("value" in node) return node.value;

  return "";
}

/**
 * Remark Plugin to support Admonition syntax
 *
 * Useful when Migrating from Docusaurus
 */
export function remarkAdmonition(): Transformer<Root, Root> {
  const tag = "!!!";
  // compatible with Docusaurus

  function isIndentedOrEmpty(line: string) {
    // console.log(`line: "${line}"`);
    return line.trim() === "" || /^\s+/.test(line);
  }

  function replaceNodes(nodes: RootContent[]): RootContent[] {
    if (nodes.length === 0) return nodes;
    let open = -1,
      end = -1;

    const attributes = [];
    const re = /^!!!\s*([\w-]+)(?:\s+"([^"]+)")?/;

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].type !== "paragraph") continue;

      const text = flattenNode(nodes[i]);
      const match = text.match(re);

      if (match) {
        open = i;

        attributes.push({
          type: "mdxJsxAttribute",
          name: "variant",
          value: match[1],
        });
        if (match[2]) {
          attributes.push({
            type: "mdxJsxAttribute",
            name: "title",
            value: match[2],
          });
        }

        let j = i + 1;
        for (; j < nodes.length; j++) {
          // console.log("PROCESSING -----");
          // console.dir(nodes[j], { depth: 10 });
          const col = nodes[j].position?.start?.column || 0;
          if (col < 4) {
            // if not indented
            end = j;
            break;
          }
        }
        if (end === -1) end = nodes.length;
        break;
      }

      if (open !== -1 && text.trim() === tag) {
        end = i;
        break;
      }
    }

    if (open === -1 || end === -1) return nodes;

    return [
      ...nodes.slice(0, open),
      {
        type: "mdxJsxFlowElement",
        name: "Block",
        attributes,
        children: replaceNodes(nodes.slice(open + 1, end)),
      } as RootContent,
      ...replaceNodes(nodes.slice(end)),
    ];
  }

  return (tree) => {
    visit(tree, (node) => {
      if (!("children" in node)) return "skip";

      const result = replaceNodes(node.children);
      if (result === node.children) return;

      node.children = result;
      return "skip";
    });
  };
}
