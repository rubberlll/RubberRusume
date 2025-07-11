// import { useState } from "react";

import "./App.css";
import CodeMirror from "@uiw/react-codemirror";
import MDEditor from "@uiw/react-md-editor";
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
} from "@ant-design/icons";
import { Button, Space, Select } from "antd";
import "antd/dist/reset.css";
import React from "react";
import Split from "react-split";
import "./split.css";

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
        return iconMap[iconTheme][match[1]];
      }
      return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  }

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
      <div style={{ fontSize: 17 }}>{renderWithAntdIcons(restHtml)}</div>
    </div>
  );
}

function App() {
  const [iconTheme, setIconTheme] = React.useState("antd");
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
    content: `
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
      </ul>
    `,
  });

  return (
    <Split
      className="split-pane"
      sizes={[35, 65]}
      minSize={[280, 400]}
      gutterSize={8}
      snapOffset={0}
      direction="horizontal"
      style={{ height: "100vh", background: "#f7f8fa" }}
    >
      {/* 左侧编辑器 */}
      <div
        style={{
          height: "100%",
          padding: 24,
          overflow: "auto",
          borderRight: "1px solid #eee",
          background: "#fff",
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
            <Button
              icon={<UndoOutlined />}
              onClick={() => editor && editor.chain().focus().undo().run()}
              disabled={!editor?.can().undo()}
            >
              撤销
            </Button>
            <Button
              icon={<RedoOutlined />}
              onClick={() => editor && editor.chain().focus().redo().run()}
              disabled={!editor?.can().redo()}
            >
              重做
            </Button>
          </Space>
          <Space>
            <Select
              value={iconTheme}
              style={{ width: 120 }}
              onChange={setIconTheme}
              options={[{ value: "antd", label: "Antd 图标" }]}
            />
          </Space>
        </div>
        <h2 style={{ marginTop: 0 }}>简历内容编辑</h2>
        <EditorContent
          editor={editor}
          style={{
            background: "#fff",
            borderRadius: 8,
            minHeight: 600,
            padding: 16,
            textAlign: "left",
            boxShadow: "0 2px 8px #0001",
          }}
        />
      </div>
      {/* 右侧预览区 */}
      <div
        style={{
          height: "100%",
          padding: 40,
          overflow: "auto",
          background: "#f7f8fa",
        }}
      >
        <h2 style={{ marginTop: 0 }}>简历预览</h2>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            minHeight: 600,
            padding: 32,
            maxWidth: 800,
            margin: "0 auto",
            boxShadow: "0 2px 16px #0002",
          }}
        >
          <ResumePreview html={editor?.getHTML() || ""} iconTheme={iconTheme} />
        </div>
      </div>
    </Split>
  );
}

export default App;
