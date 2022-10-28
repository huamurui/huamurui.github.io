import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({

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
