---
icon: relation
date: 2023-03-20
title: 反应式编程
category:
  - 指南

---

[kriskowal/gtor](https://github.com/kriskowal/gtor)

[反应式宣言](https://www.reactivemanifesto.org/zh-CN)

嗯...但在此之前，想先看看防抖节流，锁，事务一致性，以及js 的 Promise。
  
### debounce & throttle

react 文档里有说过，不要信任用户的操作，用户根本不知道自己的操作到底在干嘛也不需要去知道，收到的所有的操作都要加一个 handler， debounce & throttle 就是两种最常见的 handler。

[difference-between-throttling-and-debouncing-a-function](https://stackoverflow.com/questions/25991367/difference-between-throttling-and-debouncing-a-function)

debounce 的意思是，如果用户在短时间内多次触发了事件，那么只有最后一次事件会被处理，前面的事件都会被忽略。
>常见场景是，用户在输入框中输入内容，如果每次输入都触发事件，那么就会导致事件处理函数被频繁调用，这样会影响性能进而可能影响体验，所以一般会使用 debounce 来处理这种场景，只有用户输入完毕后，才会触发事件。不仅仅是文字输入，鼠标移动，窗口大小改变等等都可以使用 debounce 来处理一下。

throttle 的意思是，如果用户在短时间内多次触发了事件，那么只有每隔一段时间的事件会被处理，前面的事件都会被忽略。
>这里，主要，更多的保护的可能不是用户体验了，这里更多的是保护服务器，主要是在用户明确的点击、提交行为时，防止用户在短时间内多次点击、提交，导致服务器压力过大，或者重复提交数据错误一类的问题。

---

redis 实现 throttle，节流。

>keys *  
set key  
get key  
del key [key ...]  
expire key seconds
ttl key  

>mset/mget/msetnx/mgetnx  
bitop/bitcount/bitpos/bitfield  // 位操作, 有人玩的特别花  

>hset/hget/hdel/hexists/hgetall/hkeys/hvals/hincrby/hincrbyfloat/hstrlen/hscan  // hash  
lpush/lpop/rpush/rpop/lrange/ltrim/lindex/lset/lrem/linsert/llen/lpushx/rpushx/lpop/rpop/lpop/rpoplpush/blpop/brpop/brpoplpush  // list  

>sadd/srem/sismember/smembers // 集合  
zadd/zrem/zrange/zrangebyscore/zrevrangebyscore/zrank/zrevrank/zscore/zcard/zcount/zscan/zremrangebyrank/zremrangebyscore  // 有序集合，为什么‘z’开头？redis开发者也觉得牵强。。  
---
>如要限制每分钟每个用户最多只能访问100个页面，思路是对每个用户使用一个名为 rate.limiting:用户 IP的字符串类型键，每次用户访问则使用 INCR命令递增该键的键值，如果递增后的值是1（第一次访问页面），则同时还要设置该键的过期时间为1分钟。这样每次用户访问页面时都读取该键的键值，如果超过了100就表明该用户的访问频率超过了限制，需要提示用户稍后访问。该键每分钟会自动被删除，所以下一分钟用户的访问次数又会重新计算，也就达到了限制访问频率的目的。

>这里存在一个不太明显的问题：假如程序执行了但没执行完，中途突然因为某种原因退出了，没能够为该键设置过期时间，那么该键会永久存在，导致使用对应的IP的用户在管理员手动删除该键前最多只能访问100次博客，这是一个很严重的问题。为了保证建立键和为键设置过期时间一起执行，可以使用上节学习的事务功能.

>事实上，仍然有个问题：如果一个用户在一分钟的第一秒访问了一次博客，在同一分钟的最后一秒访问了9次，又在下一分钟的第一秒访问了10次，这样的访问是可以通过现在的访问频率限制的，但实际上该用户在2秒内访问了19次博客，这与每个用户每分钟只能访问10次的限制差距较大。尽管这种情况比较极端，但是在一些场合中还是需要粒度更小的控制方案。如果要精确地保证每分钟最多访问10次，需要记录下用户每次访问的时间。因此对每个用户，我们使用一个列表类型的键来记录他最近10次访问博客的时间。一旦键中的元素超过 10 个，就判断时间最早的元素距现在的时间是否小于 1分钟。如果是则表示用户最近1分钟的访问次数超过了10次；如果不是就将现在的时间加入到列表中，同时把最早的元素删除。

2333... 真是麻烦又折磨，书的作者最后也推荐使用另外的脚本来实现节流。

那，来个 js 版本的。

JS 有两个时间的函数 setTimeout 是到了之后调一次也只调一次，setInterval 是每隔一段时间调用一次一直搞下去。  
但 debounce 和 throttle 都是在一定条件下调用一次，(不停的操作是用户已经在做的了)所以，这里，我们用 setTimeout 来做这两个函数。

```js
function debounce(fn, delay) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  }
}
```

```js
function throttle(fn, delay) {
  let timer = null;
  return function() {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        timer = null;
      }, delay);
    }
  }
}
```

### transaction & lock

事务的ACID，原子性，一致性，隔离性，持久性。
如果要挑重要的，那就是原子与隔离。——原子性表示不可分；隔离性类似解耦。

### Promise

#### callback

---
我还是不想进入正题

通信，信号处理...

### socket && publish & subscribe && message queue

### cluster

## Reactivity

## functional programming ? reactive programming??

....RxJS

---

### 2023-05-07

我上面在写什么...？
不知道...



>小知识，什么是闭包~~~  
>>在 js 中，闭包最浅显直接的意思应该是变量作用域的一些限制，在内部可以访问相对这个内部的外部的变量，而反之则不可以；以此也会有——在嵌套的一层层包中，越内部，意味着越私有。  
>>然而我们在讨论闭包时往往在说的是一些更加特殊的情况：那就是当前函数返回的恰也是一个函数的时候——如果这个函数又恰好引用了当前函数这个“包”中定义的其他变量，那么这些变量就不会被垃圾回收释放掉，而是在返回出的函数被手动销毁置空前一直有效。我们借此获得了一个和这个函数配套的变量。——不会污染全局，也不会直接释放。  
>>这很神奇，或者说可以用这个东西，单纯(?这还单纯吗)使用函数就完成一些功能的添加与组合。在这个闭包中我们可以劫持住一个函数的输入、输出、调用等等，简单常见的应用像前端对一些操作的防抖节流就是依靠闭包来实现，而一些更炫酷的操作像高阶函数组合函数，函数柯里化等等，也可以利用闭包来实现。  
>
>>数学上也有闭包这个概念，指的是一个集合对于某种操作，所有输入输出都落在这个集合本身中。好像不着边...又好像有点相像。  
>
>>“包”这种东西也许在 java 中像喝水一样，你创建一个类，自然就有了一个独立的作用域，就有一个 this 可以朝上面挂东西，类与类之间继承自然就能描述出复杂的功能...  
>>只不过 js 磕磕绊绊许多年都没把 oop 那些东西做好，再或纯正的 oop 也没有那么适合前端所面对的东西。  
另一个，java 的原教旨 oop 也导致了某些东西不好写，这边搞的火热的控制反转这个概念，某种程度上也是对 java 没有独立的函数的一种补救...  
>
>>函数式中搞的模块化...  


callback => Promise & then => generator & yield => async & await




