<template>
	<el-button v-bind="$attrs" @click="handleClick($event)">{{ btnText }}</el-button>
</template>

<script>
export default {
  name: 'BEConfirmButton',
	props: {
		title: {
			type: String,
			default: '警告'
		},
		message: {
			type: String,
			default: '确定删除吗？'
		},
		btnText: {
			type: String,
			default: '删除'
		}
	},

	methods: {
		handleClick(e) {
			this.$confirm(this.message, this.title, {
				type: 'warning'
			})
				.then((res) => {
					console.log('----- confirm res: ', res)
					this.$emit('confirm', e)
				})
				.catch(() => {
					console.log('----- 已取消')
					this.$emit('cancel', e)
				})
		}
	}
}
</script>
