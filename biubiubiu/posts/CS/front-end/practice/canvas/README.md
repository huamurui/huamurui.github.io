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
</body>
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
</html>
```

:::
