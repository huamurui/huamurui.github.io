---
icon: edit
date: 2026-01-20
title: 'Vue Reactivity'
tags: ['Vue','web','编程'] 
---

Vue 最近好像搞了许多大新闻，然鹅，我现在想看的可能是一个很老到有些无聊的话题，关于它的响应式系统。

## 过家家
### 最最开始

#### Signal, Effect, Dependency Graph

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

#### Base Computed / Memo, Watch

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

### 另一些，练习

嗯...有效果，但，也只是有效果。  
上面的 Computed 加了个 dirty，但...  问题很多，在[下面](#glitch故障毛刺)会说一下

#### Batching / Scheduler

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


#### Cleanup
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


### 响应式系统与 dom

#### Base Test

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

#### vue ~~新闻~~ 旧闻

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

能看到的是， vdom 大概是没了，直接 _template 和一些别的 dom 修改方法。 而  _renderEffect 响应式收集也直接绑到了很精确的地方。  
将更多的工作直接在编译时完成。  
但...代价呢？  
vue 的跨端开发相比 react 之前就没多少东西， 而如果之后 vapor 变成默认甚至唯一选择，是不是给 uniapp 这样的东西狠狠来了一拳x


## 考察


#### Glitch（故障/毛刺）

虽然上面的代码完全没到考虑这个问题的时候，但我想通过这个问题看一下现在更完善的响应式系统在做什么。  
这里主要在关注的是 Signal 和 Computed 这两个东西。其他的暂且不管。  

**Glitch（故障/毛刺）** 或 “**钻石问题**” 指的是在依赖图中，当一个上游数据源发生变化，通过多条路径传导到同一个下游节点时，由于更新顺序的不一致，导致下游节点在短时间内接收到**不一致的中间状态**或**执行了多余的计算**。

##### 场景描述
想象一个菱形（钻石）形状的依赖图：

```text
      [A]  (原始数据 Name="John")
     /   \
   [B]   [C]  (中间计算)
     \   /
      [D]  (最终派生)
```

1.  **A** 是源头（例如：`name`）。
2.  **B** 依赖 A（例如：`isUpperCase = name.toUpperCase()`）。
3.  **C** 依赖 A（例如：`length = name.length`）。
4.  **D** 依赖 B 和 C（例如：`info = isUpperCase + " " + length`）。

初始状态：A="John", B="JOHN", C=4, D="JOHN 4"。

##### 问题发生的过程
假设我们将 **A** 修改为 "Doe"：

1.  **A** 通知 **B** 和 **C** 更新。
2.  **B** 先更新：B 变为 "DOE"。
3.  **B** 通知 **D** 更新。
4.  **D** 立即重新计算：此时 B 是新值 "DOE"，但 C 还没来得及更新（仍是旧值 4）。
5.  **D 计算出错误结果（Glitch）："DOE 4"**。❌ (这是不一致的状态，因为 "DOE" 的长度不是 4)。
6.  接着，**C** 更新：C 变为 3。
7.  **C** 通知 **D** 更新。
8.  **D** 再次计算：B 是 "DOE"，C 是 3。
9.  **D 计算出正确结果："DOE 3"**。✅

##### 负面影响
1.  **性能浪费**：D 执行了两次计算，第一次是完全没必要的。
2.  **副作用风险**：如果 D 的计算包含副作用（例如发送网络请求、打印日志、DOM 操作），那么用户可能会看到一闪而过的错误数据，或者服务器收到错误的请求。

---

#### 解决方案

现代响应式库主要通过以下几种策略来解决这个问题：

##### 方案一：拓扑排序 (Topological Sort)
这是最理论化的解法。系统在执行更新前，先分析依赖图，确定节点的执行顺序。
*   **原理**：确保 D 永远在 B 和 C 之后执行。
*   **做法**：当 A 变更时，系统会计算出一个更新队列 `[A, B, C, D]` 或 `[A, C, B, D]`。D 必须等待所有依赖项都处理完毕才执行。
*   **缺点**：在运行时动态计算图的拓扑排序成本很高，难以处理动态变化的依赖关系。

##### 方案二：Push-Pull 模型（混合推拉 + 版本号/时间戳）—— **主流方案**
这是目前最高效且被广泛采用的方案（如 **Vue 3.x, MobX, Preact Signals, SolidJS**）。

*   **机制**：
    1.  **Push (通知阶段)**：当 A 变更时，A 不会把值推给 B 和 C，而是发送一个“**我脏了 (Dirty)**”或“**可能脏了**”的信号。这个信号沿着图向下传播。D 收到信号后，标记自己为“陈旧（Stale）”，但**不立即重新计算**。
    2.  **Pull (求值阶段)**：当需要读取 D 的值时（或者在微任务结束后的渲染阶段），D 尝试获取值。
    3.  **版本检查**：D 询问 B 和 C。B 发现自己也是“陈旧”的，于是去问 A。A 重新计算并更新版本号。B 更新并记录版本号。C 同理。
    4.  **最终计算**：D 只有在确认 B 和 C 都是最新版本后，才利用它们的新值进行自我计算。

*   **优点**：完美解决了 Glitch，且实现了**惰性求值**（Lazy Evaluation）——如果 D 没人用，甚至根本不会重算 B 和 C。

##### 方案三：同步调度与批处理 (Batching & Scheduling)
这是 React (setState) 和一些早期库常用的方式。  
也许[上面](#batching--scheduler)做的的那个队列可以看作一个简单实现。   
但这也许并不能算解决了问题...  单纯的批处理如果不配合依赖图分析，依然可能在内部计算逻辑中出现 Glitch，只是用户界面看不到而已。

#### 总结

钻石问题是由于多路径依赖导致的中间状态不一致和重复计算。

解决它的核心思路是：不要收到一个更新就立刻重算。现代最佳实践是利用“先标记脏状态（Push），后按需拉取新值（Pull）”的策略，结合版本控制，确保当最终节点 D 计算时，其依赖的 B 和 C 都已经处于稳定且一致的最新状态。


### 其他

###### <https://soonwang.me/blog/vue-reactivity-3.5-preact-signals>
###### <https://cn.vuejs.org/guide/extras/reactivity-in-depth>
###### <https://github.com/preactjs/signals>