

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  base: string;
  site: string;
  keywords: Array<string>;
  author: {
    name: string;
    email?: string;
    github?: string;
    avatar?: string;
  };
  navItems: Array<{
    href: string;
    labelKey: string;
    label: string;
  }>;
  socialLinks: Array<{
    nameKey: string;
    href: string;
    icon?: string;
  }>;
  theme: {
    light: {
      primary: string;
      secondary?: string;
    };
    dark: {
      primary: string;
      secondary?: string;
    };
  };
  locale: string;
  giscus?: {
    enabled: boolean;
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
    mapping: string;
    strict: string;
    reactionsEnabled: string;
    emitMetadata: string;
    inputPosition: string;
    lang: string;
    loading: 'lazy' | 'eager';
  };
}

export const siteConfig: SiteConfig = {
  name: 'Greenhouse between Clouds',
  description: '这是一个四处捡东西的 blog。捡一点代码、图画、历史和胡说八道，看看它们背后藏着怎样的结构，又是怎么慢慢变成今天这样的。',
  url: 'https://huamurui.github.io',
  site: 'https://huamurui.github.io',
  base: '',
  keywords: ['blog', '云苔', 'huamurui', 'barssica', 'programming', 'tech', 'technology', 'Greenhouse between Clouds'],
  author: {
    name: '云苔',
    email: 'huamurui@outlook.com',
    github: 'https://github.com/huamurui'
  },
  navItems: [
    { href: './', labelKey: 'home', label: 'home' },
    { href: './timeline', labelKey: 'timeline', label: 'timeline' },
    { href: './about', labelKey: 'about', label: 'about' }
    // { href: './links', labelKey: 'links', label:'links'  }
  ],
  socialLinks: [
    { nameKey: 'social.github', href: 'https://github.com/huamurui' },
    { nameKey: 'social.email', href: 'mailto:huamurui@outlook.com' },
    { nameKey: 'social.rss', href: '/rss.xml' },
    { nameKey: 'social.sitemap', href: '/sitemap.xml' }
  ],
  theme: {
    light: {
      primary: '#5e7eff'
    },
    dark: {
      primary: '#ff9eb6'
    }
  },
  locale: 'zh-CN',
  giscus: {
    enabled: true,
    repo: 'huamurui/huamurui.github.io',
    repoId: 'R_kgDOHFCWEQ',
    category: 'General',
    categoryId: 'DIC_kwDOHFCWEc4CR0iJ',
    mapping: 'pathname',
    strict: '0',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'bottom',
    lang: 'zh-CN',
    loading: 'lazy'
  }
}
