---
title: vue瀑布流
icon: creative
data: 2022-11-17
category:
  - 记录
  - 网页
  - 编程
---

<details>
  <summary>啥都没干就瞎bb的部分</summary>

### 1.工程问题

瀑布流其实也是一个经典的item in items的玩意，通常，代码方面对这玩意设计就是，对单个item写一个组件，对items写一个组件。
这里要使用到的两个比较重要的东西一个是props，一个是插槽 slot...也许还要再提前说一下组件。

vue2，里面很重要的一个东西叫组件，就像面向对象的类一样，它们也可以有叫做 parent-child 的关系，但与面向对象的继承不太一样，组件中这种关系叫做“注册”，小组件引入、注册到大组件之中——这里的大组件在最后是要直接展示起作用的。而面向对象中的父类可能只是搭个架子，并不会被实例化，最后干活的是子类。

props，使用的时候，一般是作为子组件的那个组件里的 props。那是给父组件开的一个接口，从父那里拿数据传到子组件，经过子组件处理后展示在子组件的 template 里，然后再由父组件调用、一整个展示。嗯，一个子组件可以有许多个父组件，给哪个用都行，这样就把一个小功能块拆了出了，方便复用。

slot，插槽，也是我在这一次新学到的一个用法。
  如果不使用插槽，一个item in items的操作通常要将item组件放在items组件里组合好了再把items再交出去给别人用。
  虽然不知道这样有什么不好...但是就是想要拆一拆。

  但如果用插槽...
  item组件写好props开插槽
  items组件也是一样写好props开插槽
  直接交出去这两个，组合交给后边去做

  在pages里引入并调用时，items组件的插槽位置里放的就是item
  而item的插槽会放进具体的需要个性化定制的玩意，....好像items也可以在这里进行一些定制...
  对，组合全都发生在了pages中。
  定制与数据传输绑定也是，这些全都在pages的组合组件中去写，可以直接传给单个的item。
  而，如果没有插槽，就不能在pages中直接碰到item。

组件的循环与递归。
我是觉得我选的有点巧...瀑布流是用了vue的v-for指令来排item组件，而隔壁的多级评论用的是组件递归。刚好一种一个。vue提供的写法也是真优雅...

### 2.那，就从数据设计开始吧

