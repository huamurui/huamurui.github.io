

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
    label:string;
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
}

export const siteConfig: SiteConfig = {
  name: "Green House Between Clouds",
  description: "A blog about web tech and nonsense.",
  url: "https://huamurui.github.io",
  site: "https://huamurui.github.io",
  base: "",
  keywords: ["blog","云苔","huamurui",'barssica','programming','tech','technology','Green House Between Clouds'],
  author: {
    name: "云苔",
    email: "huamurui@outlook.com",
    github: "https://github.com/huamurui",
  },
  navItems: [
    { href: "./", labelKey: "home", label:"home" },
    { href: "./timeline", labelKey: "timeline", label:"timeline"  },
    { href: "./about", labelKey: "about", label:"about"  },
  ],
  socialLinks: [
    { nameKey: "social.github", href: "https://github.com/huamurui" },
    { nameKey: "social.email", href: "huamurui@outlook.com" },
    { nameKey: "social.rss", href: "./rss.xml" },
    { nameKey: "social.sitemap", href: "./sitemap-index.xml" },
  ],
  theme: {
    light: {
      primary: "#5e7eff",
    },
    dark: {
      primary: "#ff9eb6",
    },
  },
  locale: "en-US"
};
