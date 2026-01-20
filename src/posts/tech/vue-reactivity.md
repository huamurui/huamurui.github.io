---
icon: edit
date: 2026-01-20
title: 'Vue Reactivity'
tags: ['Vue','web','编程'] 
---

Vue 最近好像搞了许多大新闻，然鹅，我现在想看的可能是一个很老到有些无聊的话题，关于它的响应式系统。

## 最最开始

### Signal, Effect, Dependency Graph

信号/响应式系统的核心概念也许好久好久之前就有。 一个标准的信号/响应式系统，通常会有这样 **三个核心要素**：

1.  **Signal (状态/Ref)：** 存值，且知道谁在关注自己。
2.  **Effect (副作用/Subscriber)：** 那个需要重新执行的函数（比如更新 DOM，或者 console.log）。
3.  **Dependency Graph (依赖关系)：** 链接 Signal 和 Effect 的桥梁。

>在 Signal 被 Effect get 时收集 状态-依赖(Signal-Effect) 关系储存到 Dependency ，在 Signal set 时触发，通知 Effect 更新

这个的最简单版本的原理几乎一句话就能说清，代码实现也只要十几行就可以。

```javascript
// 1. 全局变量：存储当前正在运行的那个“副作用函数”
let activeEffect = null;

// 2. 也是核心：Effect 函数
// 它的作用是：执行用户的函数，并在执行期间把自己暴露给全局
function effect(fn) {
  activeEffect = fn; // 把自己挂到全局
  fn();              // 执行函数 -> 触发读取操作 -> 触发依赖收集
  activeEffect = null; // 执行完复原
}

// 3. 信号 (Ref) 的实现
class Ref {
  constructor(value) {
    this._value = value;
    this.subscribers = new Set(); // 谁在关注我？存这里
  }

  get value() {
    // 关键点：如果是 effect 运行期间读取了我，就把他记下来
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
    // 关键点：值变了，通知所有关注者重新运行
    this.subscribers.forEach(fn => fn());
  }
}

// --- 测试一下 ---

const count = new Ref(0);

// 定义一个副作用
effect(() => {
  console.log('当前计数是:', count.value);
});
// 输出: 当前计数是: 0

// 修改值
count.value = 1;
// 输出: 当前计数是: 1
```

### Base Computed / Memo, Watch

只考虑有效果，别的什么都不考虑的 Watch Computed 似乎都很简单。

```js
function watch(source, cb) {
  let oldValue;
  effect(() => {
    if (source instanceof Ref) {
      source = () => source.value;
    } 
    const newValue = source();
    cb(newValue, oldValue);
    oldValue = newValue;
  });
}
// --- 测试一下 ---
const count = new Ref(0);
watch(() => count.value, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变成了 ${newVal}`);
});
count.value = 1; // 输出: count 从 undefined 变成了 1
count.value = 2; // 输出: count 从 1 变成了 2

```


```js
function computed(getter) {
    let value;
    let dirty = true; // 脏标记
    const runner = effect(() => {
        value = getter();
        dirty = false; // 计算完变干净
    });
    return {
        get value() {
            if (dirty) {
                runner(); // 脏了就重新计算
            }
            return value;
        }
    };
}
// --- 测试一下 ---
const count = new Ref(1);
const double = computed(() => count.value * 2);
console.log(double.value); // 输出: 2

const triple = computed(() => double.value + count.value);
console.log(triple.value); // 输出: 3
```

## 另一些，练习

嗯...有效果，但，也只是有效果。  
上面的 Computed 加了个 dirty，但，lazyLoad， DAG 依赖更新...
类似的优化还有许多许多可以做的。  
这里再写些简单的。  

### Batching / Scheduler

任务队列，避免重复渲染。

*   代码：
    ```js
    count.value++;
    count.value++;
    count.value++;
    ```
*   上面的代码如果你不做处理，`effect` 会跑 3 次。
*   **目标：** 实现一个微任务队列（Microtask Queue），让它只跑 1 次（最后一次）。Vue 的 `nextTick` 就是做这个的。

```js
// 微任务队列
let jobQueue = new Set();
let isFlushing = false;
function flushJobQueue() {
  if (isFlushing) return;
  isFlushing = true;
  Promise.resolve().then(() => {
    jobQueue.forEach(job => job());
    jobQueue.clear();
    isFlushing = false;
  });
}
```

```js
// 覆盖 effect 函数
function effect(fn) {
  const runner = () => {
    activeEffect = runner;
    fn();
    activeEffect = null;
  };
  runner.scheduler = () => {
    jobQueue.add(runner);
    flushJobQueue();
  };
  runner();
  return runner;
}