大组件的props。
瀑布流配置选项
    autoResize: 一个boolean，关键字段，是否开启自动适应窗口改变UI
    interval: {防抖时间间隔，默认200ms
    lineGap: {列间隔
    minLineGap: {最小最大列间隔
    maxLineGap: {
    singleMaxWidth: {单个元素的最大宽度
    fixedHeight: {固定高度

align这个值和getLeft这个函数有关...
为啥我觉得这函数没啥用...
left貌似才是默认选项...就是不做处理。
嗯...这个left意味蛮深的，用于计算虚拟矩形的位置的...为什么不直接写死啊，这么点差别这么多信息，值得么？
嗯，删了。又少了好几十行。这样的话...9个选项。

....为啥一加载右边就弹出一个空白条了...
不管了。以后再说。

子组件的props，数据传入。item由
    width:
    height:
    order:
    moveClass:

高与宽度都是getItem给的，order是vue自动生成的index...这个就很魔性，开发者工具检查就找不到这个数值。
moveClass: 是css动画。但...先删了算了

在小组件的create钩子中，有虚拟矩形的初始值。
    this.rect = {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    }
这个虚拟矩形会由大组件计算出来，再传回给小组件，最后通过绑定到小组件div标签的css样式实现展示。

这是原始矩形。除了必要的计算数据。随之一并给出的还有vm，node....
    getMeta() {
      return {
        vm: this,
        node: this.$el,
        order: this.order,
        width: this.width,
        height: this.height,
        moveClass: this.moveClass,
      }

### 3.好了，再看看两个组件...也许还得加上pages，三个组件的数据流

pages里传入数据，数据分为两种，一种是瀑布流配置选项，一种是流入的..需要处理展示的数据。
配置选项自然直接给到了大组件，而而由于某种拆分的执念，需要处理、展示的数据是直接进入到小组件之中的...但数据处理的大头依旧在大组件。
所以，小组件拿到数据后要给到大组件，大组件通过计算后，传回给小组件一串css代码（...或者说直接把小组件的node拿到手然后狂暴轰入），小组件再把这个给到自己的标签样式上，实现大小的控制。

嗯，具体的数据流通如何实现？
props不必说。
而metas的传输是大组件粗暴的直接调用子组件的getMeta方法
let metas = $children(this).map((slot) => slot.getMeta())
处理后的数据，粗暴的传入metas[i].node.style。传过去的node也许就是为了这里...

好了，这部分大概也可以结束了

#### 3.1状态

小组件的
notify() {
      $emit(this.$parent, 'reflow', this)
},
对应的是大组件的
    $on(this, 'reflow', () => {
      this.reflowHandler()
    })
这个...很重要。但这样的话..是每个小组件都会调用一次reflowHandler？
嗯。没错。这也太。。。害。

另一个与多次加载还有...isShow掩藏实在界有关，是大组件里的
    $emit(this, 'reflowed')
为什么这个时间没有on去声明就可以用...
删掉这一行会让懒加载只能用一次。
删掉pages标签上的也会让懒加载只能用一次。。。
好吧。这个emit就是大组件给大大组件的。
是pages里的函数。addItems会把isBusy设为true需要在reflowed这里把isBusy改回false才可以reflow。

好吧。都不是大问题。

### 4.好像大概看懂了

我寻思。可以开始自己整了。
组件通信根本不需要this。虽然这一路看下来...他们this用的很爽。。
eventbus也根本不需要on off once直接emit，就完了
发布订阅的三个选项（instance，event_name（key），function）
————————————————————————

### 5.vue在这过程中提供了什么？干了什么？

——————————————————————

### 6.还有核心的，那一大坨做计算的函数

算了...看结构
methods里写了三个函数，但只写了名字...大概是方便用vue的this调用

reflowHandler和时间，token有关...算是个封装。
interval是个防抖的时限？默认200ms。而reflowHandler给出的token就是200ms内一次reflow...大概。
嗯，确实，除了reflowHandler自己，没有直接调用reflow的地方。
就是说...mothods里写的reflow只用了这一个地方。

autoResizeHandler看到窗口变化也要调reflowHandler。

tidyUpAnimations
getTransitionEndEvent
两个和动画效果相关的。
之前几个地方的moveClass也是与动画效果有关...

好了，到reflow了。
这算是一个...调用集中点。
常规的获取窗口宽度calculate计算得到排布方式...除此之外

使用了一个叫metas的玩意去作为中介...
let metas = this.$children.map((slot) => slot.getMeta())
还有之前在子组件里的getMeta，返回了order，长宽，node节点等子组件的信息。
这个metas的数据几乎...贯穿全部。

另外this也并没有消失，而是传入给了后边的函数，通常是写作vm。
getOptions这个方法里是最多的。而这里，return了一串props里的数据，有关大组件的排布的....
又是一次封装...
在calculate中，getOptions拿到排布数据，传给更具体的处理机制，然后，...就是计算了，终于到tmd计算了。
verticalLineProcessor 和 另一个horizontal什么的...
还有tmd   getRowStrategy
getGreedyCount...

这里有一种二分，那就是rect和meta。meta是原始大小，rect是通过计算后、真正会展示出的大小。

瀑布流，简单的版本主要是维护一个数组，数组存的是每一列的高度，每次新增在高度最小的那一列填。
有关列数，如果是平常简单的设计...直接把元素大小固定，拿到窗口大小后两个做个除法得到一个变量就可以了，得到这个值就是要排的列数。或者更懒一点直接把列数写死也没问题。
可是这里很细..很tmd细，也很tmd让人头疼。但不算怎样效果是很惊艳丝滑的，会根据窗口大小去同时计算元素大小和列数，做到很炫酷的即时填充，再加上动画简直太酷了。而，这是通过加了一堆函数，还有rect这个变量作为中介来实现的。

如果metas是虚拟矩形...
真的需要这么多吗...
也许需要吧...

好了，看完了，差不多。还行。

### 7.重做的话，要做的是

建好文件，用vue3重写那些东西...props，emits。
还有在各个组件内部的那些方法。

再然后是，用this.xxx这种方法调用函数的又是什么...
如果不用vue的this，函数相互调用组合...怎么组合？写成一大堆const 字符串，里面放箭头函数？这还是在一个文件里...
拆出utils...还是另一回事。

还有一串串的函数的内部结构。
用ts改....可能也是一堆麻烦事。但不是现在要考虑的。

还是好难...嘤嘤嘤
该学js了。
好。终于有需求了。

</details>
