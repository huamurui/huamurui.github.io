---
icon: edit
date: 2026-05-23
title: 发光小板板
tags: ['胡说八道', 'tech', '电子产品'] 
---

更早的一段时间，看了一些嵌入式开发的东西，我没有看很多，大概只是点个灯的水平、然后收集癖一样买了堆[奇奇怪怪小元件](./electronic-products#一些-小玩具)。一开始是 esp32，然后看了些性能算力更强的芯片，还有一堆小屏幕...  但是意识到有些东西可能没法靠个人整出来，或者是我还是太菜；总之，各种器件和芯片资料，甚至一个好看好摸的外壳都不是个人能轻松搞到的...  然后，有一天，我突然意识到，你说，做 android/ios 的 app 算不算嵌入式开发啊。就算 ios 和安卓也是一坨，但手机已经塞了这么多各种各样的传感器和软件基础，面对它们总比直面各种来路不明奇奇怪怪小配件容易多了。  

### 发光小板板

从电子产品的角度看，移动互联网的发家史，其实可以看作这块“发光小板板”狠狠雷普了当时带了一堆实体按键的功能机的故事。  
实体的物理按键，做成啥样就是啥样了，没法改了；但在这块发光小板板上，你想要什么按键、什么交互，只要性能够，都能画出来。甚至可以闲得无聊写一堆回弹动画——这太神奇了，第一次见的话，也许只是一个带阻尼感的下拉刷新，就足以让一些无聊的人~~我~~玩上一整天。再加上苹果在小板板里塞了各种传感器，还有神奇的压感和震动反馈... 一个设备，仅仅因为打开了不同的“应用”，就可以变成完全不一样的东西。  

虽然现在也没那么新奇的了....但不论怎么讲，可以戳戳戳的发光小板板里面，好像还住了一堆到处搬运💩的人，好像...嗯，挺好的。

### 小板板的用户界面

<https://github.com/huamurui/zhihu-minus-minus>

最近，也不是很近了，做了个知乎的客户端。  
那时候，虽然一开始就打算用 rn，但我还去看了看 kotlin 的 Jetpack Compose。大概是，安卓，也包括 flutter rn，它们的开发更加的专一，就只考虑应用。而 web 的诞生最初是为了网络文档的传输与展示；而智能手机的 app，也许很早，几乎一开始就知道自己要做的就是用户界面。  
我不确定它们谁先开始尝试做的所谓面向一般用户的炫酷的用户界面，但 web 在一开始做的确实不好。flex-box 出现之前的 css 里的许多奇奇怪怪的东西，各种抽象的 trick，其实是尝试在用文档排版的那套工具，去做类似 app 的用户界面。相比之下，app 也许确实会显得干净些。  

最近在做那个知乎的三方客户端时，感觉 web 也许也不一定就一无是处，在内容排版上，web/webview 确实能搞定更复杂更丰富的一些东西（虽然知乎还有我最后还是打算放弃 webview 了）。  

还有一件事是...  现在 ai 好厉害

>在大半时间被加密 api 咯着的情况，两三天断断续续就能做到这么多这种程度...  
>尤其我之前其实根本不怎么熟 react native，一遍遍问就能做个差不多，我是说，只要对代码和常规工具有些认识，然后加上 ai，各种应用模式的基础结构生成和对各种之前也许会卡小问题的抹平的速度都太快了...    
>虽然，更细致的调整优化可能还是要人去看着做。  

### 我们的小板板，究竟会，变成什么样子。  

做这个客户端最无聊的部分，大概就是被各家的大门挡在外面。那个知乎的 x-zse-96 加密有点难搞，听说还会偷偷更新。知乎的加密如果只是意思意思...那小红书就是动了点真格的了，知乎学学 js 逆向还能掰一下，小红书的 App 的加密能涉及 Native 层。抖音微信这些...就更不用说了。  
发光小板板里的世界变得越来越封闭。每一个 App 都是一座建着高墙的城堡。即使是懂一些编程的人，想把自己的数据搞出来，也要花好多功夫，而想要和别人分享，可能还是离不开互联网这些平台。

>没事了，已经不需要再悲伤了，ai 大人会干掉一切的，别说破解加密数据或 root 之类，小米上最近都能运行 ios 了。——— 10.28

### 编程仙人

我还去看了看 Telegram Android，也不是我看的，一个文件四五万行我还是顶不住的，只是 ai 告诉我了我那些代码大概在做什么事情。  
感觉虽然许多事情像是魔法，但发光小板板的交互模式也是有限的，而不是无法预料想象的，不然入门就劝退一大片人就没得人用了。所以，知道要做什么，做出来了，确定要的效果就是哪些，然后再自己算坐标手绘替换组件，换一些调度策略优化性能功能什么的，虽然依旧是我搞不定的事情，但可能也不是完全做不到的魔法。  

（以及乱逛逛到了不少自己写布局系统的 repo... 是不是闲的无聊了都会想看看这些...）

### 我想下雨，但 web 不让。

看到 ios 酷酷的液态玻璃，我也想搞点东西，但 web 不让。
*(ps: 好像最近也让了， <https://developer.chrome.com/blog/html-in-canvas-origin-trial?hl=zh-cn> 这下又是我不知道致远星战况如何了)*

css 的一些 shadow，bg-filter， svg 的一些奇技淫巧倒是可以和 dom 有相互影响，但效果还是有限。  

然后，发现大概是要写 shader，虽然我不会但是有 ai 应该也不是很难搞。但我也意识到浏览器的布局系统与渲染管线是两个东西，这里写的 shader，只在 canvas/webgl 这个世界能有效果，这里和 dom，是两个世界。  

>大概有两种方案，一种是直接在 canvas 里做界面也就是得自己整一套布局系统；一种是将 html 输出为图片放到 canvas 计算后在需要交互的地方显示而其他透明……。 前者太为了醋包饺子还损失 web 原本有的东西，后者只能做非常有限的效果不然就性能爆炸。

>其实之前尝试下雪的时候，因为用 dom 做雪花太卡所以在 canvas 里画，然后用一些方法，让雪花能“落”到一些 dom 上，假装它们在同一个世界...  

所以，只弄了下面这个东西，它在 canvas 里，摸不到旁边的 dom。  

其实我还看了 flutter，skia，yoga；和 ios android 原生的布局系统和渲染的关系和开发能做到的事...  
也许它们比 web 强...  我其实打算用 flutter 或 ios 再做做试试。  
但，即使是 ios26 也被吐槽耗电发热卡顿，可能... 想要酷酷的就会有一些逃不掉代价吧。  

<iframe 
  style="width: 100%;
    height: 600px;
    border: none;
    display: block;"
  src="https://huamurui.github.io/html-s/rain-demo"
></iframe>

<details>
<summary><b>附：关于 GPU 编程与 Shader 的乱七八糟笔记</b></summary>

算了在这里记一下 GPU 编程：  
通过操纵简单的数值，再借助 gpu 强大的并行计算，来处理 3d，材质等图形特效。 
关于 GLSL 等运行在 gpu 上的编程，一段 GLSL 代码，GPU 会把它复制几万份，分发给所有小运算单元，让他们在同一瞬间、并行地计算出所有像素的颜色，这叫做 SIMD ，而 cpu 上的是 SISD。  
gpu 上许多时候不会有循环之类的东西，而是直接就很... 声明式？也许也是不声明根本不知道要怎么弄好吧，gemini 说 gpu 最初甚至只有写好的一堆像是内置 shader 一样的东西根本不能编程只能选哪个打开关闭...    
以及，在希望处理图形之外的大量矩阵运算...  会有类似的但另外的东西。  
但回到图像，大概，有两种 shader: vertex 和 fragment/pixel; 前者和 3d 视角变换等计算很相关，但这里的雨滴，更多是一种颜色、材质的模拟，主要用的是后面这个。  

1. 水滴，其实是一个凸透镜，它有一个弧形的折射面，这里用一个纹理图片来描述。  
2. 连成块的水滴，我们可以根据水滴位置中心与边缘的距离去定义一个点折射面的...嗯，法线？  
3. 根据法线，去取背后图片某一块的颜色，也就是环境色，再结合一个水滴高光的材质模拟的计算
4. 最后把算的颜色涂到屏幕上去

不过还是提一下，里关于雨滴的位置，姿态滑落方式什么，还是在 cpu ，用 js 在算。  

> **ps:** 有一件事，其实玻璃面上的水珠，有两种，一种是屏幕上的，表现是中心放大和边缘扭曲和色散，相当于放大镜；另一种是玻璃窗上的，由于背景距离比焦距远得多，所以表现是“缩小倒立的实像～”。  
>
> **ps2:** 还有一件事是， intel, snapdragon 等等芯片说的 gpu 个数就是个数... nvdia 的产品似乎整个就是一个大 gpu... 里面页也有 sm 这种东西，但产品标注宣传喜欢说运算单元，也就是他们 cuda 的个数。  

</details>

### app 下雨似乎也并没有那么有趣

嗯...  我试了试回来了，上面的可以说只是个很初步的点子，我还尝试过做作下雪和云的特效。  
但想把这些比较有意思的融入 app 中的其他元素...可能需要的不止是代码。

### 一个，不那么普通的电子产品

>手机触屏坏了，好像整个世界都隔了一层玻璃...

不管是公司们有意设计引导，还是发现了人本就有的需求，  
手机现在可以算是人最亲密的物品。  
也许几乎算是一种外置器官🫀。  
不管是好事还是坏事，很长一段时间可能大家还是离不开这个发光小板板。  

## 2026-10-28 后记

### react native

从我创建知乎那个仓库，半年多了，上个月开了个 gpt pro，把整个 app 里想做的基本做了个遍，还去抽离了些东西弄了个包。  

https://github.com/huamurui/react-native-rich-flow

然后最后一张重置卡拿去分析了 patches 里的问题，给上游丢了些 issue 和 pr。  

https://github.com/software-mansion/react-native-gesture-handler/pull/4637  
https://github.com/callstack/react-native-pager-view/issues/1196  

react-native 直接在 react 下；
software-mansion 给 react-native 接了许多很重要的大腿，和 expo 也有许多 py，
react-native-reanimated
react-native-gesture-handler；
callstack，也很重要，但许多产品相对可能会更偏上层，会有一些替代品；
两家公司竟然都在波兰...  

总之，rn 生态一些包的作用意义并不比那个主仓库小，react-native-reanimated 还有 rngh rnpv 结合搞得许多对接原生的视图、手势、滚动等操作，让现在的 rn 做 app 可以不再自己写那么多原生代码，即使是做些比较基础的功能，去依赖这些仓库，把大部分常见功能用 ts 解决也是很可行的操作。

### apple

苹果最近好像占领中国了。  
国产的手机，只有一个比较便宜商家走量的华为畅享能挤上销量榜前几，剩下都是苹果，虽然也能用苹果产品 SKU 少所以单系列走量多来解释...但不管怎么样那个榜单还是有点震撼，安卓高端全员阵亡。  
嗯...  似乎也可以解释鸿蒙所谓一亿装机量是哪来的了...  

也许还是内存硬盘涨价的问题，安卓五千涨到八千，苹果八千涨到一万，国产的利润被干没啥都卖不了，整体下行而苹果涨点价进一步压供应链利润率反而更高了...    
所以...会不会库克才是把苹果变成苹果的那个角色，创意与新奇也许会被偷走被赶上也会过时，但这一大片的供应链帝国是别人不可能一下就也能搬出来的。如此高的利润，也是让自己产品和其他产品搞出代差的效果的资本，就算没有乔布斯那群强迫症，做得好也几乎是理所当然...。  
就苹果最近搞得些操作来看，小米和苹果的现在区别和差距，可能和科技创新服务半毛钱关系没有，就纯纯孩子钱多劲大占住位置了。  

[apple](../diary/notes.md#2026-07-01)

<details>
<summary>手写笔</summary>

虽然苹果钱多的花不完想要啥技术买就是了，不过，即使是苹果也有在技术供应链上自大失算的地方。  
三星很早买到了 wacom 的技术，苹果后来走了另一套，于是，手写笔这块苹果就算软件生态做的再好，那个要充电沉甸甸笔尖哒哒哒的笔本身的手感也还是和三星的比不了一点。  

</details>

然后我做的那个知乎客户端也被苹果占领了...  这是在没有应用商店 ios 安装过程比安卓麻烦的多的情况下被占领了...

<details>
<summary></summary>
192 (not set)
160 iPhone 17 Pro Max
128 iPhone 14 Pro Max
124 iPhone 15 Pro Max
113 iPhone 17
102 iPhone Air
91 iPhone 16 Pro Max
85 iPhone 15 Pro
79 iPhone 16 Pro
76 iPhone 14 Pro
73 iPhone 13 Pro Max
71 iPhone 18 Pro Max
55 iPhone 17 Pro
53 24129PN74C
49 iPhone 13 Pro
47 (not set)
38 iPhone 18 Pro
33 iPhone 13
30 PJZ110
27 25102RKBEC
27 iPhone 14
26 23049RAD8C
26 V2509A
25 25053RT47C
24 25060RK16C
23 2211133C
22 23127PN0CC
22 iPhone 11
22 iPhone Duo
21 iPhone 12
20 2410DPN6CC
20 25098PN5AC
19 24117RK2CC
19 25113PN0EC
19 iPhone 12 Pro Max
18 23113RKC6C
18 ADA-AL00
17 24122RKC7C
16 iPhone SE (3rd generation)
15 2509FPN0BC
15 PKG110
15 PKR110
15 PKX110
14 2407FRK8EC
14 IN2025
13 2510DRK44C
13 M2012K11AC
13 PLK110
13 V2338A
13 iPhone 13 mini
13 iPhone 14 Plus
13 iPhone 15
13 iPhone 15 Plus
12 21
12 23116PN5BC
12 24031PN0DC
12 2602BRT18C
11 PJE110
11 SM-S9280
11 V2352A
11 V2505A
11 iPad mini (6th generation)
10 AAK-AN0
10 PJD110
10 SM-S9180
10 iPhone 16
9 20
9 A7000
9 MEP-AN00
9 V2314A
9 V2408A
9 iPhone 16e
9 iPhone XS Max
8 23013RK75C
8 2304FPN6DC
8 2311DRK48C
8 2605EPN8EC
8 M2102J2SC
8 PKB110
8 PLB110
8 PLQ110
8 SM-S9110
8 V2419A
7 2206123SC
7 23117RK66C
7 25019PNF3C
7 MI 6X
7 PKT110
7 iPad Pro (11-inch) (4th generation)
6 22081212C
6 23054RA19C
6 DBY-W09
6 EBG-AN00
6 PLG110
6 RMX3888
6 RMX5010
6 SM-S9260
6 SM-S9380
6 SM-S9480
6 V2307A
6 V2405A
6 V2458A
6 iPad Air (5th gen)
6 iPhone 12 Pro
6 iPhone 8 Plus
5 22041211AC
5 2210132C
5 25079RPDCC
5 CPH2841
5 HLK-AL00
5 NX741J
5 NX789J
5 OPD2515
5 PHY110
5 PLJ110
5 RMX6688
5 Redmi K20 Pro
5 SM-S9310
5 V2520A
5 V2536A
5 iPad
5 iPhone 11 Pro Max
5 iPhone 12 mini
4 2112123AC
4 2312DRA50C
4 ANY-AN00
4 BVL-AN00
4 M2105K81AC
4 MI 6
4 PGT-AN00
4 PGZ110
4 PJA110
4 PKJ110
4 PLC110
4 PPG-AN00
4 Pixel 7
4 RMX3370
4 RMX3800
4 RMX5080
4 SM-F9660
4 SM-S908N
4 SM-S9210
4 V2527A
4 V2546A
4 iPad Pro (11-inch)
4 iPad Pro (11-inch) (5th generation)
4 iPhone 17e
3 20 Pro
3 22041216C
3 23078RKD5C
3 24115RA8EC
3 25128PNA1C
3 BKQ-AN00
3 BKQ-AN10
3 BKQ-AN90
3 CPH2747
3 KB2000
3 M2007J3SC
3 Mi 10 Pro
3 Mi MIX 2S
3 NOH-AN00
3 PHK110
3 PLR110
3 PME110
3 PTP-AN10
3 PTP-AN70
3 Pixel 9a
3 RMX3560
3 RMX3850
3 RMX6699
3 Redmi Note 8 Pro
3 SM-F9710
3 TNN-AN00
3 V2220A
3 V2232A
3 V2241A
3 V2241HA
3 V2309A
3 V2329A
3 V2337A
3 V2339A
3 V2417A
3 V2426A
3 V2445EA
3 V2463A
3 V2502DA
3 VYG-AL30
3 XT2533-4
3 iPad (9th gen)
3 iPad Pro (11-inch) (3rd generation)
3 iPad Pro (12.9-inch) (3rd generation)
3 iPad Pro (12.9-inch) (5th generation)
3 iPad Pro (12.9-inch) (6th generation)
3 iPad mini (5th generation)
3 iPad mini (7th generation)
3 iPhone 16 Plus
3 iPhone XR
2 2106118C
2 22
2 22011211C
2 2201123C
2 2203121C
2 22081283C
2 22101316C
2 2211133G
2 24018RPACC
2 24069RA21C
2 24117RK2CG
2 25042PN24C
2 25091RP04C
2 ALN-AL00
2 AMP-AN10
2 BRC-AN00
2 BSN-AN00
2 BVL-AN20
2 CPH2653
2 DNP-AN00
2 ELS-AN00
2 HOP-AL00
2 JER-AN10
2 JER-AN20
2 L71091
2 LIO-AN00
2 M2004J7AC
2 M2006J10C
2 M2007J22C
2 M2012K11C
2 MAA-AN00
2 MAA-AN10
2 MI PAD 4
2 MTN-AN00
2 OCE-AN10
2 OXF-AN10
2 PFFM20
2 PGEM10
2 PGT-AN10
2 PGU110
2 PHB110
2 PJF110
2 PJG110
2 PJX110
2 PLS120
2 PLU110
2 Pixel 10 Pro
2 Pixel 4
2 Pixel 7 Pro
2 Pixel 7a
2 Pixel 9 Pro
2 Pixel 9 Pro XL
2 REA-AN00

......
</details>
