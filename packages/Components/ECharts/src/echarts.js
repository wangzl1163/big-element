// 按需引入echarts模块，基于echarts v5.x
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入图表，图表后缀都为 Chart
import { BarChart, LineChart, PieChart } from 'echarts/charts';
// 引入坐标系组件，组件后缀都为 Component
import {
   GridComponent,
   LegendComponent,
   MarkLineComponent,
   MarkPointComponent,
   TitleComponent,
   TooltipComponent
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
export function echartsUse(libs) {
   echarts.use([
      TitleComponent,
      TooltipComponent,
      LegendComponent,
      GridComponent,
      MarkPointComponent,
      MarkLineComponent,
      BarChart,
      LineChart,
      PieChart,
      CanvasRenderer,
      UniversalTransition,
      ...libs
   ])
}

// 基于vue-echarts v6.x
export { default as VueECharts } from 'vue-echarts';

