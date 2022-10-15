import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/demo/": [
    "",
    {
      icon: "discover",
      text: "Demo",
      // prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    // {
    //   text: "辩证法",
    //   icon: "note",
    //   prefix: "posts/learn-dialectic/",
    //   children: "structure",
    // },

    // "intro",

    "slides",
  ],

  "/posts/learn-dialectic/": [
    {
      text: "辩证法",
      icon: "note",
      link: "/",
      // prefix: "posts/learn-dialectic/",
      children: "structure",
    },
  ],
  "/posts/CS/": [
    {
      text: "编程，碎碎念",
      icon: "note",
      link: "/",
      // prefix: "posts/learn-dialectic/",
      children: "structure",
    },
  ]


});
