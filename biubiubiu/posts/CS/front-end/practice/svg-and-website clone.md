---
title: SVG & website clone
icon: creative
date: 2023-01-29
category:
  - 记录
  - 日记
---

[https://codepen.io/aaroniker]

[https://twitter.com/aaroniker_me]

看到一个写那种按钮和各种带动画的小物件的...主要用的应该是 css svg 去搞动画。好酷，好厉害...

某种程度上...也是因为小可爱我才...看到这些。
我真jb怪。
因为想抄一个twitter但压根不会写样式，所以去找现成的...然后，找到一个加强版的twitter侧边栏。

---

### update 01-30

...

就是说，这个加强版的 twitter 侧边栏。它的 svg 动画并不是全写在svg里面的，而是需要 js 甚至需要另外去导 gsap 这个包去控制关键帧...而且也因为搞这样炫酷的动画把一个图标分块了，运动，还有内部的小部件的样式不能很好的直接由 css 控制，所以需要 js + css......
然后再仔细看看，会发现 icon 们的大小都有点不一致...

所以这种玩意没有大规模上生产是有原因的.jpg

有没有搞这种 icon svg 炫酷的小物件的库的。。。最好做的更细节一点，颗粒可配置的项也细一点，封装严实点，别 tm 做的不够细还露出这么一堆底层的东西出来让人烦心...

---

现在就是...继续考虑抄网站的事。

这里也许应该接[SSR-SSG](../philosophy/spa-ssr-ssg.md)
这个日记了

但是其实找的过程中我也学了写 css 的，感觉也不会那么难。
从先从大布局层和结构面开始写，从html结构，和css类选择器的设置。这里是html和css齐头并进应该是，然后是往布局里添东西搞花样。和画画很像，从大的草稿开始。

一个比较成熟的组件库内部也许不会有太多冲突、模糊的 css...但是如果想把东西合到一起，真的要好好考虑...\
上面那个炫酷的 twitter 侧边栏确实很酷，但是如果要放到具体的、尤其那种已经很大很杂的项目里...我感觉可能..不，我不会想干这个。\
从位置，响应式布局就已经不知道怎么塞了，不亚于重写...

啊，css，啊 postcss 做模块化，啊 tailwind 。。

咳，回来，就是，虽然我现在都还没整出来，但应该也没那么难。

要考虑的也没有太多，在犹豫的是 css 的响应式布局，黑白主题怎么实现。

- 响应式布局也是写网页结构框架的...这个犹豫挺正常，具体写了再说
- 至于黑白主题、多主题切换。
  - 一种是用 css 变量，然后用 js 去改变 css 变量的值
  - 一种是用 css 变量，然后用 css 的媒体查询，根据不同的媒体类型，去改变 css 变量的值——这个可以检查系统主题
  - 类选择器，然后用 js 去改变类选择器
  - css 主题直接分包，写link，然后 js 按需引入。

主题也有一些细节，具体的配色选取...字体改细，图片降亮度和饱和度...

以及，用户端定制化。及偏好储存-偏好存到账户里还是设备上。

[https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web]

---

具体的，把基本的样式结构扣出来之后。我会想用 nuxt ，去搞之后的数据处理方面的事情。

更具体一点，扣哪，扣完放哪？

大写表示拆分，成组件的意思，而小写一种是更具体的表现形式、或者说页面；另一种表示更细但感觉不用专门拆组件的那种拆。

- Pages
  - Home
    - Feed
      - 这里是主体部分。很经典很经典...记得处理一下 reply 的问题... parent-child ，记录数据，然后加样式。我的想法就是展平的条状数据、看 parent-id 是不是 null...不行，还是得转树状。根节点又怎么选？选不是 reply 的，parent-id 为空的呗...主要是，还要看 reply 要不要在时间线上出现，这也需要一个字段。
      - FeedItem
        - info of author date etc
        - content
        - action
          - like
          - comment
          - share
          - save
          - more
    - Sidebar
      - 这里是响应式页面的一个...重点。主体部分不能丢，这里也不能完全丢。所以，伸缩栏。再细分为只漏 icon 不漏描述和全部缩进去两种。
      - for navigation
        - icon
        - description
      - for post/tweet 这个可以搞成 floating action button
    - Widgets
    - Editor
      - 这个...从 twitter 包括comment回复弹出的
    - home
    - timeline
    - explore
    - person
    - detail
      - 嗯...twitter压根不让写长文本，所以 detail 也可能就不存在，或者每个feed-item其实都已经是 detail 了。  
  - Detail
  - Notification
    - 这里并没有什么布局好写的好像，单独写的话，就那样...但是如果写个伸缩栏，就有意思了
  - Chat / Message

而有关 composable component layout 那一堆...呼。
hooks composables;

composition ,composition over inheritance

我们知道 components 已经是组合 composition 的形式了，这里的组合，与面向对象里另一个概念“继承”相对。
在 vue 之前的 options api， react 之前的 class / high order component，它们在组件这一层级上，拆解出的相互的关系，就是组合而非继承。

而之后 react 出的 hooks，vue整的 composition api 和 composable ...更多的是将逻辑从视图中再拆出来。这某种程度在学函数式，但具体生产上的事其实挺...说啥都行的。

对于文件夹命名，composable/hook/util/service 真的...写啥的都有

只针对数据的处理，被称为逻辑。....确实会像后端的service......还有store？...store还活着吗？
下面这些都被称为逻辑。

异步加载的 loading\
page\
pageSize\
筛选条件切换的时候，要重置 page 到第一页。\
page/pageSize 变化要重新发起请求\
组件卸载的时候，要清掉正在进行的网络请求。

---

repaint
reflow
reflow 更加彻底，形状变了的。

---

小知识，分类 category 和 标签 tag 的区别。这与检索有关\
严格来说，对于一个玩意，分类只能有一个，就像...严肃的文件系统和代码编写；而 tag 可以有多个。\
但是更多时候不怎么严格。

就这个网站而言，各种导航还有侧边栏已经实现了 category 的功能，所以，我甚至把提供的 category 当作 tag 来用。...然后tag丢一边..

淘宝的官方一般都是设置分类，而商家各自的商品名上，那种...像是古早时期一长串名字的小电影，就是标签。

### update 01-31

还算可以，样式的架子弄好了...虽然还算没确定主题，light dark 设置的问题，细节更是没扣 但..基本的响应式结构有了。
唔...甚至一共只有二三百行的 html 。

就，再讨论一下推特的，数据关联方面的事。

用户/帖子与评论/时间线/探索/热点/搜索

这些都是，一个个小的集合方式，对的...它们都是，不论是一个用户还是一个话题，在这里都是类似的东西。就像上面讨论的分类与标签的事。通过某种方式，将东西分组，然后再展示、用于检索。

只不过，用户也许是 unix ，一些公共的话题什么的，是 multix 。
