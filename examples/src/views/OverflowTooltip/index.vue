<template>
	<h2>基础用法</h2>
	<p>当内容过长被隐藏时显示 tooltip。</p>
	<section>
		<p>
			组件基于 el-tooltip 组件，更多属性可以参考 element-ui 或 element-plus 的组件说明。
		</p>
		<be-overflow-tooltip :maxWidth="50" content="当内容过长被隐藏时显示 tooltip。">
		</be-overflow-tooltip>
		<BeOverflowTooltip :maxWidth="50" content="当内容过长被隐藏时显示 tooltip。">
		</BeOverflowTooltip>
	</section>
</template>

<script setup lang="ts">
</script>