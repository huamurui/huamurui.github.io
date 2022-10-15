export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-db91f25e","v-d62bd98a","v-21d115ff","v-56786a8d","v-b2297452","v-d3d168be","v-6e19edb7","v-b5490f02","v-74c48e46","v-0fdd7a51","v-7a0ecabe","v-184f4da6","v-4e65ec78","v-c151bf32","v-438ffe52","v-1473bf53","v-8b9af7f8","v-76d112aa","v-651d8945","v-0f1a6fcc","v-59b77d72","v-702e8af2","v-1e1d9906","v-7cb2c1ea"]}},"encrypted":{"/":{"path":"/encrypted/","keys":["v-c151bf32"]}},"slide":{"/":{"path":"/slide/","keys":["v-8b9af7f8"]}},"star":{"/":{"path":"/star/","keys":["v-db91f25e","v-d62bd98a","v-21d115ff","v-56786a8d","v-b2297452","v-6e19edb7","v-59b77d72","v-1e1d9906"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-b5490f02","v-74c48e46","v-0fdd7a51","v-7a0ecabe","v-184f4da6","v-4e65ec78","v-c151bf32","v-438ffe52","v-1473bf53","v-8b9af7f8","v-76d112aa","v-651d8945","v-0f1a6fcc","v-59b77d72","v-db91f25e","v-d62bd98a","v-21d115ff","v-702e8af2","v-1e1d9906","v-56786a8d","v-b2297452","v-d3d168be","v-7cb2c1ea","v-6e19edb7"]}}}

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
