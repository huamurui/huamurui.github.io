---
icon: discover
date: 2022-12-31
title: canvas
category:
  - 日记
tag:
  - 记录
---

最后一天的晚上了哎...
就是，看着canvas，我突然想到些东西。

粒子特效...

还有古早时期的windows上为数不多的好玩的东西，屏幕保护，除了幻灯片和鱼缸，还有好多好玩的...
飘泡泡，飘雪花...它们是确实有一部分类似...碰撞箱那种东西的...

这个在canvas里能做吗？
喵...

[particles.js](https://github.com/VincentGarreau/particles.js)

又找到一个超酷的仓库！
又是一千多行...虽然看起来好规整...但还是好怕怕

最近看到好多..好杂...却没弄出些东西..看花眼了要.......

想放一个东西...并不是canvas，但是,也挺好看的。

::: normal-demo biu-text

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>rainbow-text</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    body {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #000;
    }
    div {
      font-size: 5em;
      font-weight: bold;
      color:blueviolet;
    }
    div > span {
      display: inline-block;

    }
    .rainbow {
      animation: rainbow 2s linear 1 alternate both;
    }
    @keyframes rainbow {

      25% {
        color: rgb(0, 255, 221);
      }
      50% {
        color: rgb(255, 0, 0);
      }
      75% {
        color: rgb(231, 216, 12);
      }

    }
  </style>
</head>
<body>
  <div>ko-no-rainbow-da</div>
  <script>
    const div = document.querySelector('div');
    div.innerHTML = [...div.textContent].map(cur => `<span>${cur}</span>`).join('');
    const spans = document.querySelectorAll('span');
    spans.forEach((span, i) => {
      span.addEventListener('mouseover', function() {
        this.classList.add('rainbow');
      });
      span.addEventListener('animationend', function() {
        this.classList.remove('rainbow');
      });
    });
  </script>
</body>
</html>
```

:::

## 2023-01-15

感谢[小可爱]，玩到了一个游戏，Celeste。\
还在 github 上找到了这个游戏的引擎和部分代码的仓库。

[MonocleEngineMirror](https://github.com/shortgecko/MonocleEngineMirror)\
[Celeste](https://github.com/NoelFB/Celeste)

就这样懒懒的窝着也挺好...外卖在放着鞭炮...

就是说，从游戏引擎开始撸游戏也不是那么不可能，2d的小游戏还是可以做的，好好扣一扣也一样能做的很好...\
代码规范也不是问题，因为 Celeste 的开发程序员只有两位...这是真——自己怎么爽就怎么写。\
模块拆分、测试、规范...在这里统统都无所谓了......\
代码里一堆堆的不知道会造成什么影响的 magic number... 反而可以是独特的“游戏手感”。

>我现在还记得 Pinterest 这个网站，它的瀑布流布局，每列的宽度就是一个 magic number，236px，却在各种大小的屏幕上表现的都很好。

ESC vs OOP..又是组合 ko 继承

对了还要提一下 unity，以及它们相关的其他的...游戏引擎，cocos，egret...他们搞了一个...可以拖拖控件就可以完活的，游戏开发的“低代码”的东西...我能怎么说，这样的话，C# 或者 JS 就真只是脚本了。
>我一直觉得低代码像是某种“教小孩子识字的卡片”一类的东西，可以用来教学，可以简化入门，但是对符号的运用与把控是不能不学的，就像人现在就算是不写字了记不住笔顺了(现在的IDE都好智能...写代码也不用记那么多东西了)也至少记一下发音和字形，而不是拿着一堆带图片的小卡片去买菜。

底层...渲染...图形学...
Oh no...this is not the place for me
