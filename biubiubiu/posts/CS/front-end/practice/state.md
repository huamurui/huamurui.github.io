---
title: 状态
icon: config
date: 2023-05-07
category:
  - 挖坑
---


> “状态”
>>相比Expressions，Statements远没有那么天经地义，还有很多名词都能让我想到这个东西...状态机，寄存器，记忆...嗯。经典的定义与赋值就属于Statements。编程里的单等号不是数学表示相等的等号而是“赋值”。
>---
>>我又在react文档看到了这部分...useState弄出的东西被叫做组件的记忆，而为了代码的健壮，通常，我们要谨慎的设计、控制、最小化这一部分。
>---
>>状态机。程序，计算机提供的所以服务都能被看作是，状态机。
>---
>>一个人能能走的多远不在于他在顺境时能走的多快，而在于他在逆境时多久能找到曾经的自己。——KMP/动态规划。
>---
>>前端的一些“状态管理”的库或者说方案，还有那个有名的RxJS... Promise, 以及各种“生命周期”...
>---
>>编译原理中的一些

状态这个东西...在上面都有体现。但是今天我想做的是，尝试讨论、展示一下它在前端，不，更狭义些，UI 方面的一些作用。~~因为好玩，顺便提一下动作游戏有种叫 konami 的东西，也可以用状态来理解~~

1. isActive  
在 UI 中体现的最简单常见的状态也许是随处可见的鼠标悬浮时的高亮，一个按钮/菜单点击后会在激活与非激活或者黑白主题间切换...... 它们很简单，它们是简单的 true or false。一个变量甚至不需要用变量就可以解决。  
用控制流，可以写出一个简单，但又十分经典的  

``` js
let isActive = false
function toggleActive() {
  if (isActive)  isActive = false
  else isActive = true
}

// or
function toggleActive() {
  isActive = !isActive
}

// and another or
function toggleActive() {
  if(hover) isActive = true // 而 hover 这个事件... 是另一个，也许需要时刻计算的事件。
  else isActive = false
}
```

2. dialog bubble  
这里我想关注的是一个聊天软件里的 ui 的细节，一组消息的气泡如果是一个人连续发出的，那么首尾的气泡样式会不一样，而这一组也只会显示一次头像。  
能想象的到的是，从后端返回的数据可能并不会一组一组来，因为即时性的消息是一条一条发的... 这个分组在前端去做是很合理的，在后端处理... 没必要。  

``` js
let prev = '' // 这就是一个用于记录状态的变量，下面会比较收到的这一条消息和上一条那条消息是否是同一用户发出，如果是，则不创建新的组，直接在之前的那一组继续添加，如果不是，则会新建一个组。
function addMessage(message) {
  if (message.user === prev) {
    // add to prev's wrapper directly
  } else {
    // create new wrapper and add to it

    prev = message.user  // update prev
  }
}
```

然后配合着 css 的 first | last-child 选择器就可以给每一组的首位元素单独添加样式lo。

3. floating action button  
它的灵感有两个，一个是了解到的 fab 本身，另一个是... 小时候玩的桌面宠物。  
我希望的是，能够被拖动，能够被点击，它能够在屏幕上自由的移动，有展开和收起的动画，被拖到边缘时，会有一个停靠。

- 它的*状态*会多一些，相互转换的*方法*也不止有一个，先列出来并标上数字字母
  - 状态有从UI角度看有下面这样四个显像的状态，~~其实另外一些相对而言比较不可名状的中间态 status，选下面四个，也只是其中一种视角~~
    - default - 0
    - active - 1
    - dragging - 2
    - sticky  - 3
  - 方法主要是鼠标/触摸的事件的三段，加上一个边界检测
    - start - a
    - move  - b
    - end  - c
    - collision - d

- 代码我写的稀碎(而且移动端会没法用，还有好多不知道怎么修的东西...)。我会想画一个图来表示这个玩意。  
  [*floating-action-button*](https://huamurui.github.io/html-s/floating-action-button.html)  —— right click to see the source code.

  ![fab-states](./img/fab-states.jpg)
  好吧我图画的也很烂，但是我觉得这个图还是能够表达我的意思的。纯粹以图的形式来看，它并不是最简的，但...我会觉得它容易看。

4. slider  
其实是我翻 swiper.js 代码的时候看到的一些... 原来一个小小的幻灯片也可以有生命周期这种抽象...  
slider 的许多炫酷特效，都会将片子分成 cur, prev, next 还有啥都不是的四大类，然后在切换时，会有一些动画，这些动画有位置、缩放、叠压优先级、透明度...... 加上如何处理拖拽、点击、滚动、键盘事件...

还没写，所以

work in progress...
