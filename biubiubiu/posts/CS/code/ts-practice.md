---
title: ts-practice
icon: code
date: 2022-10-13
category:
  - 记录
---

::: playground#ts TS 案例 1 发布订阅

@file index.ts

```ts
interface Events {
  on: (name: string, fn: Function) => void;
  emit: (name: string, ...arg: Array<any>) => void;
  off: (name: string, fn: Function) => void;
  once: (name: string, fn: Function) => void;
}

interface List {
  [key: string]: Array<Function>;
}

class Dispatch implements Events {
  list: List = {};
  constructor() {
    this.list = {};
  }
  on(name: string, fn: Function) {
    const callback = this.list[name] || [];
    callback.push(fn);
    this.list[name] = callback;
    console.log(this.list);
  }
  emit(name: string, ...arg: Array<any>) {
    let eventName = this.list[name];
    if (eventName) {
      eventName.forEach((fn: Function) => {
        fn.apply(this, arg);
      });
    } else {
      console.log("no event");
    }
  }

  off(name: string, fn: Function) {
    let eventName = this.list[name];
    if (eventName && fn) {
      let index = eventName.findIndex((fns) => fns === fn);
      eventName.splice(index, 1);
    }
  }
  once(name: string, fn: Function) {
    let onetime = (...args: Array<any>) => {
      fn();
      this.off(name, onetime);
    };
    this.on(name, onetime);
  }
}

const o = new Dispatch();

const lala = (...arg: Array<any>) => {
  console.log(arg, "lala");
};
o.on("post", lala);

o.emit("post", 1, false, { name: "ko no dio da" });

o.emit("post", 2, false, { name: "ko no dio da" });

const biu = (...args: Array<any>) => {
  console.log(args, "biu");
};
o.once("biu", biu);

o.emit("biu", 3, false, { name: "ko no dio da" });
o.emit("biu", 4, false, { name: "ko no dio da" });
```

:::

::: details codddde

```ts
interface Events {
  on: (name: string, fn: Function) => void;
  emit: (name: string, ...arg: Array<any>) => void;
  off: (name: string, fn: Function) => void;
  once: (name: string, fn: Function) => void;
}

interface List {
  [key: string]: Array<Function>;
}

class Dispatch implements Events {
  list: List = {};
  constructor() {
    this.list = {};
  }
  on(name: string, fn: Function) {
    const callback = this.list[name] || [];
    callback.push(fn);
    this.list[name] = callback;
    console.log(this.list);
  }
  emit(name: string, ...arg: Array<any>) {
    let eventName = this.list[name];
    if (eventName) {
      eventName.forEach((fn: Function) => {
        fn.apply(this, arg);
      });
    } else {
      console.log("no event");
    }
  }

  off(name: string, fn: Function) {
    let eventName = this.list[name];
    if (eventName && fn) {
      let index = eventName.findIndex((fns) => fns === fn);
      eventName.splice(index, 1);
    }
  }
  once(name: string, fn: Function) {
    let onetime = (...args: Array<any>) => {
      fn();
      this.off(name, onetime);
    };
    this.on(name, onetime);
  }
}

const o = new Dispatch();

const lala = (...arg: Array<any>) => {
  console.log(arg, "lala");
};
o.on("post", lala);

o.emit("post", 1, false, { name: "ko no dio da" });

o.emit("post", 2, false, { name: "ko no dio da" });

const biu = (...args: Array<any>) => {
  console.log(args, "biu");
};
o.once("biu", biu);

o.emit("biu", 3, false, { name: "ko no dio da" });
o.emit("biu", 4, false, { name: "ko no dio da" });
```

:::
