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

Use Node.js 22.12 or newer (Node 22 is pinned in `.nvmrc`) and the pnpm version in `package.json`.

```bash
npm install --global pnpm@12.8.1
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

`dev`, `check`, and `build` generate the sasayai collection and backlinks first. `pnpm generate` refreshes this data on its own; restart the development server after editing `src/data/sasayai.json` or changing article links. `pnpm build:infos` remains an alias for `pnpm build`.

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

Edit `src/data/sasayai.json` to add short Markdown entries. Each entry needs a valid date string and string `content`; a unique string `id` can contain letters, digits, hyphens and underscores. Missing IDs are generated deterministically. Invalid or duplicate entries stop generation while preserving the previous cache.

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
