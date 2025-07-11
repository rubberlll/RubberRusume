// import { useState } from "react";

import "./App.css";
import CodeMirror from "@uiw/react-codemirror";
import MDEditor, { commands } from "@uiw/react-md-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import Placeholder from "@tiptap/extension-placeholder";
import {
  UndoOutlined,
  RedoOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  ProductOutlined,
  AppstoreOutlined,
  SmileOutlined,
  SettingOutlined,
  HeartOutlined,
  StarOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Space, Select, Tooltip, Modal, message } from "antd";
import "antd/dist/reset.css";
import React, { useRef, useState, useEffect } from "react";
import Split from "react-split";
import "./split.css";
import IconPickerModal from "./IconPickerModal";
import TurndownService from "turndown";
import { marked } from "marked";
import BlockMenu from "./components/BlockMenu";

function ResumePreview({ html, iconTheme }) {
  // iconTheme: 'antd'（目前只支持 antd，可扩展）
  const iconMap = {
    antd: {
      "icon:user": <UserOutlined style={{ marginRight: 4 }} />,
      "icon:phone": <PhoneOutlined style={{ marginRight: 4 }} />,
      "icon:email": <MailOutlined style={{ marginRight: 4 }} />,
    },
  };
  // 替换所有 icon:xxx
  const replaceIcons = (str) =>
    str.replace(/icon:(user|phone|email)/g, (m) => {
      const icon = iconMap[iconTheme]?.[m];
      // 用 span 占位，后续 React 渲染
      return icon ? `<span data-icon="${m}"></span>` : m;
    });

  // 解析 ::: start N ... ::: end 块，返回 {before, blocks, after}
  function parseCustomBlocks(str) {
    const blockRegex = /::: *start *(\d+)\s*([\s\S]*?)::: *end/g;
    let lastIndex = 0;
    let parts = [];
    let match;
    while ((match = blockRegex.exec(str))) {
      // 前面的普通内容
      if (match.index > lastIndex) {
        parts.push({
          type: "normal",
          content: str.slice(lastIndex, match.index),
        });
      }
      // 块内容
      parts.push({
        type: "block",
        columns: parseInt(match[1], 10),
        content: match[2].trim(),
      });
      lastIndex = blockRegex.lastIndex;
    }
    // 最后剩余内容
    if (lastIndex < str.length) {
      parts.push({ type: "normal", content: str.slice(lastIndex) });
    }
    return parts;
  }

  // 提取姓名
  const nameMatch = html.match(/<h2[^>]*>(.*?)<\/h2>/);
  // 提取icon行
  const iconLineMatch = html.match(/<p>(icon:[^<]+)<\/p>/);

  // 其余内容
  let restHtml = html
    .replace(/<h2[^>]*>.*?<\/h2>/, "")
    .replace(/<p>(icon:[^<]+)<\/p>/, "");
  restHtml = replaceIcons(restHtml);

  // 渲染带有 antd icon 的 HTML
  function renderWithAntdIcons(htmlStr) {
    // 用正则找到所有 <span data-icon="icon:xxx"></span>
    const parts = htmlStr.split(
      /(<span data-icon="icon:(user|phone|email)"><\/span>)/g
    );
    return parts.map((part, i) => {
      const match = part.match(
        /<span data-icon="(icon:(user|phone|email))"><\/span>/
      );
      if (match) {
        return React.cloneElement(iconMap[iconTheme][match[1]], {
          key: `icon-${i}`,
        });
      }
      return (
        <span key={`txt-${i}`} dangerouslySetInnerHTML={{ __html: part }} />
      );
    });
  }

  // 渲染自定义块
  function renderCustomBlock(columns, content, key) {
    // 按行分割，去除空行
    const items = content
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    // 如果不足 N 列，补空
    while (items.length < columns) items.push("");
    // 只取前 N 个
    const cols = items.slice(0, columns);
    return (
      <div
        key={key}
        style={{
          display: "flex",
          gap: 16,
          margin: "16px 0",
        }}
      >
        {cols.map((item, idx) => (
          <div key={idx} style={{ flex: 1, minWidth: 0 }}>
            {renderWithAntdIcons(item)}
          </div>
        ))}
      </div>
    );
  }

  // 解析所有块
  const parsedParts = parseCustomBlocks(restHtml);

  return (
    <div style={{ fontFamily: '"思源黑体", Arial, sans-serif', color: "#222" }}>
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 8,
          letterSpacing: 2,
        }}
      >
        {nameMatch ? nameMatch[1] : ""}
      </div>
      <div style={{ marginBottom: 16, color: "#666", fontSize: 16 }}>
        {iconLineMatch
          ? renderWithAntdIcons(replaceIcons(iconLineMatch[1]))
          : ""}
      </div>
      <hr
        style={{
          border: "none",
          borderTop: "1.5px solid #eee",
          margin: "24px 0",
        }}
      />
      <div style={{ fontSize: 17 }}>
        {parsedParts.map((part, i) =>
          part.type === "block"
            ? renderCustomBlock(part.columns, part.content, i)
            : renderWithAntdIcons(part.content)
        )}
      </div>
    </div>
  );
}

