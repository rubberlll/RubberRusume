import React, { useState } from "react";
import { Layout, Menu, Button, Tooltip, Input } from "antd";
import {
  LeftOutlined,
  QuestionCircleOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./index.css";

const { Header } = Layout;

export default function HeaderBar() {
  const [title, setTitle] = useState("我的简历 -dDxCtA");

  // 导出PDF方法（导出.resume-preview-root，包含padding和卡片效果）
  const handleExportPDF = async () => {
    const preview = document.querySelector(".resume-preview-root");
    if (!preview) return;
    // 记录原样式
    const originalOverflow = preview.style.overflow;
    const originalMaxHeight = preview.style.maxHeight;
    preview.style.overflow = "visible";
    preview.style.maxHeight = "none";
    await new Promise((resolve) => setTimeout(resolve, 100));
    const a4Width = 595.28;
    const a4Height = 841.89;
    const scale = 2;
    const canvas = await html2canvas(preview, { scale, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = a4Width;
    const imgHeight = (canvas.height * a4Width) / canvas.width;
    let position = 0;
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    if (imgHeight > a4Height) {
      let remainHeight = imgHeight;
      let pageCount = 1;
      while (remainHeight > a4Height) {
        position = -a4Height * pageCount;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        remainHeight -= a4Height;
        pageCount++;
      }
    }
    pdf.save((title || "简历") + ".pdf");
    preview.style.overflow = originalOverflow;
    preview.style.maxHeight = originalMaxHeight;
  };

  return (
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
          <Menu.Item key="file">文件</Menu.Item>
          <Menu.Item key="edit">编辑模式</Menu.Item>
          <Menu.Item key="theme">选择主题</Menu.Item>
          <Menu.Item key="plugin">插件列表</Menu.Item>
          <Menu.Item key="icon">图标列表</Menu.Item>
        </Menu>
      </div>
      <div className="header-bar-right">
        <Button className="header-bar-btn">保存</Button>
        <Button
          type="primary"
          className="header-bar-btn header-bar-btn-primary"
          onClick={handleExportPDF}
        >
          导出
        </Button>
      </div>
    </Header>
  );
}
