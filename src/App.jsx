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
  <h1>前端高级开发工程师 - 冰之帝王</h1>
  <p>(+86) 114-5146-6666 ｜ bingwang@163.com ｜ 微信号：iceking</p>
  <h2>工作经历</h2>
  ::: start <b>2021.04 - 至今</b>
  ::: <b>字节跳动</b>
  ::: <b>用户产品研发部</b>
  ::: <b>用户产品研发部</b>
  ::: <b>前端高级开发工程师</b>
  ::: end
  <ul>
    <li><b>背景：</b> 公司业务快速增长，核心页面面临<b>千万级并发用户</b>挑战，需要高性能 可扩展的前端架构</li>
    <li><b>职责：</b> 负责高性能前端渲染引擎开发与优化，设计分布式前端资源治理系统，解决大规模组件复用与加载性能问题</li>
    <li><b>成果：</b> 优化渲染引擎性能提升 40%，首屏加载时间降低 35%；设计微前端解决方案，支撑日均百亿级页面访问</li>
  </ul>
  ::: start <b>2019.08 - 2021.03</b>
  ::: <b>蚂蚁集团</b>
  ::: <b>体验技术团队</b>
  ::: <b>前端开发工程师</b>
  ::: end
  <ul>
    <li><b>背景：</b> 支付宝核心交易页面需要高性能、高可靠的前端架构支持，保障金融级交互稳定性</li>
    <li><b>职责：</b> 参与前端组件库和状态管理中间件开发，负责页面性能优化和容灾设计</li>
    <li><b>成果：</b> 重构核心交互组件模块，渲染性能提升 3 倍；设计多端容灾方案，实现跨终端秒级适配；优化资源加载策略，降低 99.9% 页面延迟 40%</li>
  </ul>
  <h2>项目经验</h2>
  ::: start <b>2022.06 - 2022.12</b>
  ::: <b>企业级微前端架构系统</b>
  ::: <b>技术负责人</b>
  ::: end
  <ul>
    <li><b>背景：</b> 公司业务线数量激增，跨团队前端协作困难，维护成本高</li>
    <li><b>职责：</b> 设计并实现基于 TypeScript 的轻量级微前端系统，提供统一的应用加载、通信和权限治理能力</li>
    <li><b>技术栈：</b> <code>TypeScript</code> <code>React</code> <code>Vue</code> <code>Module Federation</code> <code>Webpack</code> <code>K8s</code></li>
    <li><b>难点：</b> 保证多应用集成性能，同时提供丰富的资源治理能力和可观测性</li>
    <li><b>成果：</b> 系统在 10 万 + 页面节点规模部署，<b>支持百万级并发访问</b>，页面切换延迟增加 &lt; 0.5ms；应用故障平均恢复时间从小时级降至分钟级；被公司作为标准前端治理平台推广</li>
  </ul>
  <h2>专业技能</h2>
  <ul>
    <li><b>编程语言</b>：JavaScript/TypeScript (精通)、Node.js (熟练)、Dart (熟悉)、WebAssembly (了解)</li>
    <li><b>前端框架</b>：精通 React、Vue、Angular 等主流框架原理与应用</li>
    <li><b>工程工具</b>：精通 Webpack、Vite、Rollup、Babel 等构建工具，了解底层实现和性能优化</li>
    <li><b>跨端技术</b>：熟练掌握 Electron、Flutter、小程序等跨端技术栈，熟悉容器化部署方案</li>
    <li><b>性能优化</b>：具备大型前端应用性能设计能力，熟悉关键渲染路径、资源加载、缓存策略等优化模式</li>
    <li><b>开源贡献</b>：前端社区活跃贡献者，为多个知名 UI 库和构建工具提交过 PR，GitHub 个人项目 star 2k+</li>
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
  const localHtml = localStorage.getItem("resume_html");
  const localMarkdown = localStorage.getItem("resume_markdown");

  const [htmlContent, setHtmlContent] = useState(localHtml || initialHTML);
  const [markdownContent, setMarkdownContent] = useState(
    localMarkdown || turndownService.turndown(localHtml || initialHTML)
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
