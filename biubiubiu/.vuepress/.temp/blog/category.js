export const categoryMap = {"category":{"/":{"path":"/category/","map":{"指南":{"path":"/category/%E6%8C%87%E5%8D%97/","keys":["v-76d112aa"]},"辩证法":{"path":"/category/%E8%BE%A9%E8%AF%81%E6%B3%95/","keys":["v-b2297452","v-0fdd7a51","v-59b77d72","v-db91f25e","v-d62bd98a","v-21d115ff","v-702e8af2","v-1e1d9906","v-56786a8d","v-d3d168be","v-7cb2c1ea"]},"记录":{"path":"/category/%E8%AE%B0%E5%BD%95/","keys":["v-651d8945","v-782ce3fc"]},"日记":{"path":"/category/%E6%97%A5%E8%AE%B0/","keys":["v-600aff04","v-7a0ecabe"]}}}},"tag":{"/":{"path":"/tag/","map":{"形式主义":{"path":"/tag/%E5%BD%A2%E5%BC%8F%E4%B8%BB%E4%B9%89/","keys":["v-702e8af2"]},"笑话":{"path":"/tag/%E7%AC%91%E8%AF%9D/","keys":["v-59b77d72","v-702e8af2"]},"意识形态":{"path":"/tag/%E6%84%8F%E8%AF%86%E5%BD%A2%E6%80%81/","keys":["v-59b77d72"]},"失败":{"path":"/tag/%E5%A4%B1%E8%B4%A5/","keys":["v-1e1d9906"]},"碎大石":{"path":"/tag/%E7%A2%8E%E5%A4%A7%E7%9F%B3/","keys":["v-56786a8d"]},"物质":{"path":"/tag/%E7%89%A9%E8%B4%A8/","keys":["v-0fdd7a51"]},"记录":{"path":"/tag/%E8%AE%B0%E5%BD%95/","keys":["v-600aff04","v-7a0ecabe"]},"开端":{"path":"/tag/%E5%BC%80%E7%AB%AF/","keys":["v-b2297452","v-d3d168be"]},"hurt":{"path":"/tag/hurt/","keys":["v-7cb2c1ea"]},"发癫":{"path":"/tag/%E5%8F%91%E7%99%AB/","keys":["v-db91f25e"]},"革命":{"path":"/tag/%E9%9D%A9%E5%91%BD/","keys":["v-db91f25e"]},"阶级":{"path":"/tag/%E9%98%B6%E7%BA%A7/","keys":["v-d62bd98a"]},"瞎胡扯":{"path":"/tag/%E7%9E%8E%E8%83%A1%E6%89%AF/","keys":["v-21d115ff"]}}}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogCategory) {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  })
}
