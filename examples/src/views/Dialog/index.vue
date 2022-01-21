<template>
	<h2>基础用法</h2>
	<p>Dialog 弹出一个对话框，适合需要定制性更大的场景。</p>
	<section>
		<p>
			需要设置visible属性，它接收Boolean，当为true时显示 Dialog。Dialog 分为两个部分：body和footer，footer需要具名为footer的slot。title属性用于定义标题，它是可选的，默认值为空。更多属性可以参考 element-ui 或 element-plus 的组件说明。
		</p>
		<el-button @click="visible = true">点击我</el-button>
		<BeDialog title="提示" :visible="visible" @cancel="handleCancel" width="500px" @confirm="handleConfirm">
			<span>这里是信息</span>
		</BeDialog>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const handleConfirm = () => {
	setTimeout(() => {
		visible.value = false
	}, 3000);
}
const handleCancel = () => {
	visible.value = false
}

</script>
