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

  // 点击外部关闭菜单
  React.useEffect(() => {
    const isOpen = menuOpen !== undefined ? menuOpen : open;
    if (!isOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        if (setMenuOpen) setMenuOpen(false);
        else setOpen(false);
        onClose && onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, menuOpen, setMenuOpen, onClose]);

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

  return (
    <div
      className="block-menu-root"
      style={{ position: "absolute", top: top - 8, left, zIndex: 1000 }}
      ref={menuRef}
    >
      <Dropdown
        menu={{
          items: menuItems,
          onClick: ({ key }) => {
            const item = menuItems.find((i) => i.key === key);
            if (item && item.onClick) item.onClick();
            handleSetOpen(false);
            onClose && onClose();
          },
        }}
        trigger={["hover"]}
        open={isOpen}
        onOpenChange={handleSetOpen}
        placement="right"
        overlayStyle={{ marginLeft: 0, marginTop: 0 }}
        arrow
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
