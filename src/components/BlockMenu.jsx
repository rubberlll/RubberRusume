import React from "react";
import { Dropdown, Menu, Button, Divider } from "antd";
import {
  CopyOutlined,
  PlusOutlined,
  DeleteOutlined,
  ColumnWidthOutlined,
  BarsOutlined,
} from "@ant-design/icons";

export default function BlockMenu({
  top,
  left,
  onAddRow,
  onDelete,
  onLayout,
  onCopy,
  onClose,
}) {
  const menu = (
    <Menu
      style={{ minWidth: 160, borderRadius: 8, boxShadow: "0 2px 12px #0002" }}
      onClick={({ key }) => {
        if (key === "copy") onCopy();
        if (key === "add") onAddRow();
        if (key === "layout2") onLayout(2);
        if (key === "layout3") onLayout(3);
        if (key === "delete") onDelete();
        onClose && onClose();
      }}
    >
      <Menu.Item key="copy" icon={<CopyOutlined />}>
        复制
      </Menu.Item>
      <Menu.Item key="add" icon={<PlusOutlined />}>
        添加行
      </Menu.Item>
      <Menu.Item key="layout2" icon={<ColumnWidthOutlined />}>
        左右布局（2列）
      </Menu.Item>
      <Menu.Item key="layout3" icon={<BarsOutlined />}>
        多列布局（3列）
      </Menu.Item>
      <Divider style={{ margin: "4px 0" }} />
      <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
        删除
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ position: "absolute", top, left, zIndex: 1000 }}>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        placement="rightTop"
        arrow
        onOpenChange={(open) => {
          if (!open) onClose && onClose();
        }}
      >
        <Button
          shape="circle"
          size="large"
          style={{
            width: 36,
            height: 36,
            background: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            border: "none",
            boxShadow: "0 2px 8px #0002",
          }}
          icon={<BarsOutlined />}
        />
      </Dropdown>
    </div>
  );
}
