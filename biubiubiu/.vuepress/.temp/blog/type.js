export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-56786a8d","v-b2297452","v-d3d168be","v-db91f25e","v-d62bd98a","v-21d115ff","v-6e19edb7","v-702e8af2","v-59b77d72","v-1e1d9906","v-0fdd7a51","v-184f4da6","v-4e65ec78","v-c151bf32","v-438ffe52","v-1473bf53","v-8b9af7f8","v-76d112aa","v-651d8945"]}},"encrypted":{"/":{"path":"/encrypted/","keys":["v-c151bf32"]}},"slide":{"/":{"path":"/slide/","keys":["v-8b9af7f8"]}},"star":{"/":{"path":"/star/","keys":["v-56786a8d","v-b2297452","v-db91f25e","v-d62bd98a","v-21d115ff","v-6e19edb7","v-59b77d72","v-1e1d9906"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-702e8af2","v-59b77d72","v-1e1d9906","v-56786a8d","v-0fdd7a51","v-b2297452","v-d3d168be","v-db91f25e","v-d62bd98a","v-21d115ff","v-6e19edb7"]}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  })
}
