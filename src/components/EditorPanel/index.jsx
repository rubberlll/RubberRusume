import React, { useRef, useEffect } from "react";
import { Button, Space, Tooltip, message } from "antd";
import { UndoOutlined, RedoOutlined, ProductOutlined } from "@ant-design/icons";
import MDEditor, { commands } from "@uiw/react-md-editor";
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
import IconPickerModal from "../../IconPickerModal";
import BlockMenu from "../BlockMenu";
import TurndownService from "turndown";
import { marked } from "marked";
import "./EditorPanel.css";

export default function EditorPanel({
  leftWidth,
  dragging,
  editMode,
  setEditMode,
  htmlContent,
  setHtmlContent,
  markdownContent,
  setMarkdownContent,
  menuState,
  setMenuState,
  menuOpen,
  setMenuOpen,
  iconPickerOpen,
  setIconPickerOpen,
}) {
  const editorContentRef = useRef();
  const turndownService = new TurndownService();

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
  useEffect(() => {
    if (editMode === "code") {
      setMarkdownContent(turndownService.turndown(htmlContent));
    } else if (editMode === "wysiwyg") {
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
      if (menuOpen) return;
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
      className="editor-panel-root"
      style={{
        width: leftWidth,
        transition: dragging.current ? "none" : "width 0.2s",
      }}
    >
      {/* 顶部按钮区 */}
      <div className="editor-panel-toolbar">
        <Space>
          <Tooltip title="选择图标" placement="bottom">
            <Button
              icon={<ProductOutlined />}
              shape="circle"
              className="editor-panel-toolbar-btn"
              onClick={() => setIconPickerOpen(true)}
            />
          </Tooltip>
          <Tooltip title="撤销" placement="bottom">
            <Button
              icon={<UndoOutlined />}
              onClick={() => editor && editor.chain().focus().undo().run()}
              disabled={!editor?.can().undo()}
              shape="circle"
              className="editor-panel-toolbar-btn"
            />
          </Tooltip>
          <Tooltip title="回退" placement="bottom">
            <Button
              icon={<RedoOutlined />}
              onClick={() => editor && editor.chain().focus().redo().run()}
              disabled={!editor?.can().redo()}
              shape="circle"
              className="editor-panel-toolbar-btn"
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
              className="editor-panel-toolbar-btn"
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
      <h2 className="editor-panel-title">简历内容编辑</h2>
      {editMode === "wysiwyg" ? (
        <div className="editor-panel-content-rel">
          <EditorContent
            editor={editor}
            ref={editorContentRef}
            className="editor-panel-content"
          />
          {/* 透明激活区始终渲染 */}
          {menuState.nodeEl && (
            <div
              className="editor-panel-block-hover"
              style={{
                position: "absolute",
                top: menuState.top,
                left: menuState.left,
                height: menuState.nodeEl.offsetHeight || 32,
              }}
              onMouseEnter={() => setMenuState((m) => ({ ...m, show: true }))}
              onClick={() => {
                setMenuOpen(true);
                setMenuState((m) => ({ ...m, show: true }));
              }}
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
          className="editor-panel-md-editor"
          preview="edit"
          commands={[
            commands.bold,
            commands.italic,
            commands.orderedListCommand,
            commands.unorderedListCommand,
            commands.link,
            commands.image,
          ]}
          extraCommands={[]}
        />
      )}
    </div>
  );
}
