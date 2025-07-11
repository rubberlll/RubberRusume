import React from "react";
import { Dropdown, Button } from "antd";
import {
  CopyOutlined,
  PlusOutlined,
  ColumnWidthOutlined,
  DeleteOutlined,
  EnterOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import "./BlockMenu.css";

export default function BlockMenu({
  top,
  left,
  onAddRow,
  onDelete,
  onLayout,
  onCopy,
  onClose,
  menuOpen,
  setMenuOpen,
}) {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef();

  const menuItems = [
    { key: "copy", icon: <CopyOutlined />, label: "复制", onClick: onCopy },
    { type: "divider" },
    {
      key: "add",
      icon: <PlusOutlined />,
      label: "添加一行",
      onClick: onAddRow,
    },
    {
      key: "enter",
      icon: <EnterOutlined />,
      label: "添加换行(空行)",
      onClick: () => onAddRow && onAddRow("br"),
    },
    {
      key: "layout",
      icon: <ColumnWidthOutlined />,
      label: "添加左右布局",
      onClick: () => onLayout && onLayout(2),
    },
    { type: "divider" },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "删除",
      danger: true,
      onClick: onDelete,
    },
  ];

  const isOpen = menuOpen !== undefined ? menuOpen : open;
  const handleSetOpen = setMenuOpen ? setMenuOpen : setOpen;

  // 菜单内容自定义，hover到菜单内容也保持打开
  const menuOverlay = (
    <div
      onMouseEnter={() => handleSetOpen(true)}
      onMouseLeave={() => handleSetOpen(false)}
      style={{
        minWidth: 160,
        background: "#fff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        borderRadius: 8,
        padding: "4px 0",
        // marginTop: 8, // 移除
      }}
    >
      {menuItems.map((item, idx) =>
        item.type === "divider" ? (
          <div
            key={"div-" + idx}
            style={{ borderTop: "1px solid #eee", margin: "4px 0" }}
          />
        ) : (
          <div
            key={item.key}
            className="block-menu-item"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "6px 16px",
              cursor: "pointer",
              color: item.danger ? "#ff4d4f" : undefined,
            }}
            onClick={() => {
              if (item.onClick) item.onClick();
              handleSetOpen(false);
              onClose && onClose();
            }}
          >
            {item.icon}
            <span style={{ marginLeft: 8 }}>{item.label}</span>
          </div>
        )
      )}
    </div>
  );

  return (
    <div
      className="block-menu-root"
      style={{ position: "absolute", top: top - 8, left, zIndex: 1000 }}
      ref={menuRef}
    >
      <Dropdown
        open={isOpen}
        onOpenChange={handleSetOpen}
        placement="right"
        overlayStyle={{ marginLeft: 0, marginTop: 0 }}
        popupRender={() => menuOverlay}
      >
        <Button
          shape="circle"
          icon={<BarsOutlined style={{ fontSize: 20 }} />}
          className={`block-menu-btn${isOpen ? " block-menu-btn-open" : ""}`}
          onMouseEnter={() => handleSetOpen(true)}
          onMouseLeave={() => handleSetOpen(false)}
        />
      </Dropdown>
    </div>
  );
}
