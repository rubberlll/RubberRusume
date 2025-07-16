import React from "react";
import {
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
import "./index.css";

function generateCustomStyle(styleConfig) {
  let css = "";
  if (!styleConfig) return css;
  Object.entries(styleConfig).forEach(([tag, conf]) => {
    css += `\n.resume-preview-content ${tag} { font-size: ${
      conf.fontSize
    }px !important; margin-top: ${
      conf.marginTop
    }px !important; margin-bottom: ${conf.marginBottom}px !important;${
      tag === "h1" || tag === "h2" ? " color: #222; font-weight: bold;" : ""
    } }`;
  });
  return css;
}

function ResumePreview({ html, iconTheme, styleConfig }) {
  // iconTheme: 'antd'（目前只支持 antd，可扩展）
  const iconMap = {
    antd: {
      "icon:user": <UserOutlined style={{ marginRight: 4 }} />,
      "icon:phone": <PhoneOutlined style={{ marginRight: 4 }} />,
      "icon:email": <MailOutlined style={{ marginRight: 4 }} />,
      "icon:product": <ProductOutlined style={{ marginRight: 4 }} />,
      "icon:appstore": <AppstoreOutlined style={{ marginRight: 4 }} />,
      "icon:smile": <SmileOutlined style={{ marginRight: 4 }} />,
      "icon:setting": <SettingOutlined style={{ marginRight: 4 }} />,
      "icon:heart": <HeartOutlined style={{ marginRight: 4 }} />,
      "icon:star": <StarOutlined style={{ marginRight: 4 }} />,
      "icon:home": <HomeOutlined style={{ marginRight: 4 }} />,
    },
  };
  // 替换所有 icon:xxx
  const replaceIcons = (str) => {
    const result = str.replace(
      /icon:(user|phone|email|product|appstore|smile|setting|heart|star|home)/g,
      (m) => {
        const icon = iconMap[iconTheme]?.[m];
        // 用 span 占位，后续 React 渲染
        return icon ? `<span data-icon="${m}"></span>` : m;
      }
    );

    return result;
  };

  // 解析 ::: start ... ::: end 块，块内每个:::分隔的内容为一列
  function parseCustomBlocks(str) {
    const blockRegex = /::: *start([\s\S]*?)::: *end/g;
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
      const blockContent = match[1];
      // 按 ::: 分割
      const columns = blockContent
        .split(/:::/g)
        .map((s) => s.trim())
        .filter(Boolean);
      parts.push({
        type: "block",
        columns,
      });
      lastIndex = blockRegex.lastIndex;
    }
    // 最后剩余内容
    if (lastIndex < str.length) {
      parts.push({ type: "normal", content: str.slice(lastIndex) });
    }
    return parts;
  }

  // 只做 icon 替换
  const htmlWithIcons = replaceIcons(html);
  // 解析自定义块
  const parsedParts = parseCustomBlocks(htmlWithIcons);

  // 渲染带有 antd icon 的 HTML
  function renderWithAntdIcons(htmlStr) {
    const parts = htmlStr.split(
      /(<span[^>]*data-icon=['"]icon:[^'"]+['"][^>]*><\/span>)/g
    );

    return parts
      .filter((part) => part !== undefined && part !== null && part !== "")
      .map((part, i) => {
        const match = part.match(
          /<span[^>]*data-icon=['"](icon:[^'"]+)['"][^>]*><\/span>/
        );
        if (match) {
          const icon = iconMap[iconTheme]?.[match[1]];

          if (icon) {
            return React.cloneElement(icon, { key: `icon-${i}` });
          }
          return null;
        }
        return (
          <span key={`txt-${i}`} dangerouslySetInnerHTML={{ __html: part }} />
        );
      });
  }

  // 渲染自定义块
  function renderCustomBlock(columns, key) {
    return (
      <div
        key={key}
        style={{
          display: "flex",
          justifyContent: "space-between", // gap自动均分剩余空间
          alignItems: "flex-start",
          width: "100%", // 父容器宽度固定
          margin: "6px 0",
          overflow: "hidden",
        }}
      >
        {columns.map((item, idx) => (
          <div
            key={idx}
            style={{
              flex: "0 1 auto", // 宽度自适应内容
              whiteSpace: "pre-line",
              wordBreak: "break-all",
              textAlign: idx === columns.length - 1 ? "right" : "left",
            }}
          >
            {renderWithAntdIcons(item)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="resume-preview-root">
      <style>{generateCustomStyle(styleConfig)}</style>
      <div className="resume-preview-content">
        {parsedParts.map((part, i) =>
          part.type === "block"
            ? renderCustomBlock(part.columns, i)
            : renderWithAntdIcons(part.content)
        )}
      </div>
    </div>
  );
}

export default ResumePreview;
