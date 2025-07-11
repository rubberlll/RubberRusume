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

import EditorPanel from "./components/EditorPanel";

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
    <div className="resume-preview-root">
      <div className="resume-preview-name">{nameMatch ? nameMatch[1] : ""}</div>
      <div className="resume-preview-icons">
        {iconLineMatch
          ? renderWithAntdIcons(replaceIcons(iconLineMatch[1]))
          : ""}
      </div>
      <hr className="resume-preview-hr" />
      <div className="resume-preview-content">
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
  const [iconTheme] = React.useState("antd");
  const [iconPickerOpen, setIconPickerOpen] = React.useState(false);
  const [editMode, setEditMode] = useState("wysiwyg");
  const [menuState, setMenuState] = useState({
    show: false,
    top: 0,
    left: 0,
    blockPos: null,
    nodeEl: null,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [htmlContent, setHtmlContent] = useState(initialHTML);
  const [markdownContent, setMarkdownContent] = useState(
    turndownService.turndown(initialHTML)
  );
  const [leftWidth, setLeftWidth] = useState(580);
  const dragging = useRef(false);
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

  return (
    <div className="app-root">
      {/* 左侧编辑器（可拖拽宽度） */}
      <EditorPanel
        leftWidth={leftWidth}
        dragging={dragging}
        editMode={editMode}
        setEditMode={setEditMode}
        htmlContent={htmlContent}
        setHtmlContent={setHtmlContent}
        markdownContent={markdownContent}
        setMarkdownContent={setMarkdownContent}
        menuState={menuState}
        setMenuState={setMenuState}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        iconPickerOpen={iconPickerOpen}
        setIconPickerOpen={setIconPickerOpen}
        onMouseDown={onMouseDown}
      />
      <div
        className="app-divider"
        style={{
          width: 8,
          cursor: "col-resize",
          background: dragging.current ? "#e0e0e0" : "#f3f4f6",
          zIndex: 10,
          transition: "background 0.2s",
        }}
        onMouseDown={onMouseDown}
      />
      {/* 右侧预览区 */}
      <div className="right-preview-scroll-hide app-preview-outer">
        <div className="right-preview-scroll-hide app-preview-inner">
          <h2 className="app-preview-title">简历预览</h2>
          <ResumePreview html={htmlContent} iconTheme={iconTheme} />
        </div>
      </div>
    </div>
  );
}

export default App;
