// table 组件示例
<template>
	<h2>基础表格</h2>
	<p>基础的表格展示用法。</p>
	<section>
		<p>
			当 be-table 元素中注入 data 对象数组和 columns 列数组后，在 columns 中用 prop 属性来对应对象中的键名即可填入数据，用 label 属性来定义表格的列名。 可以使用 width 属性来定义列宽。更多属性可以参考 element-ui 或 element-plus 的组件说明。
		</p>
		<BeTable :data="data" :columns="columns" :pageSize="2" :total="4" stripe isSelfPaging>
		</BeTable>
	</section>
</template>

<script setup lang="ts">
const data = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const columns = [
	{
		prop: 'date',
		label: '日期'
	},
	{
		prop: 'name',
		label: '姓名'
	},
	{
		prop: 'address',
		label: '地址'
	}
]

</script>