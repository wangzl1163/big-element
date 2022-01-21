<template>
	<div>
		<el-button v-if="confirmType === 'box'" v-bind="$attrs" @click="$_handleClick($event)">
			<slot>删除</slot>
		</el-button>

		<el-popconfirm
			v-if="confirmType === 'pop'"
			:title="message"
			v-bind="$attrs"
			@onConfirm="$emit('confirm', $event)"
			@onCancel="$emit('cancel', $event)"
		>
			<template v-slot:reference>
				<el-button v-bind="popconfirmButtonAttrs">
					<slot>删除</slot>
				</el-button>
			</template>
		</el-popconfirm>
	</div>
</template>

<script>
export default {
	name: 'BeConfirmButton',
	props: {
		title: {
			type: String,
			default: '警告'
		},
		message: {
			type: String,
			default: '确定删除吗？'
		},
		confirmType: {
			type: String,
			default: 'box' // 可选值：pop
		},
		popconfirmButtonAttrs: {
			type: Object,
			default: () => ({})
		}
	},

	methods: {
		$_handleClick(e) {
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
