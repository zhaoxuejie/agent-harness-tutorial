# Agent + Harness · 从零到一沉浸式教程

> 不教你调用现成框架，而是从一行代码开始。每章只加一个零件，由易到难，九步走完——从裸循环到带工具、插件、记忆、状态、多 Agent 与观测的完整执行层。

[![Deploy to GitHub Pages](https://github.com/zhaoxuejie/agent-harness-tutorial/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/zhaoxuejie/agent-harness-tutorial/actions/workflows/deploy-pages.yml)
[![GitHub Pages](https://img.shields.io/badge/demo-online-0ea5b7)](https://zhaoxuejie.github.io/agent-harness-tutorial/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Made with HTML](https://img.shields.io/badge/stack-HTML%20%2B%20CSS%20%2B%20JS-orange)](#技术栈)

## 🌐 在线阅读

**<https://zhaoxuejie.github.io/agent-harness-tutorial/>**

纯静态站点，无需安装任何依赖，克隆后双击 `index.html` 也能直接看。

## 📚 学习路径

| 章节 | 主题 | 一句话说明 |
| --- | --- | --- |
| [Chapter 00](./chapter-0.html) | 开篇 | 建立直觉，看清 Agent 最小骨架 |
| [Chapter 01](./chapter-1.html) | 最简 Agent Loop | 裸循环：思考 → 行动 → 观察 |
| [Chapter 02](./chapter-2.html) | 工具调用 | 给 Agent 装上工具注册表 |
| [Chapter 03](./chapter-3.html) | 基础 Harness | 抽象出执行层，循环归 Harness |
| [Chapter 04](./chapter-4.html) | Harness 插件 | 按需加载能力，暴露能力清单 |
| [Chapter 05](./chapter-5.html) | 记忆模块 | 短期记忆 + 长期摘要，防失忆 |
| [Chapter 06](./chapter-6.html) | 状态管理 | 每步可记录，支持断点续跑 |
| [Chapter 07](./chapter-7.html) | 多 Agent | 编排器 + 专才，多 Agent 协作 |
| [Chapter 08](./chapter-8.html) | 观测与部署 | 可观测三件套 + 工程化部署 |

## ✨ 特性

- **渐进式**：每章只引入一个新概念，前一章的代码是后一章的地基，不断层。
- **可视化**：内置 Mermaid，流程图 / 时序图 / 状态图直接在页面上渲染。
- **双主题**：明暗主题一键切换，跟随阅读习惯。
- **响应式**：桌面侧边目录 + 移动端抽屉导航，随时可读。
- **零构建**：原生 HTML/CSS/JS，没有打包步骤，改完刷新即生效。

## 📁 目录结构

```
agent-harness-tutorial/
├── index.html              # 首页 / 学习路径总览
├── chapter-0.html          # 第 00 章 · 开篇
├── chapter-1.html          # 第 01 章 · 最简 Agent Loop
├── ...
├── chapter-8.html          # 第 08 章 · 观测与部署
├── assets/
│   ├── style.css           # 全站样式（含明暗主题变量）
│   ├── app.js              # 侧边目录、进度条、主题切换
│   └── mermaid.min.js      # 图表渲染引擎（本地内置，离线可用）
└── .github/workflows/
    └── deploy-pages.yml    # 自动部署到 GitHub Pages
```

## 🚀 本地运行

方式一，直接打开：

```bash
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

方式二，起一个本地静态服务器（更接近线上环境）：

```bash
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 🛠 技术栈

原生 **HTML + CSS + JavaScript**，无框架、无依赖、无构建。
图表由 [Mermaid](https://mermaid.js.org/) 本地渲染（`assets/mermaid.min.js`），因此断网也能正常查看全部图例。

## 📦 部署

仓库已配置 GitHub Actions 工作流 `.github/workflows/deploy-pages.yml`：
向 `main` 分支推送时自动把站点发布到 GitHub Pages，也可在 **Actions → Deploy to GitHub Pages → Run workflow** 手动触发。

首次使用需在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。

## 📄 License

[MIT](./LICENSE) © 2024 zhaoxuejie