// 覆盖 Ref 的 set 方法
class Ref {
  // ... 省略 constructor 和 get 方法
  set value(newValue) {
    this._value = newValue;
    this.subscribers.forEach(fn => {
      if (fn.scheduler) {
        fn.scheduler(); // 使用调度器
      } else {
        fn();
      }
    });
  }
}
```


### Cleanup
**挑战：** 解决分支切换（Branch Switching）导致的内存泄漏。
*   代码：
    ```js
    effect(() => {
      // 当 show 为 false 时，count 的变化不应该再触发这个 effect
      text = show.value ? count.value : 'hidden';
    })
    ```
*   **目标：** 每次 effect 重新运行时，必须先断开之前的依赖关系，然后重新收集。否则 `show` 变成 false 后，`count` 变动依然会触发这个函数，这在大型应用中是灾难。

```js
function effect(fn) {
  const runner = () => {
    cleanup(runner); // 先清理旧的依赖
    activeEffect = runner;
    fn();
    activeEffect = null;
  };
  runner.deps = []; // 存储这个 effect 依赖了哪些 signal
  runner.scheduler = () => {
    jobQueue.add(runner);
    flushJobQueue();
  };
  runner();
  return runner;
}

function cleanup(runner) {
  // 遍历所有依赖的 signal，移除对这个 effect 的订阅
  runner.deps.forEach(dep => {
    dep.subscribers.delete(runner);
  });
  runner.deps.length = 0; // 清空依赖列表
}

// 覆盖 Ref 的 get 方法

class Ref {
  // ... 省略 constructor
  get value() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
      activeEffect.deps.push(this); // 记录这个依赖
    }
    return this._value;
  }
}
```

## 考察

### Base Test

上面的只是 demo，性能与组织上都只是个样子。    

但，作为一个 web 的响应式系统，我想先试试它是怎么和 web/dom 结合的。

<div style="background:var(--color-theme-mix-10)" id="my-vue-reactivity-app"></div> 

```js
// 要先粘贴上面的基础响应式系统测试代码

const appDiv = document.getElementById('my-vue-reactivity-app');

const _count = new Ref(0);
const _double = computed(() => _count.value * 2);


const myApp = {
  render(h) {
    return h('div', [
      h('p', `Count: ${_count.value}`),
      h('p', `Double: ${_double.value}`),
      h('button', { onclick: () => _count.value++ }, 'Increment')
    ]);
  }
}
// 监听 count 变化，重新渲染
effect(() => {
  renderApp();
});


function renderApp() {
  appDiv.innerHTML = '';
  appDiv.appendChild(myApp.render(h));
}

