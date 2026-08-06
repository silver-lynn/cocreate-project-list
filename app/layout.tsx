import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "共创项目簿｜当前项目清单",
  description: "12 个正在推进与等待继续的创意项目，一页查看方向、现状与下一步。",
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