function App() {
  const [iconTheme] = React.useState("antd");
  const [iconPickerOpen, setIconPickerOpen] = React.useState(false);
  const [editMode, setEditMode] = useState("wysiwyg"); // 新增编辑模式
  const [menuState, setMenuState] = useState({
    show: false,
    top: 0,
    left: 0,
    blockPos: null,
    nodeEl: null,
  });
  const [menuOpen, setMenuOpen] = useState(false); // 菜单是否强制打开
  const editorContentRef = useRef();

  // 主内容状态
  const initialHTML = `
      <h2>张字轩</h2>
      <p>icon:user 男 / 2005.2</p>
      <p>icon:phone 18992204601 icon:email 2405206056@qq.com</p>
      <h3>教育背景</h3>
      <p>陕西科技大学，计算机科学与技术，本科 <b>2022.09 - 2026.06</b></p>
      <p>证书：CET-6</p>
      <p>主修课程：网络应用程序设计，计算机网络，操作系统，编译原理</p>
      <h3>专业技能</h3>
      <ul>
        <li>熟悉常见的HTML及HTML5元素，CSS/CSS3的基本语法与布局，能够精确还原设计稿</li>
        <li>熟悉掌握JavaScript及ES6语法特性，理解this指向、作用域、箭头函数、Promise等使用</li>
        <li>熟悉掌握JavaScript及ES6语法特性，理解this指向、作用域、箭头函数、Promise等使用</li>
        <li>熟悉掌握JavaScript及ES6语法特性，理解this指向、作用域、箭头函数、Promise等使用</li>
        <li>熟悉掌握JavaScript及ES6语法特性，理解this指向、作用域、箭头函数、Promise等使用</li>
      </ul>
    `;
  const turndownService = new TurndownService();
  const [htmlContent, setHtmlContent] = useState(initialHTML);
  const [markdownContent, setMarkdownContent] = useState(
    turndownService.turndown(initialHTML)
  );

  const [leftWidth, setLeftWidth] = useState(580); // 初始宽度
  const dragging = useRef(false);

  // 拖拽事件
  const onMouseDown = () => {
    dragging.current = true;
    document.body.style.cursor = "col-resize";
  };
  React.useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      const min = 480;
      let newWidth = e.clientX;
      if (newWidth < min) newWidth = min;
      setLeftWidth(newWidth);
    };
    const onMouseUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // Tiptap 编辑器实例
  const editor = useEditor({
    extensions: [
      StarterKit,
      Blockquote,
      CodeBlock,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({ levels: [1, 2, 3] }),
      HorizontalRule,
      Dropcursor,
      Gapcursor,
      Placeholder.configure({
        placeholder: "请输入简历内容，可插入标题、列表、代码块等...",
      }),
    ],
    content: htmlContent,
    onUpdate: ({ editor }) => {
      if (editMode === "wysiwyg") {
        setHtmlContent(editor.getHTML());
        setMarkdownContent(turndownService.turndown(editor.getHTML()));
      }
    },
  });

  // 切换模式时内容互转
  React.useEffect(() => {
    if (editMode === "code") {
      // 切换到源码模式，将 htmlContent 转为 markdown
      setMarkdownContent(turndownService.turndown(htmlContent));
    } else if (editMode === "wysiwyg") {
      // 切换到所见即所得，将 markdownContent 转为 html
      setHtmlContent(marked.parse(markdownContent));
      editor && editor.commands.setContent(marked.parse(markdownContent));
    }
    // eslint-disable-next-line
  }, [editMode]);

  // Markdown 编辑器内容变更
  const handleMarkdownChange = (val) => {
    setMarkdownContent(val || "");
    setHtmlContent(marked.parse(val || ""));
  };

  // 鼠标移动时判断当前块，吸附菜单
  useEffect(() => {
    if (editMode !== "wysiwyg" || !editor) return;
    const dom = editorContentRef.current;
    if (!dom) return;
    let lastNodeEl = null;
    const handler = (e) => {
      if (menuOpen) return; // 菜单强制打开时不响应 hover
      let nodeEl = e.target;
      while (nodeEl && nodeEl !== dom) {
        if (
          nodeEl.nodeType === 1 &&
          ["P", "H1", "H2", "H3", "H4", "H5", "H6", "LI"].includes(
            nodeEl.tagName
          )
        ) {
          if (lastNodeEl !== nodeEl) {
            const rect = nodeEl.getBoundingClientRect();
            const parentRect = dom.getBoundingClientRect();
            setMenuState({
              show: true,
              top: rect.top - parentRect.top + 4,
              left: -44,
              blockPos: editor.view.posAtDOM(nodeEl, 0),
              nodeEl,
            });
            lastNodeEl = nodeEl;
          }
          return;
        }
        nodeEl = nodeEl.parentNode;
      }
      setMenuState((m) => (m.show ? { ...m, show: false } : m));
      lastNodeEl = null;
    };
    dom.addEventListener("mousemove", handler);
    dom.addEventListener("mouseleave", () =>
      setMenuState((m) => ({ ...m, show: false }))
    );
    return () => {
      dom.removeEventListener("mousemove", handler);
    };
  }, [editMode, editor, menuOpen]);

  // 菜单操作
  const handleAddRow = () => {
    if (!editor || menuState.blockPos == null) return;
    editor
      .chain()
      .focus()
      .insertContentAt(menuState.blockPos, "<p>新的一行</p>")
      .run();
    setMenuOpen(false);
    setMenuState((m) => ({ ...m, show: false }));
  };
  const handleDelete = () => {
    if (!editor || menuState.blockPos == null) return;
    editor
      .chain()
      .focus()
      .deleteRange({ from: menuState.blockPos, to: menuState.blockPos + 1 })
      .run();
    setMenuOpen(false);
    setMenuState((m) => ({ ...m, show: false }));
  };
  const handleLayout = (cols) => {
    if (!editor || menuState.blockPos == null) return;
    let html =
      cols === 2
        ? '<div style="display:flex;gap:16px"><div style="flex:1">左列</div><div style="flex:1">右列</div></div>'
        : '<div style="display:flex;gap:16px"><div style="flex:1">列1</div><div style="flex:1">列2</div><div style="flex:1">列3</div></div>';
    editor.chain().focus().insertContentAt(menuState.blockPos, html).run();
    setMenuOpen(false);
    setMenuState((m) => ({ ...m, show: false }));
  };
  const handleCopy = () => {
    if (!menuState.nodeEl) return;
    const text = menuState.nodeEl.innerText;
    navigator.clipboard.writeText(text);
    setMenuOpen(false);
    setMenuState((m) => ({ ...m, show: false }));
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#f7f8fa",
      }}
    >
      {/* 左侧编辑器（可拖拽宽度） */}
      <div
        style={{
          width: leftWidth,
          minWidth: 0,
          padding: "24px 24px 24px 44px", // 左侧加大内边距
          overflow: "auto",
          background: "#fff",
          borderRight: "1px solid #eee",
          transition: dragging.current ? "none" : "width 0.2s",
          position: "relative",
        }}
      >
        {/* 顶部按钮区 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 16,
            justifyContent: "space-between",
          }}
        >
          <Space>
            <Tooltip title="选择图标" placement="bottom">
              <Button
                icon={<ProductOutlined />}
                shape="circle"
                style={{ fontSize: 20 }}
                onClick={() => setIconPickerOpen(true)}
              />
            </Tooltip>
            <Tooltip title="撤销" placement="bottom">
              <Button
                icon={<UndoOutlined />}
                onClick={() => editor && editor.chain().focus().undo().run()}
                disabled={!editor?.can().undo()}
                shape="circle"
                style={{ fontSize: 18 }}
              />
            </Tooltip>
            <Tooltip title="回退" placement="bottom">
              <Button
                icon={<RedoOutlined />}
                onClick={() => editor && editor.chain().focus().redo().run()}
                disabled={!editor?.can().redo()}
                shape="circle"
                style={{ fontSize: 18 }}
              />
            </Tooltip>
          </Space>
          <Space>
            <Tooltip
              title={
                editMode === "wysiwyg" ? "切换为源码模式" : "切换为所见即所得"
              }
              placement="bottom"
            >
              <Button
                onClick={() =>
                  setEditMode(editMode === "wysiwyg" ? "code" : "wysiwyg")
                }
                shape="round"
              >
                {editMode === "wysiwyg" ? "源码模式" : "所见即所得"}
              </Button>
            </Tooltip>
          </Space>
          <IconPickerModal
            open={iconPickerOpen}
            onClose={() => setIconPickerOpen(false)}
            onCopy={(key) => {
              if (key) {
                setTimeout(() => message.success(`已复制: ${key}`), 200);
              } else {
                setTimeout(() => message.error("复制失败"), 200);
              }
            }}
          />
        </div>
        <h2 style={{ marginTop: 0 }}>简历内容编辑</h2>
        {editMode === "wysiwyg" ? (
          <div style={{ position: "relative" }}>
            <EditorContent
              editor={editor}
              ref={editorContentRef}
              style={{
                background: "#fff",
                borderRadius: 8,
                minHeight: 600,
                padding: 16,
                textAlign: "left",
                boxShadow: "0 2px 8px #0001",
              }}
            />
            {/* 透明激活区始终渲染 */}
            {menuState.nodeEl && (
              <div
                style={{
                  position: "absolute",
                  top: menuState.top,
                  left: menuState.left,
                  width: 40,
                  height: menuState.nodeEl.offsetHeight || 32,
                  cursor: "pointer",
                  zIndex: 10,
                  background: "transparent",
                }}
                onMouseEnter={() => setMenuState((m) => ({ ...m, show: true }))}
              />
            )}
            {menuState.show && (
              <BlockMenu
                top={menuState.top}
                left={menuState.left}
                onAddRow={handleAddRow}
                onDelete={handleDelete}
                onLayout={handleLayout}
                onCopy={handleCopy}
                onClose={() => {
                  setMenuOpen(false);
                  setMenuState((m) => ({ ...m, show: false }));
                }}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            )}
          </div>
        ) : (
          <MDEditor
            value={markdownContent}
            height={600}
            onChange={handleMarkdownChange}
            style={{ background: "#fff", borderRadius: 8 }}
            preview="edit"
            commands={[
              commands.bold,
              commands.italic,
              commands.orderedListCommand,
              commands.unorderedListCommand,
              commands.link,
              commands.image,
            ]}
            extraCommands={[commands.codeEdit, commands.codePreview]}
          />
        )}
      </div>

      <div
        style={{
          width: 8,
          cursor: "col-resize",
          background: dragging.current ? "#e0e0e0" : "#f3f4f6",
          zIndex: 10,
          transition: "background 0.2s",
        }}
        onMouseDown={onMouseDown}
      />
      {/* 右侧预览区（flex:1自适应） */}
      <div
        className="right-preview-scroll-hide"
        style={{
          flex: 1,
          height: "100vh",
          background: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
        }}
      >
        <div
          className="right-preview-scroll-hide"
          style={{
            background: "#fff",
            borderRadius: 16,
            minHeight: 600,
            padding: 40,
            width: "100%",
            maxWidth: 800,
            boxShadow: "0 2px 24px #0001",
            margin: "0 auto",
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <h2 style={{ marginTop: 0, textAlign: "center" }}>简历预览</h2>
          <ResumePreview html={htmlContent} iconTheme={iconTheme} />
        </div>
      </div>
    </div>
  );
}

export default App;
