# 更新日志

本项目的所有重要变更都会记录在此文件。

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.0] - 2024-01-01

首个正式版。九章渐进式教程全部完成，并搭建了自动部署链路。

### 新增

- **教程正文（9 章）**：从最简 Agent Loop 出发，每章只加一个零件
  - 第 00 章 · 开篇：建立直觉，看清 Agent 最小骨架
  - 第 01 章 · 最简 Agent Loop：裸循环，思考 → 行动 → 观察
  - 第 02 章 · 工具调用：给 Agent 装上工具注册表
  - 第 03 章 · 基础 Harness：抽象出执行层，循环归 Harness
  - 第 04 章 · Harness 插件：按需加载能力，暴露能力清单
  - 第 05 章 · 记忆模块：短期记忆 + 长期摘要，防失忆
  - 第 06 章 · 状态管理：每步可记录，支持断点续跑
  - 第 07 章 · 多 Agent：编排器 + 专才，多 Agent 协作
  - 第 08 章 · 观测与部署：可观测三件套 + 工程化部署
- **首页**：学习路径总览、章节卡片与标签体系
- **可视化**：内置 Mermaid，支持流程图 / 时序图 / 状态图本地渲染，离线可用
- **交互**：明暗双主题切换、响应式侧边目录、阅读进度条、移动端抽屉导航

### 工程化

- GitHub Actions 工作流，push 到 `main` 自动发布到 GitHub Pages
- 新增 `README.md`（徽章、章节索引、目录结构、本地运行说明）
- 新增 `LICENSE`（MIT）
- 新增 `.gitignore`、`.gitattributes`（统一 LF 换行符）、`.nojekyll`

### 说明

- 纯静态站点，无框架、无依赖、无构建步骤
- 全部资源使用相对路径，可部署在任意子路径下

---

## 版本链接

- [1.0.0](https://github.com/zhaoxuejie/agent-harness-tutorial/releases/tag/v1.0.0)
