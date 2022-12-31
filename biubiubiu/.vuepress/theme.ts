import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";



export default hopeTheme({
  hostname: 'https://yuntai.huamurui.me',
  //这个妈蛋的hostname是sitemap2的，打包一直报错，可能快十几天了我才找到这里。
  //所以这个页面里还有好多tmd插件是自动配到hopeTheme里了吗。。艹艹艹cccccccccccccc

  author: {
    name: "花木瑞",
    url: "https://yuntai.huamurui.me",
  },
  darkmode: "switch",

  iconAssets: "iconfont",
  logo: "/logo.svg",

  repo: "huamurui/huamurui.github.io",

  docsDir: "biubiubiu",

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

      footer: "ko no rainbow da",

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

  plugins: {
    blog: true,
    comment: {
      provider: "Waline",
      serverURL: "https://comments.huamurui.me/", // your server url
    },
    // comment: {
    //   /**
    //    * Using Giscus
    //    */
    //   provider: "Giscus",
    //   repo: "huamurui/huamurui.github.io",
    //   repoId: "R_kgDOHFCWEQ",
    //   category: "Announcements",
    //   categoryId: "DIC_kwDOHFCWEc4CR0iI",
    // },

    // Disable features you don't want here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
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
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
    },
  },
});
