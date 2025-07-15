import React from "react";
import { Modal, InputNumber } from "antd";

const TAGS = [
  { key: "h1", label: "一级标题" },
  { key: "h2", label: "二级标题" },
  { key: "h3", label: "三级标题" },
  { key: "h4", label: "四级标题" },
  { key: "h5", label: "五级标题" },
  { key: "h6", label: "六级标题" },
  { key: "p", label: "正文" },
  { key: "li", label: "列表项" },
  { key: "b", label: "粗体" },
];

export default function FontStyleConfigPanel({ open, onOk, onCancel, value }) {
  const [data, setData] = React.useState(value);

  React.useEffect(() => {
    setData(value);
  }, [value]);

  const handleChange = (tag, field, val) => {
    setData((prev) => ({
      ...prev,
      [tag]: { ...prev[tag], [field]: val },
    }));
  };

  return (
    <Modal
      open={open}
      title="自定义字体样式"
      onOk={() => onOk(data)}
      onCancel={onCancel}
      width={600}
      okText="确认调整"
      cancelText="取消调整"
    >
      <table style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>元素</th>
            <th>上边距(px)</th>
            <th>下边距(px)</th>
            <th>字体大小(px)</th>
          </tr>
        </thead>
        <tbody>
          {TAGS.map((item) => (
            <tr key={item.key}>
              <td>{item.label}</td>
              <td>
                <InputNumber
                  value={data[item.key]?.marginTop ?? 0}
                  min={0}
                  onChange={(v) => handleChange(item.key, "marginTop", v)}
                />
              </td>
              <td>
                <InputNumber
                  value={data[item.key]?.marginBottom ?? 0}
                  min={0}
                  onChange={(v) => handleChange(item.key, "marginBottom", v)}
                />
              </td>
              <td>
                <InputNumber
                  value={data[item.key]?.fontSize ?? 14}
                  min={8}
                  onChange={(v) => handleChange(item.key, "fontSize", v)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}
