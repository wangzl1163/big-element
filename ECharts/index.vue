<template>
	<div class="echarts">
		<VECharts
			v-if="hasData"
			:ref="echartsId"
			:option="option"
			:update-options="updateOptions"
			:autoresize="autoresize"
			:loading="loading"
		/>
		    
		<div v-else class="echarts_empty">{{ empty }}</div>
		  
	</div>
</template>

<script>
import VECharts from './echarts.js'
export default {
	components: { VECharts },
	props: {
		option: {
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
		}
	},
	data() {
		return {
			echartsId: 'echarts_' + Date.now()
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
	}
}
</script>
<style lang="less" scoped>
	.echarts{
	   width: 100%;
      height: 100%;
  }
  .echarts_empty{
    display: inline-block;
    position: relative;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    color: #909399;
  }
</style>
