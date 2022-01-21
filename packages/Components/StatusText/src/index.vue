<template>
	<span :class="'be-status-text--' + type" :style="{ cursor: cursor }" @click="handleClick">
		{{ text }}
	</span>
</template>

<script>
export default {
	name: 'BeStatusText',
	props: {
		text: {
			type: [Number, String],
			default: ''
		},
		type: {
			type: String,
			default: 'info' // 可选值：primary / success / warning / danger / info
		},
		cursor: {
			type: String,
			default: 'auto' // 可选值：css cursor 属性的所有值
		}
	},
	methods: {
		handleClick(e) {
			this.$emit('click', e)
		}
	}
}
</script>
