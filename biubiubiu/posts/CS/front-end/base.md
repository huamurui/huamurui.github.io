---
dir.icon: html
title: 前端'基础'
icon: html
date: 2024-02-28
category:
  - 八股
  - 前端
  - 记录
  - 面试
---

这里会贴一下...前端面试常见的一些问题的自己的总结，背 api 的就不放了，找的是那种可能要讲一小段的那种。

## 浏览器地址栏输入 URL 后发生了什么

首先 URL 由 `协议` + `域名` + `端口` ++ `路径` + `查询参数` + `锚点` 组成。

- 网络传输  
输入 URL 后，浏览器通过 DNS 解析域名，找到对应的服务器 IP 地址，建立 TCP 连接
  - DNS
  - TCP
发送 HTTP 协议发送请求，服务器接收到请求后，通过 HTTP 协议返回响应
  - cdn
    - cdn 来处理一些常用资源，cdn 服务会根据用户的地理位置，选择离用户最近的服务器，加速资源的加载。
  - http 缓存
    - 常见的做法是将主页 index.html 做协商缓存，其他静态资源文件名打包加 hash 后做强缓存。
    - 强缓存是指浏览器直接从本地缓存中读取资源，不需要发送请求到服务器。可以通过设置响应头中的 Cache-Control 和 Expires 来设置强缓存。
    - 协商缓存是指浏览器发送请求到服务器，服务器根据请求头中的 If-None-Match 和 If-Modified-Since 来判断是否命中缓存。可以通过设置响应头中的 ETag 和 Last-Modified 来设置协商缓存。304 意味着命中缓存。

- 渲染  
浏览器接收到响应后，通过 HTML 解析出 DOM 树，然后通过 CSS 解析出 CSSOM 树，然后通过 DOM 树和 CSSOM 树合成渲染树，
然后通过渲染树和布局树合成布局树，然后通过布局树和绘制树合成绘制树，然后通过绘制树绘制到屏幕上。
  - 其中有两个比较重要的概念是，重排和重绘。
  - 重排是指改变了 DOM 结构或文档流布局，需要重新计算布局，比较耗费性能。
  - 重绘是指改变了元素的样式，但是没有改变布局，只需要重新绘制，而不需要重新计算布局，性能开销较小。

## 性能优化

- 网络
  - cdn
  - http 缓存
  - http123.
    - 如果是更早的 http1.0，那么每次请求都需要建立连接，这时可能将请求合并成一个请求，js css 打包成一个大文件，图片使用雪碧图等等合并资源来减少请求次数等会有很大提升。或者升级协议。
    - http1.1 引入了 keep-alive，可以复用连接。如果是 http1.1，那么浏览器会限制同一域名下的并发请求数量，http2 可以多路复用，减少了请求的延迟。
    - http3 基于 udp 协议。
  - 打包时
    - 分析依赖，删除不必要依赖，将依赖分成不同的包，按需加载，或将常用资源放 cdn。
    - gzip 压缩

- 渲染及 js 执行
  - 重排和重绘
    - 这里可以顺带说说瀑布流这种特殊布局，这类布局目前仍需要使用 js 自己计算来实现排布，而什么时候需要整体重新计算，什么时候只需要局部重新计算bulabula 也是需要做一些考量的。设计的东西蛮多，而浏览器本身的布局渲染的过程也是一个很好的例子引出这个。
      - 具体来说
      - 实现虚拟化，上下滚动时是不需要计算布局的，只需要根据滚动高度和元素位置给出窗口可视区域内的元素即可。
      - 滚动触底加载更多时，并不需要全体重新计算，只需要计算新加载的元素然后压入大数组即可。
      - 而当页面整体宽高变化时，就需要重新计算整体布局。
  - 页面超多元素时，懒加载，加上分页与虚拟列表，只加载可视区域内的元素。
  - js 编码执行... 这是个..不知道怎么分的问题，太多了
    - 防抖节流
      - 防抖是指用户的操作频繁触发事件，但是只需要在最后一次操作后执行，比如输入框输入时，滚动事件监听加载时，在用户滚动停止后再触发一次去发送请求。
      - 节流是在一定时间间隔内只执行一次，对于虚拟列表的滚动，用户频繁操作，这类有一定即时性需求的操作，可以使用节流。
    - 事件委托
    - 异步
    - 算法缓存
    ...

- 用户体验
  加载动画、懒加载、骨架屏等方式，也许不会让网页实际内容加载更快，但是可以让用户感觉更流畅。

## 原型链

原型链是 js 实现面向对象特性的一种机制。

- js 的构造函数有一个 `prototype` 属性，这个属性指向一个对象，这个对象被叫做原型对象。
- 创建一个实例时，实例的 `__proto__` 属性指向构造函数的 `prototype` 属性指向的对象。
- 实例的 `__proto__` 属性指向构造函数的 `prototype` 属性指向的对象，这样就形成了一个链式结构，这个链式结构就是原型链。
- 当访问一个实例的属性时，如果实例没有这个属性，那么会去实例的 `__proto__` 属性指向的对象中查找，如果还没有，那么会去 `__proto__` 属性指向的对象中查找，直到找到或者到 `Object.prototype` 对象为止。

- 继承
  - 原型链继承
    - 将父类的实例作为子类的原型
  - 构造函数继承
    - 在子类的构造函数中调用父类的构造函数
  - 组合继承
    - 原型链继承和构造函数继承的结合
  - 寄生组合继承
    - 组合继承的优化

## 闭包

闭包是指一个函数可以访问另一个函数作用域中的变量。

- 作用域链
  - 作用域链是指一个函数的作用域链是由它自己的作用域和它的父级作用域组成的。
  - 作用域链是在函数定义时就确定的，而不是在函数调用时确定的。

