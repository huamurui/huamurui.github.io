// @ts-check
import { defineConfig } from "astro/config";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkSpoiler from './src/plugin/remark-spoiler.js';
import remarkLinkPreview from './src/plugin/remark-link-preview.js';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import expressiveCode from 'astro-expressive-code';
import path from 'path';
import { siteConfig } from "./src/config/site.config.ts";

export default defineConfig({
  site: siteConfig.site,
  base: siteConfig.base,
  integrations: [
    svelte(),
    sitemap({
      serialize(item) {
        const url = new URL(item.url);
        
        if (url.pathname === '/' || url.pathname === siteConfig.base + '/') {
          // @ts-ignore
          item.changefreq = 'daily';
          item.priority = 1.0;
        } 
        else if (url.pathname.includes('/timeline') || url.pathname.includes('/about')) {
          // @ts-ignore
          item.changefreq = 'weekly';
          item.priority = 0.8;
        }
        else if (url.pathname.includes('/posts/')) {
          // @ts-ignore
          item.changefreq = 'monthly';
          item.priority = 0.7;
        } else {
          // @ts-ignore
          item.changefreq = 'monthly';
          item.priority = 0.6;
        }
        
        return item;
      }
    }),
    expressiveCode({
      themes: ['tokyo-night', 'one-light'],
      styleOverrides: {
        borderRadius: '8px',
        borderColor: 'var(--border-color)',
        codeFontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
      },
      // 配置主题选择器映射
      themeCssSelector: (theme) => {
        // 将我们的主题切换值映射到 Expressive Code 主题
        if (theme.name === 'tokyo-night') {
          return '[data-theme="dark"]';
        }
        if (theme.name === 'one-light') {
          return '[data-theme="light"]';
        }
        return false;
      },
      // 使用暗色模式媒体查询
      useDarkModeMediaQuery: true,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkSpoiler, remarkLinkPreview],
    rehypePlugins: [rehypeKatex],
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src')
      },
    },
  },
});
