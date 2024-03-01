import{a6 as r,F as n,G as c,D as l,R as i,M as e,ac as s,H as u,ad as p,V as a}from"./framework-913605ae.js";const d="/assets/strapi-type-builder-799f15b2.png",h={},m={href:"https://codepen.io/aaroniker",target:"_blank",rel:"noopener noreferrer"},g={href:"https://twitter.com/aaroniker_me",target:"_blank",rel:"noopener noreferrer"},b=p('<p>看到一个写那种按钮和各种带动画的小物件的...主要用的应该是 css svg 去搞动画。好酷，好厉害...</p><p>某种程度上...也是因为小可爱我才...看到这些。 我真jb怪。 因为想抄一个twitter但压根不会写样式，所以去找现成的...然后，找到一个加强版的twitter侧边栏。</p><hr><h3 id="update-01-30" tabindex="-1"><a class="header-anchor" href="#update-01-30" aria-hidden="true">#</a> update 01-30</h3><p>...</p><p>就是说，这个加强版的 twitter 侧边栏。它的 svg 动画并不是全写在svg里面的，而是需要 js 甚至需要另外去导 gsap 这个包去控制关键帧...而且也因为搞这样炫酷的动画把一个图标分块了，运动，还有内部的小部件的样式不能很好的直接由 css 控制，所以需要 js + css...... 然后再仔细看看，会发现 icon 们的大小都有点不一致...</p><p>所以这种玩意没有大规模上生产是有原因的.jpg</p><p>有没有搞这种 icon svg 炫酷的小物件的库的。。。最好做的更细节一点，颗粒可配置的项也细一点，封装严实点，别 tm 做的不够细还露出这么一堆底层的东西出来让人烦心...</p><hr><p>现在就是...继续考虑抄网站的事。</p>',10),_=p("<p>但是其实找的过程中我也学了写 css 的，感觉也不会那么难。 从先从大布局层和结构面开始写，从html结构，和css类选择器的设置。这里是html和css齐头并进应该是，然后是往布局里添东西搞花样。和画画很像，从大的草稿开始。</p><p>一个比较成熟的组件库内部也许不会有太多冲突、模糊的 css...但是如果想把东西合到一起，真的要好好考虑...<br> 上面那个炫酷的 twitter 侧边栏确实很酷，但是如果要放到具体的、尤其那种已经很大很杂的项目里...我感觉可能..不，我不会想干这个。<br> 从位置，响应式布局就已经不知道怎么塞了，不亚于重写...</p><p>啊，css，啊 postcss 做模块化，啊 tailwind 。。</p><p>咳，回来，就是，虽然我现在都还没整出来，但应该也没那么难。</p><p>要考虑的也没有太多，在犹豫的是 css 的响应式布局，黑白主题怎么实现。</p><ul><li>响应式布局也是写网页结构框架的...这个犹豫挺正常，具体写了再说</li><li>至于黑白主题、多主题切换。 <ul><li>一种是用 css 变量，然后用 js 去改变 css 变量的值</li><li>一种是用 css 变量，然后用 css 的媒体查询，根据不同的媒体类型，去改变 css 变量的值——这个可以检查系统主题</li><li>类选择器，然后用 js 去改变类选择器</li><li>css 主题直接分包，写link，然后 js 按需引入。</li></ul></li></ul><p>主题也有一些细节，具体的配色选取...字体改细，图片降亮度和饱和度...</p><p>以及，用户端定制化。及偏好储存-偏好存到账户里还是设备上。</p>",8),f={href:"https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web",target:"_blank",rel:"noopener noreferrer"},k=p('<hr><p>具体的，把基本的样式结构扣出来之后。我会想用 nuxt ，去搞之后的数据处理方面的事情。</p><p>更具体一点，扣哪，扣完放哪？</p><p>大写表示拆分，成组件的意思，而小写一种是更具体的表现形式、或者说页面；另一种表示更细但感觉不用专门拆组件的那种拆。</p><ul><li>Pages <ul><li>Home <ul><li>Feed <ul><li>这里是主体部分。很经典很经典...记得处理一下 reply 的问题... parent-child ，记录数据，然后加样式。我的想法就是展平的条状数据、看 parent-id 是不是 null...不行，还是得转树状。根节点又怎么选？选不是 reply 的，parent-id 为空的呗...主要是，还要看 reply 要不要在时间线上出现，这也需要一个字段。</li><li>FeedItem <ul><li>info of author date etc</li><li>content</li><li>action <ul><li>like</li><li>comment</li><li>share</li><li>save</li><li>more</li></ul></li></ul></li></ul></li><li>Sidebar <ul><li>这里是响应式页面的一个...重点。主体部分不能丢，这里也不能完全丢。所以，伸缩栏。再细分为只漏 icon 不漏描述和全部缩进去两种。</li><li>for navigation <ul><li>icon</li><li>description</li></ul></li><li>for post/tweet 这个可以搞成 floating action button</li></ul></li><li>Widgets</li><li>Editor <ul><li>这个...从 twitter 包括comment回复弹出的</li></ul></li><li>home</li><li>timeline</li><li>explore</li><li>person</li><li>detail <ul><li>嗯...twitter压根不让写长文本，所以 detail 也可能就不存在，或者每个feed-item其实都已经是 detail 了。</li></ul></li></ul></li><li>Detail</li><li>Notification <ul><li>这里并没有什么布局好写的好像，单独写的话，就那样...但是如果写个伸缩栏，就有意思了</li></ul></li><li>Chat / Message</li></ul></li></ul><p>而有关 composable component layout 那一堆...呼。 hooks composables;</p><p>composition ,composition over inheritance</p><p>我们知道 components 已经是组合 composition 的形式了，这里的组合，与面向对象里另一个概念“继承”相对。 在 vue 之前的 options api， react 之前的 class / high order component，它们在组件这一层级上，拆解出的相互的关系，就是组合而非继承。</p><p>而之后 react 出的 hooks，vue整的 composition api 和 composable ...更多的是将逻辑从视图中再拆出来。这某种程度在学函数式，但具体生产上的事其实挺...说啥都行的。</p><p>对于文件夹命名，composable/hook/util/service 真的...写啥的都有</p><p>只针对数据的处理，被称为逻辑。....确实会像后端的service......还有store？...store还活着吗？ 下面这些都被称为逻辑。</p><p>异步加载的 loading<br> page<br> pageSize<br> 筛选条件切换的时候，要重置 page 到第一页。<br> page/pageSize 变化要重新发起请求<br> 组件卸载的时候，要清掉正在进行的网络请求。</p><hr><p>repaint reflow reflow 更加彻底，形状变了的。</p><hr><p>小知识，分类 category 和 标签 tag 的区别。这与检索有关<br> 严格来说，对于一个玩意，分类只能有一个，就像...严肃的文件系统和代码编写；而 tag 可以有多个。<br> 但是更多时候不怎么严格。</p><p>就这个网站而言，各种导航还有侧边栏已经实现了 category 的功能，所以，我甚至把提供的 category 当作 tag 来用。...然后tag丢一边..</p><p>淘宝的官方一般都是设置分类，而商家各自的商品名上，那种...像是古早时期一长串名字的小电影，就是标签。</p><h3 id="update-01-31" tabindex="-1"><a class="header-anchor" href="#update-01-31" aria-hidden="true">#</a> update 01-31</h3><p>还算可以，样式的架子弄好了...虽然还算没确定主题，light dark 设置的问题，细节更是没扣 但..基本的响应式结构有了。 唔...甚至一共只有二三百行的 html 。</p><p>就，再讨论一下推特的，数据关联方面的事。</p><p>用户/帖子与评论/时间线/探索/热点/搜索</p><p>这些都是，一个个小的集合方式，对的...它们都是，不论是一个用户还是一个话题，在这里都是类似的东西。就像上面讨论的分类与标签的事。通过某种方式，将东西分组，然后再展示、用于检索。</p><p>只不过，用户也许是 unix ，一些公共的话题什么的，是 multix 。</p><h3 id="_2023-02-06" tabindex="-1"><a class="header-anchor" href="#_2023-02-06" aria-hidden="true">#</a> 2023-02-06</h3><p>实际去做的时候...真的，好慢，好糙心。</p><p>嗯...分前后端两部分来看吧。</p><p>前端按页面分，大概有 4 个需要，或者说值得去写的页面，感觉，前两个的优先级应该高一些。</p><ul><li>index <ul><li>Tag</li><li>Feed <ul><li>info</li><li>content (deal the fucking overflow)</li><li>operation (icon)</li></ul></li><li>Aside <ul><li>sticky position</li></ul></li></ul></li><li>article <ul><li>Content <ul><li>markdown-render</li><li>toc</li></ul></li><li>Comment <ul><li>parent-child/@ relation maybe ...with array to tree</li></ul></li><li>Aside <ul><li>author info</li><li>content toc <ul><li>sticky position</li><li>scroll listening</li></ul></li><li>related article</li></ul></li></ul></li><li>person <ul><li>info</li><li>articles / timeline</li></ul></li><li>topics <ul><li>“沸点”...就是类似 twitter、微博、朋友圈，QQ空间..知乎想法 bulabula 那种的话题圈子。提一下，上面个人页面的 UI 和这里很像哦...</li><li>info</li><li>timeline</li><li>aside with hot topics</li></ul></li></ul><p>具体拆分上，Header 大概是是全局通用， 而且光个它就是个不小的工程了...不只是导航，还有，好多，打开后悬浮的小菜单也都在这里。</p><ul><li>Header <ul><li>fixed top &amp; scroll listening to show/hide with transform animation</li><li>Nav <ul><li>responsive collospse</li><li>dropdown</li></ul></li><li>Search <ul><li>responsive collospse</li></ul></li><li>User <ul><li>Post</li><li>Info <ul><li>avatar</li><li>dropdown</li><li>setting</li></ul></li></ul></li></ul></li></ul><p>客户端其实会把 nav 和 user 叠起来放到手机底部...但是，对于网页似乎...没多少这么干的。</p><hr><p>我其实在想...要不要好好做后端。直接瞎搞那个 sqlite 数据库会不会撑不住... 他们之前说是要搞 cms ，内容可配置，但，...什么叫 tmd 配置？</p><p>Tag 和 Category 的内容分类的体系，用户模块——这个与发布内容点赞评论等各种行为都相关。。 这些玩意...配置？配置这些东西完全没意义啊...而且巨 tm 费事。</p><p>大概都还是要写的...如果想要做的像样些的话。但是...先把网站样式抄好了再说吧，把纯前端的做好。</p><p>但是让我分析一下所需数据哦...</p><p>Article User Tag</p><p>Like Comment...先不管了, 回头学一学再好好设计。参考一下我博客 waline 的数据设计...</p><hr><p>啊...还有就是，还是，先写页面，把页面糊出来，可能数据弄不到要先 mock 一下...</p><h3 id="_2023-02-08" tabindex="-1"><a class="header-anchor" href="#_2023-02-08" aria-hidden="true">#</a> 2023-02-08</h3><p>又观察到掘金页面的一个小差异...</p><p>常规的文章推荐流，与 Moments... UI 设计都不一样的。</p><p>而如果去看熟悉的知乎，后发现，原本的“赞同”，在 Moments 里只剩了“喜欢”，这是相对不那么客观的一种描述，也不会有什么答案排名之类的东西，相比内容本身，这里是与人与圈子更相关的一种东西。</p><p>内容优先 or 以人为本</p><p>似乎...现在搞论坛搞博客的，很多都是想要全都要的。包括 github，星星多也不一定意味着是什么技术做得好，也可能...是本程序员做饭指南 or xxx交友......</p>',47),x=p('<hr><p>一个人做这些是真的...要干的好多...不仅仅是学技术的问题。</p><p>从一点点的点来点去观察 UI ，抄 UI 抄数据，还有一部分产品设计也是要亲自上阵......</p><hr><h3 id="_2023-02-09" tabindex="-1"><a class="header-anchor" href="#_2023-02-09" aria-hidden="true">#</a> 2023-02-09</h3><p>又弄好了一点东西，感觉...挺好的。只是...确实，真的上手，好磨人。</p><h3 id="_2023-02-10" tabindex="-1"><a class="header-anchor" href="#_2023-02-10" aria-hidden="true">#</a> 2023-02-10</h3><p>嗯，摸着石头过河，应该摸得差不多了。 技术选型方面，围绕着 Nuxt 来做。</p><p>如果要有自己风格，网页样式之类的还是要自己做，组件库帮助不大...我听说有那种无头组件库的...但感觉要做的也不复杂，自己写得了。CSS 方面，用 SCSS 做预处理再搞搞主题。但，在主题化的时候在想一个问题...在用到字体颜色的时候还是要一个个的去挑，这样和直接写两套网页...好像区别也不大了。</p><p>后端有直接的 Strapi，甚至还有官方搞得的和 Nuxt 对接的数据传输模块...像 axios 一样的，但是直接针对 strapi 做的，定制化定的很好。</p><p>至于其他的，和普通的差异应该不大..</p><p>哦对了，还有处理 markdown 的问题。找到了 bytemd 这个库，掘金可能也在用...但是，一言难尽吧。找个toc都要翻 issue，b事也不少。</p><h3 id="_2023-02-12-02-13" tabindex="-1"><a class="header-anchor" href="#_2023-02-12-02-13" aria-hidden="true">#</a> 2023-02-12 &amp; 02-13</h3><p>也许... 啊...</p><p>从，目录开始 bb 吧。</p><ol><li>composables</li><li>components</li><li>layouts</li><li>pages</li><li>store</li></ol><ul><li><p>components 是，一组 DOM，它们的 UI、逻辑、都可以在这里。而且，这个组件是可以复用的、嵌套的。</p></li><li><p>而 pages，也有把它叫 views 的，则就是可以使用那一堆 components 的一个地方，将组件组装成一个相对完整的一个页面。这里的组装不只是 UI 嵌套，也通常也有着数据通信的需求，props emit 之类就在这里。pages ，...怎么讲，你可以把所有的东西都写在这里，就像写网页最初的样子一样，但是现在，这是一个用来汇总的地方，UI、逻辑、路由关系、数据获取等等，它们的具体实现可能可能都被拆分到了别的地方，但总还是要拼起来的，pages 就是干这个的地方。但是，但是，提一下，通常而言，没必要拆的就先别拆，写在一起就写在一起好了，为拆而拆真的容易搞的一团糟。</p><ul><li>稍微提一下，pages 内部也可以再继续建 components 一类的文件夹，表明这些组件虽然已被拆分但没有其他复用只为当下的这一个页面服务，这么做主要是为了方便维护。然而... nuxt 的自动路由和自动导入...对这种做法并不是很友好。</li></ul></li><li><p>layout 则是为应对在 pages 组装组件时仍要处理布局这一重要的 UI 方面的问题，我们并不希望在 pages 里做具体的工作，当然也包括布局，所以出现了 layout 这一层，通常配合 slot 使用，将布局也从原本的 pages 里拆出来。</p></li><li><p>composables vs store vs...</p><ul><li>store 通常是统一、全局的数据管理。全局变量好用，如果还有一个玩意能自动帮人管理，那就更好了，组件间通信哪有什么 props emit inject，组件间通信就是 pinia pinia 还有 pinia。</li><li>而 composables 或者就叫 hooks吧，则更加灵活，是一个...造轮子神器？反正 react 轮子超级多。</li><li>数据通信方面在再之前还有 event bus 之类的...也有人还在用，但现在并不推荐。哦对...还有个 inject，可以处理嵌套过深的问题。</li><li>总的来说这一堆玩意是体现前端不只是切图仔用用框架的地方，也是需要自己处理一些数据、同步之类的问题的地方，但是，就...其实不管也行。</li></ul></li></ul>',17),w=l("code",null,"${}",-1),v=p('<p>困了，睡觉。</p><hr><p>我在想...什么？好烦... 突然就好烦。 为什么我会在这里... 烦...</p><hr><p>哦对，还有些玩意... strapi，低代码帮助入门后端.jpg，就像我当初用宝塔面板学 linux(为什么不用 Ubuntu ？明明都装好了。鬼知道我当初在想啥...)。不得不说这玩意挺好用的，各种东西也挺全的而且可以点点点就搞定，重要的是直接给了一套很好的实践方案，java 大概还是不管脑残。</p><p>cookie session token，内容要有 published unpublish 两种状态，权限管理，数据关联，api 文档...... 反正，挺全的。</p><hr><p>再再还有一个，有关，工程化。</p><p>干活快 and 靠谱。速度与质量。</p><p>可以在很多层面去理解去做这两个方面，提几个。</p><p>具体技术、代码上的效率与靠谱有各种工具，自动化流程。 人层面的有筛选，有各种规范和不能说的规范。 项目层面有各种流程。</p><p>还有产品、运营之类的，更近一步的对接...</p><p>...好想贴贴</p><hr><p>md ，被个憨批误导了.. LocalStorage 并不 tmd 安全！！httpOnly Cookie 会好一些...就是strapi自带的那个。 不过还好，登录是成功的，发布文章带用户信息也做好了。但是，静态资源像图片、文件这些玩意的储存，是个问题 strapi 自带的是有点拉胯 尤其你要是在sqlite里存文件...但是也不是问题，先不管也行。</p><p>数据方面要做的功能可能还有标签、点赞评论这两块，等我搞起来。（md 这怎么感觉像是手写博客的感觉...</p><p>嗯...做好了主题切换，整一套是 scss 和 localStorage 去做，默认是 light，可以切换到 dark，其实我在想要不要 auto，auto直接是用css的 @media 做一下就好。...不管了，没有数据就默认亮色。</p><p>今天明天应该就能把大坑都踩完，然后确认更具体的目标。主要是继续细化 UI 写 css，对着掘金原网站好好扣，暗色主题也要斟酌一下配色。...我目前弄得太糙了。</p><p>nuxt 是自带 typescript 但是你写 js 文件也是可以的，我试了没什么大问题。再一个，就不用代码规范那些工具了，测试更是没有，时间不多了，功能能实现看上去没大问题就 ojbk 。</p><p>见到人就好烦躁..啊..</p><h3 id="_2023-02-14" tabindex="-1"><a class="header-anchor" href="#_2023-02-14" aria-hidden="true">#</a> 2023-02-14</h3><p>再，看一下，数据库表设计。不过想到了一个东西，如果 SEO 做的很 nb，可以把搜索引擎当查询功能，就...甚至可以不太再用自己的资源去做查询了。</p><p>我喜欢树、我喜欢嵌套，它们，也许并不可爱...但我也确实找不到啥好玩的了。</p><p>如何储存一个树状的结构？用 id 和 parent-id 这样类似链表的操作去存到普通表里就可以，需要的时候全查出来(所以，通常而言，它被用在评论上，还需要有一个所依附的字段去做查询、只查一部分)，然后 array to tree 就好。这很清晰，直白，就是需要自己多写点代码。</p><p>这种相互关联的方式，我是说把表中的字段直接作为相互关联的桥梁，某些时候可以补足一些抽象程度不够的数据库的功能。我见过一些非关系型数据库的表设计...不对，可能压根就没有表，我不知道那样合不合理...有直接一整个特别特别长的字段，就只为储存其他各个字段的关系。</p><hr><p>而今天用 strapi 去做数据的时候，嗯...其实有点不习惯。但确实也是一种不错是思考方式。而且...实用。真的，比数据库设计的课程要接地气，比那些企业老师...感觉要靠谱。</p><figure><img src="'+d+'" alt="strapi-type-builder" tabindex="0" loading="lazy"><figcaption>strapi-type-builder</figcaption></figure><p>它将数据的关系分成了六种。</p><p>我尝试理解一下，左边是当前表，右边是待关联的表。</p><ul><li><p>从那两个看起来很特殊的，用箭头去描述的开始看。都是当前表去指向另一个表。如果用纯数据库表去思考，这样搞具体应该去做的是，在当前的表创建一个字段去储存另一个表的一些信息，或者说引一个外键到当前表。而不去改变被指向表的结构。</p><ul><li>什么时候我们会希望这么做？我们几乎一直在这么做...就比如用户发的文章与用户，文章表必然需要且一般只需要一个作者，然而作者表里却不一定需要存一堆文章项，想要找到作者的所有文章、只需要查询的时候做点功夫 <code>select articles where author = xxx</code> 就好，直接通过文章表来查询，而不是去查作者表，因为我们想找的终归还是文章们。</li><li>单箭头与多箭头意味着什么？单箭头就是上面说的最常规最基础的状态，而多箭头，则就是“多个作者”，各种分类、标签也是如此。</li><li>回到我们最开始想要搞的树结构，在图上，我们只需要选最左边的这个就可以实现了，去记录当前节点的父节点，最后就可以搞出一棵树来，而如果选多个箭头的，则可以看做是记录当前节点的子节点，如果这样搞，这棵树算是倒着长的...不应该这么做。 <ul><li>更具体的应用上，实现一个树状的评论。要明白的是，是评论回复评论，而不是用户回复用户，用户在这里是次要的。 <ul><li>甚至可以更野...QQ的消息应该是直接的，只在本条内容里加了一条原消息的内容，而不是记录关联，然后把时间记好、按时间去把消息查出来拍好。</li></ul></li></ul></li></ul></li><li><p>如果单箭头是最基础的操作，那两边都圆圆的关系，则是双向的，既在本表创建外表的键，也同时在指定的外表创建本表的键。</p><ul><li>我们在什么时候需要这种操作？...要说，也许不应该这么做。</li><li>继续观察，关于 like collect follow 这样的行为。 <ul><li>是可以直接为他们也都创建一个表，除了自己的一个识别字段，也标明作者与被操作的对象，我们希望能够通过作者看到他的操作，也希望能通过被操作对象查询到操作的集合，以及、甚至是所有的操作作者。 <ul><li>拿到一个被操作对象，用这个对象作为字段在操作表里查询，然后统计信息；拿到一个作者，用这个作者作为字段在操作表里查询，然后统计信息。...是的这样就可以了，顶多再把这些统计信息存回到作者与对象表里当缓存然后适时刷新...这种关联，依旧是单向的。</li></ul></li></ul></li><li>好吧，也许是，在试用视图写入数据的时候，方便。比如一个标签，可以在写文章的页面去选标签，也可以在标签页去选，这里是直接把所有文章都查出来了，等着选，可以在这里就把一个个文章都加上这个标签。如果你只做单向，只在文章里填个标签项，那就添加也就只能在文章视图去做。毕竟是低代码是要来回点的...到处都搞一份的话，省事。</li></ul></li></ul><p>我又看了看数据库的那堆东西。模式分解...其实就是拆分对吗...把一张大表拆成各自的小表。拆分的需求不一定就是解决重复冗余，还有一些数据同步问题。现在去看那些例子都好清晰...</p><p>还看到了“图数据库”...虽然不知道它们要怎么搞，但听起来挺炫酷的。有了边和节点两种东西...操作和关系可以真的就是操作和关系、而不被看做另一种对象。原本的关系型数据库有点名不副实...或者互联网对它的应用分明就是 tmd 面向对象式数据库。</p><p>strapi 这边更值得学习的，可能是安全、权限管理那一堆。</p><hr><p>css 还是好折磨。也许我已经可以写出一些基本的布局和小玩意，但是要精准复制是真tm折磨...有些图标竟然是用 css 背景去做的，别说效果还不错，用个 hover 就可以直接改变颜色而不用去再写 js。</p><p>也见过一堆更加奇技淫巧的 css ，md 为啥我怎么看怎么觉得这玩意就离谱邪门...</p><p>像素级还原设计稿...可能，还需要好多好多才可以。</p><p>还有一件事，如果要做响应式，适配多屏幕，要从小屏幕开始写，然后不断的加元素。为什么..？因为删减东西更容易让屎山崩掉。你个笨蛋。</p><p>...有些，迷茫了。</p><p>也许，也都可以了。或者，你想想你自己最想要实现哪些功能？不去像素级还原也好。做点，想干的。与一切都无关...休息一下。时间这样流逝着...你在干什么？不干什么也好...</p><p>呼...在网上瞎逛。arco 的设计文档，还有一个人的博客。逛得还有点高兴。另外...突然也有信心自己写后端了，虽然想要搞什么还有点模糊...全都要.jpg。</p><p>naive-ui 的演示站可真有意思。。</p><h3 id="_2023-02-21" tabindex="-1"><a class="header-anchor" href="#_2023-02-21" aria-hidden="true">#</a> 2023-02-21</h3><p>嗯，大概，就算它是完工了吧。</p><p>真正集中精力做的可能也就三四天，之前是迷迷糊糊的踩坑，之后是...之后 tmd 都没时间了。</p><p>有的小组从题目下来第一天就确定好了做什么然后开干，我这边是... 一开始想造轮子，不过发现自己缺的是在有点多... 于是还是先学学切网页... 可即使是这也有点折腾，至少对我而言。nuxt 仓库下面那成堆的 issue ，调不好的 css，还有踩坑中变得迷迷糊糊的数据和需求...。直到好久之后我又回头看了一遍需求，突然发现也不是不能做，涂个样子做点数据并没有多难，然后就开始肝了。——对的...我也不知道怎么了，那天看了一堆博客之后，之前好像烦得要死的一堆东西突然变得简单起来，一种很强烈的“这个小玩意太 jb 简单了，完全可以做”的感觉，然后...就搞完了。</p><p>css 真的像油画... 好多时候我都是，一个属性添上去——怎么没效果？好吧~换种写法再来一遍，还不行？在别的地方再复制一份，行了么？emmm，好像别的地方又被挤歪了，没事，再继续堆；嗯...这样就差不多了。————最后到底哪个属性到底起的什么作用...谁 tmd 还记得...</p><p>说两个有意思的地方，一个是监听滚动事件去变 toc 和导航头(这里应该加 debounce 或者 th什么的，但我没搞)，另一个是用 html 去做响应式。还有一个可能可以是去改变 svg 的颜色，但是我没干呢。</p><p>还有折腾部署的一些事，开发与生产的两套变量，nginx 多网站部署，pm2 管理 nodejs 进程...</p><p>只不过...大部分磕到我的问题似乎都很脑残...根本不值得去记；也会觉得自己之前 bb 的那些，有些纸上谈判似的无聊。嗯...告一段落。我去看看别的。</p>',51);function y(S,j){const t=a("ExternalLinkIcon"),o=a("RouterLink");return n(),c("div",null,[l("p",null,[i("["),l("a",m,[i("https://codepen.io/aaroniker"),e(t)]),i("]")]),l("p",null,[i("["),l("a",g,[i("https://twitter.com/aaroniker_me"),e(t)]),i("]")]),b,l("p",null,[i("这里也许应该接"),e(o,{to:"/posts/CS/front-end/philosophy/spa-ssr-ssg.html"},{default:s(()=>[i("SSR-SSG")]),_:1}),i(" 这个日记了")]),_,l("p",null,[i("["),l("a",f,[i("https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web"),e(t)]),i("]")]),k,l("p",null,[e(o,{to:"/posts/CS/front-end/philosophy/strange-things.md/#%E4%BA%BA%E4%B8%8E%E4%BA%8B%E3%80%82"},{default:s(()=>[i("人与事")]),_:1})]),x,l("p",null,[i("嗯...再吐槽一下那些课，就拿 slot 当例子，讲接口当然是哗啦哗啦的很顺，但完了之后呢——“这玩意能用来干啥？”。也许会想到最基础的 print 函数里的占位符，想到之前的 "+u()+" 和 ",1),w,i(" ；更好一些的之前就了解过，自己写过布局，发现了布局和数据处理搞在一块觉得烦的家伙一下子就知道，哦~这个 b 可以把布局这一层拆出来，但是...可能这堆玩意也只能自己蹚了。")]),v])}const I=r(h,[["render",y],["__file","website-clone.html.vue"]]);export{I as default};
