<template>
	<div class="echarts">
		<VECharts
			v-if="hasData || showChartWidthNoData"
			:ref="chartId"
			:option="chartOption"
			:update-options="updateOptions"
			:autoresize="autoresize"
			:loading="loading"
		/>
		    
		<div v-else class="echarts__empty" v-html="empty"></div>
		
		<div v-if="!hasData && showChartWidthNoData" class="echarts__empty echarts--no-data" v-html="empty"></div>
	</div>
</template>

<script>
import VECharts from './echarts.js'
export default {
	components: { VECharts },
	props: {
		option: {
			required: true,
			type: Object,
			default: () => ({})
		},
		updateOptions: {
			type: Object,
			default: () => ({
				notMerge: true // echarts options 不合并
			})
		},
		autoresize: {
			// 根据组件大小变化是否自动重绘
			type: Boolean,
			default: true
		},
		empty: {
			type: String,
			default: '暂无数据'
		},
		showChartWidthNoData: {
			type: Boolean, // 无数据时是否显示图表，true：显示，false：不显示
			default: false
		}
	},
	data() {
		return {
			chartId: 'chart_' + Date.now(),
			chartOption: this.option
		}
	},
	computed: {
		hasData: function () {
			// 在option被赋值为非空对象之前不做是否有数据判断
			if (this.option.series) {
				return this.option.series.length && this.option.series.some((item) => item.data.length > 0)
			}

			return true
		},
		loading: function () {
			// 判断是否为加载数据中，第一次加载数据后再加载数据时可以把option置为空对象来实现显示加载动画
			return !this.option.series
		}
	},
	watch: {
		option: {
			handler: function (val) {
				this.chartOption = val

				if (!this.hasData) {
					const isLineBar = this.option.series.every(item =>
            ["line", "bar"].includes(item.type)
          );
          if (isLineBar) {
						const timeValueObj = {
						min: 0,
						max: 100
						};
						const axisSetting = {
						category: {
							data: ["xx", "xx", "xx"]
						},
						value: timeValueObj,
						time: timeValueObj
						};

						this.chartOption.xAxis = {
						...this.chartOption.xAxis,
						...axisSetting[this.chartOption.xAxis.type]
						};

						this.chartOption.yAxis = {
						...this.chartOption.yAxis,
						...axisSetting[this.chartOption.yAxis.type],
						splitLine: {
							show: false
						}
						};
					}
				}
			},
			immediate: true
		}
	},
}
</script>
<style lang="less" scoped>
	.echarts{
	   width: 100%;
      height: 100%;
  }
  .echarts__empty{
    display: inline-block;
    position: relative;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    color: #909399;
  }
	.echarts--no-data{
		top: -50%
	}
</style>
