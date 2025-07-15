import React, { useState } from "react";
import { Layout, Menu, Button, Tooltip, Input } from "antd";
import {
  LeftOutlined,
  QuestionCircleOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import "./index.css";

const { Header } = Layout;

export default function HeaderBar() {
  const [title, setTitle] = useState("我的简历 -dDxCtA");
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
        >
          导出
        </Button>
      </div>
    </Header>
  );
}
