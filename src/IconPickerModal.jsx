import React from "react";
import { Modal } from "antd";
import {
  ProductOutlined,
  AppstoreOutlined,
  SmileOutlined,
  SettingOutlined,
  HeartOutlined,
  StarOutlined,
  HomeOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

const icons = [
  { key: "icon:user", icon: <UserOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:phone", icon: <PhoneOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:email", icon: <MailOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:product", icon: <ProductOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:appstore", icon: <AppstoreOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:smile", icon: <SmileOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:setting", icon: <SettingOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:heart", icon: <HeartOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:star", icon: <StarOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:home", icon: <HomeOutlined style={{ fontSize: 28 }} /> },
];

export default function IconPickerModal({ open, onClose, onCopy }) {
  const handleCopy = async (key) => {
    //bug:始终无法显示message
    try {
      await navigator.clipboard.writeText(key);
      onClose && onClose();
      onCopy && onCopy(key);
    } catch {
      onClose && onClose();
      onCopy && onCopy(null);
    }
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="选择并复制图标代码"
      width={400}
      centered
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
          justifyItems: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        {icons.map((item) => (
          <div
            key={item.key}
            style={{
              cursor: "pointer",
              padding: 12,
              borderRadius: 8,
              transition: "background 0.2s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 64,
            }}
            onClick={() => handleCopy(item.key)}
            onMouseOver={(e) => (e.currentTarget.style.background = "#f5f5f5")}
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            {item.icon}
            <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
              {item.key}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
