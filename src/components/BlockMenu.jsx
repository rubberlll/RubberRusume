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
  blockType = "H2", // 新增：当前块类型，默认H2
  onChangeBlockType, // 新增
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
        minWidth: 200,
        background: "#fff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        borderRadius: 8,
        padding: "4px 0",
      }}
    >
      {/* 标题类型选择上方的间距 */}
      <div style={{ height: 8 }} />
      {/* 标题类型选择 */}
      <div style={{ display: "flex", gap: 8, padding: "0 16px 8px 16px" }}>
        {["正文", "H1", "H2", "H3", "H4", "H5"].map((t) => (
          <span
            key={t}
            style={{
              color: t === blockType ? "#52c41a" : "#222",
              fontWeight: t === blockType ? 700 : 400,
              fontSize: 15,
              cursor: "pointer",
              padding: "2px 4px",
              borderRadius: 3,
              background: t === blockType ? "#f6ffed" : "none",
            }}
            onClick={() => {
              if (onChangeBlockType) onChangeBlockType(t);
            }}
          >
            {t}
          </span>
        ))}
      </div>
      {/* 分割线 */}
      <div style={{ borderTop: "1px solid #eee", margin: "4px 0" }} />
      {/* 菜单项 */}
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
        placement="bottom" // 改为下方弹出
        overlayStyle={{ marginLeft: 0, marginTop: 0 }}
        popupRender={() => menuOverlay}
      >
        <div
          className={`block-menu-btn${isOpen ? " block-menu-btn-open" : ""}`}
          style={{
            width: 38,
            height: 38,
            background: "#fff",
            border: isOpen ? "2px solid #52c41a" : "1px solid #d9d9d9",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isOpen
              ? "0 2px 8px rgba(82,196,26,0.12)"
              : "0 1px 4px rgba(0,0,0,0.08)",
            cursor: "pointer",
            transition: "all 0.2s",
            fontWeight: 700,
            fontSize: 16,
            color: "#222",
            userSelect: "none",
          }}
          onMouseEnter={() => handleSetOpen(true)}
          onMouseLeave={() => handleSetOpen(false)}
        >
          {blockType}
        </div>
      </Dropdown>
    </div>
  );
}
