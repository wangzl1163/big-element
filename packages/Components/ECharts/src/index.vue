<template>
	<div class="be-echarts">
		<VECharts
			v-if="hasData || showChartWidthNoData"
			:ref="chartId"
			:option="chartOption"
			:update-options="updateOptions"
			:autoresize="autoresize"
			:loading="loading"
			v-bind="$attrs"
		/>

		<div v-else class="be-echarts__empty" v-html="empty"></div>

		<div v-if="!hasData && showChartWidthNoData" class="be-echarts__empty be-echarts--no-data" v-html="empty"></div>
	</div>
</template>

<script>
import VECharts from './echarts.js'
export default {
	name: 'BeEcharts',
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
		chart: function () {
			return this.$refs[this.chartId].chart
		},
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
					const isLineBar = this.option.series.every((item) => ['line', 'bar'].includes(item.type))
					if (isLineBar) {
						const timeValueObj = {
							min: 0,
							max: 100
						}
						const axisSetting = {
							category: {
								data: ['xx', 'xx', 'xx']
							},
							value: timeValueObj,
							time: timeValueObj
						}

						this.chartOption.xAxis = {
							...this.chartOption.xAxis,
							...(this.chartOption.xAxis ? axisSetting[this.chartOption.xAxis.type] : {})
						}

						this.chartOption.yAxis = {
							...this.chartOption.yAxis,
							...(this.chartOption.yAxis ? axisSetting[this.chartOption.yAxis.type] : {}),
							splitLine: {
								show: false
							}
						}
					}
				}
			},
			immediate: true
		}
	}
}
</script>
