---
title: 编译原理
icon: line
date: 2023-03-24
category:
  - 基础

---


说真的这挺折磨的，学校不知道为什么在大三下开了这门课还搞成必修，我因为乱七八糟的事根本没心思听课...然后课上作业搞的一团乱...

但是我还是不想用听的来学，我... 所以打算自己先过一遍。

[基础](https://blog.csdn.net/dong_hfut/category_12066103.html)
[基础2](https://blog.csdn.net/gzn00417/article/details/106885612)

[题目速成](https://blog.csdn.net/dong_hfut/category_12066103.html)

### 名词

- 正则
  - 正则表达式 | RE: Regular Expression
  - 有限自动机 | FA: Finite Automata
    - DFA | 确定有限自动机: Deterministic Finite Automata
    - NFA | 非确定有限状态机: Non-deterministic Finite Automata
- 文法
  - 上下文无关文法 | CFG: Context-Free Grammar
  - 下推自动机 | PDA: PushDown Automata

### 2023-04-04

emmmm  
果然我又鸽了，但是就说一下，最近...不知道是不是看那些作业的后遗症，我写的几个小东西的时候脑子一直在想 dfa、状态机这些概念，也许他们确实可以解决许多问题...  
动态规划里的记忆，kmp 的 next...，我会觉得数据库或者别的系统里的“锁”也是一种状态... 再或我自己弄得小玩具里先搞一个状态表然后...  
再也许，和反应式编程也可以有关系。  

编译。

[super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)

tokens->AST->.....  

>虽然，我看过一些比较狠的代码，就，也许实现一个简单的编译器并不需要这些规范或手段，可以写的歪七扭八....

...
