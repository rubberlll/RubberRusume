import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Tooltip,
  Input,
  message,
  Dropdown,
  ColorPicker,
  Popover,
  Upload,
} from "antd";
import {
  LeftOutlined,
  QuestionCircleOutlined,
  HistoryOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import "./index.css";

const { Header } = Layout;

// 新增：文件菜单下拉组件
function FileMenuDropdown({ onImportMd, onExportMd }) {
  const inputRef = React.useRef();

  // 处理文件选择
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      onImportMd && onImportMd(text);
    };
    reader.readAsText(file);
    e.target.value = ""; // 允许重复选择同一文件
  };

  return (
    <Dropdown
      trigger={["hover"]}
      overlay={
        <div className="file-menu-dropdown-overlay">
          <div
            className="file-menu-dropdown-item"
            onClick={() => {
              if (inputRef.current) inputRef.current.click();
            }}
          >
            导入md
            <input
              ref={inputRef}
              type="file"
              accept=".md,text/markdown"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <div className="file-menu-dropdown-item" onClick={onExportMd}>
            导出md
          </div>
        </div>
      }
      placement="bottomLeft"
      arrow
    >
      <Menu.Item key="file" style={{ position: "relative", zIndex: 20 }}>
        文件
      </Menu.Item>
    </Dropdown>
  );
}

export default function HeaderBar({
  onSave,
  onImportMd,
  onExportMd,
  themeColor,
  setThemeColor,
  onUploadImage,
}) {
  const [title, setTitle] = useState("我的简历");
  const [messageApi, contextHolder] = message.useMessage();
  const imageInputRef = React.useRef();

  // 导出PDF方法（使用 html-to-image 渲染为图片后插入 jsPDF 导出 PDF）
  const handleExportPDF = async () => {
    const preview = document.querySelector(".resume-preview-root");
    if (!preview) return;
    const a4Width = 595.28;
    const a4Height = 841.89;
    try {
      const dataUrl = await toPng(preview, { cacheBust: true, pixelRatio: 2 });
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const img = new window.Image();
      img.src = dataUrl;
      img.onload = function () {
        const imgWidth = a4Width;
        const imgHeight = (img.height * imgWidth) / img.width;
        let position = 0;
        pdf.addImage(dataUrl, "PNG", 0, 0, imgWidth, imgHeight);
        if (imgHeight > a4Height) {
          let remainHeight = imgHeight;
          let pageCount = 1;
          while (remainHeight > a4Height) {
            position = -a4Height * pageCount;
            pdf.addPage();
            pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
            remainHeight -= a4Height;
            pageCount++;
          }
        }
        pdf.save((title || "简历") + ".pdf");
      };
    } catch (err) {
      console.error("导出PDF失败:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (onUploadImage) {
      onUploadImage(file);
    } else {
      console.log("上传图片文件:", file);
    }
    e.target.value = "";
  };

  return (
    <>
      {contextHolder}
      <Header
        className="header-bar-root"
        style={{
          padding: 0,
          height: 68,
          lineHeight: "48px",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div className="header-bar-left">
          <Button
            type="text"
            icon={<LeftOutlined />}
            className="header-bar-back"
          />
          <Input
            className="header-bar-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            bordered={false}
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#222",
              width: 260,
              marginRight: 24,
              background: "transparent",
              padding: 0,
              paddingLeft: 16,
            }}
          />
          <Menu
            mode="horizontal"
            selectable={false}
            className="header-bar-menu-group"
          >
            <FileMenuDropdown onImportMd={onImportMd} onExportMd={onExportMd} />
            <Menu.Item key="theme">
              <Popover
                content={
                  <ColorPicker
                    value={themeColor}
                    onChange={(color) => setThemeColor(color.toHexString())}
                    showText
                  />
                }
                title="选择主题色"
                trigger="hover"
              >
                <span>选择主题</span>
              </Popover>
            </Menu.Item>
            <Menu.Item key="upload-image">
              <Popover
                content={
                  <Upload.Dragger
                    name="image"
                    accept="image/*"
                    showUploadList={false}
                    customRequest={({ file }) => {
                      if (onUploadImage) {
                        onUploadImage(file);
                      } else {
                        console.log("上传图片文件:", file);
                      }
                    }}
                    style={{ width: 260 }}
                  >
                    <p style={{ margin: 8 }}>拖拽图片到此处，或点击上传</p>
                  </Upload.Dragger>
                }
                title="上传图片"
                trigger="hover"
              >
                <span>上传图片</span>
              </Popover>
            </Menu.Item>
          </Menu>
        </div>
        <div className="header-bar-right">
          <Tooltip title="跳转到GitHub" placement="bottom">
            <Button
              className="header-bar-btn"
              icon={<GithubOutlined style={{ color: "#222" }} />}
              onClick={() =>
                window.open(
                  "https://github.com/rubberlll/RubberRusume",
                  "_blank"
                )
              }
              style={{
                marginRight: 8,
                border: "none",
                background: "none",
                boxShadow: "none",
              }}
            />
          </Tooltip>
          <Button
            className="header-bar-btn"
            onClick={() => {
              if (onSave) {
                onSave();
                messageApi.success("已保存到浏览器");
                console.log("保存成功");
              }
            }}
          >
            保存
          </Button>
          <Button
            type="primary"
            className="header-bar-btn header-bar-btn-primary"
            onClick={handleExportPDF}
          >
            导出
          </Button>
        </div>
      </Header>
    </>
  );
}
