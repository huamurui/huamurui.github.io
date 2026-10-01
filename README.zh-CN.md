# Astro Theme Pudding

一个现代的、可定制的 Astro 博客主题。

## 特性

- 🎨 **现代化设计** - 简洁美观的界面设计
- 🌓 **深色模式** - 支持亮色/暗色主题切换
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 📝 **Markdown 支持** - 完整的 Markdown 支持及扩展
- 🏷️ **标签系统** - 灵活的标签管理和筛选
- 📊 **SEO 优化** - 完整的结构化数据和 SEO 支持
- 🍞 **面包屑导航** - 基于文件目录的面包屑导航

## 快速开始

### 安装

使用 Node.js 22.12 或以上版本（`.nvmrc` 固定使用 Node 22），以及 `package.json` 中指定的 pnpm 版本。

```bash
npm install --global pnpm@12.8.1
pnpm install --frozen-lockfile
```

### 开发

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 预览

```bash
pnpm preview
```

`dev`、`check` 和 `build` 会先生成 sasayai 集合与反向链接。可用 `pnpm generate` 单独刷新这些数据；编辑 `src/data/sasayai.json` 或修改文章链接后，需要重启开发服务器。`pnpm build:infos` 保留为 `pnpm build` 的别名。

### 验证

```bash
pnpm lint
pnpm check
pnpm test
pnpm build
```

目标为 `astro-pudding` 的 Pull Request 会运行校验与生产构建。向该分支推送后，验证通过的构建会部署到 GitHub Pages。手动运行工作流时，仅选择同一分支才会部署。

## 配置

在 `src/config/site.config.ts` 文件中：

```typescript
export const siteConfig: SiteConfig = {
  name: "Your Site Name",
  description: "Your site description",
  url: "https://yoursite.com",
  site: "https://yoursite.com", // Astro 站点地址，与 url 保持一致
  base: "", // GitHub Pages 项目站点填写 "/repository-name"
  keywords: ["blog"],
  author: {
    name: "Your Name",
    email: "your@email.com",
  },
  navItems: [
    { href: "./", labelKey: "home", label: "首页" },
  ],
  socialLinks: [],
  // 主题颜色配置
  theme: {
    light: {
      primary: "#5e7eff",
    },
    dark: {
      primary: "#ff9eb6",
    },
  },
  locale: "zh-CN", // 或 "en-US"
  // 可在 `src/config/i18n.config.ts` 中添加更多语言支持
};

```

## 功能说明

### 文章管理

文章放在 `src/posts/` 目录下，支持嵌套文件夹结构。`title` 和 `date` 为必填字段，以下其他字段可选：

```markdown
---
title: "文章标题"
date: 2025-01-01
description: "文章描述"
tags: ["标签1", "标签2"]
pinned: true  # 可选：将文章置顶
draft: false  # 设置 true 后不会出现在公开页面、搜索和订阅中
---
```

### 目录页面

目录页面基于目录结构自动生成。例如，`src/posts/tech/` 中的文章可以通过 `/posts/tech/` 访问，无需创建 index.md 文件。

### 面包屑导航

面包屑导航基于文件目录结构自动生成，显示从首页到当前页面的路径。

### Sasayai 与反向链接

编辑 `src/data/sasayai.json` 可以添加 Markdown 短消息。每条数据需要有效的日期字符串和字符串 `content`；可选的唯一字符串 `id` 支持字母、数字、连字符和下划线。缺少 ID 时会生成稳定的 ID。无效数据或重复 ID 会中止生成，并保留上一次成功的缓存。

反向链接从本地 Markdown 文章链接生成，支持引用式链接、查询参数与锚点。可使用 `../tech/example.md#heading` 这样的相对路径，或 `/posts/tech/example/` 这样的站点路径。只有存在的文章会产生反向链接。生成的 `.cache/` 文件不提交到 Git。

### 标签系统

标签会自动从文章 frontmatter 中提取，并生成标签页面和统计信息。

### 文章置顶

在文章 frontmatter 中添加 `pinned: true` 可以将文章置顶到列表顶部。置顶文章会显示 📌 图标和特殊样式。

### markdown 扩展

#### link-card

支持在 markdown 中插入链接卡片。例如：

```markdown
[链接卡片](https://example.com)
```

会生成一个指向 `https://example.com` 的链接卡片。

#### spoiler

```markdown
||| black-spoiler |||
|| blur-spoiler ||
```

## 许可证

MIT

## 致谢

基于 [Astro](https://astro.build/) 构建。  
参考了许多其他博客主题的设计和实现，特别是 [fuwari](https://github.com/saicaca/fuwari)。
