import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import React from "react";
import { marked } from "marked";

// React渲染组件
const CustomBlockView = (props) => {
  const { node, selected } = props;
  const columns = node.attrs.columns || [];
  return (
    <NodeViewWrapper
      className="flex-layout"
      contentEditable={false}
      data-type="custom-block"
    >
      {columns.map((col, i) => (
        <div
          key={i}
          className="flex-layout-item"
          style={{
            border: selected ? "2px solid #fa8c16" : "2px solid #fa8c16",
          }}
          dangerouslySetInnerHTML={{ __html: marked.parse(col) }}
        />
      ))}
    </NodeViewWrapper>
  );
};

// Tiptap扩展
const CustomBlock = Node.create({
  name: "customBlock",
  group: "block",
  atom: true,
  selectable: true,
  addAttributes() {
    return {
      columns: {
        default: [],
        parseHTML: (el) => {
          const cols = el.getAttribute("data-cols");
          return cols ? JSON.parse(cols) : [];
        },
        renderHTML: (attrs) => {
          return { "data-cols": JSON.stringify(attrs.columns) };
        },
      },
    };
  },
  parseHTML() {
    console.log("---");
    return [
      {
        tag: "custom-block",
        getAttrs: (el) => {
          const cols = el.getAttribute("data-cols");
          return { columns: cols ? JSON.parse(cols) : [] };
        },
      },
      {
        tag: 'div[data-type="custom-block"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "custom-block" }),
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(CustomBlockView);
  },
});

export default CustomBlock;
