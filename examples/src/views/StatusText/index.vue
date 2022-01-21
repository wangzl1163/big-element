<template>
	<h2>基础用法</h2>
	<p>展示标识状态的文本。</p>
	<section>
		<p>
			content属性为显示的内容。type属性为状态值，不同状态显示为不同颜色，可选值为primary / success / warning / danger / info。cursor属性支持Dom所有原生对应的属性。
		</p>
		<BeStatusText content="失败" type="danger">
		</BeStatusText>
		<BeStatusText content="成功" type="success">
		</BeStatusText>
	</section>
</template>

<script setup lang="ts">
</script>
