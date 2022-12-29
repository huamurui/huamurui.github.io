import { defineUserConfig } from "vuepress";

import theme from "./theme.js";


export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "花木瑞",
      description: "博客演示",
    },
  },
  theme,


  // plugins: [
  //   searchPlugin({
  //     // 你的选项
  //     locales: {
  //       '/': {
  //         placeholder: '搜索',
  //       },
  //     },

  //   }),
  //   docsearchPlugin({
  //     // 你的选项....日，因为是静态所以只能找外部的服务对吗。。又是一堆麻烦事。不信任.jpg
  //     appId: "",
  //     apiKey: "",
  //     indexName: "",
  //     locales: {
  //       '/': {
  //         placeholder: '搜索文档',
  //         translations: {
  //           button: {
  //             buttonText: '搜索文档',
  //           },
  //         },
  //       },
  //     }
  //   }),
  // ],
  shouldPrefetch: false,
});
