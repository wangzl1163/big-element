<template>
	<h2>基础用法</h2>
	<p>输入密码时明文的展示和隐藏。</p>
	<section>
		<p>
			组件基于 element 的 icon，更多icon属性可以参考 element-ui 或 element-plus 的组件说明。
		</p>
		<be-password-input v-model="pw1"></be-password-input><p/>
		<be-password-input v-model="pw2" placeholder="请输入密码"></be-password-input>
	</section>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const pw1 = ref('')
const pw2 = ref('')
</script>