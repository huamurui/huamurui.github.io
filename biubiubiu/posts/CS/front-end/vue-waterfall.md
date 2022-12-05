---
title: vue瀑布流
icon: creative
data: 2022-11-17
category:
  - 记录
  - 网页
  - 编程
  - 挖坑
---


## 瀑布流，计算部分

1.基础的版本,或者说实现核心主要是维护一个数组，数组存的是每一列的高度，根据现有高度选择新增元素会插到哪里，最简单的就是每次新增在高度最小的那一列填。\
2.有关列数，如果是平常简单的设计...直接把元素宽度或者说列宽固定，拿到窗口大小后两个做个除法得到一个变量就可以了，得到这个值就是要排的列数。或者更懒一点直接把列数写死也没问题。而有关元素高度，常见的做法有等比放缩一下。

::: details 1.2.基础版算列数，等比放缩..

这部分代码来自[myst729/Waterfall](https://github.com/myst729/Waterfall)...
不得不说组织的好棒...也不长，改用新的写法200行js加上css就能把功能做的很好。

害...我今天才知道原来单纯的js就有这么多在dom上的方法了，

>let cellsContainer = document.getElementById('cells')\
document.createDocumentFragment\
document.createElement\
document.body.children;  那parent肯定也有对吧...\
className不是自己起的名字...而真的是html-css-js里有的属性，可以在js中调用的。

```js
  //算列数
  const getColumnCount = () => Math.max(Math.floor((window.innerWidth - 20) / COLUMN_WIDTH), MIN_COLUMN_COUNT)
```

```js
//初始化columnHeights
  const resetHeights = (count) => {
    columnHeights = new Array(count).fill(0);
    cellsContainer.style.width = (count * (COLUMN_WIDTH + GAP_WIDTH) - GAP_WIDTH) + 'px';
  }
```

```js
  const adjustCells = (cells, reflow) => {
    let columnIndex = getMinKey(columnHeights);
    let columnHeight;
    for (let j = 0; j < cells.length; j++) {
      // Place the cell to column with the minimal height.
      columnIndex = getMinKey(columnHeights);
      columnHeight = columnHeights[columnIndex];//columnHeights就是需要维护的数组
      cells[j].style.height = (cells[j].offsetHeight - CELL_PADDING) + 'px';
      cells[j].style.left = columnIndex * (COLUMN_WIDTH + GAP_WIDTH) + 'px';
      cells[j].style.top = columnHeight + 'px';
      columnHeights[columnIndex] = columnHeight + GAP_HEIGHT + cells[j].offsetHeight;
      if (!reflow) {
        cells[j].className = 'cell ready';
      }
    }
    cellsContainer.style.height = getMaxVal(columnHeights) + 'px';
    manageCells();
  }
```

:::

3.但...看了这么久会觉得不多写点就有点对不住，所以有了第三种，根据窗口宽度与提供的默认列宽算出一个列数，然后根据这个列数去重定义列宽达到更好的填充效果。

::: details 3.为了更好填充而做的计算
  
  [MopTym/vue-waterfall](https://github.com/MopTym/vue-waterfall)
  
  这部分代码来自这个仓库，原作者还写了很多功能...只不过好大一部分并不是我想要的，过程把我看的麻麻的。

```ts

  //综下所述，我觉得，叫getCellsWidthAndColumCount更好
  //这个策略是算列数和每列的宽度，主要变量有...有好多。抄了！
  function getRowStrategy(width: number, options: WaterfallConfig) {
    let count = width / options.lineGap
    // 列数，利用默认值计算的，向下取整
    let slotWidth
    if (options.singleMaxWidth >= width) {
      count = 1
      slotWidth = Math.max(width, options.minLineGap)
      //如果元素宽度比窗口还大，直接一列，让元素宽取可以取到的最大
    } else {
      let maxContentWidth = options.maxLineGap *~~count
let minGreedyContentWidth = options.minLineGap* ~~(count + 1)
      //~~应该是取整的意思，这里计算出两个变量，最大最小的整体宽度
      let canFit = maxContentWidth >= width
      let canFitGreedy = minGreedyContentWidth <= width
      //...greedy，...做两个布尔值，然后是判断。
      if (canFit && canFitGreedy) {
        count = Math.round(count)//round四舍五入
        slotWidth = width / count//单元素宽度...再次赋值
      } else if (canFit) {
        count = ~~count
        slotWidth = width / count
      } else if (canFitGreedy) {
        count = ~~(count + 1)
        slotWidth = width / count
        //这两个else if，count取整一个向上一个向下，然后和上面一样计算单元素宽度
      } else {
        //最后这种...向下取整，宽度取最大
        count = ~~count
        slotWidth = options.maxLineGap
      }
      if (count === 1) {
        //如果算完了还是一列，那么宽度取最大
        slotWidth = Math.min(width, options.singleMaxWidth)
        slotWidth = Math.max(slotWidth, options.minLineGap)
      }
    }
    return {
      width: getArrayFillWith(slotWidth, count),//元素宽度...也许是为了grow的时候方便用的，也是可以删掉...
      count: count,//列数...重命名以下，columnCount
      left: 0,//如果你不用的话...把这个删了吧。
    }
  }

```

:::

## 瀑布流，web实现

是的...计算部分也没多少麻烦，但想要做成成品还要好大一段路...除了把计算后的数值塞回到节点style里，还有好多问题。\
就，比如，滚动懒加载，用户改变窗口大小......这些重新组织UI的过程可以做成动画，动画又怎么绑定...
>ps:而我现在在vue里做的时候...绝大部分时间都花在了代码拆分后重新组织通信上，毕竟我没那么熟悉这些...一路上踩了好多好多坑啊...

懒加载可以监听scroll事件进行高度计算，超过一定的值就加载，顺便把不在窗口内被划过去的dom解除一下。动画方面，这里是通过调html的className表示状态，然后相应状态写css动画。\
而为了避免一些鬼畜效果，调用各块函数的同时用setTimeout弄几个防抖也是需要的。

::: details lazy-load & css animation
 still come from [myst729/Waterfall](https://github.com/myst729/Waterfall)

```js
  let manageCells = function () {
    // Lock managing state to avoid another async call. See {Function} delayedScroll.
    managing = true;

    let cells = cellsContainer.children;
    let viewportTop = (document.body.scrollTop || document.documentElement.scrollTop) - cellsContainer.offsetTop;
    let viewportBottom = (window.innerHeight || document.documentElement.clientHeight) + viewportTop;

    // Remove cells' contents if they are too far away from the viewport. Get them back if they are near.
    // TODO: remove the cells from DOM should be better :<  :> :) :(
    for (let i = 0; i < cells.length; i++) {
      if ((cells[i].offsetTop - viewportBottom > THRESHOLD) || (viewportTop - cells[i].offsetTop - cells[i].offsetHeight > THRESHOLD)) {
        if (cells[i].className === 'cell ready') {
          cells[i].fragment = cells[i].innerHTML;
          cells[i].innerHTML = '';
          cells[i].className = 'cell shadow';
        }
      } else {
        if (cells[i].className === 'cell shadow') {
          cells[i].innerHTML = cells[i].fragment;
          cells[i].className = 'cell ready';
        }
      }
    }

    // If there's space in viewport for a cell, request new cells.
    if (viewportBottom > getMinVal(columnHeights)) {
      // Remove the if/else statement in your project, just call the appendCells function.
      if (isGithubDemo) {
        appendCellsDemo(columnCount);
      } else {
        appendCells(columnCount);
      }
    }

    // Unlock managing state.
    managing = false;
  };
```

```css
.pending {
  opacity: 0;
  transform: translateY(50px);
}
.ready {
  transition: 
    opacity 1s ease-in-out, 
    box-shadow 300ms ease-in-out, 
    left 700ms ease-in-out, 
    top 700ms ease-in-out, 
    transform 700ms ease-in-out;
}
.shadow {
  visibility: hidden;
}
```

:::

## 瀑布流，和vue有啥关系 && 绕圈圈

要说的话...没关系，你看上面用js手搓的效果都已经那么好了。也许写网页也是，用不用这些库和框架都无所谓...
>ps:我又了解了css里叫flex的一种布局，似乎...能很轻松的实现简单版本的瀑布流，就是那种一个个小方块那种...。但想要玩花的还是上js吧，css里写计算是真...。\
我想要学着生产的也许是一种错落的秩序，输入的内容依旧是长方形但同时利用这些内容的长与宽去打破完全的秩序，去制造些不一样的...东西。

只是这些家伙提供了一套工具与实践方法，啃它们，能做到更多。是的，我看着看着就飘了，我甚至想抄一个花瓣网或者Pinterest这样的东西出来。

但...我依旧不知道怎么写，这是个问题，有两条路，一个是写成小而精的库与工具，另一个是作为大项目的一部分直接丢上去，但这两者我目前功力都基本是0......。
想要小巧就别上vue,ts这些了...原生js能做到...

嗯，还是打算先vue+ts写一个简单的npm包。前天折腾了折腾大概知道包要怎么发了，github action也调通了，就差代码了。
...我终于开始写代码了，但我写的真烂...其实通都没通，ts也救不了的那种..........
也许这些...没什么意义。
也许好久之后才会有...

嗯，又过了一天大概算是搞通了。下一步有希望了 :yum
而且，写组件时的思考...————暴露什么样的接口，哪些又要收回到组件内部去控制...这些东西和我使用的框架暴露给我的那些..有些地方好像...

[why, some say, the moon？](../helloworld/why-the-moon.md/#why-some-say-the-moon)

### npm publish & github action

### component & props & emit & slot & store

这些部分...算是vue提供的，一种代码组织方式。尤其与原生js相比。

### reactive... how it works, where it works

...

### css animation & vue's transition component

必须要v-if之类的进行触发就好憨...写个钩子搞变量解决了。

### javascript

#### namespace & variable & pure function & lambda

#### Statements & Expressions && Recursion & Iteration

#### Promise && async & await && callback function

### typescript

vue's bug

### css's flex & grid layout

嗯...其实一路过来也看了好多别的操作，css的flex和grid布局之类的...但是如果要写的话，有一部分计算是规避不掉的，那就是维护那个用于储存每一列的高度的数组，这个数组同时也是支持后续懒加载的关键。

[pure css,grid,waterfall](https://www.smashingmagazine.com/native-css-masonry-layout-css-grid)

嗯，grid能做到很多了，看了看，如果用的话估计能省下不少憨批代码...但，真的想玩骚操作还得上js。

啊...这些都好傻逼...不对，我是想说这些原来这么简单...傻逼的是我。

## 别看，废案，错误百出(~~虽然上面也一样~~)

::: details 啥都没干就瞎bb的部分

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

:::
