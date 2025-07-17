# RubberRusume(橡胶简历)

RubberRusume 是一个基于 React 和 Vite 构建的简历编辑器，支持所见即所得（WYSIWYG）和代码模式编辑，提供丰富的编辑功能和样式配置选项，方便用户快速创建和定制个性化简历，并且完全免费。
<img width="1893" height="913" alt="image" src="https://github.com/user-attachments/assets/82299365-33b4-4121-8619-9483c27cdfe6" />
## 立即使用
https://www.rubbercv.xyz/
输入此网址立即开始制作你的简历
## 功能特性
- **双模式编辑**：支持所见即所得（WYSIWYG）和代码模式编辑，满足不同用户的编辑习惯。
- **丰富的文本样式**：支持标题、列表、分栏等多种文本样式。
- **菜单操作**：提供添加行、删除块、布局设置、复制内容等快捷操作。
- **样式配置**：可自定义字体大小、颜色、边距等样式，生成个性化简历。
- **图片上传**：支持上传图片到简历中，并且可以随意在简历中拖动。
- **数据持久化**：支持将简历内容保存到本地存储，方便下次继续编辑。
- **导出功能**：支持导出 Markdown 格式的简历文件，可直接导出pdf并且与页面中预览的完全一致。

## 项目结构
```plaintext
RubberRusume/
├── public/
│   └── assets/
│       └── logo.png
├── src/
│   ├── components/
│   │   ├── EditorPanel/
│   │   │   ├── index.jsx
│   │   │   └── CustomBlock.jsx
│   │   ├── ResumePreview/
│   │   │   ├── index.jsx
│   │   │   └── index.css
│   │   ├── FontStyleConfigPanel/
│   │   └── HeaderBar/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
└── eslint.config.js
```
# 安装与运行

## 克隆项目

```bash
git clone https://github.com/rubberlll/RubberRusume.git
cd RubberRusume
```

## 安装依赖

```bash
npm install
```

## 开发模式

```bash
npm run dev
```

启动开发服务器后，在浏览器中访问 [http://localhost:5173](http://localhost:5173) 即可查看项目。

## 构建项目

```bash
npm run build
```

构建后的文件将生成在 `dist` 目录下。

## 预览构建结果

```bash
npm run preview
```

---

# 技术栈

- **前端框架**：React
- **构建工具**：Vite
- **UI 组件库**：Ant Design
- **富文本编辑器**：Tiptap
- **Markdown 解析**：marked、turndown
- **PDF 生成**：jspdf
---


# 感谢

本项目采灵感来源 开源项目:https://github.com/hua1995116/react-resume-site , 感谢大佬

---

# 联系方式

如果你有任何问题或建议，请随时通过 [GitHub Issues](https://github.com/rubberlll/RubberRusume/issues) 或者qq:3048318664@qq.com与我联系。
