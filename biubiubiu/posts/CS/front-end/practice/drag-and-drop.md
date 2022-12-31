---
title: 拖拽~
icon: creative
date: 2022-12-05
category:
  - 记录
  - 编程
  - 挖坑
---

就是说...原来在html标签上写个 draggable=true 就可以给元素添加拖拽属性...什么js监听鼠标点击移动然后通过对大小布局时间的一系列计算处理这个事件什么的...不存在的，爬一边去。
而图片等等元素是自带这个东西的。
...纯html,css,js三件套就已经这么高级了吗...感觉，要变成笨蛋了。

但我还是去github看了好多仓库，这个功能...好像还挺热的。感觉如果用vue写的话，可以和之前的布局和多级组件组合一下弄出些东西...然而这部分也是早就有人写了，而且好多哇...。

[vueuse-useDraggable](https://vueuse.org/core/useDraggable)

[dnd-kit](https://github.com/clauderic/dnd-kit)

[interact.js](https://github.com/taye/interact.js)

哈...光看都看不过来了...react的有好多

hooks 和 component 有什么区别吗...

又看到一个..........state是状态..., 这个我知道， statement 声名语句是带有状态的部分...而基本的函数会尽量不带状态。

ok，挖坑。我会想用react写一个拖拽的东西..或者单纯把那个dnd-kit的一部分抄出来。另外提一嘴，好多我写vue时候脑子里想的东西，被react的文档，那个新出的还在beta的文档说出来了。
感觉...react的文档会更实用有实践色彩也更精简，api只讲了几个关键的...或者react本身就比vue要轻快很多？...而vue的东西...一上来有点多说真的......
可能算是我第一次读这么大一堆英文文档，感觉还不错。
