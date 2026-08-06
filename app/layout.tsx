import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "共创项目簿｜当前项目清单",
  description: "15 个网页、游戏与硬件项目，一页查看方向、进度、下一步和公开入口。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
