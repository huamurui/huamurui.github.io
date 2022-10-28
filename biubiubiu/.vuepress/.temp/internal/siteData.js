export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"en-US\",\"title\":\"\",\"description\":\"\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/favicon.ico\"}],[\"link\",{\"rel\":\"manifest\",\"href\":\"/manifest.webmanifest\",\"crossorigin\":\"use-credentials\"}],[\"meta\",{\"name\":\"theme-color\",\"content\":\"#46bd87\"}],[\"meta\",{\"name\":\"viewport\",\"content\":\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover\"}]],\"locales\":{\"/\":{\"lang\":\"zh-CN\",\"title\":\"花木瑞\",\"description\":\"博客演示\"}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
