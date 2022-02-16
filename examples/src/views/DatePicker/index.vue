<template>
	<h2>基础用法</h2>
	<p>基于 DatePicker 组件封装，增加了左侧快捷选项按钮。</p>
	<section>
		<p>
			defaultShortCut 属性用于设置默认选中的快捷按钮，displayedShortCuts 属性设置要展示的快捷按钮，valueFormat 属性设置值的格式，displayStyle 用于设置快捷按钮的展示风格。date-picker 更多属性可以参考 element-ui 或 element-plus 的组件说明。
		</p>
		
		<be-date-picker v-model="date1"></be-date-picker><br/>
		<be-date-picker v-model="date2" displayStyle="border"></be-date-picker><br/>
		<be-date-picker v-model="date3" :pickerShortcuts="pickerShortcuts" class="my-date-picker"></be-date-picker>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date1 = ref([])
const date2 = ref([])
const date3 = ref([])

const pickerShortcuts = [{
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  }]
</script>

<style>
.my-date-picker{
	width: 220px;
}
</style>
