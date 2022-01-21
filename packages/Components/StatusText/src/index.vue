<template>
	<span :class="'be-status-text--' + type" :style="{ cursor: cursor }" @click="$_handleClick">
		{{ content }}
	</span>
</template>

<script>
export default {
	name: 'BeStatusText',
	props: {
		content: {
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
		$_handleClick(e) {
			this.$emit('click', e)
		}
	}
}
</script>
