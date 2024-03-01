const e=JSON.parse(`{"key":"v-6ee62e34","path":"/posts/CS/front-end/base.html","title":"前端'基础'","lang":"zh-CN","frontmatter":{"dir.icon":"html","title":"前端'基础'","icon":"html","date":"2024-02-28T00:00:00.000Z","category":["八股","前端","记录","面试"],"description":"这里会贴一下...前端面试常见的一些问题的自己的总结，背 api 的就不放了，找的是那种可能要讲一小段的那种。 浏览器地址栏输入 URL 后发生了什么 首先 URL 由 协议 + 域名 + 端口 ++ 路径 + 查询参数 + 锚点 组成。 网络传输 输入 URL 后，浏览器通过 DNS 解析域名，找到对应的服务器 IP 地址，建立 TCP 连接 DNS TCP 发送 HTTP 协议发送请求，服务器接收到请求后，通过 HTTP 协议返回响应 cdn cdn 来处理一些常用资源，cdn 服务会根据用户的地理位置，选择离用户最近的服务器，加速资源的加载。 http 缓存 常见的做法是将主页 index.html 做协商缓存，其他静态资源文件名打包加 hash 后做强缓存。 强缓存是指浏览器直接从本地缓存中读取资源，不需要发送请求到服务器。可以通过设置响应头中的 Cache-Control 和 Expires 来设置强缓存。 协商缓存是指浏览器发送请求到服务器，服务器根据请求头中的 If-None-Match 和 If-Modified-Since 来判断是否命中缓存。可以通过设置响应头中的 ETag 和 Last-Modified 来设置协商缓存。304 意味着命中缓存。 渲染 浏览器接收到响应后，通过 HTML 解析出 DOM 树，然后通过 CSS 解析出 CSSOM 树，然后通过 DOM 树和 CSSOM 树合成渲染树， 然后通过渲染树和布局树合成布局树，然后通过布局树和绘制树合成绘制树，然后通过绘制树绘制到屏幕上。 其中有两个比较重要的概念是，重排和重绘。 重排是指改变了 DOM 结构或文档流布局，需要重新计算布局，比较耗费性能。 重绘是指改变了元素的样式，但是没有改变布局，只需要重新绘制，而不需要重新计算布局，性能开销较小。","head":[["meta",{"property":"og:url","content":"https://huamurui.github.io/posts/CS/front-end/base.html"}],["meta",{"property":"og:site_name","content":"花木瑞"}],["meta",{"property":"og:title","content":"前端'基础'"}],["meta",{"property":"og:description","content":"这里会贴一下...前端面试常见的一些问题的自己的总结，背 api 的就不放了，找的是那种可能要讲一小段的那种。 浏览器地址栏输入 URL 后发生了什么 首先 URL 由 协议 + 域名 + 端口 ++ 路径 + 查询参数 + 锚点 组成。 网络传输 输入 URL 后，浏览器通过 DNS 解析域名，找到对应的服务器 IP 地址，建立 TCP 连接 DNS TCP 发送 HTTP 协议发送请求，服务器接收到请求后，通过 HTTP 协议返回响应 cdn cdn 来处理一些常用资源，cdn 服务会根据用户的地理位置，选择离用户最近的服务器，加速资源的加载。 http 缓存 常见的做法是将主页 index.html 做协商缓存，其他静态资源文件名打包加 hash 后做强缓存。 强缓存是指浏览器直接从本地缓存中读取资源，不需要发送请求到服务器。可以通过设置响应头中的 Cache-Control 和 Expires 来设置强缓存。 协商缓存是指浏览器发送请求到服务器，服务器根据请求头中的 If-None-Match 和 If-Modified-Since 来判断是否命中缓存。可以通过设置响应头中的 ETag 和 Last-Modified 来设置协商缓存。304 意味着命中缓存。 渲染 浏览器接收到响应后，通过 HTML 解析出 DOM 树，然后通过 CSS 解析出 CSSOM 树，然后通过 DOM 树和 CSSOM 树合成渲染树， 然后通过渲染树和布局树合成布局树，然后通过布局树和绘制树合成绘制树，然后通过绘制树绘制到屏幕上。 其中有两个比较重要的概念是，重排和重绘。 重排是指改变了 DOM 结构或文档流布局，需要重新计算布局，比较耗费性能。 重绘是指改变了元素的样式，但是没有改变布局，只需要重新绘制，而不需要重新计算布局，性能开销较小。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2024-02-28T05:37:18.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2024-02-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-28T05:37:18.000Z"}]]},"headers":[{"level":2,"title":"浏览器地址栏输入 URL 后发生了什么","slug":"浏览器地址栏输入-url-后发生了什么","link":"#浏览器地址栏输入-url-后发生了什么","children":[]},{"level":2,"title":"性能优化","slug":"性能优化","link":"#性能优化","children":[]},{"level":2,"title":"原型链","slug":"原型链","link":"#原型链","children":[]},{"level":2,"title":"闭包","slug":"闭包","link":"#闭包","children":[]},{"level":2,"title":"this","slug":"this","link":"#this","children":[]},{"level":2,"title":"事件循环","slug":"事件循环","link":"#事件循环","children":[]},{"level":2,"title":"ES6","slug":"es6","link":"#es6","children":[]},{"level":2,"title":"CSS 属性分分类类","slug":"css-属性分分类类","link":"#css-属性分分类类","children":[]},{"level":2,"title":"Vue & React","slug":"vue-react","link":"#vue-react","children":[]},{"level":2,"title":"Promise","slug":"promise","link":"#promise","children":[]}],"git":{"createdTime":1709098638000,"updatedTime":1709098638000,"contributors":[{"name":"huamurui","email":"huamurui@outlook.com","commits":1}]},"readingTime":{"minutes":8.18,"words":2454},"filePathRelative":"posts/CS/front-end/base.md","localizedDate":"2024年2月28日","excerpt":"<p>这里会贴一下...前端面试常见的一些问题的自己的总结，背 api 的就不放了，找的是那种可能要讲一小段的那种。</p>\\n<h2> 浏览器地址栏输入 URL 后发生了什么</h2>\\n<p>首先 URL 由 <code>协议</code> + <code>域名</code> + <code>端口</code> ++ <code>路径</code> + <code>查询参数</code> + <code>锚点</code> 组成。</p>\\n<ul>\\n<li>\\n<p>网络传输<br>\\n输入 URL 后，浏览器通过 DNS 解析域名，找到对应的服务器 IP 地址，建立 TCP 连接</p>\\n<ul>\\n<li>DNS</li>\\n<li>TCP\\n发送 HTTP 协议发送请求，服务器接收到请求后，通过 HTTP 协议返回响应</li>\\n<li>cdn\\n<ul>\\n<li>cdn 来处理一些常用资源，cdn 服务会根据用户的地理位置，选择离用户最近的服务器，加速资源的加载。</li>\\n</ul>\\n</li>\\n<li>http 缓存\\n<ul>\\n<li>常见的做法是将主页 index.html 做协商缓存，其他静态资源文件名打包加 hash 后做强缓存。</li>\\n<li>强缓存是指浏览器直接从本地缓存中读取资源，不需要发送请求到服务器。可以通过设置响应头中的 Cache-Control 和 Expires 来设置强缓存。</li>\\n<li>协商缓存是指浏览器发送请求到服务器，服务器根据请求头中的 If-None-Match 和 If-Modified-Since 来判断是否命中缓存。可以通过设置响应头中的 ETag 和 Last-Modified 来设置协商缓存。304 意味着命中缓存。</li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n<li>\\n<p>渲染<br>\\n浏览器接收到响应后，通过 HTML 解析出 DOM 树，然后通过 CSS 解析出 CSSOM 树，然后通过 DOM 树和 CSSOM 树合成渲染树，\\n然后通过渲染树和布局树合成布局树，然后通过布局树和绘制树合成绘制树，然后通过绘制树绘制到屏幕上。</p>\\n<ul>\\n<li>其中有两个比较重要的概念是，重排和重绘。</li>\\n<li>重排是指改变了 DOM 结构或文档流布局，需要重新计算布局，比较耗费性能。</li>\\n<li>重绘是指改变了元素的样式，但是没有改变布局，只需要重新绘制，而不需要重新计算布局，性能开销较小。</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}`);export{e as data};
