// import { useState } from "react";

import "./App.css";

import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";

import "antd/dist/reset.css";
import React, { useRef, useState } from "react";
import "./split.css";

import TurndownService from "turndown";

import EditorPanel from "./components/EditorPanel";
import ResumePreview from "./components/ResumePreview";
import FontStyleConfigPanel from "./components/FontStyleConfigPanel";
import HeaderBar from "./components/HeaderBar";
import { ConfigProvider } from "antd";
import { message } from "antd";
import { App as AntdApp } from "antd";
message.config({ getContainer: () => document.body });

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

  const defaultStyleConfig = {
    h1: { fontSize: 30, marginTop: 0, marginBottom: 20 },
    h2: { fontSize: 20, marginTop: 10, marginBottom: 2 },
    h3: { fontSize: 13, marginTop: 8, marginBottom: 5 },
    h4: { fontSize: 13, marginTop: 8, marginBottom: 5 },
    h5: { fontSize: 13, marginTop: 8, marginBottom: 5 },
    h6: { fontSize: 13, marginTop: 8, marginBottom: 5 },
    p: { fontSize: 13, marginTop: 0, marginBottom: 8 },
    li: { fontSize: 13, marginTop: 0, marginBottom: 1 },
    b: { fontSize: 13, marginTop: 0, marginBottom: 0 },
  };
  const [styleConfig, setStyleConfig] = useState(defaultStyleConfig);
  const [fontPanelOpen, setFontPanelOpen] = useState(false);

  // 保存简历内容到 localStorage
  const handleSave = () => {
    localStorage.setItem("resume_html", htmlContent);
    localStorage.setItem("resume_markdown", markdownContent);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff7a00",
          colorLink: "#ff7a00",
          colorLinkHover: "#ff9900",
        },
      }}
    >
      <AntdApp>
        <div className="app-root">
          <HeaderBar onSave={handleSave} />
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
            setFontPanelOpen={setFontPanelOpen}
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
              <ResumePreview
                html={htmlContent}
                iconTheme={iconTheme}
                styleConfig={styleConfig}
              />
              <FontStyleConfigPanel
                open={fontPanelOpen}
                value={styleConfig}
                onOk={(cfg) => {
                  setStyleConfig(cfg);
                  setFontPanelOpen(false);
                }}
                onCancel={() => setFontPanelOpen(false)}
              />
            </div>
          </div>
        </div>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
