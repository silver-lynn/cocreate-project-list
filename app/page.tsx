"use client";

import { useEffect, useMemo, useState } from "react";

type Project = {
  id: string;
  name: string;
  alias?: string;
  status: "推进中" | "待推进";
  group: "网页" | "游戏" | "硬件";
  category: string;
  direction: string;
  context: string;
  next: string;
  accent: string;
  publicUrl?: string;
  publicLabel?: string;
  publicKind?: "online" | "download";
  repoUrl?: string;
  details?: Array<{ label: string; text: string }>;
  existingImages?: Array<{ src: string; alt: string }>;
  existingMediaCaption?: string;
};

const projects: Project[] = [
  {
    id: "monkey-club",
    name: "猴子时间",
    alias: "猴击俱乐部",
    status: "推进中",
    group: "游戏",
    category: "减压体验",
    direction: "面向高压成年人的 3–5 分钟移动端减压 Web 体验。",
    context: "移动端 Web MVP 已公开上线，包含怪叫、摆动、关怀与香蕉收集体验。",
    next: "完成占卜功能，并做一轮移动端体验验收。",
    accent: "#ef6a3a",
    publicUrl: "https://silver-lynn.github.io/houji-club/",
    publicLabel: "立即体验",
    publicKind: "online",
    repoUrl: "https://github.com/silver-lynn/houji-club",
  },
  {
    id: "fruit-shop",
    name: "复古水果店合成游戏",
    status: "推进中",
    group: "游戏",
    category: "休闲游戏",
    direction: "清新复古海报风的水果店合成游戏。",
    context: "正在规划技术路线、项目结构与完整视觉语言。",
    next: "确定核心合成循环，制作首个可玩原型。",
    accent: "#e5a52f",
    details: [
      { label: "核心体验", text: "收集水果、合成升级、解锁新品，再把收益投入店面陈列和装饰。" },
      { label: "已有内容", text: "已确定复古水果海报的视觉方向，正在规划技术路线和项目结构。" },
      { label: "验证重点", text: "首个原型要先证明合成节奏有趣，而不是一次性铺开大量水果和装修系统。" },
    ],
  },
  {
    id: "poet-online",
    name: "假如诗人有网瘾",
    alias: "网络热梗重写古诗",
    status: "推进中",
    group: "网页",
    category: "内容实验",
    direction: "用网络热梗改写古诗，形成可传播的内容或互动产品。",
    context: "正在构思稳定的表达形式，并创作第一批示例内容。",
    next: "确定内容模板，产出一组完整样例测试传播效果。",
    accent: "#7567c8",
    details: [
      { label: "核心体验", text: "从一个网络热梗出发，匹配古诗的情绪与语境，再完成一版既好笑又保留原意的改写。" },
      { label: "已有内容", text: "已经确定“热梗—情绪匹配—古诗改写—分享卡片”的内容链路。" },
      { label: "验证重点", text: "第一批样例需要同时测试可读性、笑点和分享意愿。" },
    ],
  },
  {
    id: "shandong-dinner",
    name: "小猫来吃席",
    alias: "山东饭局礼数互动体验",
    status: "推进中",
    group: "游戏",
    category: "文化体验",
    direction: "通过小动物宴席练习座次、鱼头方向、倒茶分寸、敬酒致辞与动作节奏。",
    context: "完整互动版本已经完成，但当前访客访问仍需授权。",
    next: "开放访客访问权限，并完成一轮公开体验验收。",
    accent: "#c14e4e",
    repoUrl: "https://github.com/silver-lynn/xiaomao-laichixi",
    existingImages: [
      { src: "/project-images/xiaomao-og.png", alt: "小猫来吃席项目已有封面" },
      { src: "/project-images/xiaomao-characters.png", alt: "小猫来吃席已有角色群像" },
      { src: "/project-images/xiaomao-banquet-room.png", alt: "小猫来吃席已有宴席场景" },
    ],
    existingMediaCaption: "项目仓库已有素材：正式封面、角色群像与宴席场景。",
    details: [
      { label: "核心体验", text: "在一场完整宴席中，通过观察、拖动、倾斜和节奏选择练习常见礼数。" },
      { label: "已有内容", text: "座次、鱼头、倒茶、敬酒、动作节奏、咕噜语音和宴席纪念册均已实现。" },
      { label: "当前限制", text: "互动版本已经完成，但当前公开地址需要授权，访客暂时无法直接进入。" },
    ],
  },
  {
    id: "glass-art",
    name: "吹玻璃",
    alias: "数字艺术体验",
    status: "推进中",
    group: "游戏",
    category: "数字艺术",
    direction: "模拟玻璃制作过程的数字互动艺术体验。",
    context: "“玻璃大师：热坊原型”已上线，可体验吹气、塑形、回炉、评分与估价。",
    next: "根据公开原型反馈调整手感，并补充移动端适配。",
    accent: "#4c9ca5",
    publicUrl: "https://silver-lynn.github.io/glassmaster-prototype/",
    publicLabel: "立即体验",
    publicKind: "online",
    repoUrl: "https://github.com/silver-lynn/glassmaster-prototype",
  },
  {
    id: "try-it-on",
    name: "Try It On",
    alias: "投影虚拟试衣",
    status: "待推进",
    group: "硬件",
    category: "空间交互",
    direction: "结合数字模特、动作捕捉、服装投影、场景换装与二次元 Cos。",
    context: "整体技术方案已经完成第一轮梳理。",
    next: "缩小 MVP 范围，优先验证动作捕捉、投影校准与服装跟随。",
    accent: "#5682b9",
    details: [
      { label: "体验路径", text: "用户站入投影区域，系统捕捉姿态，让数字服装随身体移动并切换场景。" },
      { label: "已有内容", text: "已完成第一轮技术方案梳理，明确动作捕捉、服装跟随、投影和场景四个模块。" },
      { label: "验证重点", text: "优先测试延迟、身体遮挡和投影对齐，不先追求完整服装库。" },
    ],
  },
  {
    id: "strong-woman",
    name: "大女人武器换装游戏",
    status: "待推进",
    group: "游戏",
    category: "换装游戏",
    direction: "4399 风格女性换装游戏，结合枪炮武器和“大女人”主题。",
    context: "已完成玩法方向和主题气质的初步策划。",
    next: "确定换装部位、武器系统和首批角色素材清单。",
    accent: "#d45582",
    details: [
      { label: "核心体验", text: "选择角色、替换服装部位与武器，让造型气质和战斗装备形成鲜明反差。" },
      { label: "已有内容", text: "已确定女性换装、枪炮系统与“大女人”表达的组合方向。" },
      { label: "验证重点", text: "先验证单角色换装手感与武器搭配乐趣，再扩展角色和素材数量。" },
    ],
  },
  {
    id: "love-letters",
    name: "情书野史",
    status: "待推进",
    group: "网页",
    category: "数字人文",
    direction: "以名人恋爱史、情书资料与人物关系网络为核心的网站。",
    context: "正在规划内容范围、人物关系和资料结构。",
    next: "选 3–5 位人物做内容样板，并明确史料引用标准。",
    accent: "#a55d67",
    details: [
      { label: "核心结构", text: "用人物、情书、时间线与关系网络串起恋爱史，让读者既能顺读故事，也能沿资料追溯。" },
      { label: "已有内容", text: "已经确定名人关系、情书原文和事件时间线三类核心资料。" },
      { label: "验证重点", text: "样板人物需要证明史料出处清楚，同时保持阅读节奏和人物张力。" },
    ],
  },
  {
    id: "four-directions",
    name: "四方求索",
    status: "待推进",
    group: "网页",
    category: "路线叙事",
    direction: "按方向分类展示中国古代旅行家及其路线的探索网站。",
    context: "已形成初步内容架构与路线交互构想。",
    next: "选一位旅行家完成“人物—路线—事件”样板页。",
    accent: "#3f8065",
    details: [
      { label: "核心结构", text: "从东南西北四个方向进入，选择旅行家，沿路线查看地点、事件和文本片段。" },
      { label: "已有内容", text: "已形成方向、人物、路线、地点与事件之间的初步内容架构。" },
      { label: "验证重点", text: "地图不只展示轨迹，还要让每一次移动都能推进人物故事。" },
    ],
  },
  {
    id: "mindful-scrolling",
    name: "Mindful Scrolling",
    alias: "正念刷视频",
    status: "推进中",
    group: "网页",
    category: "注意力工具",
    direction: "面向 ADHD 与健忘场景的轻量注意力管理工具。",
    context: "Windows v0.8 公开测试版已发布，可下载使用悬浮计时器与本地笔记库。",
    next: "收集公测反馈，验证明确浏览目的是否能减少无意识滚动。",
    accent: "#63924c",
    publicUrl: "https://github.com/silver-lynn/mindful-scrolling/releases/latest",
    publicLabel: "下载 Windows 公测版",
    publicKind: "download",
    repoUrl: "https://github.com/silver-lynn/mindful-scrolling",
  },
  {
    id: "imperial-exam",
    name: "考科举",
    alias: "模拟冒险",
    status: "待推进",
    group: "游戏",
    category: "剧情游戏",
    direction: "橙光式科举剧情游戏，包含科举体验、困难机制和分支选择。",
    context: "正在梳理故事设定、科举流程与玩法细节。",
    next: "完成一条从报名到首场考试的可玩剧情线。",
    accent: "#9a703e",
    details: [
      { label: "核心体验", text: "从报名、备考到应试，在资源、身份和事件选择中承担不同结果。" },
      { label: "已有内容", text: "正在梳理时代设定、科举流程、困难机制与分支叙事的基本关系。" },
      { label: "验证重点", text: "首条剧情必须既能解释科举流程，又保留角色命运和选择压力。" },
    ],
  },
  {
    id: "feather-letter",
    name: "羽毛信",
    alias: "Feather Letter",
    status: "推进中",
    group: "网页",
    category: "候鸟数据",
    direction: "基于候鸟迁徙数据的数字人文与艺术网站。",
    context: "候鸟迁徙月历原型已上线，包含 20 种候鸟与 240 个“物种 × 月份”数据切片。",
    next: "继续完善逐物种数据溯源与不确定性说明，升级核心地图视觉。",
    accent: "#548ba3",
    publicUrl: "https://silver-lynn.github.io/feather-letter/",
    publicLabel: "立即体验",
    publicKind: "online",
    repoUrl: "https://github.com/silver-lynn/feather-letter",
  },
  {
    id: "wuthering-heights-map",
    name: "《呼啸山庄》人物移动地图",
    alias: "Wuthering Heights Mobility Map",
    status: "推进中",
    group: "网页",
    category: "文学地图",
    direction: "把人物的漫游、探访与逃亡转化为双语动态故事地图和研究图集。",
    context: "互动地图、分幕时间轴、人物移动光点与研究图集均已公开上线。",
    next: "继续校订文本事件与距离估算，并扩展可复用的研究图表。",
    accent: "#73624f",
    publicUrl: "https://silver-lynn.github.io/wuthering-heights-mobility-map/",
    publicLabel: "打开互动地图",
    publicKind: "online",
    repoUrl: "https://github.com/silver-lynn/wuthering-heights-mobility-map",
  },
  {
    id: "call-karen",
    name: "KAREN",
    alias: "银河系争气委员会",
    status: "推进中",
    group: "游戏",
    category: "人格测试",
    direction: "选择 MBTI 并完成 5 道冲突场景题，生成窝囊值、特派员阵容与分享战报。",
    context: "移动端人格测试 V1 已公开上线，游客战报保存在本地浏览器。",
    next: "接入登录与云端保存，并继续优化移动端分享体验。",
    accent: "#6f5db8",
    publicUrl: "https://silver-lynn.github.io/call-karen/",
    publicLabel: "立即测试",
    publicKind: "online",
    repoUrl: "https://github.com/silver-lynn/call-karen",
  },
  {
    id: "today-first-order",
    name: "今日一号令",
    status: "推进中",
    group: "网页",
    category: "行动工具",
    direction: "把调查、判断、部署、落实与复盘变成轻量个人工作记录系统。",
    context: "每日记录、每周复盘、工程管理和数据导入导出已公开可用。",
    next: "继续收集长期使用反馈，优化移动端填写和阶段复盘体验。",
    accent: "#8b5035",
    publicUrl: "https://silver-lynn.github.io/today-first-order/",
    publicLabel: "立即使用",
    publicKind: "online",
    repoUrl: "https://github.com/silver-lynn/today-first-order",
  },
];

