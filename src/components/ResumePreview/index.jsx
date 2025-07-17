import React from "react";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  ProductOutlined,
  AppstoreOutlined,
  SmileOutlined,
  SettingOutlined,
  HeartOutlined,
  StarOutlined,
  HomeOutlined,
  IdcardOutlined,
  TeamOutlined,
  SolutionOutlined,
  ProfileOutlined,
  ProjectOutlined,
  AuditOutlined,
  TrophyOutlined,
  BankOutlined,
  ShopOutlined,
  WalletOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  FileProtectOutlined,
  FileUnknownOutlined,
  FileZipOutlined,
  FileImageOutlined,
  FilePptOutlined,
  FileMarkdownOutlined,
  ReadOutlined,
  BookOutlined,
  ContactsOutlined,
  MessageOutlined,
  NotificationOutlined,
  BellOutlined,
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined,
  EditOutlined,
  FormOutlined,
  CopyOutlined,
  ScissorOutlined,
  DeleteOutlined,
  HighlightOutlined,
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  RedoOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  SearchOutlined,
  LockOutlined,
  UnlockOutlined,
  KeyOutlined,
  SafetyOutlined,
  SecurityScanOutlined,
  SettingTwoTone,
  UserAddOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
  ManOutlined,
  WomanOutlined,
  GlobalOutlined,
  CloudOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  CloudSyncOutlined,
  CloudServerOutlined,
  ClusterOutlined,
  ApartmentOutlined,
  CrownOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  BuildOutlined,
  CalculatorOutlined,
  FundOutlined,
  PieChartOutlined,
  BarChartOutlined,
  AreaChartOutlined,
  LineChartOutlined,
  RadarChartOutlined,
  HeatMapOutlined,
  StockOutlined,
  RiseOutlined,
  FallOutlined,
  BoxPlotOutlined,
  SlidersOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  EnvironmentOutlined,
  ExperimentOutlined,
  FireOutlined,
  GiftOutlined,
  GoldOutlined,
  HourglassOutlined,
  InsuranceOutlined,
  LayoutOutlined,
  LikeFilled,
  LikeTwoTone,
  MehOutlined,
  MehFilled,
  MehTwoTone,
  SmileFilled,
  SmileTwoTone,
  StarFilled,
  StarTwoTone,
  TrophyFilled,
  TrophyTwoTone,
} from "@ant-design/icons";
import "./index.css";

function generateCustomStyle(styleConfig, themeColor) {
  let css = "";
  if (!styleConfig) return css;
  Object.entries(styleConfig).forEach(([tag, conf]) => {
    css += `\n.resume-preview-content ${tag} { font-size: ${
      conf.fontSize
    }px !important; margin-top: ${
      conf.marginTop
    }px !important; margin-bottom: ${conf.marginBottom}px !important;${
      tag === "h2" ? ` color: ${themeColor}; font-weight: bold;` : ""
    } }`;
  });
  // h2下边框色
  if (themeColor) {
    css += `\n.resume-preview-content h2 { border-bottom: 2px solid ${themeColor} !important; }`;
  }
  return css;
}

