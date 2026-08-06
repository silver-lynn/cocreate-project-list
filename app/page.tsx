"use client";

import { useEffect, useMemo, useState } from "react";

type Project = {
  id: string;
  name: string;
  alias?: string;
  status: "推进中" | "待推进";
  category: string;
  direction: string;
  context: string;
  next: string;
  accent: string;
};

const projects: Project[] = [
  {
    id: "monkey-club",
    name: "猴子时间",
    alias: "猴击俱乐部",
    status: "推进中",
    category: "减压体验",
    direction: "面向高压成年人的 3–5 分钟移动端减压 Web 体验。",
    context: "Web MVP、上线、猴子节日内容、产品改进；正在扩展投掷香蕉圣杯占卜。",
    next: "完成占卜功能，并做一轮移动端体验验收。",
    accent: "#ef6a3a",
  },
  {
    id: "fruit-shop",
    name: "复古水果店合成游戏",
    status: "推进中",
    category: "休闲游戏",
    direction: "清新复古海报风的水果店合成游戏。",
    context: "正在规划技术路线、项目结构与完整视觉语言。",
    next: "确定核心合成循环，制作首个可玩原型。",
    accent: "#e5a52f",
  },
  {
    id: "poet-online",
    name: "假如诗人有网瘾",
    alias: "网络热梗重写古诗",
    status: "推进中",
    category: "内容实验",
    direction: "用网络热梗改写古诗，形成可传播的内容或互动产品。",
    context: "正在构思稳定的表达形式，并创作第一批示例内容。",
    next: "确定内容模板，产出一组完整样例测试传播效果。",
    accent: "#7567c8",
  },
  {
    id: "shandong-dinner",
    name: "山东饭局人情世故培训",
    status: "推进中",
    category: "文化体验",
    direction: "把山东酒局规则与人情世故做成在线体验。",
    context: "目前集中在需求梳理和内容边界确认。",
    next: "确定用户身份、学习路径及核心交互形式。",
    accent: "#c14e4e",
  },
  {
    id: "glass-art",
    name: "吹玻璃",
    alias: "数字艺术体验",
    status: "待推进",
    category: "数字艺术",
    direction: "模拟玻璃制作过程的数字互动艺术体验。",
    context: "已进入参考案例调研与技术路线设计阶段。",
    next: "选定主要交互方式，制作单一吹制动作原型。",
    accent: "#4c9ca5",
  },
  {
    id: "try-it-on",
    name: "Try It On",
    alias: "投影虚拟试衣",
    status: "待推进",
    category: "空间交互",
    direction: "结合数字模特、动作捕捉、服装投影、场景换装与二次元 Cos。",
    context: "整体技术方案已经完成第一轮梳理。",
    next: "缩小 MVP 范围，优先验证动作捕捉与服装跟随。",
    accent: "#5682b9",
  },
  {
    id: "strong-woman",
    name: "大女人武器换装游戏",
    status: "待推进",
    category: "换装游戏",
    direction: "4399 风格女性换装游戏，结合枪炮武器和“大女人”主题。",
    context: "已完成玩法方向和主题气质的初步策划。",
    next: "确定换装部位、武器系统和首批角色素材清单。",
    accent: "#d45582",
  },
  {
    id: "love-letters",
    name: "情书野史",
    status: "待推进",
    category: "数字人文",
    direction: "以名人恋爱史、情书资料与人物关系网络为核心的网站。",
    context: "正在规划内容范围、人物关系和资料结构。",
    next: "选 3–5 位人物做内容样板，并明确史料引用标准。",
    accent: "#a55d67",
  },
  {
    id: "four-directions",
    name: "四方求索",
    status: "待推进",
    category: "路线叙事",
    direction: "按方向分类展示中国古代旅行家及其路线的探索网站。",
    context: "已形成初步内容架构与路线交互构想。",
    next: "选一位旅行家完成“人物—路线—事件”样板页。",
    accent: "#3f8065",
  },
  {
    id: "mindful-scrolling",
    name: "Mindful Scrolling",
    alias: "正念刷视频",
    status: "待推进",
    category: "注意力工具",
    direction: "面向 ADHD 与健忘场景的轻量注意力管理工具。",
    context: "包含任务提醒、随机进度询问、任务分类、每日复盘与 iOS 悬浮计时横幅。",
    next: "确定首发平台，验证提醒是否真正减少无意识刷视频。",
    accent: "#63924c",
  },
  {
    id: "imperial-exam",
    name: "考科举",
    alias: "模拟冒险",
    status: "待推进",
    category: "剧情游戏",
    direction: "橙光式科举剧情游戏，包含科举体验、困难机制和分支选择。",
    context: "正在梳理故事设定、科举流程与玩法细节。",
    next: "完成一条从报名到首场考试的可玩剧情线。",
    accent: "#9a703e",
  },
  {
    id: "feather-letter",
    name: "羽毛信",
    alias: "Feather Letter",
    status: "待推进",
    category: "候鸟数据",
    direction: "基于候鸟迁徙数据的数字人文与艺术网站。",
    context: "已完成可靠数据源调研、线上版本分析和视觉优化建议。",
    next: "统一数据来源说明，完成首页与核心地图的视觉升级。",
    accent: "#548ba3",
  },
];

