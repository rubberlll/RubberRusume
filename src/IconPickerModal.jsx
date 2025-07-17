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
  AuditOutlined as AuditFilled,
  CrownOutlined,
  CrownFilled,
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

const icons = [
  { key: "icon:user", icon: <UserOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:phone", icon: <PhoneOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:mail", icon: <MailOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:idcard", icon: <IdcardOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:team", icon: <TeamOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:solution", icon: <SolutionOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:profile", icon: <ProfileOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:project", icon: <ProjectOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:audit", icon: <AuditOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:trophy", icon: <TrophyOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:bank", icon: <BankOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:shop", icon: <ShopOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:wallet", icon: <WalletOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:calendar", icon: <CalendarOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:schedule", icon: <ScheduleOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:file-text",
    icon: <FileTextOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:file-pdf", icon: <FilePdfOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:file-word",
    icon: <FileWordOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:file-excel",
    icon: <FileExcelOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:file-add", icon: <FileAddOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:file-done",
    icon: <FileDoneOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:file-search",
    icon: <FileSearchOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:file-protect",
    icon: <FileProtectOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:file-unknown",
    icon: <FileUnknownOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:file-zip", icon: <FileZipOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:file-image",
    icon: <FileImageOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:file-ppt", icon: <FilePptOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:file-md",
    icon: <FileMarkdownOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:read", icon: <ReadOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:book", icon: <BookOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:contacts", icon: <ContactsOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:message", icon: <MessageOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:notification",
    icon: <NotificationOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:bell", icon: <BellOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:like", icon: <LikeOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:dislike", icon: <DislikeOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:comment", icon: <CommentOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:edit", icon: <EditOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:form", icon: <FormOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:copy", icon: <CopyOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:scissor", icon: <ScissorOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:delete", icon: <DeleteOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:highlight",
    icon: <HighlightOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:align-center",
    icon: <AlignCenterOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:align-left",
    icon: <AlignLeftOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:align-right",
    icon: <AlignRightOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:bold", icon: <BoldOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:italic", icon: <ItalicOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:underline",
    icon: <UnderlineOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:strikethrough",
    icon: <StrikethroughOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:redo", icon: <RedoOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:undo", icon: <UndoOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:zoom-in", icon: <ZoomInOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:zoom-out", icon: <ZoomOutOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:search", icon: <SearchOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:lock", icon: <LockOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:unlock", icon: <UnlockOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:key", icon: <KeyOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:safety", icon: <SafetyOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:security-scan",
    icon: <SecurityScanOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:setting", icon: <SettingOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:user-add", icon: <UserAddOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:user-delete",
    icon: <UserDeleteOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:user-switch",
    icon: <UserSwitchOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:usergroup-add",
    icon: <UsergroupAddOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:usergroup-delete",
    icon: <UsergroupDeleteOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:man", icon: <ManOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:woman", icon: <WomanOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:global", icon: <GlobalOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:cloud", icon: <CloudOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:cloud-upload",
    icon: <CloudUploadOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:cloud-download",
    icon: <CloudDownloadOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:cloud-sync",
    icon: <CloudSyncOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:cloud-server",
    icon: <CloudServerOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:cluster", icon: <ClusterOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:apartment",
    icon: <ApartmentOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:audit-filled", icon: <AuditFilled style={{ fontSize: 28 }} /> },
  { key: "icon:crown", icon: <CrownOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:crown-filled", icon: <CrownFilled style={{ fontSize: 28 }} /> },
  { key: "icon:rocket", icon: <RocketOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:thunderbolt",
    icon: <ThunderboltOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:tool", icon: <ToolOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:build", icon: <BuildOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:calculator",
    icon: <CalculatorOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:fund", icon: <FundOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:pie-chart",
    icon: <PieChartOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:bar-chart",
    icon: <BarChartOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:area-chart",
    icon: <AreaChartOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:line-chart",
    icon: <LineChartOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:radar-chart",
    icon: <RadarChartOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:heat-map", icon: <HeatMapOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:stock", icon: <StockOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:rise", icon: <RiseOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:fall", icon: <FallOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:box-plot", icon: <BoxPlotOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:sliders", icon: <SlidersOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:dashboard",
    icon: <DashboardOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:database", icon: <DatabaseOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:environment",
    icon: <EnvironmentOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:experiment",
    icon: <ExperimentOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:fire", icon: <FireOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:gift", icon: <GiftOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:gold", icon: <GoldOutlined style={{ fontSize: 28 }} /> },
  {
    key: "icon:hourglass",
    icon: <HourglassOutlined style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:insurance",
    icon: <InsuranceOutlined style={{ fontSize: 28 }} />,
  },
  { key: "icon:layout", icon: <LayoutOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:like-filled", icon: <LikeFilled style={{ fontSize: 28 }} /> },
  { key: "icon:like-two-tone", icon: <LikeTwoTone style={{ fontSize: 28 }} /> },
  { key: "icon:meh", icon: <MehOutlined style={{ fontSize: 28 }} /> },
  { key: "icon:meh-filled", icon: <MehFilled style={{ fontSize: 28 }} /> },
  { key: "icon:meh-two-tone", icon: <MehTwoTone style={{ fontSize: 28 }} /> },
  { key: "icon:smile-filled", icon: <SmileFilled style={{ fontSize: 28 }} /> },
  {
    key: "icon:smile-two-tone",
    icon: <SmileTwoTone style={{ fontSize: 28 }} />,
  },
  { key: "icon:star-filled", icon: <StarFilled style={{ fontSize: 28 }} /> },
  { key: "icon:star-two-tone", icon: <StarTwoTone style={{ fontSize: 28 }} /> },
  {
    key: "icon:trophy-filled",
    icon: <TrophyFilled style={{ fontSize: 28 }} />,
  },
  {
    key: "icon:trophy-two-tone",
    icon: <TrophyTwoTone style={{ fontSize: 28 }} />,
  },
];

import { Pagination } from "antd";

export default function IconPickerModal({ open, onClose, onCopy }) {
  const [page, setPage] = React.useState(1);
  const pageSize = 16;
  const pageCount = Math.ceil(icons.length / pageSize);
  const handleCopy = async (key) => {
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
      width={500}
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
        {icons.slice((page - 1) * pageSize, page * pageSize).map((item) => (
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
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={icons.length}
          onChange={setPage}
          showSizeChanger={false}
        />
      </div>
    </Modal>
  );
}