function ResumePreview({
  html,
  iconTheme,
  styleConfig,
  themeColor,
  images = [],
  setImages,
}) {
  // iconTheme: 'antd'（目前只支持 antd，可扩展）
  const iconMap = {
    antd: {
      "icon:user": <UserOutlined style={{ marginRight: 4 }} />,
      "icon:phone": <PhoneOutlined style={{ marginRight: 4 }} />,
      "icon:mail": <MailOutlined style={{ marginRight: 4 }} />,
      "icon:idcard": <IdcardOutlined style={{ marginRight: 4 }} />,
      "icon:team": <TeamOutlined style={{ marginRight: 4 }} />,
      "icon:solution": <SolutionOutlined style={{ marginRight: 4 }} />,
      "icon:profile": <ProfileOutlined style={{ marginRight: 4 }} />,
      "icon:project": <ProjectOutlined style={{ marginRight: 4 }} />,
      "icon:audit": <AuditOutlined style={{ marginRight: 4 }} />,
      "icon:trophy": <TrophyOutlined style={{ marginRight: 4 }} />,
      "icon:bank": <BankOutlined style={{ marginRight: 4 }} />,
      "icon:shop": <ShopOutlined style={{ marginRight: 4 }} />,
      "icon:wallet": <WalletOutlined style={{ marginRight: 4 }} />,
      "icon:calendar": <CalendarOutlined style={{ marginRight: 4 }} />,
      "icon:schedule": <ScheduleOutlined style={{ marginRight: 4 }} />,
      "icon:file-text": <FileTextOutlined style={{ marginRight: 4 }} />,
      "icon:file-pdf": <FilePdfOutlined style={{ marginRight: 4 }} />,
      "icon:file-word": <FileWordOutlined style={{ marginRight: 4 }} />,
      "icon:file-excel": <FileExcelOutlined style={{ marginRight: 4 }} />,
      "icon:file-add": <FileAddOutlined style={{ marginRight: 4 }} />,
      "icon:file-done": <FileDoneOutlined style={{ marginRight: 4 }} />,
      "icon:file-search": <FileSearchOutlined style={{ marginRight: 4 }} />,
      "icon:file-protect": <FileProtectOutlined style={{ marginRight: 4 }} />,
      "icon:file-unknown": <FileUnknownOutlined style={{ marginRight: 4 }} />,
      "icon:file-zip": <FileZipOutlined style={{ marginRight: 4 }} />,
      "icon:file-image": <FileImageOutlined style={{ marginRight: 4 }} />,
      "icon:file-ppt": <FilePptOutlined style={{ marginRight: 4 }} />,
      "icon:file-md": <FileMarkdownOutlined style={{ marginRight: 4 }} />,
      "icon:read": <ReadOutlined style={{ marginRight: 4 }} />,
      "icon:book": <BookOutlined style={{ marginRight: 4 }} />,
      "icon:contacts": <ContactsOutlined style={{ marginRight: 4 }} />,
      "icon:message": <MessageOutlined style={{ marginRight: 4 }} />,
      "icon:notification": <NotificationOutlined style={{ marginRight: 4 }} />,
      "icon:bell": <BellOutlined style={{ marginRight: 4 }} />,
      "icon:like": <LikeOutlined style={{ marginRight: 4 }} />,
      "icon:dislike": <DislikeOutlined style={{ marginRight: 4 }} />,
      "icon:comment": <CommentOutlined style={{ marginRight: 4 }} />,
      "icon:edit": <EditOutlined style={{ marginRight: 4 }} />,
      "icon:form": <FormOutlined style={{ marginRight: 4 }} />,
      "icon:copy": <CopyOutlined style={{ marginRight: 4 }} />,
      "icon:scissor": <ScissorOutlined style={{ marginRight: 4 }} />,
      "icon:delete": <DeleteOutlined style={{ marginRight: 4 }} />,
      "icon:highlight": <HighlightOutlined style={{ marginRight: 4 }} />,
      "icon:align-center": <AlignCenterOutlined style={{ marginRight: 4 }} />,
      "icon:align-left": <AlignLeftOutlined style={{ marginRight: 4 }} />,
      "icon:align-right": <AlignRightOutlined style={{ marginRight: 4 }} />,
      "icon:bold": <BoldOutlined style={{ marginRight: 4 }} />,
      "icon:italic": <ItalicOutlined style={{ marginRight: 4 }} />,
      "icon:underline": <UnderlineOutlined style={{ marginRight: 4 }} />,
      "icon:strikethrough": (
        <StrikethroughOutlined style={{ marginRight: 4 }} />
      ),
      "icon:redo": <RedoOutlined style={{ marginRight: 4 }} />,
      "icon:undo": <UndoOutlined style={{ marginRight: 4 }} />,
      "icon:zoom-in": <ZoomInOutlined style={{ marginRight: 4 }} />,
      "icon:zoom-out": <ZoomOutOutlined style={{ marginRight: 4 }} />,
      "icon:search": <SearchOutlined style={{ marginRight: 4 }} />,
      "icon:lock": <LockOutlined style={{ marginRight: 4 }} />,
      "icon:unlock": <UnlockOutlined style={{ marginRight: 4 }} />,
      "icon:key": <KeyOutlined style={{ marginRight: 4 }} />,
      "icon:safety": <SafetyOutlined style={{ marginRight: 4 }} />,
      "icon:security-scan": <SecurityScanOutlined style={{ marginRight: 4 }} />,
      "icon:setting": <SettingOutlined style={{ marginRight: 4 }} />,
      "icon:user-add": <UserAddOutlined style={{ marginRight: 4 }} />,
      "icon:user-delete": <UserDeleteOutlined style={{ marginRight: 4 }} />,
      "icon:user-switch": <UserSwitchOutlined style={{ marginRight: 4 }} />,
      "icon:usergroup-add": <UsergroupAddOutlined style={{ marginRight: 4 }} />,
      "icon:usergroup-delete": (
        <UsergroupDeleteOutlined style={{ marginRight: 4 }} />
      ),
      "icon:man": <ManOutlined style={{ marginRight: 4 }} />,
      "icon:woman": <WomanOutlined style={{ marginRight: 4 }} />,
      "icon:global": <GlobalOutlined style={{ marginRight: 4 }} />,
      "icon:cloud": <CloudOutlined style={{ marginRight: 4 }} />,
      "icon:cloud-upload": <CloudUploadOutlined style={{ marginRight: 4 }} />,
      "icon:cloud-download": (
        <CloudDownloadOutlined style={{ marginRight: 4 }} />
      ),
      "icon:cloud-sync": <CloudSyncOutlined style={{ marginRight: 4 }} />,
      "icon:cloud-server": <CloudServerOutlined style={{ marginRight: 4 }} />,
      "icon:cluster": <ClusterOutlined style={{ marginRight: 4 }} />,
      "icon:apartment": <ApartmentOutlined style={{ marginRight: 4 }} />,
      "icon:crown": <CrownOutlined style={{ marginRight: 4 }} />,
      "icon:rocket": <RocketOutlined style={{ marginRight: 4 }} />,
      "icon:thunderbolt": <ThunderboltOutlined style={{ marginRight: 4 }} />,
      "icon:tool": <ToolOutlined style={{ marginRight: 4 }} />,
      "icon:build": <BuildOutlined style={{ marginRight: 4 }} />,
      "icon:calculator": <CalculatorOutlined style={{ marginRight: 4 }} />,
      "icon:fund": <FundOutlined style={{ marginRight: 4 }} />,
      "icon:pie-chart": <PieChartOutlined style={{ marginRight: 4 }} />,
      "icon:bar-chart": <BarChartOutlined style={{ marginRight: 4 }} />,
      "icon:area-chart": <AreaChartOutlined style={{ marginRight: 4 }} />,
      "icon:line-chart": <LineChartOutlined style={{ marginRight: 4 }} />,
      "icon:radar-chart": <RadarChartOutlined style={{ marginRight: 4 }} />,
      "icon:heat-map": <HeatMapOutlined style={{ marginRight: 4 }} />,
      "icon:stock": <StockOutlined style={{ marginRight: 4 }} />,
      "icon:rise": <RiseOutlined style={{ marginRight: 4 }} />,
      "icon:fall": <FallOutlined style={{ marginRight: 4 }} />,
      "icon:box-plot": <BoxPlotOutlined style={{ marginRight: 4 }} />,
      "icon:sliders": <SlidersOutlined style={{ marginRight: 4 }} />,
      "icon:dashboard": <DashboardOutlined style={{ marginRight: 4 }} />,
      "icon:database": <DatabaseOutlined style={{ marginRight: 4 }} />,
      "icon:environment": <EnvironmentOutlined style={{ marginRight: 4 }} />,
      "icon:experiment": <ExperimentOutlined style={{ marginRight: 4 }} />,
      "icon:fire": <FireOutlined style={{ marginRight: 4 }} />,
      "icon:gift": <GiftOutlined style={{ marginRight: 4 }} />,
      "icon:gold": <GoldOutlined style={{ marginRight: 4 }} />,
      "icon:hourglass": <HourglassOutlined style={{ marginRight: 4 }} />,
      "icon:insurance": <InsuranceOutlined style={{ marginRight: 4 }} />,
      "icon:layout": <LayoutOutlined style={{ marginRight: 4 }} />,
      "icon:like-filled": <LikeFilled style={{ marginRight: 4 }} />,
      "icon:like-two-tone": <LikeTwoTone style={{ marginRight: 4 }} />,
      "icon:meh": <MehOutlined style={{ marginRight: 4 }} />,
      "icon:meh-filled": <MehFilled style={{ marginRight: 4 }} />,
      "icon:meh-two-tone": <MehTwoTone style={{ marginRight: 4 }} />,
      "icon:smile-filled": <SmileFilled style={{ marginRight: 4 }} />,
      "icon:smile-two-tone": <SmileTwoTone style={{ marginRight: 4 }} />,
      "icon:star-filled": <StarFilled style={{ marginRight: 4 }} />,
      "icon:star-two-tone": <StarTwoTone style={{ marginRight: 4 }} />,
      "icon:trophy-filled": <TrophyFilled style={{ marginRight: 4 }} />,
      "icon:trophy-two-tone": <TrophyTwoTone style={{ marginRight: 4 }} />,
    },
  };
  // 替换所有 icon:xxx
  const replaceIcons = (str) => {
    return str.replace(/icon:[a-zA-Z0-9-]+/g, (m) => {
      const icon = iconMap[iconTheme]?.[m];
      return icon ? `<span data-icon="${m}"></span>` : m;
    });
  };

  // 解析 ::: start ... ::: end 块，块内每个:::分隔的内容为一列
  function parseCustomBlocks(str) {
    const blockRegex = /::: *start([\s\S]*?)::: *end/g;
    let lastIndex = 0;
    let parts = [];
    let match;
    while ((match = blockRegex.exec(str))) {
      // 前面的普通内容
      if (match.index > lastIndex) {
        parts.push({
          type: "normal",
          content: str.slice(lastIndex, match.index),
        });
      }
      // 块内容
      const blockContent = match[1];
      // 按 ::: 分割
      const columns = blockContent
        .split(/:::/g)
        .map((s) => s.trim())
        .filter(Boolean);
      parts.push({
        type: "block",
        columns,
      });
      lastIndex = blockRegex.lastIndex;
    }
    // 最后剩余内容
    if (lastIndex < str.length) {
      parts.push({ type: "normal", content: str.slice(lastIndex) });
    }
    return parts;
  }

  // 只做 icon 替换
  const htmlWithIcons = replaceIcons(html);
  // 解析自定义块
  const parsedParts = parseCustomBlocks(htmlWithIcons);

  // 渲染带有 antd icon 的 HTML
  function renderWithAntdIcons(htmlStr) {
    const parts = htmlStr.split(
      /(<span[^>]*data-icon=['"]icon:[^'"]+['"][^>]*><\/span>)/g
    );

    return parts
      .filter((part) => part !== undefined && part !== null && part !== "")
      .map((part, i) => {
        const match = part.match(
          /<span[^>]*data-icon=['"](icon:[^'"]+)['"][^>]*><\/span>/
        );
        if (match) {
          const icon = iconMap[iconTheme]?.[match[1]];

          if (icon) {
            return React.cloneElement(icon, { key: `icon-${i}` });
          }
          return null;
        }
        return (
          <span key={`txt-${i}`} dangerouslySetInnerHTML={{ __html: part }} />
        );
      });
  }

  // 渲染自定义块
  function renderCustomBlock(columns, key) {
    return (
      <div
        key={key}
        style={{
          display: "flex",
          justifyContent: "space-between", // gap自动均分剩余空间
          alignItems: "flex-start",
          width: "100%", // 父容器宽度固定
          margin: "6px 0",
          overflow: "hidden",
        }}
      >
        {columns.map((item, idx) => (
          <div
            key={idx}
            style={{
              flex: "0 1 auto", // 宽度自适应内容
              whiteSpace: "pre-line",
              wordBreak: "break-all",
              textAlign: idx === columns.length - 1 ? "right" : "left",
            }}
          >
            {renderWithAntdIcons(item)}
          </div>
        ))}
      </div>
    );
  }

  // 拖动图片相关
  const dragImgRef = React.useRef(null);
  const dragStart = React.useRef({
    x: 0,
    y: 0,
    idx: -1,
    offsetX: 0,
    offsetY: 0,
  });
  const resizeImgRef = React.useRef(null);
  const resizeStart = React.useRef({
    x: 0,
    y: 0,
    idx: -1,
    startW: 120,
    startH: 120,
  });

  const handleImgMouseDown = (e, idx) => {
    e.preventDefault();
    dragImgRef.current = idx;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      idx,
      offsetX: images[idx].x,
      offsetY: images[idx].y,
    };
    window.addEventListener("mousemove", handleImgMouseMove);
    window.addEventListener("mouseup", handleImgMouseUp);
  };
  const handleImgMouseMove = (e) => {
    const { idx, x, y, offsetX, offsetY } = dragStart.current;
    if (idx === -1) return;
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    setImages((imgs) => {
      const arr = [...imgs];
      arr[idx] = { ...arr[idx], x: offsetX + dx, y: offsetY + dy };
      return arr;
    });
  };
  const handleImgMouseUp = () => {
    dragImgRef.current = null;
    dragStart.current.idx = -1;
    window.removeEventListener("mousemove", handleImgMouseMove);
    window.removeEventListener("mouseup", handleImgMouseUp);
  };

  // 缩放图片相关
  const handleResizeMouseDown = (e, idx) => {
    e.stopPropagation();
    e.preventDefault();
    resizeImgRef.current = idx;
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      idx,
      startW: images[idx].width || 120,
      startH: images[idx].height || 120,
    };
    window.addEventListener("mousemove", handleResizeMouseMove);
    window.addEventListener("mouseup", handleResizeMouseUp);
  };
  const handleResizeMouseMove = (e) => {
    const { idx, x, y, startW, startH } = resizeStart.current;
    if (idx === -1) return;
    const dw = e.clientX - x;
    const dh = e.clientY - y;
    setImages((imgs) => {
      const arr = [...imgs];
      let newW = Math.max(40, startW + dw);
      let newH = Math.max(40, startH + dh);
      arr[idx] = { ...arr[idx], width: newW, height: newH };
      return arr;
    });
  };
  const handleResizeMouseUp = () => {
    resizeImgRef.current = null;
    resizeStart.current.idx = -1;
    window.removeEventListener("mousemove", handleResizeMouseMove);
    window.removeEventListener("mouseup", handleResizeMouseUp);
  };

  // 删除图片
  const handleDeleteImg = (idx) => {
    setImages((imgs) => imgs.filter((_, i) => i !== idx));
  };

  const [activeImgIdx, setActiveImgIdx] = React.useState(-1);

  // 点击空白处取消激活
  React.useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".resume-draggable-img")) {
        setActiveImgIdx(-1);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="resume-preview-root" style={{ position: "relative" }}>
      <style>{generateCustomStyle(styleConfig, themeColor)}</style>
      {/* 可拖动图片层 */}
      {images.map((img, idx) => (
        <div
          key={idx}
          className="resume-draggable-img"
          style={{
            position: "absolute",
            left: img.x,
            top: img.y,
            width: img.width || 120,
            height: img.height || 120,
            zIndex: 10,
            userSelect: "none",
          }}
          onMouseDown={() => setActiveImgIdx(idx)}
        >
          {/* 删除按钮，仅激活时显示 */}
          {activeImgIdx === idx && (
            <div
              style={{
                position: "absolute",
                right: 2,
                top: 2,
                width: 20,
                height: 20,
                background: "transparent",
                color: "black",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 2,
                fontSize: 14,
                border: "1.5px solid #fff",
              }}
              onClick={() => handleDeleteImg(idx)}
              title="删除图片"
            >
              ×
            </div>
          )}
          {/* 图片本体 */}
          <img
            src={img.url}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 8,

              cursor: "move",
              userSelect: "none",
              pointerEvents: "auto",
            }}
            draggable={false}
            onMouseDown={(e) => handleImgMouseDown(e, idx)}
          />
          {/* 缩放角，仅激活时显示 */}
          {activeImgIdx === idx && (
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 16,
                height: 16,
                background: "transparent",

                borderRadius: 4,
                cursor: "nwse-resize",
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseDown={(e) => handleResizeMouseDown(e, idx)}
              title="缩放图片"
            >
              <svg width="10" height="10">
                <polyline
                  points="0,10 10,10 10,0"
                  style={{ fill: "none", stroke: "#888", strokeWidth: 2 }}
                />
              </svg>
            </div>
          )}
        </div>
      ))}
      <div className="resume-preview-content">
        {parsedParts.map((part, i) =>
          part.type === "block"
            ? renderCustomBlock(part.columns, i)
            : renderWithAntdIcons(part.content)
        )}
      </div>
    </div>
  );
}

export default ResumePreview;