const projectGroups = [
  { id: "web", name: "网页" as const, description: "网站、数字人文、内容实验与个人数字工具" },
  { id: "games", name: "游戏" as const, description: "可玩原型、互动叙事与轻量体验" },
  { id: "hardware", name: "硬件" as const, description: "空间装置、投影体验与实体交互" },
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
        <div className="dateStamp">更新于 2026.08.07</div>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">CURRENT PROJECTS · {projects.length}</p>
          <h1>把散落的想法，<br />变成正在发生的项目。</h1>
          <p className="intro">
            按网页、游戏与硬件整理正在发生的创作。每个项目保留方向、进度、下一步与可访问入口。
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

        <nav className="groupNav" aria-label="项目分区导航">
          {projectGroups.map((group) => (
            <a href={`#${group.id}`} key={group.id}>
              <strong>{String(projects.filter((project) => project.group === group.name).length).padStart(2, "0")}</strong>
              <span>{group.name}</span>
              <small>{group.description}</small>
            </a>
          ))}
        </nav>

        <div className="resultLine" aria-live="polite">
          <span>显示 {visibleProjects.length} 个项目</span>
          <strong>7 个公开入口已验证 · 6 个在线体验 · 1 个 Windows 公测版</strong>
        </div>

        {visibleProjects.length > 0 ? (
          <div className="projectSections">
            {projectGroups.map((group, groupIndex) => {
              const groupedProjects = visibleProjects.filter((project) => project.group === group.name);
              if (groupedProjects.length === 0) return null;
              return (
                <section className="projectSection" id={group.id} key={group.id}>
                  <header className="projectSectionHead">
                    <div><span>0{groupIndex + 1}</span><h3>{group.name}</h3></div>
                    <p>{group.description}</p>
                  </header>
                  <div className={`projectGrid ${group.name === "硬件" ? "single" : ""}`}>
                    {groupedProjects.map((project, index) => {
                      const isCompleted = completed.includes(project.id);
                      return (
                        <article
                          className={`projectCard ${isCompleted ? "completed" : ""}`}
                          key={project.id}
                          style={{ "--accent": project.accent } as React.CSSProperties}
                        >
                          <div className="cardTopline">
                            <span className="cardIndex">{String(index + 1).padStart(2, "0")}</span>
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

                          {project.existingImages && (
                            <figure className="existingMedia">
                              <div>
                                {project.existingImages.map((image) => (
                                  <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />
                                ))}
                              </div>
                              {project.existingMediaCaption && <figcaption>{project.existingMediaCaption}</figcaption>}
                            </figure>
                          )}

                          {project.details && (
                            <div className="projectDetails">
                              {project.details.map((detail) => (
                                <div key={detail.label}>
                                  <span>{detail.label}</span>
                                  <p>{detail.text}</p>
                                </div>
                              ))}
                            </div>
                          )}

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
                          {(project.publicUrl || project.repoUrl) && (
                            <div className="projectActions">
                              {project.publicUrl && (
                                <a
                                  className={`projectLink ${project.publicKind === "download" ? "download" : ""}`}
                                  href={project.publicUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <span>{project.publicKind === "download" ? "公开测试" : "已上线"}</span>
                                  {project.publicLabel} ↗
                                </a>
                              )}
                              {project.repoUrl && (
                                <a className="repoLink" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                  GitHub ↗
                                </a>
                              )}
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
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