- 作用
  - 保护变量
  - 延长变量的生命周期
  - 模块化

- 具体应用
  - 防抖节流
  - 高阶函数

## this

- 默认绑定
  - 全局调用，this 指向全局对象。
- 隐式绑定
  - 如果函数是作为对象的方法调用的，那么 this 指向这个对象。
- 显示绑定
  - 如果函数是通过 call、apply、bind 调用的，那么 this 指向这个对象。
- new 绑定
  - 如果函数是通过 new 调用的，那么新创建的对象会绑定到函数的 this 上。
- 箭头函数
  - 箭头函数的 this 是在定义时确定的，而不是在调用时确定的。

## 事件循环

- 宏任务
  - script
  - setTimeout
  - setInterval
  - I/O
  - UI rendering

- 微任务

  - Promise
  - MutationObserver
  - process.nextTick

- 事件循环的执行顺序是，先执行同步代码，然后执行微任务，然后执行宏任务。
  - 另一种理解是，同步代码本身也是一个宏任务，执行完同步代码后，会执行这一轮的微任务，然后再执行下一轮宏任务。
- js 是单线程语言，而为了在一些耗时任务时不阻塞 js 执行，有了事件循环。

## ES6
  
啊

## CSS 属性分分类类

- 布局类
- 圆角边框背景阴影等，可以大幅提高页面观感与完成度的
- 响应式，移动端适配
  - @media，px，em，rem，vw vh，%。
- 动画 3d

- 写法上，权重，类命名，预处理 bulabula

## Vue & React
  
- 框架和工具的考量并不完全是性能，而是给出不错的性能，同时解决功能实现，减少心智负担，优化代码、工程结构......

...感觉就剩 api 了

- React
  - f(props)=ui...
  - 虚拟 dom， fiber 切片，更新
  - 跨平台
  - hooks
    - useState 创建视图绑定的变量
    - useReducer 优化复杂 useState 的更新
    - useEffect 一种类似响应式的东西...根据依赖变化执行回调，可以用来发请求然后 setState
    - useContext 全局变量，组件通信
    - useMemo，useCallback。和 vue 的 computed 好像有点像，做缓存，“性能优化”
  - 生态
- Vue
  - 响应式系统与 UI

## Promise

```js
const pending = "pending";
const fulfilled = "fulfilled";
const rejected = "rejected"; // 添加状态 rejected

class MyPromise {
  constructor (run) { // run 函数 (resolve, reject) => any
    this.resolvedCallback = [];
    this.rejectedCallback = []; // 添加一个处理错误的队列
    this.status = pending;
    this.data = void 666; // 保存异步结果
    const resolve = value => {
      if (this.status === pending) {
        this.status = fulfilled;
        this.data = value;
        this.resolvedCallback.forEach(callback => callback(this.data));
      }
    };
    const reject = err => {
      if (this.status === pending) {
        this.status = rejected;
        this.data = err;
        this.rejectedCallback.forEach(callback => callback(this.data));
      }
    };
    try { // 对构造器里传入的函数进行try / catch
      run(resolve, reject); // !!! 核心
    } catch (e) {
      reject(e)
    }
  }

  static resolve (p) {
    if (p instanceof MyPromise) {
      return p.then()
    }
    return new MyPromise((resolve, reject) => {
      resolve(p)
    })
  }

  static reject (p) {
    if (p instanceof MyPromise) {
      return p.catch()
    }
    return new MyPromise((resolve, reject) => {
      reject(p)
    })
  }

  static all (promises) {
    return new MyPromise((resolve, reject) => {
      try {
        let count = 0,
            len   = promises.length,
            value = [];
        for (let promise of promises) {
          MyPromise.resolve(promise).then(v => {
            count ++;
            value.push(v);
            if (count === len) {
              resolve(value)
            }
          })
        }
      } catch (e) {
        reject(e)
      }
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      try {
        for (let promise of promises) {
          MyPromise.resolve(promise).then(resolve)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  catch (onRejected) {
    return this.then(void 666, onRejected)
  }

  then (onResolved, onRejected) { // 添加两个监听函数
    // 这里需要对onResolved做一下处理，当onResolved不是函数时将它变成函数
    onResolved = typeof onResolved === "function" ? onResolved : value => value;
    onRejected = typeof onRejected === "function" ? onRejected : err => { throw err };

    switch (this.status) {
      case pending: {
        return new MyPromise((resolve, reject) => {
          this.resolvedCallback.push(value => {
            try { // 对整个onResolved进行try / catch
              const result = onResolved(value);
              if (result instanceof MyPromise) { 
                result.then(resolve, reject)
              } else {
                resolve(result); 
              }
            } catch (e) {
              reject(e)
            }
          });
          this.rejectedCallback.push(err => {
            try { // 对整个onRejected进行try / catch
              const result = onRejected(err);
              if (result instanceof MyPromise) {
                result.then(resolve, reject)
              } else {
                reject(err)
              }
            } catch (e) {
              reject(err)
            }
          })
        })
      }
      case fulfilled: {
        return new MyPromise((resolve, reject) => {
          try { // 对整个过程进行try / catch
            const result = onResolved(this.data);
            if (result instanceof MyPromise) {
              result.then(resolve, reject)
            } else {
              resolve(result);  // emit
            }
          } catch (e) {
            reject(e)
          }
        })
      }
      case rejected: {
        return new MyPromise((resolve, reject) => {
          try { // 对整个过程进行try / catch
            const result = onRejected(this.data);
            if (result instanceof MyPromise) {
              result.then(resolve, reject)
            } else {
              reject(result)
            }
          } catch (e) {
            reject(e)
          }
        })
      }
    }
  }
}
```