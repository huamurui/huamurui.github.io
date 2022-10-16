import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: 'https://flower-dance.life/',
  //这个妈蛋的hostname是sitemap2的，打包一直报错，可能快十几天了我才找到这里。
  //所以这个页面里还有好多tmd插件是自动配到hopeTheme里了吗。。艹艹艹cccccccccccccc

  author: {
    name: "花木瑞",
    url: "https://flower-dance.life",
  },

  themeColor: {
    blue: "#87CEFA",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
    pink: "#FFC0CB",
  },

  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "huamurui/huamurui.github.io",

  docsDir: "docs",

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    medias: {
      Baidu: "https://www.baidu.com/s?wd=%E8%8A%B1%E6%9C%A8%E7%91%9E",
      Email: "https://example.com",
      GitHub: "https://github.com/huamurui",
      Zhihu: "https://www.zhihu.com/people/ke-ai-wu-li-de-nan-hai-zi",
      // huamurui: [
      //   "https://",
      //   "/logo.svg"
      // ],
    },
  },

  locales: {
    /**
     * Chinese locale config
     */
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "默认页脚",

      displayFooter: true,

      blog: {
        description: "一个前端开发者,辩证法大师",
        intro: "/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },

  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: true,
    },
    comment: {
      /**
       * Using Giscus
       */
      provider: "Giscus",
      repo: "huamurui/huamurui.github.io",
      repoId: "R_kgDOHFCWEQ",
      category: "Announcements",
      categoryId: "DIC_kwDOHFCWEc4CR0iI",
    },

    // Disable features you don't want here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      imageSize: true,
      include: true,
      katex: true,
      lazyLoad: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommanded",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommanded",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vpre: true,
      vuePlayground: true,
    },

    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
      // apple: {
      //   icon: "/assets/icon/apple-icon-152.png",
      //   statusBarColor: "black",
      // },
      // msTile: {
      //   image: "/assets/icon/ms-icon-144.png",
      //   color: "#ffffff",
      // },
      manifest: {
        // icons: [
        //   {
        //     src: "/assets/icon/chrome-mask-512.png",
        //     sizes: "512x512",
        //     purpose: "maskable",
        //     type: "image/png",
        //   },
        //   {
        //     src: "/assets/icon/chrome-mask-192.png",
        //     sizes: "192x192",
        //     purpose: "maskable",
        //     type: "image/png",
        //   },
        //   {
        //     src: "/assets/icon/chrome-512.png",
        //     sizes: "512x512",
        //     type: "image/png",
        //   },
        //   {
        //     src: "/assets/icon/chrome-192.png",
        //     sizes: "192x192",
        //     type: "image/png",
        //   },
        // ],
        shortcuts: [
          {
            name: "Demo",
            short_name: "Demo",
            url: "/demo/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },
});