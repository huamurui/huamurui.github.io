export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-b2297452","v-600aff04","v-0fdd7a51","v-7a0ecabe","v-59b77d72","v-db91f25e","v-d62bd98a","v-21d115ff","v-702e8af2","v-1e1d9906","v-56786a8d","v-d3d168be","v-7cb2c1ea","v-184f4da6","v-76d112aa","v-782ce3fc","v-651d8945"]}},"encrypted":{"/":{"path":"/encrypted/","keys":[]}},"slide":{"/":{"path":"/slide/","keys":[]}},"star":{"/":{"path":"/star/","keys":["v-b2297452"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-600aff04","v-0fdd7a51","v-7a0ecabe","v-59b77d72","v-db91f25e","v-d62bd98a","v-21d115ff","v-702e8af2","v-1e1d9906","v-56786a8d","v-b2297452","v-d3d168be","v-7cb2c1ea"]}}}

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
