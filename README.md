# Astro Theme Pudding

A modern, customizable Astro blog theme.

## Features

- 🎨 **Modern Design** - Clean and beautiful interface
- 🌓 **Dark Mode** - Light/dark theme switching support
- 📱 **Responsive Design** - Perfect for mobile and desktop
- 📝 **Markdown Support** - Full Markdown and math formula support
- 🏷️ **Tag System** - Flexible tag management and filtering
- 📊 **SEO Optimized** - Complete structured data and SEO support
- 🍞 **Breadcrumb Navigation** - File directory-based breadcrumbs

## Quick Start

### Installation

Use Node.js 22.12 or newer and pnpm 10 (10.26 or newer). The repository’s `.nvmrc` selects Node 22.

```bash
npm install --global pnpm@10 # if pnpm 10 is not already installed
pnpm install --frozen-lockfile
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

`dev`, `check`, and `build` generate backlinks first. `pnpm generate` refreshes them on its own; restart the development server after changing article links. Sasayai is loaded directly from its Markdown source and updates while the development server is running. `pnpm build:infos` remains an alias for `pnpm build`.

### Validation

```bash
pnpm lint
pnpm check
pnpm test
pnpm build
```

Pull requests targeting `astro-pudding` run validation and a production build. Pushes to that branch deploy the validated output to GitHub Pages. Manual workflow runs deploy only when that same branch is selected.

## Configuration

All configuration is in `src/config/site.config.ts`:

```typescript
export const siteConfig: SiteConfig = {
  name: "Your Site Name",
  description: "Your site description",
  url: "https://yoursite.com",
  site: "https://yoursite.com", // Astro site origin; keep in sync with url
  base: "", // Use "/repository-name" for a GitHub Pages project site
  keywords: ["blog"],
  author: {
    name: "Your Name",
    email: "your@email.com",
  },
  navItems: [
    { href: "./", labelKey: "home", label: "Home" },
  ],
  socialLinks: [],
  // Theme colors configuration
  theme: {
    light: {
      primary: "#5e7eff",
    },
    dark: {
      primary: "#ff9eb6",
    },
  },
  locale: "en-US", // or "zh-CN"
  // Add more language support in `src/config/i18n.config.ts`
};
```

## Features Guide

### Post Management

Posts are placed in the `src/posts/` directory with support for nested folder structures. `title` and `date` are required; other fields below are optional:

```markdown
---
title: "Post Title"
date: 2025-01-01
description: "Post description"
tags: ["tag1", "tag2"]
pinned: true  # Optional: pin post to top
draft: false  # Set true to omit the post from public pages, search and feeds
---
```

### Category Pages

Category pages are automatically generated based on the directory structure. For example, posts in `src/posts/tech/` will be accessible at `/posts/tech/` without needing to create an index.md file.

### Breadcrumb Navigation

Breadcrumb navigation is automatically generated based on the file directory structure, showing the path from Home to the current page.

### Sasayai and Backlinks

Add entries to `src/data/sasayai.md` using a top-level comment such as `<!-- note: 2026-11-03T14:42:00+08:00; tags: development, diary -->`, followed by a blank line and Markdown content. The timezone is required; tags are optional. Put new entries at the top. Each timestamp produces a stable UTC-based link on the Sasayai page. Invalid or duplicate timestamps stop loading while preserving the previous collection. The page editor also writes to this file.

Backlinks are generated from local Markdown article links, including reference links, query strings and anchors. Link to a relative article such as `../tech/example.md#heading` or a site route such as `/posts/tech/example/`. Only existing articles contribute backlinks. Generated `.cache/` files are excluded from Git.

### Tag System

Tags are automatically extracted from post frontmatter, generating tag pages and statistics.

### Post Pinning

Add `pinned: true` to post frontmatter to pin it to the top of post lists. Pinned posts display with a 📌 icon and special styling.

### Markdown Extensions

#### link-card

Supports inserting link cards in markdown. For example:

```markdown
[Link Card](https://example.com)
```

This generates a link card pointing to `https://example.com`.

#### spoiler

Supports spoiler content with different styles:

```markdown
||| black-spoiler |||
|| blur-spoiler ||
```

## License

MIT

## Credits

Built with [Astro](https://astro.build/)

Inspired by many other blog themes' designs and implementations, especially [fuwari](https://github.com/saicaca/fuwari).
