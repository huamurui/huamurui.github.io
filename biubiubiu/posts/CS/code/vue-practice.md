---
title: vue-practice
icon: code
date: 2022-10-13
category:
  - 记录
---

安全的在 Markdown 中使用 {{ variable }}。

::: info 自定义标题

信息容器

:::

::: tip 自定义标题

提示容器

:::

::: playground#vue 使用自定义导入的 Vue 案例

@file App.vue

```vue
<script setup>
import { ref } from "vue";

import Comp from "./Comp.vue";

const msg = ref("Hello World!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Comp />
</template>
```

@file Comp.vue

```vue
<template>
  <div>Comp</div>
</template>
```

@import

```json
{
  "imports": {
    "vue": "https://sfc.vuejs.org/vue.runtime.esm-browser.js"
  }
}
```

:::