type Filter = "全部" | Project["status"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("全部");
  const [completed, setCompleted] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("project-list-completed");
    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch {
        setCompleted([]);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(
        "project-list-completed",
        JSON.stringify(completed),
      );
    }
  }, [completed, ready]);

  const visibleProjects = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter = filter === "全部" || project.status === filter;
      const content = [
        project.name,
        project.alias,
        project.category,
        project.direction,
        project.context,
        project.next,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesFilter && (!keyword || content.includes(keyword));
    });
  }, [filter, query]);

  const toggleCompleted = (id: string) => {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="返回项目总览顶部">
          <span className="brandMark">共</span>
          <span>共创项目簿</span>
        </a>
        <div className="dateStamp">更新于 2026.08.06</div>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">CURRENT PROJECTS · 12</p>
          <h1>把散落的想法，<br />变成正在发生的项目。</h1>
          <p className="intro">
            一页看清创意、游戏、数字人文与体验工具。每个项目只保留三个关键信息：它要做什么、目前在哪里、下一步往哪走。
          </p>
        </div>

        <div className="overview" aria-label="项目概况">
          <div className="statPrimary">
            <span className="statNumber">{projects.length}</span>
            <span className="statLabel">个项目在案</span>
          </div>
          <div className="statRow">
            <div>
              <strong>{projects.filter((item) => item.status === "推进中").length}</strong>
              <span>正在推进</span>
            </div>
            <div>
              <strong>{projects.filter((item) => item.status === "待推进").length}</strong>
              <span>等待继续</span>
            </div>
            <div>
              <strong>{completed.length}</strong>
              <span>已标完成</span>
            </div>
          </div>
          <div className="progressTrack" aria-hidden="true">
            <span style={{ width: `${(completed.length / projects.length) * 100}%` }} />
          </div>
        </div>
      </section>

      <section className="workspace" aria-labelledby="list-heading">
        <div className="workspaceHead">
          <div>
            <p className="sectionIndex">PROJECT INDEX</p>
            <h2 id="list-heading">项目总览</h2>
          </div>
          <p className="workspaceNote">点击圆点标记完成，进度会保存在这台设备上。</p>
        </div>

        <div className="toolbar">
          <label className="searchBox">
            <span className="searchIcon" aria-hidden="true">⌕</span>
            <span className="srOnly">搜索项目</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索项目、方向或下一步…"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="清除搜索">
                ×
              </button>
            )}
          </label>

          <div className="filters" aria-label="按项目状态筛选">
            {(["全部", "推进中", "待推进"] as Filter[]).map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="resultLine" aria-live="polite">
          显示 {visibleProjects.length} 个项目
        </div>

        {visibleProjects.length > 0 ? (
          <div className="projectGrid">
            {visibleProjects.map((project, index) => {
              const isCompleted = completed.includes(project.id);
              return (
                <article
                  className={`projectCard ${isCompleted ? "completed" : ""}`}
                  key={project.id}
                  style={{ "--accent": project.accent } as React.CSSProperties}
                >
                  <div className="cardTopline">
                    <span className="cardIndex">
                      {String(projects.indexOf(project) + 1).padStart(2, "0")}
                    </span>
                    <span className="category">{project.category}</span>
                    <span className={`status ${project.status === "推进中" ? "ongoing" : "queued"}`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="titleRow">
                    <div>
                      <h3>{project.name}</h3>
                      {project.alias && <p className="alias">{project.alias}</p>}
                    </div>
                    <button
                      type="button"
                      className="completeButton"
                      onClick={() => toggleCompleted(project.id)}
                      aria-label={`${isCompleted ? "取消完成" : "标记完成"}：${project.name}`}
                      aria-pressed={isCompleted}
                    >
                      <span aria-hidden="true">{isCompleted ? "✓" : ""}</span>
                    </button>
                  </div>

                  <p className="direction">{project.direction}</p>

                  <div className="detailBlock">
                    <span>目前</span>
                    <p>{project.context}</p>
                  </div>

                  <div className="nextStep">
                    <span className="nextArrow" aria-hidden="true">↗</span>
                    <div>
                      <span>下一步</span>
                      <p>{project.next}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="emptyState">
            <span>○</span>
            <h3>没有找到相关项目</h3>
            <p>换一个关键词，或者查看全部项目。</p>
            <button type="button" onClick={() => { setQuery(""); setFilter("全部"); }}>
              查看全部
            </button>
          </div>
        )}
      </section>

      <section className="connectSection" aria-labelledby="connect-heading">
        <div className="connectIntro">
          <div>
            <p className="sectionIndex">CONNECT &amp; COCREATE</p>
            <h2 id="connect-heading">找到同路人</h2>
          </div>
          <p>
            想聊项目、一起创作，或者只是想痛快吼两声，都可以从这里找到入口。
          </p>
        </div>

        <div className="qrGrid">
          <article className="qrCard">
            <div className="qrCardHead">
              <span className="qrNumber">01</span>
              <div>
                <h3>加我微信</h3>
                <p>Leona · 项目交流与共创</p>
              </div>
            </div>
            <a
              className="qrImageLink"
              href="/qrcode-wechat.jpg"
              target="_blank"
              rel="noreferrer"
              aria-label="查看加我微信二维码原图"
            >
              <img
                src="/qrcode-wechat.jpg"
                alt="Leona 的微信好友二维码"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="qrHint">微信扫码添加 · 手机端可点开后长按保存</p>
          </article>

          <article className="qrCard monkeyQrCard">
            <div className="qrCardHead">
              <span className="qrNumber">02</span>
              <div>
                <h3>猴击俱乐部吼叫群</h3>
                <p>纯解压乱叫 · 无需组织语言</p>
              </div>
            </div>
            <a
              className="qrImageLink"
              href="/qrcode-monkey-club.jpg"
              target="_blank"
              rel="noreferrer"
              aria-label="查看猴击俱乐部吼叫群二维码原图"
            >
              <img
                src="/qrcode-monkey-club.jpg"
                alt="猴击俱乐部吼叫群二维码"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="qrHint">群二维码有效期至 2026.08.13</p>
          </article>

          <article className="qrCard cocreateQrCard">
            <div className="qrCardHead">
              <span className="qrNumber">03</span>
              <div>
                <h3>加入共创群聊项目</h3>
                <p>认识创作者 · 把想法一起做出来</p>
              </div>
            </div>
            <a
              className="qrImageLink"
              href="/qrcode-cocreate.jpg"
              target="_blank"
              rel="noreferrer"
              aria-label="查看共创群聊项目二维码原图"
            >
              <img
                src="/qrcode-cocreate.jpg"
                alt="Leona 的创作者朋友群聊二维码"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="qrHint">群二维码有效期至 2026.08.13</p>
          </article>
        </div>

        <p className="expiryNote">
          群二维码失效后，请先添加 Leona 微信获取最新入口。
        </p>
      </section>

      <footer>
        <p>想法不是库存，是等待发生的行动。</p>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </main>
  );
}
