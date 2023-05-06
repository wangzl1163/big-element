<h1 align="center">
<img src="https://img.shields.io/badge/BE-big--element-42b883"/>
</h1>

# big-element <a href='https://www.npmjs.com/package/big-element'>![npm](https://img.shields.io/npm/v/big-element?color=42b883&style=for-the-badge)</a>

一个基于 element 组件库中的组件封装的组件库。big-element 适配了 element-ui 和 element-plus 组件库，支持被封装的组件在这两个组件库中原有的属性。

big-element 是通过未经转译的 Vue 单文件组件及 ES 模块进行发布的，需要与用户项目本身一同编译构建。

#### 特性

组件自治：组件的动画或展示效果封装到组件内部尽量与业务脱离，组件根据传入数据的变化自动处理加载动画或展示效果。

#### 感谢

在开发过程中从 VEUI 组件库中得到很多启发，在此表示感谢。

#### 用法

0、环境支持
|<img src="https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_32x32.png" alt="Edge">|![Firefox](https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_32x32.png)|![Chrome](https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png)|![Safari](https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png)|
|:-------:|:----------:|:---------:|:---------:|
|Edge ≥ 79|Firefox ≥ 78|Chrome ≥ 64|Safari ≥ 12|

1、安装

```bash
npm install big-element
```

2、快速上手
这里以 Vue3 为开发环境作为示例。
> 在开始前先安装 element-ui 或者 element-plus

2.1 概念
>常规组件：基于 element 的组件进行封装的组件
>非常规组件：对第三方的组件进行封装而成的组件，比如：ECharts 组件

2.2 常规组件完整引入

```javascript
// main.ts
import { createApp } from 'vue'
import Router from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入组件库
import BigElement from 'big-element';
// 引入样式
import 'big-element/packages/Theme/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(Router)
app.use(ElementPlus)
app.use(BigElement)
app.mount('#app')
```

2.3 常规组件按需引入

```javascript
// main.ts
import { createApp } from 'vue'
import Router from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入组件库
import { BeTable, BeDialog } from 'big-element';
// 引入样式
import 'big-element/packages/Theme/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(Router)
app.use(ElementPlus)
app.use(BeTable)
app.use(BeDialog)
app.mount('#app')
```

2.4 非常规组件引入
非常规组件往往用于特定的业务场景，比如：ECharts 组件用于需要展示图表的项目或某个页面，所以往往单个引入。

```javascript
// main.ts
import { createApp } from 'vue'
import Router from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入组件
import BeECharts from 'big-element/packages/Components/ECharts';
// 引入样式
import 'big-element/packages/Theme/Components/ECharts.css'
import App from './App.vue'

const app = createApp(App)

app.use(Router)
app.use(ElementPlus)
app.use(BeECharts)
app.mount('#app')
```

3、特别说明
3.1 按需加载 ECharts 模块
自 v1.2.1 版本开始 BeECharts 组件支持按需加载 ECharts 模块即从 prop 传入需要加载的 ECharts 模块。

```javascript
<template>
   <BeEcharts
      :option="option"
      :show-chart-width-no-data="true"
      :echartsComponents="[LineChart,DataZoomComponent]"
   />
</template>
<script lang="ts" setup>
import { ref,} from "vue";
// 引入组件中未引入的 ECharts 模块
import { LineChart } from 'echarts/charts'
import { DataZoomComponent } from 'echarts/components'

const option={}
<script>
```

注意：在以 Vite 为打包工具的项目中需要在其配置文件 vite.config.ts(js) 中增加 optimizeDeps.exclude 配置项，否则在开发模式中无法正确显示图表。

```javascript
export default defineConfig({
  optimizeDeps: {
    exclude: ['echarts']
  }
})
```
