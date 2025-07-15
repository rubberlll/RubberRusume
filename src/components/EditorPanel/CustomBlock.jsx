import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import React from "react";

// React渲染组件
const CustomBlockView = (props) => {
  const { node, selected } = props;
  const columns = node.attrs.columns || [];
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        margin: "8px 0",
        alignItems: "stretch",
      }}
      contentEditable={false}
      data-type="custom-block"
    >
      {columns.map((col, i) => (
        <div
          key={i}
          style={{
            background: "#f5f6fa",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 16,
            color: "#222",
            fontWeight: 500,
            minWidth: 60,
            textAlign: i === columns.length - 1 ? "right" : "left",
            border: selected ? "2px solid #fa8c16" : "none",
            transition: "border 0.2s",
            whiteSpace: "pre-line",
          }}
          dangerouslySetInnerHTML={{ __html: col }}
        />
      ))}
    </div>
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
    return [
      {
        tag: 'div[data-type="custom-block"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "custom-block" }),
      0,
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(CustomBlockView);
  },
});

export default CustomBlock;