// util
function h(tag, propsOrChildren, children) {
  const el = document.createElement(tag);
  if (typeof propsOrChildren === 'object' && !Array.isArray(propsOrChildren)) {
    for (const [key, value] of Object.entries(propsOrChildren)) {
      if (key.startsWith('on') && typeof value === 'function') {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    }
  } else if (Array.isArray(propsOrChildren)) {
    propsOrChildren.forEach(child => el.appendChild(child));
  } else if (propsOrChildren != null) {
    el.textContent = propsOrChildren;
  }
  if (children) {
    if (Array.isArray(children)) {
      children.forEach(child => el.appendChild(child));
    } else {
      el.textContent = children;
    }
  }
  return el;
}

```

### vue ~~新闻~~ 旧闻

vue 之前用响应式系统把更新触发准确到了组件，或者说组件的渲染函数。在组件的渲染函数收到更新时，再通过 vdom diff 算差异最后 patch 到 dom。  
上面也是我在尝试学 vue 的做法，~~不过只是做了个 h 函数然后直接 innerHtml = '' 没管 diff 的事~~。  
而最近的 vapor 则是希望去掉 vdom 这一层，魔改编译结果，直接让它运行时的更新准确到 dom 元素级别。  

```html
<script setup vapor>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">
    {{ count }}
  </button>
</template>
```

```js
// vapor
import {
  txt as _txt,
  toDisplayString as _toDisplayString,
  setText as _setText,
  renderEffect as _renderEffect,
  delegateEvents as _delegateEvents,
  template as _template,
} from "vue";

const t0 = _template("<button> </button>", true);
_delegateEvents("click");

function render(_ctx, $props, $emit, $attrs, $slots) {
  const n0 = t0();
  const x0 = _txt(n0);
  n0.$evtclick = () => _ctx.count++;
  _renderEffect(() => _setText(x0, _toDisplayString(_ctx.count)));
  return n0;
}
```

```js
// vdom
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      "button",
      {
        onClick: _cache[0] || (_cache[0] = ($event) => $setup.count++),
      },
      _toDisplayString($setup.count),
      1 /* TEXT */
    )
  );
}
```

能看到的是， vdom 没了，直接 template。 而  _renderEffect 响应式收集直接绑到了很精确的地方。  
但...代价呢？  
vue 的跨端开发相比 react 之前就没多少东西， 而如果之后 vapor 变成默认乃至唯一选择，会不会给 uniapp 这样的东西来个致命一击什么的x  

### solidjs

solid 有意思的一个地方是， solid 里可以不用 computed 这个 api，直接写一个高阶函数就可以实现计算属性这个功能。

### 核心原理：全局变量 `context`

你可以把响应式系统想象成一个“现场施工队”。
1.  **全局变量（工头帽）：** 只有一顶帽子。谁戴着这顶帽子，谁就是当前正在干活的“负责人”（Effect）。
2.  **Signal（材料）：** 谁动了材料，谁就要看看现在戴帽子的是谁，把他记在小本本上。

```js
// 1. 全局变量：记录当前正在运行的副作用函数
// 这就是那个“帽子”
let currentEffect = null;

// 2. 信号 (Signal)
function createSignal(initialValue) {
  let value = initialValue;
  const subscribers = new Set(); // 订阅者名单

  const read = () => {
    // 【关键一步】：读取时，看看谁戴着帽子
    if (currentEffect) {
      console.log(`🔍 发现有人(${currentEffect.name})在读我，把他记下来！`);
      subscribers.add(currentEffect);
    }
    return value;
  };

  const write = (newValue) => {
    value = newValue;
    console.log(`📣 值变了，通知 ${subscribers.size} 个订阅者更新！`);
    // 挨个打电话通知
    subscribers.forEach(fn => fn());
  };

  return [read, write];
}

// 3. 副作用 (Effect)
function createEffect(fn) {
  // 把函数包装一下，负责戴帽子和摘帽子
  const execute = () => {
    currentEffect = execute; // 戴上帽子！告诉全世界现在是我在运行
    fn();                    // 执行用户传入的函数
    currentEffect = null;    // 摘掉帽子！
  };
  
  // 给它起个名字方便调试
  execute.name = "MyEffect";
  
  execute(); // 立即执行一次
}

// --- 见证奇迹的时刻 ---

const [count, setCount] = createSignal(1);

// 这是一个没有任何特殊 API 的普通函数
// 也就是你说的 double
const double = () => {
  console.log('-> double 函数正在运行...');
  // 这里调用 count() 时，count 内部会检查 currentEffect
  return count() * 2; 
};

createEffect(() => {
  console.log('🏁 Effect 开始运行');
  // Effect 调用 double -> double 调用 count
  console.log('结果是:', double()); 
  console.log('🏁 Effect 结束运行');
});
```




### preactjs/signals

[preactjs/signals](https://github.com/preactjs/signals/tree/main/packages/core)

Preact 的信号库是目前公认写的非常漂亮且高性能的实现。它可以独立于 Preact 使用。

*   **核心黑科技：** **双向链表 + 版本号**。
    *   它不再用全局大 Map 存依赖了。
    *   **Signal** 知道自己被哪些 Effect 引用（链表）。
    *   **Effect** 知道自己依赖了哪些 Signal（链表）。
    *   这种结构使得**“取消订阅”**（Cleanup）变得极快（O(1) 复杂度，只需要断开链表指针）。
*   **这一代主要解决的问题：** “脏检查”的性能。如果一个 Signal 变了，派生出来的 Computed 到底要不要变？Preact 引入了极其高效的检查机制。


## 其他

<https://www.bilibili.com/video/BV1fyu9zsEAf>

<https://soonwang.me/blog/vue-reactivity-3.5-preact-signals>

<https://cn.vuejs.org/guide/extras/reactivity-in-depth>

<https://github.com/preactjs/signals>