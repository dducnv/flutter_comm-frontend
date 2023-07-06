import matter from "gray-matter";
import { toString } from "mdast-util-to-string";
import { remark } from "remark";
import { visit } from "unist-util-visit";

export async function getHeadings(contents: string) {
  const matterResult = matter(contents);

  const processedContent = await remark()
    .use(headingTree)
    .process(matterResult.content);

  return processedContent.data.headings;
}
function headingTree() {
  return (node: any, file: any) => {
    file.data.headings = exportHeadings(node);
  };
}
function exportHeadings(root: any) {
  const nodes = {};
  const output: any = [];
  const indexMap = {};
  visit(root, "heading", (node: any) => {
    addID(node, nodes);
    transformNode(node, output, indexMap);
  });

  return output;
}

function addID(node: any, nodes: any) {
  const id = node.children.map((c: any) => c.value).join("");
  nodes[id] = (nodes[id] || 0) + 1;
  node.data = node.data || {
    hProperties: {
      id: `${id}${nodes[id] > 1 ? ` ${nodes[id] - 1}` : ""}`
        .split(" ")
        .join("-")
        .toLowerCase(),
    },
  };
}

function transformNode(node: any, output: any, indexMap: any) {
  const transformedNode = {
    value: toString(node),
    depth: node.depth,
    data: node.data,
    children: [],
  };

  if (node.depth === 2) {
    output.push(transformedNode);
    indexMap[node.depth] = transformedNode;
  } else {
    const parent = indexMap[node.depth - 1];
    if (parent) {
      parent.children.push(transformedNode);
      indexMap[node.depth] = transformedNode;
    }
  }
}
